#atomic_fetch_sub
* atomic[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  T atomic_fetch_sub(volatile atomic<T>* object, T operand) noexcept;

  template <class T>
  T atomic_fetch_sub(atomic<T>* object, T operand) noexcept;
}
```
* atomic[link /reference/atomic/atomic.md]

##概要
アトミックに減算を行う


##効果
[`memory_order_seq_cst`](./memory_order.md)のメモリオーダーにしたがって、現在の値に`operand`を減算した値でアトミックに置き換える


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

  int before = std::atomic_fetch_sub(&x, 2);

  std::cout << before << std::endl;
  std::cout << x.load() << std::endl;
}
```
* atomic_fetch_sub[color ff0000]


###出力
```
3
1
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


