```cpp
namespace std {

  template <class T>
  void atomic_store(volatile atomic<T>* object, T desired) noexcept;

  template <class T>
  void atomic_store(atomic<T>* object, T desired) noexcept;

}
```
* atomic[link https://sites.google.com/site/cpprefjp/reference/atomic/atomic]
* atomic[link https://sites.google.com/site/cpprefjp/reference/atomic/atomic]

##概要

<b>アトミックに値を書き込む</b>



##効果

[memory_order_seq_cst](https://sites.google.com/site/cpprefjp/reference/atomic/memory_order)のメモリオーダーにしたがって、`object`が指す値を`desired`でアトミックに置き換える。
この関数は、戻り値のない[`atomic_exchange`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic_exchange)()と見なせる。



##戻り値

なし


##例外

投げない


##備考
この関数は、特殊化された[`atomic`](https://sites.google.com/site/cpprefjp/reference/atomic/atomic)型に対して定義される。

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

```cpp
2
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


