# atomic_flag_clear
* atomic[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  void
    atomic_flag_clear(volatile atomic_flag* object) noexcept; // (1) C++11

  void
    atomic_flag_clear(atomic_flag* object) noexcept;          // (2) C++11
  constexpr void
    atomic_flag_clear(atomic_flag* object) noexcept;          // (2) C++26
}
```
* atomic_flag[link atomic_flag.md]

## 概要
アトミックにフラグをクリアする


## 効果
[`memory_order_seq_cst`](memory_order.md)のメモリオーダーにしたがって、アトミックに`false`値を書き込む。


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
    bool result = std::atomic_flag_test_and_set(&x);
    std::cout << result << std::endl;
  }

  // 値をfalseにする
  std::atomic_flag_clear(&x);

  {
    // 値をtrueに設定する(変更前の値はfalse)
    bool result = std::atomic_flag_test_and_set(&x);
    std::cout << result << std::endl;
  }
}
```
* std::atomic_flag_clear[color ff0000]
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
- [P3309R3 `constexpr atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3309r3.html)
    - C++26で`constexpr`に対応した
