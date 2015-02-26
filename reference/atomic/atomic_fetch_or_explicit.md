#atomic_fetch_or_explicit (C++11)
* atomic[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class T>
  T atomic_fetch_or_explicit(volatile atomic<T>* object, T operand, memory_order order) noexcept;

  template <class T>
  T atomic_fetch_or_explicit(atomic<T>* object, T operand, memory_order order) noexcept;
}
```
* atomic[link ./atomic.md]
* memory_order[link ./memory_order.md]

##概要
アトミックにOR演算を行う


##効果
`order`で指定されたメモリオーダーにしたがって、現在の値に`operand`をORした値でアトミックに置き換える


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
#include <bitset>

int main()
{
  int a = 0x0b;
  int b = 0x0e;

  std::atomic<int> x(a);

  std::atomic_fetch_or_explicit(&x, b, std::memory_order_seq_cst);

  std::cout << std::bitset<4>(a).to_string() << std::endl;
  std::cout << std::bitset<4>(b).to_string() << std::endl;
  std::cout << std::bitset<4>(x.load()).to_string() << std::endl;
}
```
* atomic_fetch_or_explicit[color ff0000]

###出力
```
1011
1110
1111
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


