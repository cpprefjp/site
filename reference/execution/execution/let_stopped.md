# let_stopped
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct let_stopped_t { unspecified };
  inline constexpr let_stopped_t let_stopped{};
}
```
* unspecified[italic]

## 概要
`let_stopped`は、新しいSenderを返す関数呼び出し可能なオブジェクトに引き渡すことで、入力[Sender](sender.md)の[停止完了](set_stopped.md)結果から入れ子の非同期操作へと変換するSenderアダプタである。

`let_stopped`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。

Senderアルゴリズム`let_stopped`の仕様は、[`let_value`](let_value.md)ページを参照のこと。


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  { // 関数呼び出し
    ex::sender auto snd0 = ex::just_stopped();
    ex::sender auto snd1 = ex::let_stopped(
      snd0,
      []() -> ex::sender auto {
        return ex::just(42);
      });
    auto [val] = std::this_thread::sync_wait(snd1).value();
    std::println("{}", val);
  }

  { // パイプライン記法
    ex::sender auto sndr = ex::just_stopped()
      | ex::let_stopped(
          []() -> ex::sender auto {
            return ex::just(42);
          });
    auto [val] = std::this_thread::sync_wait(sndr).value();
    std::println("{}", val);
  }
}
```
* ex::let_stopped[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* ex::just_stopped[link just_stopped.md]
* std::this_thread::sync_wait[link ../this_thread/sync_wait.md]
* value()[link /reference/optional/optional/value.md]

### 出力
```
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


## 関連項目
- [`execution::let_value`](let_value.md)
- [`execution::let_error`](let_error.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
