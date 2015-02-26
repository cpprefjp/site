#atomic_store (C++11)
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class T>
  void atomic_store(volatile atomic<T>* object, T desired) noexcept;

  template <class T>
  void atomic_store(atomic<T>* object, T desired) noexcept;
}
```
* atomic[link /reference/atomic/atomic.md]


##概要
アトミックに値を書き込む


##効果
[`memory_order_seq_cst`](./memory_order.md)のメモリオーダーにしたがって、`object`が指す値を`desired`でアトミックに置き換える。
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
  std::atomic_store(&a, 2);

  std::cout << a.load() << std::endl;
}
```
* atomic_store[color ff0000]


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
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照


