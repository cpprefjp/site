# atomic_flag_clear_explicit
* atomic[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  void atomic_flag_clear_explicit(volatile atomic_flag* object, memory_order order) noexcept;
  void atomic_flag_clear_explicit(atomic_flag* object, memory_order order) noexcept;
}
```
* atomic_flag[link atomic_flag.md]
* memory_order[link memory_order.md]

## 概要
アトミックにフラグをクリアする


## 要件
`order`が以下のメモリオーダーではないこと：

- [`memory_order_consume`](memory_order.md) (C++14)
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
    // 値をtrueに�定する(変更前の値はfalse)
    bool result = std::atomic_flag_test_and_set_explicit(&x, std::memory_order_acq_rel);
    std::cout << result << std::endl;
  }

  // 値をfalseにする
  std::atomic_flag_clear_explicit(&x, std::memory_order_release);

  {
    // 値をtrueに�定する(変更前の値はfalse)
    bool result = std::atomic_flag_test_and_set_explicit(&x, std::memory_order_acq_rel);
    std::cout << result << std::endl;
  }
}
```
* std::atomic_flag_clear_explicit[color ff0000]
* std::atomic_flag[link atomic_flag.md]
* ATOMIC_FLAG_INIT[link atomic_flag_init.md]
* std::atomic_flag_test_and_set_explicit[link atomic_flag_test_and_set_explicit.md]


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
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照
- [LWG Issue 2138. `atomic_flag::clear` should not accept `memory_order_consume`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2138)

