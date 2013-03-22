```cpp
T fetch_and(T operand, memory_order order = memory_order_seq_cst) volatile noexcept;
T fetch_and(T operand, memory_order order = memory_order_seq_cst) noexcept;
```
* memory_order[link /reference/atomic/memory_order]
* memory_order_seq_cst[link /reference/atomic/memory_order]

##概要

<b>AND演算を行う</b>


##効果

`order`で指定されたメモリオーダーにしたがって、現在の値に`operandをANDした値`でアトミックに置き換える



##戻り値

変更前の値が返される



##例外

投げない



##備考

この関数は、`atomic`クラスの整数型に対する特殊化で定義される。

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

  x.fetch_and(b);

  std::cout << std::bitset<4>(a).to_string() << std::endl;
  std::cout << std::bitset<4>(b).to_string() << std::endl;
  std::cout << std::bitset<4>(x.load()).to_string() << std::endl;
}
```
* fetch_and[color ff0000]

###出力

```cpp
1011
1110
1010
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang): ??
- [GCC](/implementation#gcc): ??
- [GCC, C++0x mode](/implementation#gcc): 4.7.0
- [ICC](/implementation#icc): ??
- [Visual C++](/implementation#visual_cpp) ??



##参照


