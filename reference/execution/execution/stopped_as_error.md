# stopped_as_error
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct stopped_as_error_t { unspecified };
  inline constexpr stopped_as_error_t stopped_as_error{};
}
```
* unspecified[italic]

## 概要
`stopped_as_error`は、入力[Sender](sender.md)の[停止完了](set_stopped.md)をカスタムエラー型の[エラー完了](set_error.md)にマップするSenderアダプタである。

`stopped_as_error`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。


## 効果
説明用の式`sndr`と`err`に対して、型`Sndr`を`decltype((sndr))`、型`Err`を`decltype((err))`とする。`Sndr`が[`sender`](sender.md)を満たさない、もしくは`Err`が[`moveable-value`](../movable-value.md)を満たさないとき、呼び出し式`stopped_as_error(sndr, err)`は不適格となる。

そうでなければ、呼び出し式`stopped_as_error(sndr, err)`は`sndr`が1回だけ評価されることを除いて、下記と等価。

```cpp
transform_sender(get-domain-early(sndr), make-sender(stopped_as_error, err, sndr))
```
* transform_sender[link transform_sender.md]
* get-domain-early[link get-domain-early.md]
* make-sender[link make-sender.md]


### Senderアルゴリズムタグ `stopped_as_error`
説明用の式`sndr`と`env`に対して、型`Sndr`を`decltype((sndr))`、型`Env`を`decltype((env))`とする。[`sender-for`](sender-for.md)`<Sndr, stopped_as_error_t> == false`のとき、式`stopped_as_error.transform_sender(sndr, env)`は不適格となる。

そうでなければ、式`stopped_as_error.transform_sender(sndr, env)`は下記と等価。

```cpp
auto&& [_, err, child] = sndr;
using E = decltype(auto(err));
return let_stopped(
    std::forward_like<Sndr>(child),
    [err = std::forward_like<Sndr>(err)]() mutable noexcept(is_nothrow_move_constructible_v<E>) {
      return just_error(std::move(err));
    });
```
* let_stopped[link let_stopped.md]
* just_error[link just_error.md]
* is_nothrow_move_constructible_v[link /reference/type_traits/is_nothrow_move_constructible.md]
* std::move[link /reference/utility/move.md]


## カスタマイゼーションポイント
Senderアルゴリズム構築時に、[Sender](sender.md)`sndr`に[関連付けられた実行ドメイン](get-domain-early.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。

[Receiver](receiver.md)との[接続(connect)](connect.md)時に、[関連付けられた実行ドメイン](get-domain-late.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では`stopped_as_error.transform_sender(sndr, env)`が呼ばれ、前述仕様通りのSenderへと変換される。


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
    ex::sender auto snd1 = ex::stopped_as_error(snd0, MyStoppedError{});
    try {
      auto [result] = std::this_thread::sync_wait(snd1).value();
      std::println("(int) {}", result);
    } catch (MyStoppedError) {
      std::println("stopped");
    }
  }

  { // パイプライン記法
    ex::sender auto sndr =
      MySender{-1}
      | ex::stopped_as_error(MyStoppedError{});
    try {
      auto [result] = std::this_thread::sync_wait(sndr).value();
      std::println("(int) {}", result);
    } catch (MyStoppedError) {
      std::println("stopped");
    }
  }
}
```
* ex::stopped_as_error[color ff0000]
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
- [`execution::stopped_as_optional`](stopped_as_optional.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
