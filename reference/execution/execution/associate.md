# associate
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct associate_t { unspecified };
  inline constexpr associate_t associate{};
}
```
* unspecified[italic]

## 概要
`associate`は、入力[Sender](sender.md)と非同期スコープとの関連付けを行うSenderアダプタである。
関連付けられた非同期スコープは、Senderが作成した非同期操作の生存期間を追跡できる。

`associate`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。

`associate`アルゴリズムが返す関連Sender(associate-sender)は、[非同期スコープトークン](scope_token.md)を介した関連付け試行(`try_associate`)の結果に応じてassociated／unassociatedいずれかの状態となり、入力Senderの動作を継承したうえで下記のように振る舞う。

- associated状態
    - 関連Senderは入力Senderと同じ完了シグネチャを持ち、関連Senderとの[接続(connect)](connect.md)や[開始(start)](start.md)によって入力Senderとの接続や開始が行われる。
    - 関連Senderオブジェクトが破棄、もしくは接続後の[Operation State](operation_state.md)が破棄されたとき、関連付けを解除する。
    - [非同期スコープトークン](scope_token.md)の`wrap`メンバ関数で追加される処理を行う。
- unassociated状態 :
    - 入力Senderは破棄され、[接続(connect)](connect.md)も[開始(start)](start.md)もされない。
    - 関連Senderは[set_stopped](set_stopped.md)のみで完了する。

associated状態の関連Senderに対する[接続(connect)](connect.md)操作は、下記いずれかの結果となる。

- 右辺値接続(rvalue connected)のとき、入力Senderとの関連付けは[Operation State](operation_state.md)へ移動する。
- 左辺値接続(lvalue connected)のとき、[Operation State](operation_state.md)は非同期スコープとの新たな関連付けを必要とするため、[非同期スコープトークン](scope_token.md)の`try_associate`を呼び出して下記のいずれかの結果となる。
    - 新たな関連付けに成功する（戻り値が`true`）。
    - 関連付けに失敗し（戻り値が`false`）、[Operation State](operation_state.md)はunassociated状態の関連Senderから構築されたかのように振る舞う（[開始(start)](start.md)操作により即時で[停止完了](set_stopped.md)する）。
    - 例外送出によって接続操作に失敗する。


## 効果
説明用の式`sndr`と`token`に対して、`decltype((sndr))`が[`sender`](sender.md)を満たさない、もしくは[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype((token))>`が[`scope_token`](scope_token.md)を満たさないとき、呼び出し式`associate(sndr, token)`は不適格となる。

そうでなければ、呼び出し式`associate(sndr, token)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr),
                 make-sender(associate, associate-data(token, sndr)))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]
* associate-data[italic]

`associate(sndr, token)`の評価は、`token`に関連付けられた非同期スコープオブジェクトを介して観測可能な副作用を引き起こす可能性がある。


### Senderアルゴリズムタグ `associate`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<associate_t> : default-impls {
    static constexpr auto get-state = see below;  // exposition only
    static constexpr auto start = see below;      // exposition only

    template<class Sndr, class... Env>
    static consteval void check-types() {         // exposition only
      using associate_data_t = remove_cvref_t<data-type<Sndr>>;
      using child_type_t = typename associate_data_t::wrap-sender;
      (void)get_completion_signatures<child_type_t, FWD-ENV-T(Env)...>();
    }
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* data-type[link data-type.md]
* get_completion_signatures[link get_completion_signatures.md]
* FWD-ENV-T[link ../forwarding_query.md]

`impls-for<associate_t>::get-state`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class Sndr, class Rcvr>(Sndr&& sndr, Rcvr& rcvr) noexcept(see below) {
  auto [_, data] = std::forward<Sndr>(sndr);
  auto dataParts = std::move(data).release();

  using scope_tkn = decltype(dataParts->first);
  using wrap_sender = decltype(dataParts->second);
  using op_t = connect_result_t<wrap_sender, Rcvr>;

  struct op_state {
    bool associated = false;    // exposition only
    union {
      Rcvr* rcvr;               // exposition only
      struct {
        scope_tkn token;        // exposition only
        op_t op;                // exposition only
      } assoc;                  // exposition only
    };

    explicit op_state(Rcvr& r) noexcept
      : rcvr(addressof(r)) {}

    explicit op_state(scope_tkn tkn, wrap_sender&& sndr, Rcvr& r) try
      : associated(true),
        assoc(tkn, connect(std::move(sndr), std::move(r))) {
    }
    catch (...) {
      tkn.disassociate();
      throw;
    }

    op_state(op_state&&) = delete;

    ~op_state() {
      if (associated) {
        assoc.op.~op_t();
        assoc.token.disassociate();
        assoc.token.~scope_tkn();
      }
    }

    void run() noexcept {       // exposition only
      if (associated)
        start(assoc.op);
      else
        set_stopped(std::move(*rcvr));
    }
  };

  if (dataParts)
    return op_state{std::move(dataParts->first), std::move(dataParts->second), rcvr};
  else
    return op_state{rcvr};
}
```
* connect_result_t[link connect_result_t.md]
* connect[link connect.md]
* start[link start.md]
* set_stopped[link set_stopped.md]
* first[link /reference/utility/pair/first.md]
* second[link /reference/utility/pair/second.md]
* std::move[link /reference/utility/move.md]

`impls-for<associate_t>::get-state`の`noexcept`節の式は下記の通り。

```cpp
is_nothrow_constructible_v<remove_cvref_t<Sndr>, Sndr> &&
is_nothrow_move_constructible_v<wrap-sender> &&
nothrow-callable<connect_t, wrap-sender, Rcvr>
```
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]
* is_nothrow_move_constructible_v[link /reference/type_traits/is_nothrow_move_constructible.md]
* connect_t[link connect.md]
* nothrow-callable[link /reference/functional/nothrow-callable.md]

`impls-for<associate_t>::start`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[](auto& state, auto&) noexcept -> void {
  state.run();
}
```


## 説明専用エンティティ
説明専用の`associate-data`クラスを下記の通り定義する。

```cpp
namespace std::execution {
  template<scope_token Token, sender Sender>
  struct associate-data {        // exposition only
    using wrap-sender =          // exposition only
      remove_cvref_t<decltype(declval<Token&>().wrap(declval<Sender>()))>;

    explicit associate-data(Token t, Sender&& s)
      : sndr(t.wrap(std::forward<Sender>(s))),
        token(t) {
      if (!token.try_associate())
        sndr.reset();
    }

    associate-data(const associate-data& other)
      noexcept(is_nothrow_copy_constructible_v<wrap-sender> &&
               noexcept(other.token.try_associate()));

    associate-data(associate-data&& other)
      noexcept(is_nothrow_move_constructible_v<wrap-sender>);

    ~associate-data();

    optional<pair<Token, wrap-sender>>
      release() && noexcept(is_nothrow_move_constructible_v<wrap-sender>);

  private:
    optional<wrap-sender> sndr;  // exposition only
    Token token;                 // exposition only
  };

  template<scope_token Token, sender Sender>
  associate-data(Token, Sender&&) -> associate-data<Token, Sender>;
}
```
* scope_token[link scope_token.md]
* sender[link sender.md]
* is_nothrow_copy_constructible_v[link /reference/type_traits/is_nothrow_copy_constructible.md]
* is_nothrow_move_constructible_v[link /reference/type_traits/is_nothrow_move_constructible.md]
* optional[link /reference/optional/optional.md]
* reset()[link /reference/optional/optional/reset.md]

`associate-data`型のオブジェクト`a`に対して、関連付けが正常に行われかつ`a`により所有される場合に限って、`a.sndr.`[`has_value()`](/reference/optional/optional/has_value.md)は`true`となる。

```cpp
associate-data(const associate-data& other)
  noexcept(is_nothrow_copy_constructible_v<wrap-sender> &&
           noexcept(other.token.try_associate()));
```
* is_nothrow_copy_constructible_v[link /reference/type_traits/is_nothrow_copy_constructible.md]

- テンプレートパラメータ制約 : [`copy_constructible`](/reference/concepts/copy_constructible.md)`<wrap-sender> == true`
- 効果 : `sndr`を値初期化し、`token`を`other.token`で初期化する。`other.sndr.`[`has_value()`](/reference/optional/optional/has_value.md) `== false`ならば、それ以上の効果を持たない。そうでなければ、`token.try_associate()`を呼び出し、戻り値が`true`ならば`sndr.`[`emplace`](/reference/optional/optional/emplace.md)`(*other.sndr)`を呼び出し、例外で終了するときは例外を伝播させる前に`token.disassociate()`を呼び出す。

```cpp
associate-data(associate-data&& other)
  noexcept(is_nothrow_move_constructible_v<wrap-sender>);
```
* is_nothrow_move_constructible_v[link /reference/type_traits/is_nothrow_move_constructible.md]

- 効果 : `sndr`を[`std::move`](/reference/utility/move.md)`(other.sndr)`で、`token`を`std::move(otehr.token)`で初期化したのち、`other.sndr.`[`reset()`](/reference/optional/optional/reset.md)を呼び出す。

```cpp
~associate-data();
```

- 効果 : `sndr.`[`has_value()`](/reference/optional/optional/has_value.md)が`false`を返すとき、何もしない。そうでなければ、`token.disassociate()`呼び出しの前に`sndr.`[`reset()`](/reference/optional/optional/reset.md)を呼び出す。

```cpp
optional<pair<Token, wrap-sender>>
  release() && noexcept(is_nothrow_move_constructible_v<wrap-sender>);
```
* optional[link /reference/optional/optional.md]
* is_nothrow_move_constructible_v[link /reference/type_traits/is_nothrow_move_constructible.md]

- 効果 : `sndr.`[`has_value()`](/reference/optional/optional/has_value.md)が`false`を返すとき、値を保持しない[`optional`](/reference/optional/optional.md)を返す。そうでなければ、次のように[`pair`](/reference/utility/pair.md)`<Token, warp-sender>`型の値を保持する`optional`を返す。

    ```cpp
    return optional(pair(token, std::move(*sndr)));
    ```
    * optional[link /reference/optional/optional.md]
    * std::move[link /reference/utility/move.md]

- 事後条件 : `sndr`は値を保持しない。


## カスタマイゼーションポイント
Senderアルゴリズム構築時および[Receiver](receiver.md)接続時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。


## 例
```cpp example
#include <execution>
#include <print>
namespace ex = std::execution;

int main()
{
  // 非同期スコープを定義
  ex::counting_scope scope;

  // Senderと非同期スコープを関連付け
  ex::sender auto sndr =
    ex::just(42)
    | ex::associate(scope.get_token());

  // タスク開始と完了待機
  auto result = std::this_thread::sync_wait(std::move(sndr));
  std::println("value={}", *result);

  // 非同期スコープの合流待機
  std::this_thread::sync_wait(scope.join());
}
```
* ex::associate[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* ex::counting_scope[link counting_scope.md]
* get_token()[link counting_scope/get_token.md]
* join()[link counting_scope/join.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* std::move[link /reference/utility/move.md]

### 出力
```
value=42
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::scope_token`](scope_token.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3149R11 `async_scope` - Creating scopes for non-sequential concurrency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3149r11.html)
