#atomic_flag_clear_explicit
```cpp
namespace std {
  void atomic_flag_clear_explicit(volatile atomic_flag* object, memory_order order) noexcept;
  void atomic_flag_clear_explicit(atomic_flag* object, memory_order order) noexcept;
}
```
* atomic_flag[link ./atomic_flag.md]
* memory_order[link ./memory_order.md]

##概要
アトミックにフラグをクリアする


##要件
`order`が以下のメモリオーダーではないこと：
- [`memory_order_acquire`](./memory_order.md)
- [`memory_order_acq_rel`](./memory_order.md)


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
```
false
false
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


