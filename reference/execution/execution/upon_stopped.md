# upon_stopped
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct upon_stopped_t { unspecified };
  inline constexpr upon_stopped_t upon_stopped{};
}
```
* unspecified[italic]

## 概要
`upon_stopped`は、入力[Sender](sender.md)の[停止完了操作](set_stopped.md)の継続として関数呼び出しをアタッチし、戻り値データを[正常完了](set_value.md)として送信するSenderアダプタである。

`upon_stopped`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。

Senderアルゴリズム`upon_stopped`の仕様は、[`then`](then.md)ページを参照のこと。


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  { // 関数呼び出し
    ex::sender auto snd0 = ex::just_stopped();
    ex::sender auto snd1 = ex::upon_stopped(snd0, []() {
      return 42;
    });
    auto [v] = std::this_thread::sync_wait(snd1).value();
    std::println("{}", v);
  }

  { // パイプライン記法
    ex::sender auto sndr = ex::just_stopped()
      | ex::upon_stopped([]() {
          return 42;
        });
    auto [v] = std::this_thread::sync_wait(sndr).value();
    std::println("{}", v);
  }
}
```
* ex::upon_stopped[color ff0000]
* ex::sender[link sender.md]
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
- [`execution::then`](then.md)
- [`execution::upon_error`](upon_error.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
