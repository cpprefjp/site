# when_all
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct when_all_t { unspecified };
  inline constexpr when_all_t when_all{};
}
```
* unspecified[italic]

## 概要
`when_all`は、複数の入力[Sender](sender.md)が全て完了するまで待機するSenderアダプタである。

`when_all`は全ての入力Senderが[値完了シグネチャ](set_value.md)を1個だけ持つことを要求する。
値完了シグネチャが複数存在する場合は[`when_all_with_variant`](when_all_with_variant.md)アルゴリズムを利用する。

- 入力Sender全てが値完了のとき、全ての値完了結果を[`tuple`](/reference/tuple/tuple.md)に結合して値完了操作を行う。
- いずれかがエラー完了のとき、同エラー値をもってエラー完了操作を行う。このとき停止要求が作成される。
- いずれかが停止完了のとき、停止完了操作を行う。このとき停止要求が作成される。


## 効果
説明用のパック`sndrs`に対してパック`Sndrs`を`decltype((sndrs))...`としたとき、型`CD`を[`common_type_t`](/reference/type_traits/common_type.md)`<decltype(`[`get-domain-early`](get-domain-early.md)`(sndrs))...>`とする。型`CD`が適格ならば型`CD2`を`CD`とし、そうでなければ[`default_domain`](default_domain.md)とする。

下記いずれかが`true`となるとき、呼び出し式`when_all(sndrs...)`は不適格となる。

- `sizeof...(sndrs) == 0`、または
- `(`[`sender`](sender.md)`<Sndrs> && ...) == false`

そうでなければ、呼び出し式`when_all(sndrs...)`は下記と等価。

```cpp
transform_sender(CD2(), make-sender(when_all, {}, sndrs...))
```
* transform_sender[link transform_sender.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `when_all`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<when_all_t> : default-impls {
    static constexpr auto get-attrs = see below;
    static constexpr auto get-env = see below;
    static constexpr auto get-state = see below;
    static constexpr auto start = see below;
    static constexpr auto complete = see below;

    template<class Sndr, class... Env>
    static consteval void check-types();
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]

`impls-for<when_all_t>::get-attrs`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[](auto&&, auto&&... child) noexcept {
  if constexpr (same_as<CD, default_domain>) {
    return env<>();
  } else {
    return MAKE-ENV(get_domain, CD());
  }
}
```
* default_domain[link default_domain.md]
* env<>[link env.md]
* MAKE-ENV[link ../queryable.md]
* get_domain[link get_domain.md]

`impls-for<when_all_t>::get-env`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class State, class Rcvr>(auto&&, State& state, const Receiver& rcvr) noexcept {
  return make-when-all-env(state.stop-src, get_env(rcvr))
}
```
* get_env[link get_env.md]

`impls-for<when_all_t>::get-state`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class Sndr, class Rcvr>(Sndr&& sndr, Rcvr& rcvr) noexcept(noexcept(e)) -> decltype(e) {
  return e;
}
```

ラムダ式が返す式`e`は下記の通り。

```cpp
std::forward<Sndr>(sndr).apply(make-state<Rcvr>())
```
* apply[link product-type.md]

`impls-for<when_all_t>::start`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class State, class Rcvr, class... Ops>(
    State& state, Rcvr& rcvr, Ops&... ops) noexcept -> void {
  state.on_stop.emplace(
    get_stop_token(get_env(rcvr)),
    on-stop-request{state.stop_src});
  if (state.stop_src.stop_requested()) {
    state.on_stop.reset();
    set_stopped(std::move(rcvr));
  } else {
    (start(ops), ...);
  }
}
```
* get_stop_token[link ../get_stop_token.md]
* get_env[link get_env.md]
* on-stop-request[link on-stop-request.md]
* set_stopped[link set_stopped.md]
* start[link start.md]
* emplace[link /reference/optional/optional/emplace.md]
* reset()[link /reference/optional/optional/reset.md]
* stop_requested()[link /reference/stop_token/inplace_stop_source/stop_requested.md]
* std::move[link /reference/utility/move.md]

`impls-for<when_all_t>::complete`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class Index, class State, class Rcvr, class Set, class... Args>(
    this auto& complete, Index, State& state, Rcvr& rcvr, Set, Args&&... args) noexcept -> void {
  if constexpr (same_as<Set, set_error_t>) {
    if (disposition::error != state.disp.exchange(disposition::error)) {
      state.stop_src.request_stop();
      TRY-EMPLACE-ERROR(state.errors, std::forward<Args>(args)...);
    }
  } else if constexpr (same_as<Set, set_stopped_t>) {
    auto expected = disposition::started;
    if (state.disp.compare_exchange_strong(expected, disposition::stopped)) {
      state.stop_src.request_stop();
    }
  } else if constexpr (!same_as<decltype(State::values), tuple<>>) {
    if (state.disp == disposition::started) {
      auto& opt = get<Index::value>(state.values);
      TRY-EMPLACE-VALUE(complete, opt, std::forward<Args>(args)...);
    }
  }
  state.arrive(rcvr);
}
```
* set_error_t[link set_error.md]
* set_stopped_t[link set_stopped.md]
* tuple<>[link /reference/tuple/tuple.md]
* get[link /reference/tuple/tuple/get.md]
* exchange[link /reference/atomic/atomic/exchange.md]
* compare_exchange_strong[link /reference/atomic/atomic/compare_exchange_strong.md]
* request_stop()[link /reference/stop_token/inplace_stop_source/request_stop.md]

説明用の式`v`, `e`に対して、式`decltype(auto(e))(e)`が潜在的に例外送出するならば、`TRY-EMPLACE-ERROR(v, e)`を下記と等価な式とする。
そうでなければ、`v.`[`template emplace`](/reference/variant/variant/emplace.md)`<decltype(auto(e))>(e)`とする。

```cpp
try {
  v.template emplace<decltype(auto(e))>(e);
} catch (...) {
  v.template emplace<exception_ptr>(current_exception());
}
```
* template emplace[link /reference/variant/variant/emplace.md]
* exception_ptr[link /reference/exception/exception_ptr.md]
* current_exception()[link /reference/exception/current_exception.md]

説明用の式`c`, `o`およびパック`as`に対して、式[`decayed-tuple`](decayed-tuple.md)`<decltype(as)...>{as...}`が潜在的に例外送出するならば、`TRY-EMPLACE-VALUE(c, o, as...)`を下記と等価な式とする。
そうでなければ、`o.`[`emplace`](/reference/optional/optional/emplace.md)`(as...)`とする。

```cpp
try {
  o.emplace(as...);
} catch (...) {
  c(Index(), state, rcvr, set_error, current_exception());
  return;
}
```
* set_error[link set_error.md]
* emplace[link /reference/optional/optional/emplace.md]
* current_exception()[link /reference/exception/current_exception.md]

メンバ関数`impls-for<when_all_t>::check-types`の効果は下記の通り。
説明用のパック`Is`を、[`indices-for`](basic-sender.md)`<Sndr>`で導入される[`integer_sequence`](/reference/utility/integer_sequence.md)クラス特殊化の整数テンプレート引数とする。

```cpp
auto fn = []<class Child>() {
  auto cs = get_completion_signatures<Child, when-all-env<Env>...>();
  if constexpr (cs.count-of(set_value) >= 2)
    throw unspecified-exception();
  decay-copyable-result-datums(cs);
};
(fn.template operator()<child-type<Sndr, Is>>(), ...);
```
* get_completion_signatures[link get_completion_signatures.md]
* count-of[link completion_signatures.md]
* set_value[link set_value.md]
* decay-copyable-result-datums[link decay-copyable-result-datums.md]
* child-type[link child-type.md]

`unspecified-exception`は[`exception`](/reference/exception/exception.md)から派生した型となる。
型`CD`が不適格な場合、[`exception`](/reference/exception/exception.md)から派生した未規定な型を例外として送出する。


## 説明専用エンティティ
### 関数テンプレート`make-when-all-env`
```cpp
template<class Env>
constexpr auto make-when-all-env(inplace_stop_source& stop_src,  // exposition only
                                 Env&& env) noexcept {
  return see below;
}
```
* inplace_stop_source[link /reference/stop_token/inplace_stop_source.md]

下記を満たすオブジェクト`e`を返す。

- `decltype(e)`が[`queryable`](../queryable.md)のモデル、かつ
- 式`e.query(`[`get_stop_token`](../get_stop_token.md)`)`が`state.stop-src.`[`get_token()`](/reference/stop_token/inplace_stop_source/get_token.md)と等価、かつ
- [`get_stop_token`](../get_stop_token.md)以外かつ[`forwarding-query`](../forwarding-query.md)を満たす[クエリオブジェクト](../queryable.md)`q`に対して、式`e.query(q)`は[`get_env`](get_env.md)`(rcvr).query(q)`と等価。

### エイリアステンプレート`when-all-env`
`when-all-env<Env>`は`decltype(make-when-all-env(declval<`[`inplace_stop_source`](/reference/stop_token/inplace_stop_source.md)`&>(), declval<Env>()))`となる。

### 列挙型`disposition`
```cpp
enum class disposition { started, error, stopped };  // exposition only
```

### クラステンプレート`make-state`
```cpp
template<class Rcvr>
struct make-state {
  template<class... Sndrs>
  auto operator()(auto, auto, Sndrs&&... sndrs) const {
    using values_tuple = see below;
    using errors_variant = see below;
    using stop_callback = stop_callback_for_t<stop_token_of_t<env_of_t<Rcvr>>, on-stop-request>;

    struct state-type {
      void arrive(Rcvr& rcvr) noexcept {               // exposition only
        if (0 == --count) {
          complete(rcvr);
        }
      }

      void complete(Rcvr& rcvr) noexcept;              // exposition only

      atomic<size_t> count{sizeof...(sndrs)};          // exposition only
      inplace_stop_source stop_src{};                  // exposition only
      atomic<disposition> disp{disposition::started};  // exposition only
      errors_variant errors{};                         // exposition only
      values_tuple values{};                           // exposition only
      optional<stop_callback> on_stop{nullopt};        // exposition only
    };

    return state-type{};
  }
};
```
* env_of_t[link env_of_t.md]
* stop_token_of_t[link ../stop_token_of_t.md]
* on-stop-request[link on-stop-request.md]
* atomic[link /reference/atomic/atomic.md]
* stop_callback_for_t[link /reference/stop_token/stop_callback_for_t.md]
* inplace_stop_source[link /reference/stop_token/inplace_stop_source.md]
* stop_callback[link /reference/stop_token/stop_token.md]
* optional[link /reference/optional/optional.md]
* nullopt[link /reference/optional/nullopt_t.md]

説明用の型`copy-fail`を、いずれかの子[Sender](sender.md)の値結果データのdecayコピーが潜在的に例外送出するならば[`exception_ptr`](/reference/exception/exception_ptr.md)とする。そうでなければ、未規定の空のクラス型`none-such`とする。

型`values_tuple`は、適格であるならば下記の型とする。そうでなければ、[`tuple<>`](/reference/tuple/tuple.md)とする。

```cpp
tuple<value_types_of_t<Sndrs, FWD-ENV-T(env_of_t<Rcvr>), decayed-tuple, optional>...>
```
* value_types_of_t[link value_types_of_t.md]
* FWD-ENV-T[link ../forwarding_query.md]
* env_of_t[link env_of_t.md]
* decayed-tuple[link decayed-tuple.md]
* optional[link /reference/optional/optional.md]

説明用のパック`Es`を全ての子[Sender](sender.md)のエラー結果データの[decayed](/reference/type_traits/decay.md)型としたとき、型`errors_variant`は下記定義において重複削除した型となる。

```cpp
variant<none-such, copy-fail, Es...>
```
* variant[link /reference/variant/variant.md]

メンバ関数`void state-type::complete(Rcvr& rcvr) noexcept`の動作は下記の通り。

- `disp == disposition::started`のとき、下記を評価する。

    ```cpp
    auto tie = []<class... T>(tuple<T...>& t) noexcept { return tuple<T&...>(t); };
    auto set = [&](auto&... t) noexcept { set_value(std::move(rcvr), std::move(t)...); };

    on_stop.reset();
    apply(
      [&](auto&... opts) noexcept {
        apply(set, tuple_cat(tie(*opts)...));
      },
      values);
    ```
    * set_value[link set_value.md]
    * apply[link /reference/tuple/apply.md]
    * tuple_cat[link /reference/tuple/tuple_cat.md]
    * reset()[link /reference/optional/optional/reset.md]
    * std::move[link /reference/utility/move.md]

- そうではなく、`disp == disposition::error`のとき、下記を評価する。

    ```cpp
    on_stop.reset();
    visit(
      [&]<class Error>(Error& error) noexcept {
        if constexpr (!same_as<Error, none-such>) {
          set_error(std::move(rcvr), std::move(error));
        }
      },
      errors);
    ```
    * set_error[link set_error.md]
    * reset()[link /reference/optional/optional/reset.md]
    * visit[link /reference/variant/visit.md]
    * std::move[link /reference/utility/move.md]

- それ以外のとき、下記を評価する。

    ```cpp
    on_stop.reset();
    set_stopped(std::move(rcvr));
    ```
    * set_stopped[link set_stopped.md]
    * reset()[link /reference/optional/optional/reset.md]
    * std::move[link /reference/utility/move.md]


## カスタマイゼーションポイント
Senderアルゴリズム構築時および[Receiver](receiver.md)接続時に、関連付けられた実行ドメインに対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。


## 例
### 例1: 基本の使い方
```cpp example
#include <print>
#include <string>
#include <execution>
namespace ex = std::execution;
using namespace std::string_literals;

int main()
{
  // string型の値を送信するSender
  ex::sender auto snd1 = ex::just("C++"s);
  // (int,char)型の値を送信するSender
  ex::sender auto snd2 = ex::just(123, 'X');
  // snd1,snd2両方の完了を待機するSender
  ex::sender auto sndr = ex::when_all(snd1, snd2);

　auto result = std::this_thread::sync_wait(sndr);
  // result := optional<tuple<string,int,char>>型
  std::println("result={}", result.value());
}
```
* ex::when_all[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]

#### 出力
```
result=("C++", 123, 'X')
```

### 例2: 停止要求のハンドリング
```cpp
#include <print>
#include <string>
#include <execution>
namespace ex = std::execution;


// MySenderは下記いずれかの完了操作を行う
//   値完了     set_value(string)
//   エラー完了 set_error(int)
//   停止完了   set_stopped()
struct MySender {
  using sender_concept = ex::sender_t;

  using completion_signatures = ex::completion_signatures<
    ex::set_value_t(std::string),
    ex::set_error_t(int),
    ex::set_stopped_t()
  >;
  template <typename Self>
  static consteval auto get_completion_signatures()
  {
    return completion_signatures{};
  }

  template <typename Rcvr>
  struct state {
    using operation_state_concept = ex::operation_state_t;

    state(Rcvr rcvr, int val)
      : rcvr_{std::move(rcvr)}, val_{val} {}

    void start() noexcept {
      auto stok = ex::get_stop_token(ex::get_env(rcvr_));
      if (stok.stop_requested()) {
        // 接続先Receiverにおいて停止要求が行われていれば
        // 非同期操作も停止完了により早期リターンさせる
        std::println("{}: set_stopped", val_);
        ex::set_stopped(std::move(rcvr_));
        return;
      }
      // MySenderの本体処理
      if (0 <= val_) {
        // 成功: 値完了操作
        using namespace std::string_literals;
        std::println("{}: set_value", val_);
        ex::set_value(std::move(rcvr_), "Hello"s);
      } else {
        // 失敗: エラー完了操作
        std::println("{}: set_error", val_);
        ex::set_error(std::move(rcvr_), val_);
      }
    }

    Rcvr rcvr_;
    int val_;
  };

  template <typename Rcvr>
  auto connect(Rcvr rcvr) noexcept {
    return state{std::move(rcvr), val_};
  }

  int val_;
};

int main()
{
  ex::sender auto snd1 = MySender{1};  // 値完了
  ex::sender auto snd2 = MySender{-2}; // エラー完了 → 停止要求
  ex::sender auto snd3 = MySender{3};  // 停止完了
  ex::sender auto sndr = ex::when_all(snd1, snd2, snd3);
  try {
    auto result = std::this_thread::sync_wait(sndr);
    // result := optional<tuple<string,string,string>>型
    std::println("value={}", *result);
  } catch (int err) {
    std::println("error={}", err);
  }
}
```
* ex::when_all[color ff0000]
* ex::sender_t[link sender.md]
* ex::sender[link sender.md]
* ex::completion_signatures[link completion_signatures.md]
* ex::set_value_t[link set_value.md]
* ex::set_value[link set_value.md]
* ex::set_error_t[link set_error.md]
* ex::set_error[link set_error.md]
* ex::set_stopped_t[link set_stopped.md]
* ex::set_stopped[link set_stopped.md]
* ex::operation_state_t[link operation_state.md]
* ex::get_stop_token[link ../get_stop_token.md]
* ex::get_env[link get_env.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* stop_requested()[link /reference/stop_token/inplace_stop_token/stop_requested.md]
* std::move[link /reference/utility/move.md]

#### 出力
```
1: set_value
-2: set_error
3: set_stopped
error=-2
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
- [`execution::when_all_with_variant`](when_all_with_variant.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3396R1 std::execution wording fixes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3396r1.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
- [LWG 4203. Constraints on `get-state` functions are incorrect](https://cplusplus.github.io/LWG/issue4203)
- [LWG 4227. Missing `noexcept` operator in [exec.when.all]](https://cplusplus.github.io/LWG/issue4227)
