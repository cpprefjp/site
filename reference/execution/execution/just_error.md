# just_error
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct just_error_t { unspecified };
  inline constexpr just_error_t just_error{};
}
```
* unspecified[italic]

## 概要
`just_error`は、非同期操作の[開始(start)](start.md)で[エラー完了関数](set_error.md)を呼び出すSenderファクトリである。


## 効果
説明用のパック`ts`に対して、パック`Ts`を`decltype((ts))`とする。下記いずれかの条件をみたすとき、呼び出し式`just_error(ts...)`は不適格となる。

- `(`[`movable-value`](../movable-value.md)`<Ts> &&...) == false`、もしくは
- `sizeof...(ts) == 1`が`false`

そうでなければ、呼び出し式`just_error(ts...)`は下記と等価。

```cpp
make-sender(just_error, product-type{ts...})
```
* make-sender[link make-sender.md]
* product-type[link product-type.md]


### Senderアルゴリズムタグ `just_error`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<decayed-typeof<just_error>> : default-impls {
    static constexpr auto start =
      [](auto& state, auto& rcvr) noexcept -> void {
        auto& [...ts] = state;
        set_error(std::move(rcvr), std::move(ts)...);
      };
  };
}
```
* decayed-typeof[link /reference/functional/decayed-typeof.md]
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* set_error[link set_error.md]
* std::move[link /reference/utility/move.md]


## カスタマイゼーションポイント
[Receiver](receiver.md)との[接続(connect)](connect.md)時に、[関連付けられた実行ドメイン](get-domain-late.md)に対して[`execution::transform_sender`](transform_sender.md)経由でSender変換が行われる。
[デフォルト実行ドメイン](default_domain.md)では無変換。


## 例
```cpp example
#include <execution>
namespace ex = std::execution;

int main()
{
  // エラー(42)を送信するSender
  ex::sender auto sndr = ex::just_error(42);
}
```
* ex::just_error[color ff0000]
* ex::sender[link sender.md]

### 出力
```
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
- [`execution::just`](just.md)
- [`execution::just_stopped`](just_stopped.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
