# atomic_flag_test_and_set_explicit
* atomic[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  bool
    atomic_flag_test_and_set_explicit(
      volatile atomic_flag* object,
      memory_order order) noexcept;    // (1) C++11

  bool
    atomic_flag_test_and_set_explicit(
      atomic_flag* object,
      memory_order order) noexcept;    // (2) C++11
  constexpr bool
    atomic_flag_test_and_set_explicit(
      atomic_flag* object,
      memory_order order) noexcept;    // (2) C++26
}
```
* atomic_flag[link atomic_flag.md]
* memory_order[link memory_order.md]

## 概要
アトミックにテストしてフラグを立てる


## 効果
`order`で指定されたメモリオーダーにしたがって、アトミックに`true`値を書き込む。この操作はread-modify-write操作である。


## 戻り値
変更前の値


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
  {
    // 値をtrueに設定する(変更前の値はtrue)
    bool result = std::atomic_flag_test_and_set_explicit(&x, std::memory_order_acq_rel);
    std::cout << result << std::endl;
  }
}
```
* std::atomic_flag_test_and_set_explicit[color ff0000]
* ATOMIC_FLAG_INIT[link atomic_flag_init.md]


### 出力
```
false
true
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
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
