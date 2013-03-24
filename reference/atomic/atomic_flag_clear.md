#atomic_flag_clear
```cpp
namespace std {

  void atomic_flag_clear(volatile atomic_flag* object) noexcept;
  void atomic_flag_clear(atomic_flag* object) noexcept;

}
```
* atomic_flag[link /reference/atomic/atomic_flag]

##概要

<b>アトミックにフラグをクリアする</b>


##効果

[memory_order_seq_cst](/reference/atomic/memory_order)のメモリオーダーにしたがって、アトミックに`false`値を書き込む。



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
* atomic_flag_clear[color ff0000]

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


