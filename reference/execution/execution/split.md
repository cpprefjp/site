# split
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct split_t { unspecified };
  inline constexpr split_t split{};
}
```
* unspecified[italic]

## 概要
`split`は、任意の入力[Sender](sender.md)を複数回[接続(connect)](connect.md)可能とするSenderアダプタである。

`split`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。


## 効果
説明用の型`split-env`を、インスタンス`env`に対して式[`get_stop_token`](../get_stop_token.md)`(env)`が適格かつ型[`inplace_stop_token`](/reference/stop_token/inplace_stop_token.md)をもつ型とする。

説明用の式`sndr`に対して、型`Sndr`を`decltype((sndr))`とする。[`sender_in`](sender_in.md)`<Sndr, split-env> == false`のとき、呼び出し式`split(sndr)`は不適格となる。

そうでなければ、呼び出し式`split(sndr)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr), make-sender(split, {}, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `split`
説明用のSenderアルゴリズムタグ型`split-impl-tag`を空の型とする。説明用の式`sndr`に対して、式`split.transform_sender(sndr)`は下記と等価。

```cpp
auto&& [tag, _, child] = sndr;
auto* sh_state = new shared-state{std::forward_like<decltype((sndr))>(child)};
return make-sender(split-impl-tag(), shared-wrapper{sh_state, tag});
```
* make-sender[link make-sender.md]

説明用の型`shared-wrapper`は、`sh_state`が指す`shared-state`オブジェクトの参照カウントを管理するクラスである。

- `shared-wrapper`は[`copyable`](/reference/concepts/copyable.md)のモデルである。
- ムーブ操作 : 移動済みオブジェクトをヌルとする。
- コピー操作 : `sh_state->inc-ref()`を呼び出して参照カウントをインクリメントする。
- 代入操作 : Copy-And-Swap操作を行う。
- デストラクタ : `sh_state`がヌルのときは何もしない。そうでないとき、`sh_state->dec-ref()`を評価して参照カウントをデクリメントする。


### Senderアルゴリズムタグ `split-impl-tag`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<split-impl-tag> : default-impls {
    static constexpr auto get-state = see below;
    static constexpr auto start = see below;
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]

`impls-for<split-impl-tag>::get-state`メンバは、下記ラムダ式と等価な関数呼び出し可能なオブジェクトで初期化される。

```cpp
[]<class Sndr>(Sndr&& sndr, auto& rcvr) noexcept {
  return local-state{std::forward<Sndr>(sndr), rcvr};
}
```

`impls-for<split-impl-tag>::start`メンバは、下記の関数呼び出し演算子をもつオブジェクトで初期化される。

```cpp
template<class Sndr, class Rcvr>
void operator()(local-state<Sndr, Rcvr>& state, Rcvr& rcvr) const noexcept;
```

効果 : `state.sh_state->completed == true`のとき、`state.notify()`を評価してリターンする。そうでなければ、下記を順番に行う。

- 以下を評価する。

    ```cpp
    state.on_stop.emplace(
      get_stop_token(get_env(rcvr)),
      on-stop-request{state.sh_state->stop_src});
    ```
    * emplace[link /reference/optional/optional/emplace.md]
    * get_stop_token[link ../get_stop_token.md]
    * get_env[link get_env.md]
    * on-stop-request[link on-stop-request.md]

- 下記をアトミックに行う。
    - `state.sh_state->completed`の値`c`を読み取り
    - `c == false`のとき、`state.sh_state->waiting_state`に[`addressof`](/reference/memory/addressof.md)`(state)`を挿入する
- `c == true`ならば、`state.notify()`を呼び出してリターンする。
- そうではなく、[`addressof`](/reference/memory/addressof.md)`(state)`が`state.sh_state->waiting_state`に最初に追加されるアイテムならば、`state.sh_state->start-op()`を評価する。


## 説明専用エンティティ
### クラステンプレート`local-state`

```cpp
namespace std::execution {
  struct local-state-base {                // exposition only
    virtual ~local-state-base() = default;
    virtual void notify() noexcept = 0;    // exposition only
  };

  template<class Sndr, class Rcvr>
  struct local-state : local-state-base {  // exposition only
    using on-stop-callback =               // exposition only
      stop_callback_for_t<stop_token_of_t<env_of_t<Rcvr>>, on-stop-request>;

    local-state(Sndr&& sndr, Rcvr& rcvr) noexcept;
    ~local-state();

    void notify() noexcept override;

  private:
    optional<on-stop-callback> on_stop;    // exposition only
    shared-state<Sndr>* sh_state;          // exposition only
    Rcvr* rcvr;                            // exposition only
  };
}
```
* stop_callback_for_t[link /reference/stop_token/stop_callback_for_t.md]
* stop_token_of_t[link ../stop_token_of_t.md]
* env_of_t[link env_of_t.md]
* on-stop-request[link on-stop-request.md]
* optional[link /reference/optional/optional.md]

```cpp
local-state(Sndr&& sndr, Rcvr& rcvr) noexcept;
```

- 効果 : 下記と等価。

    ```cpp
    auto& [_, data, _] = sndr;
    this->sh_state = data.sh_state.get();
    this->sh_state->inc-ref();
    this->rcvr = addressof(rcvr);
    ```

```cpp
~local-state();
```

- 効果 : 下記と等価。

    ```cpp
    sh_state->dec-ref();
    ```

```cpp
void notify() noexcept override;
```

- 効果 : 下記と等価。

    ```cpp
    on_stop.reset();
    visit(
      [this](const auto& tupl) noexcept -> void {
        apply(
          [this](auto tag, const auto&... args) noexcept -> void {
            tag(std::move(*rcvr), args...);
          },
          tupl);
      },
      sh_state->result);
    ```
    * reset()[link /reference/optional/optional/reset.md]
    * visit[link /reference/variant/visit.md]
    * apply[link /reference/tuple/apply.md]
    * std::move[link /reference/utility/move.md]

### クラステンプレート`split-receiver`

```cpp
namespace std::execution {
  template<class Sndr>
  struct split-receiver {  // exposition only
    using receiver_concept = receiver_t;

    template<class Tag, class... Args>
    void complete(Tag, Args&&... args) noexcept {  // exposition only
      using tuple_t = decayed-tuple<Tag, Args...>;
      try {
        sh_state->result.template emplace<tuple_t>(Tag(), std::forward<Args>(args)...);
      } catch (...) {
        using tuple_t = tuple<set_error_t, exception_ptr>;
        sh_state->result.template emplace<tuple_t>(set_error, current_exception());
      }
      sh_state->notify();
    }

    template<class... Args>
    void set_value(Args&&... args) && noexcept {
      complete(execution::set_value, std::forward<Args>(args)...);
    }

    template<class Error>
    void set_error(Error&& err) && noexcept {
      complete(execution::set_error, std::forward<Error>(err));
    }

    void set_stopped() && noexcept {
      complete(execution::set_stopped);
    }

    struct env {                     // exposition only
      shared-state<Sndr>* sh-state;  // exposition only

      inplace_stop_token query(get_stop_token_t) const noexcept {
        return sh-state->stop_src.get_token();
      }
    };

    env get_env() const noexcept {
      return env{sh_state};
    }

    shared-state<Sndr>* sh_state;    // exposition only
  };
}
```
* receiver_t[link receiver.md]
* decayed-tuple[link decayed-tuple.md]
* template emplace[link /reference/variant/variant/emplace.md]
* set_error_t[link set_error.md]
* exception_ptr[link /reference/exception/exception_ptr.md]
* current_exception()[link /reference/exception/current_exception.md]
* execution::set_value[link set_value.md]
* execution::set_error[link set_error.md]
* execution::set_stopped[link set_stopped.md]
* inplace_stop_token[link /reference/stop_token/inplace_stop_token.md]
* get_stop_token_t[link ../get_stop_token.md]
* get_token()[link /reference/stop_token/inplace_stop_source/get_token.md]

### クラステンプレート`shared-state`

```cpp
namespace std::execution {
  template<class Sndr>
  struct shared-state {
    using variant-type = see below;     // exposition only
    using state-list-type = see below;  // exposition only

    explicit shared-state(Sndr&& sndr);

    void start-op() noexcept;           // exposition only
    void notify() noexcept;             // exposition only
    void inc-ref() noexcept;            // exposition only
    void dec-ref() noexcept;            // exposition only

    inplace_stop_source stop_src{};     // exposition only
    variant-type result{};              // exposition only
    state-list-type waiting_states;     // exposition only
    atomic<bool> completed{false};      // exposition only
    atomic<size_t> ref_count{1};        // exposition only
    connect_result_t<Sndr, split-receiver<Sndr>> op_state;  // exposition only
  };
}
```
* inplace_stop_source[link /reference/stop_token/inplace_stop_source.md]
* atomic[link /reference/atomic/atomic.md]
* connect_result_t[link connect_result_t.md]

- 説明用のパック`Sigs`を[`completion_signatures_of_t`](completion_signatures_of_t.md)`<Sndr>`による[`completion_signatures`](completion_signatures.md)特殊化のテンプレートパラメータと定義する。説明用の型`Tag`とパック`Args`に対して、説明用のエイリアステンプレート`as-tuple<Tag(Args...)>`を[`decayed-tuple`](decayed-tuple.md)`<Tag, Args...>`と定義する。型`variant-type`は下記定義において重複削除した型となる。

    ```cpp
    variant<tuple<set_stopped_t>, tuple<set_error_t, exception_ptr>, as-tuple<Sigs>...>
    ```
    * variant[link /reference/variant/variant.md]
    * set_stopped_t[link set_stopped.md]
    * set_error_t[link set_error.md]
    * exception_ptr[link /reference/exception/exception_ptr.md]

- 型`state-list-type`を、`local-state-base`オブジェクトへのポインタのリストを格納し、アトミックに要素挿入できる型とする。

```cpp
explicit shared-state(Sndr&& sndr);
```

- 効果 : `op_state`を[`connect`](connect.md)`(`[`std::forward`](/reference/utility/forward.md)`<Sndr>(sndr), split-receiver{this})`の結果で初期化する。
- 事後条件 : `waiting_states`が空、かつ`completed == false`

```cpp
void start-op() noexcept;
```

- 効果 : `inc-ref()`を評価する。`stop_src.`[`stop_requested()`](/reference/stop_token/inplace_stop_source/stop_requested.md) `== true`のとき`notify()`を評価する。そうでなければ、[`start`](start.md)`(op_state)`を評価する。

```cpp
void notify() noexcept;
```

- 効果 : 下記をアトミックに行い、ローカル変数`prior_states`の各ポインタ`p`に対して`p->notify()`を評価し、最後に`dec-ref()`を評価する。
    - `completed`に`true`を設定し、
    - `waiting_states`を空のリストと交換し、古い値をローカル変数`prior_states`に格納する。

```cpp
void inc-ref() noexcept;
```

- 効果 : `ref_count`をインクリメントする。

```cpp
void dec-ref() noexcept;
```

- 効果 : `ref_count`をデクリメントする。`ref_count`の新たな値が`0`のとき、`delete this`を呼び出す。
- 同期操作 : `dec-ref()`の評価が`ref_count`を値`0`にデクリメントしないとき、`ref_count`を値`0`へデクリメントする`dec-ref()`の評価に対して同期する。


## カスタマイゼーションポイント
Senderアルゴリズム構築時に、[Sender](sender.md)`sndr`に[関連付けられた実行ドメイン](get-domain-early.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では`split.transform_sender(sndr)`が呼ばれ、前述仕様通りのSenderへと変換される。


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  { // 関数呼び出し
    ex::sender auto snd0 = ex::just(21);
    ex::sender auto snd1 = ex::then(snd0, [](int n) {
        std::println("then");
        return 2 * n;
      });
    ex::sender auto sndr = ex::split(snd1);

    auto [val1] = std::this_thread::sync_wait(sndr).value();
    std::println("{}", val1);
    auto [val2] = std::this_thread::sync_wait(sndr).value();
    std::println("{}", val2);
  }

  { // パイプライン記法
    ex::sender auto sndr =
      ex::just(21)
      | ex::then([](int n) {
          std::println("then");
          return 2 * n;
        })
      | ex::split();

    auto [val1] = std::this_thread::sync_wait(sndr).value();
    std::println("{}", val1);
    auto [val2] = std::this_thread::sync_wait(sndr).value();
    std::println("{}", val2);
  }
}
```
* ex::split[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* ex::then[link then.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]

### 出力
```
then
42
42
then
42
42
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
