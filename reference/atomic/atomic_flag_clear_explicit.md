#atomic_flag_clear_explicit
```cpp
namespace std {

  void atomic_flag_clear_explicit(volatile atomic_flag* object, memory_order order) noexcept;
  void atomic_flag_clear_explicit(atomic_flag* object, memory_order order) noexcept;

}
```
* atomic_flag[link /reference/atomic/atomic_flag]
* memory_order[link /reference/atomic/memory_order]
* memory_order [link /reference/atomic/memory_order]

##概要

<b>アトミックにフラグをクリアする</b>


##要件

`order`が以下のメモリオーダーではないこと：

- [`memory_order_acquire`](/reference/atomic/memory_order)
- [`memory_order_acq_rel`](/reference/atomic/memory_order)


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

- [Clang](/implementation#clang): ??
- [GCC](/implementation#gcc): 
- [GCC, C++0x mode](/implementation#gcc): 4.7.0
- [ICC](/implementation#icc): ??
- [Visual C++](/implementation#visual_cpp) ??



##参照


