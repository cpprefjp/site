# atomic_flag_test_explicit
* atomic[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  bool
    atomic_flag_test_explicit(const volatile atomic_flag* object,
                              memory_order order) noexcept;  // (1) C++20

  bool
    atomic_flag_test_explicit(const atomic_flag* object,
                              memory_order order) noexcept;  // (2) C++20
  constexpr bool
    atomic_flag_test_explicit(const atomic_flag* object,
                              memory_order order) noexcept;  // (2) C++26
}
```
* memory_order[link /reference/atomic/memory_order.md]

## 概要
現在の値を`bool`値として取得する。


## 事前条件
`order`が以下のメモリオーダーではないこと：

- [`memory_order_release`](/reference/atomic/memory_order.md)
- [`memory_order_acq_rel`](/reference/atomic/memory_order.md)


## 効果
`order`値によってメモリに影響がある


## 戻り値
アトミックに読み込まれた`*this`が指している値を返す


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>

int main()
{
  std::cout << std::boolalpha;

  std::atomic_flag x = ATOMIC_FLAG_INIT;
  std::cout << std::atomic_flag_test_explicit(&x, std::memory_order::acquire) << std::endl;

  std::atomic_flag_test_and_set_explicit(&x, std::memory_order::release);
  std::cout << std::atomic_flag_test_explicit(&x, std::memory_order::acquire) << std::endl;
}
```
* std::atomic_flag_test_explicit[color ff0000]
* std::atomic_flag_test_and_set_explicit[link atomic_flag_test_and_set_explicit.md]
* ATOMIC_FLAG_INIT[link /reference/atomic/atomic_flag_init.md]
* memory_order[link /reference/atomic/memory_order.md]


### 出力
```
false
true
```


## バージョン
### 言語
- C++20


### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [P0995R1 Improving atomic_flag](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0995r1.html)
- [ogiroux/atomic_wait - Sample implementation of C++20 atomic_wait/notify](https://github.com/ogiroux/atomic_wait)
- [P1135R6 The C++20 Synchronization Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1135r6.html)
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
