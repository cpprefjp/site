# just
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct just_t { unspecified };
  inline constexpr just_t just{};
}
```
* unspecified[italic]

## 概要
`just`は、非同期操作の[開始(start)](start.md)で[値完了関数](set_value.md)を呼び出すSenderファクトリである。


## 効果
説明用のパック`ts`に対して、パック`Ts`を`decltype((ts))`とする。下記いずれかの条件をみたすとき、呼び出し式`just(ts...)`は不適格となる。

- `(`[`movable-value`](../movable-value.md)`<Ts> &&...) == false`

そうでなければ、呼び出し式`just(ts...)`は下記と等価。

```cpp
make-sender(just, product-type{ts...})
```
* make-sender[link make-sender.md]
* product-type[link product-type.md]


### Senderアルゴリズムタグ `just`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<decayed-typeof<just>> : default-impls {
    static constexpr auto start =
      [](auto& state, auto& rcvr) noexcept -> void {
        auto& [...ts] = state;
        set_value(std::move(rcvr), std::move(ts)...);
      };
  };
}
```
* decayed-typeof[link /reference/functional/decayed-typeof.md]
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* set_value[link set_value.md]
* std::move[link /reference/utility/move.md]


## カスタマイゼーションポイント
[Receiver](receiver.md)との[接続(connect)](connect.md)時に、[関連付けられた実行ドメイン](get-domain-late.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。


## 例
```cpp example
#include <string>
#include <print>
#include <execution>
namespace ex = std::execution;
using namespace std::string_literals;

int main()
{
  // 空の値を送信するSender
  ex::sender auto snd0 = ex::just();
  std::tuple<> result0 = std::this_thread::sync_wait(snd0).value();
  std::println("result0={}", result0);

  // 値"C++"を送信するSender
  ex::sender auto snd1 = ex::just("C++"s);
  std::tuple<std::string> result1 = std::this_thread::sync_wait(snd1).value();
  std::println("result1={}", result1);

  // 値(123,'X')を送信するSender
  ex::sender auto snd2 = ex::just(123, 'X');
  std::tuple<int, char> result2 = std::this_thread::sync_wait(snd2).value();
  std::println("result2={}", result2);
}
```
* ex::just[color ff0000]
* ex::sender[link sender.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]

### 出力
```
result0=()
result1=("C++")
result2=(123, 'X')
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
- [`execution::just_error`](just_error.md)
- [`execution::just_stopped`](just_stopped.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
