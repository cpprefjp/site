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
- 呼び出し式`just(ts...)`は、`(`[`movable-value`](movable-value.md.nolink)`<Ts> &&...) == false`のとき不適格となる。
- そうでなければ、式[`make-sender`](make-sender.md)`(just,` [`product-type`](product-type.md.nolink)`{ts...})`と等価。


### Senderタグ `just`
Senderアルゴリズム動作説明用のクラステンプレート`impls-for`に対して、下記の特殊化が定義される。

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
* impls-for[link impls-for.md]
* default-impls[link impls-for.md]
* set_value[link set_value.md]


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  // 値(123,'X')の送信結果は tuple<int,char> 型で受け取る
  ex::sender auto snd1 = ex::just(123, 'X');
  std::tuple<int, char> result1 = std::this_thread::sync_wait(snd1).value();
  std::println("result1={}", result1);

  // 空値の送信結果は tuple<> 型で受け取る
  ex::sender auto snd2 = ex::just();
  std::tuple<> result2 = std::this_thread::sync_wait(snd2).value();
  std::println("result2={}", result2);
}
```
* ex::just[color ff0000]
* ex::sender[link sender.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]

### 出力
```
result1=(123, 'X')
result2=()
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
- [`execution::just_error`](just_error.md.nolink)
- [`execution::just_stopped`](just_stopped.md.nolink)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
