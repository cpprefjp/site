```cpp
namespace std {

  bool atomic_flag_test_and_set_explicit(volatile atomic_flag* object, memory_order order) noexcept;
  bool atomic_flag_test_and_set_explicit(atomic_flag* object, memory_order order) noexcept;

}
```
* atomic_flag[link https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag]
* memory_order[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]
* atomic_flag[link https://sites.google.com/site/cpprefjp/reference/atomic/atomic_flag]
* memory_order[link https://sites.google.com/site/cpprefjp/reference/atomic/memory_order]

##概要

<b>アトミックにテストしてフラグを立てる</b>


##効果

`order`で指定されたメモリオーダーにしたがって、アトミックに`true`値を書き込む。この操作はread-modify-write操作である。



##戻り値

変更前の値



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
  {
    // 値をtrueに設定する(変更前の値はtrue)
    bool result = std::atomic_flag_test_and_set_explicit(&x, std::memory_order_acq_rel);
    std::cout << result << std::endl;
  }
}
```
* atomic_flag_test_and_set_explicit[color ff0000]
* atomic_flag_test_and_set_explicit[color ff0000]

###出力

```cpp
false
true
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


