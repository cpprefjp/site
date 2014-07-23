#atomic_store_explicit (C++11)
```cpp
namespace std {
  template <class T>
  void atomic_store_explicit(volatile atomic<T>* object, T desired, memory_order order) noexcept;

  template <class T>
  void atomic_store_explicit(atomic<T>* object, T desired, memory_order order) noexcept;
}
```
* atomic[link ./atomic.md]
* memory_order[link ./memory_order.md]

##概要
アトミックに値を書き込む


##効果
指定されたメモリオーダーにしたがって、`object`が指す値を`desired`でアトミックに置き換える。
この関数は、戻り値のない[`atomic_exchange()`](./atomic_exchange.md)と見なせる。


##戻り値
なし


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
  std::atomic<int> a(3);

  // 2を書き込む
  std::atomic_store_explicit(&a, 2, std::memory_order_release);

  std::cout << a.load() << std::endl;
}
```
* atomic_store_explicit[color ff0000]


###出力
```
2
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


