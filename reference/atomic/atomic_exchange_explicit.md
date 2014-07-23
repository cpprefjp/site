#atomic_exchange_explicit (C++11)
```cpp
namespace std {
  template <class T>
  T atomic_exchange_explicit(volatile atomic<T>* object, T desired, memory_order order) noexcept;

  template <class T>
  T atomic_exchange_explicit(atomic<T>* object, T desired, memory_order order) noexcept;
]
```
* atomic[link ./atomic.md]
* memory_order[link ./memory_order.md]


##概要
アトミックに値を入れ替える


##効果
`order`で指定されたメモリオーダーにしたがって、現在の値を`desired`でアトミックに置き換える


##戻り値
変更前の値が返される


##例外
投げない


##備考
この関数は、特殊化された[`atomic`](./atomic.md)型に対して定義される。


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(1);

  if (std::atomic_exchange_explicit(&x, 2, std::memory_order_acquire) == 1) {
    std::cout << "replaced 1 by 2" << std::endl;
  }
  else {
    std::cout << "replace failed" << std::endl;
  }
}
```
* atomic_exchange_explicit[color ff0000]


###出力
```
replaced 1 by 2
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0, 12.0


##参照


