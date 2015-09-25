#atomic_fetch_add_explicit
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  T atomic_fetch_add_explicit(volatile atomic<T>* object, T operand, memory_order order) noexcept;

  template <class T>
  T atomic_fetch_add_explicit(atomic<T>* object, T operand, memory_order order) noexcept;
}
```
* atomic[link ./atomic.md]
* memory_order[link ./memory_order.md]

##概要
アトミックに加算を行う


##効果
`order`で指定されたメモリオーダーにしたがって、現在の値に`operand`を加算した値でアトミックに置き換える


##戻り値
変更前の値が返される


##例外
投げない


##備考
符号付き整数型に対しては、2の補数表現による演算が行われ、未定義動作はない。アドレス型に関しては結果として未定義アドレスになる場合があるが、それ以外の未定義動作はない。


##例
```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  int before = std::atomic_fetch_add_explicit(&x, 2, std::memory_order_seq_cst);

  std::cout << before << std::endl;
  std::cout << x.load() << std::endl;
}
```
* atomic_fetch_add_explicit[color ff0000]


###出力
```
3
5
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


