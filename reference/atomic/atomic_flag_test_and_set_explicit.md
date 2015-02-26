#atomic_flag_test_and_set_explicit (C++11)
* atomic[meta header]
* std[meta namespace]

```cpp
namespace std {
  bool atomic_flag_test_and_set_explicit(volatile atomic_flag* object, memory_order order) noexcept;
  bool atomic_flag_test_and_set_explicit(atomic_flag* object, memory_order order) noexcept;
}
```
* atomic_flag[link ./atomic_flag.md]
* memory_order[link ./memory_order.md]

##概要
アトミックにテストしてフラグを立てる


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


###出力
```
false
true
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照


