```cpp
namespace std {

  void atomic_flag_clear_explicit(volatile atomic_flag* object, memory_order order) noexcept;
  void atomic_flag_clear_explicit(atomic_flag* object, memory_order order) noexcept;

}
```
* atomic_flag[link https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag]
* memory_order[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]
* memory_order [link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]

##概要

<b>アトミックにフラグをクリアする</b>


##要件

`order`が以下のメモリオーダーではないこと：

- [`memory_order_acquire`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order)
- [`memory_order_acq_rel`](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order)


##効果

`order`で指定されたメモリオーダーにしたがって、アトミックに`false`値を書き込む。



##戻り値

なし


##例外

投げない


##例

```cpp
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
* atomic_flag_clear_explicit[color ff0000]

###出力

```cpp
false
false
```

##バージョン


###言語


- C++11



###処理系

- [Clang](https://sites.google.com/site/cpprefjp/implementation#clang): ??
- [GCC](https://sites.google.com/site/cpprefjp/implementation#gcc): 
- [GCC, C++0x mode](https://sites.google.com/site/cpprefjp/implementation#gcc): 4.7.0
- [ICC](https://sites.google.com/site/cpprefjp/implementation#icc): ??
- [Visual C++](https://sites.google.com/site/cpprefjp/implementation#visual_cpp) ??



##参照


