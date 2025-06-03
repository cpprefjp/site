# let_error
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct let_error_t { unspecified };
  inline constexpr let_error_t let_error{};
}
```
* unspecified[italic]

## 概要
`let_error`は、新しいSenderを返す関数呼び出し可能なオブジェクトに引き渡すことで、入力[Sender](sender.md)の[エラー完了](set_error.md)結果から入れ子の非同期操作へと変換するSenderアダプタである。

`let_error`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。

Senderアルゴリズム`let_error`の仕様は、[`let_value`](let_value.md)ページを参照のこと。


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  { // 関数呼び出し
    ex::sender auto snd0 = ex::just_error(21);
    ex::sender auto snd1 = ex::let_error(
      snd0,
      [](int n) -> ex::sender auto {
        return ex::just(n * 2);
      });
    auto [val] = std::this_thread::sync_wait(snd1).value();
    std::println("{}", val);
  }

  { // パイプライン記法
    ex::sender auto sndr = ex::just_error(21)
      | ex::let_error(
          [](int n) -> ex::sender auto {
            return ex::just(n * 2);
          });
    auto [val] = std::this_thread::sync_wait(sndr).value();
    std::println("{}", val);
  }
}
```
* ex::let_error[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* ex::just_error[link just_error.md]
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
- [`execution::let_stopped`](let_stopped.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
