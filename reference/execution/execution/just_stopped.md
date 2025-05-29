# just_stopped
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct just_stopped_t { unspecified };
  inline constexpr just_stopped_t just_stopped{};
}
```
* unspecified[italic]

## 概要
`just_stopped`は、非同期操作の[開始(start)](start.md)で[停止完了関数](set_stopped.md)を呼び出すSenderファクトリである。


## 効果
呼び出し式`just_stopped()`は下記と等価。

```cpp
make-sender(just_stopped, product-type{})
```
* make-sender[link make-sender.md]
* product-type[link product-type.md]


### Senderアルゴリズムタグ `just_stopped`
Senderアルゴリズム動作説明用のクラステンプレート[`impls-for`](impls-for.md)に対して、下記の特殊化が定義される。

```cpp
namespace std::execution {
  template<>
  struct impls-for<decayed-typeof<just_stopped>> : default-impls {
    static constexpr auto start =
      [](auto& state, auto& rcvr) noexcept -> void {
        /*auto& [...ts] = state;*/
        set_stopped(std::move(rcvr));
      };
  };
}
```
* decayed-typeof[link /reference/functional/decayed-typeof.md]
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* set_stopped[link set_stopped.md]
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
  // 停止を送信するSender
  ex::sender auto sndr = ex::just_stopped();
}
```
* ex::just_stopped[color ff0000]
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
- [`execution::just_error`](just_error.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
