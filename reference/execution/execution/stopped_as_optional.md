# stopped_as_optional
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct stopped_as_optional_t { unspecified };
  inline constexpr stopped_as_optional_t stopped_as_optional{};
}
```
* unspecified[italic]

## 概要
`stopped_as_optional`は、入力[Sender](sender.md)の[停止完了](set_stopped.md)を空の[`optional`](/reference/optional/optional.md)による[値完了](set_value.md)にマップするSenderアダプタである。入力Senderの値完了操作も[`optional`](/reference/optional/optional.md)へと変換される。

`stopped_as_optional`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。


## 効果
説明用の式`sndr`に対して、型`Sndr`を`decltype((sndr))`とする。呼び出し式`stopped_as_optional(sndr)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr), make-sender(stopped_as_optional, {}, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `stopped_as_optional`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<stopped_as_optional_t> : default-impls {
    template<class Sndr, class... Env>
    static consteval void check-types() {
      default-impls::check-types<Sndr, Env...>();
      if constexpr (!requires {
        requires (!same_as<void, single-sender-value-type<child-type<Sndr>, FWD-ENV-T(Env)...>>); })
        throw unspecified-exception();
      }
  };
}
```
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* single-sender-value-type[link single-sender-value-type.md]
* child-type[link child-type.md]
* FWD-ENV-T[link ../forwarding_query.md]

`unspecified-exception`は[`exception`](/reference/exception/exception.md)から派生した型となる。

説明用の式`sndr`と`env`に対して、型`Sndr`を`decltype((sndr))`、型`Env`を`decltype((env))`とする。[`sender-for`](sender-for.md)`<Sndr, stopped_as_optional_t> == false`のとき、式`stopped_as_optional.transform_sender(sndr, env)`は不適格となる。

そうではなく、[`sender_in`](sender_in.md)`<`[`child-type`](child-type.md)`<Sndr>,` [`FWD-ENV-T`](../forwarding_query.md)`(Env)> == false`のとき、式`stopped_as_optional.transform_sender(sndr, env)`は[`not-a-sender()`](not-a-sender.md)と等価。

そうでなければ、式`stopped_as_optional.transform_sender(sndr, env)`は下記と等価。

```cpp
auto&& [_, _, child] = sndr;
using V = single-sender-value-type<child-type<Sndr>, FWD-ENV-T(Env)>;
return let_stopped(
    then(std::forward_like<Sndr>(child),
         []<class... Ts>(Ts&&... ts) noexcept(is_nothrow_constructible_v<V, Ts...>) {
           return optional<V>(in_place, std::forward<Ts>(ts)...);
         }),
    []() noexcept { return just(optional<V>()); });
```
* single-sender-value-type[link single-sender-value-type.md]
* child-type[link child-type.md]
* FWD-ENV-T[link ../forwarding_query.md]
* let_stopped[link let_stopped.md]
* then[link then.md]
* just[link just.md]
* is_nothrow_constructible_v[link /reference/type_traits/is_nothrow_constructible.md]
* optional[link /reference/optional/optional.md]


## カスタマイゼーションポイント
Senderアルゴリズム構築時に、[Sender](sender.md)`sndr`に[関連付けられた実行ドメイン](get-domain-early.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。

[Receiver](receiver.md)との[接続(connect)](connect.md)時に、[関連付けられた実行ドメイン](get-domain-late.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では`stopped_as_optional.transform_sender(sndr, env)`が呼ばれ、前述仕様通りのSenderへと変換される。


## 例
```cpp example
#include <cassert>
#include <execution>
namespace ex = std::execution;

// MySenderは下記いずれかの完了操作を行う
//   値完了   set_value(int)
//   停止完了 set_stopped()
struct MySender {
  using sender_concept = ex::sender_t;

  using completion_signatures = ex::completion_signatures<
    ex::set_value_t(int),
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
      if (0 < val_) {
        ex::set_value(std::move(rcvr_), val_);
      } else {
        ex::set_stopped(std::move(rcvr_));
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
  { // 関数呼び出し
    ex::sender auto snd0 = MySender{-1};
    ex::sender auto snd1 = ex::stopped_as_optional(snd0);
    auto [result] = std::this_thread::sync_wait(snd1).value();
    if (result) {
      std::println("(int) {}", *result);
    } else {
      std::println("stopped");
    }
  }

  { // パイプライン記法
    ex::sender auto sndr = MySender{-1} | ex::stopped_as_optional();
    auto [result] = std::this_thread::sync_wait(sndr).value();
    if (result) {
      std::println("(int) {}", *result);
    } else {
      std::println("stopped");
    }
  }
}
```
* ex::stopped_as_optional[color ff0000]
* ex::sender_t[link sender.md]
* ex::sender[link sender.md]
* ex::completion_signatures[link completion_signatures.md]
* ex::set_value_t[link set_value.md]
* ex::set_value[link set_value.md]
* ex::set_stopped_t[link set_stopped.md]
* ex::set_stopped[link set_stopped.md]
* ex::operation_state_t[link operation_state.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* std::move[link /reference/utility/move.md]

### 出力
```
stopped
stopped
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
- [`execution::stopped_as_error`](stopped_as_error.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3557R3 High-Quality Sender Diagnostics with Constexpr Exceptions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3557r3.html)
- [LWG 4203. Constraints on `get-state` functions are incorrect](https://cplusplus.github.io/LWG/issue4203)
