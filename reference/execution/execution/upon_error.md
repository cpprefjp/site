# upon_error
* execution[meta header]
* cpo[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  struct upon_error_t { unspecified };
  inline constexpr upon_error_t upon_error{};
}
```
* unspecified[italic]

## 概要
`upon_error`は、入力[Sender](sender.md)の[エラー完了操作](set_error.md)の継続として関数呼び出しをアタッチし、戻り値データを[正常完了](set_value.md)として送信するSenderアダプタである。

`upon_error`は[パイプ可能Senderアダプタオブジェクト](sender_adaptor_closure.md)であり、パイプライン記法をサポートする。


Senderアルゴリズム`upon_error`の仕様は、[`then`](then.md)ページを参照のこと。


## 例
```cpp example
#include <print>
#include <execution>
namespace ex = std::execution;

int main()
{
  { // 関数呼び出し
    ex::sender auto snd0 = ex::just_error(42);
    ex::sender auto snd1 = ex::upon_error(snd0, [](int err) {
      return err;
    });
    auto [v] = std::this_thread::sync_wait(snd1).value();
    std::println("{}", v);
  }

  { // パイプライン記法
    ex::sender auto sndr = ex::just_error(42)
      | ex::upon_error([](int err) {
          return err;
        });
    auto [v] = std::this_thread::sync_wait(sndr).value();
    std::println("{}", v);
  }
}
```
* ex::upon_error[color ff0000]
* ex::sender[link sender.md]
* ex::just_error[link just.md]
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
- [`execution::upon_stopped`](upon_stopped.md)


## 参照
- [P2999R3 Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2999r3.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
