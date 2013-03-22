```cpp
namespace std {

  template <class T>
  T atomic_fetch_xor(volatile atomic<T>* object, T operand) noexcept;

  template <class T>
  T atomic_fetch_xor(atomic<T>* object, T operand) noexcept;

}
```
* atomic[link /reference/atomic/atomic]

##概要

<b>アトミックにXOR演算を行う</b>


##効果

[memory_order_seq_cst](/reference/atomic/memory_order)のメモリオーダーにしたがって、現在の値に`operandを`XOR`した値`でアトミックに置き換える


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

  std::atomic_fetch_xor(&x, b);

  std::cout << std::bitset<4>(a).to_string() << std::endl;
  std::cout << std::bitset<4>(b).to_string() << std::endl;
  std::cout << std::bitset<4>(x.load()).to_string() << std::endl;
}
```
* atomic_fetch_xor[color ff0000]

###出力

```cpp
1011
1110
0101
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


