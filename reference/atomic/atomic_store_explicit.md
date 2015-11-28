#atomic_store_explicit
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  void atomic_store_explicit(volatile atomic<T>* object, T desired, memory_order order) noexcept;

  template <class T>
  void atomic_store_explicit(atomic<T>* object, T desired, memory_order order) noexcept;
}
```
* atomic[link atomic.md]
* memory_order[link memory_order.md]

##概要
アトミックに値を書き込む


##効果
指定されたメモリオーダーにしたがって、`object`が指す値を`desired`でアトミックに置き換える。
この関数は、戻り値のない[`atomic_exchange_explicit()`](atomic_exchange_explicit.md)と見なせる。


##戻り値
なし


##例外
投げない


##備考
この関数は、特殊化された[`atomic`](atomic.md)型に対して定義される。


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

- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照


