# atomic_flag_clear_explicit
* atomic[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  void
    atomic_flag_clear_explicit(
      volatile atomic_flag* object,
      memory_order order) noexcept; // (1) C++11

  void
    atomic_flag_clear_explicit(
      atomic_flag* object,
      memory_order order) noexcept; // (2) C++11
  constexpr void
    atomic_flag_clear_explicit(
      atomic_flag* object,
      memory_order order) noexcept; // (2) C++26
}
```
* atomic_flag[link atomic_flag.md]
* memory_order[link memory_order.md]

## 概要
アトミックにフラグをクリアする


## 要件
`order`が以下のメモリオーダーではないこと：

- [`memory_order_consume`](memory_order.md) (C++26で非推奨)
- [`memory_order_acquire`](memory_order.md)
- [`memory_order_acq_rel`](memory_order.md)


## 効果
`order`で指定されたメモリオーダーにしたがって、アトミックに`false`値を書き込む。


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::atomic_flag x = ATOMIC_FLAG_INIT;

  std::cout << std::boolalpha;
  {
    // 値をtrueに設定する(変更前の値はfalse)
    bool result = std::atomic_flag_test_and_set_explicit(&x, std::memory_order_acq_rel);
    std::cout << result << std::endl;
  }

  // 値をfalseにする
  std::atomic_flag_clear_explicit(&x, std::memory_order_release);

  {
    // 値をtrueに設定する(変更前の値はfalse)
    bool result = std::atomic_flag_test_and_set_explicit(&x, std::memory_order_acq_rel);
    std::cout << result << std::endl;
  }
}
```
* std::atomic_flag_clear_explicit[color ff0000]
* ATOMIC_FLAG_INIT[link atomic_flag_init.md]


### 出力
```
false
false
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]


## 参照
- [LWG Issue 2138. `atomic_flag::clear` should not accept `memory_order_consume`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2138)
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
- [P3475R2 Defang and deprecate memory_order::consume](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3475r2.pdf)
