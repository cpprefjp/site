# atomic_flag_test
* atomic[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  bool
    atomic_flag_test(const volatile atomic_flag* object) noexcept; // (1) C++20

  bool
    atomic_flag_test(const atomic_flag* object) noexcept;          // (2) C++20
  constexpr bool
    atomic_flag_test(const atomic_flag* object) noexcept;          // (2) C++26
}
```

## 概要
現在の値を`bool`値として取得する。


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
  std::cout << std::atomic_flag_test(&x) << std::endl;

  std::atomic_flag_test_and_set(&x);
  std::cout << std::atomic_flag_test(&x) << std::endl;
}
```
* std::atomic_flag_test[color ff0000]
* std::atomic_flag_test_and_set[link atomic_flag_test_and_set.md]
* ATOMIC_FLAG_INIT[link /reference/atomic/atomic_flag_init.md]


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
