```cpp
namespace std {

  template <class T>
  T atomic_fetch_add(volatile atomic<T>* object, T operand) noexcept;
```
* atomic[link /reference/atomic/atomic]

  template <class T>
  T atomic_fetch_add([atomic](/reference/atomic/atomic)<T>* object, T operand) noexcept;
}




##概要

<b>アトミックに値を加算する</b>


##効果

[memory_order_seq_cst](/reference/atomic/memory_order)のメモリオーダーにしたがって、現在の値に`operandを加算した値`でアトミックに置き換える



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

  int before = std::atomic_fetch_add(&x, 2);

  std::cout << before << std::endl;
  std::cout << x.load() << std::endl;
}
```
* atomic_fetch_add[color ff0000]

###出力

```cpp
3
5
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang): ??
- [GCC](/implementation#gcc): 
- [GCC, C++0x mode](/implementation#gcc): 4.7.0
- [ICC](/implementation#icc): ??
- [Visual C++](/implementation#visual_cpp) ??



##参照


