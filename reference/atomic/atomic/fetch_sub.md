#fetch_sub
```cpp
T fetch_sub(T operand, memory_order order = memory_order_seq_cst) volatile noexcept;
T fetch_sub(T operand, memory_order order = memory_order_seq_cst) noexcept;
```
* memory_order[link /reference/atomic/memory_order.md]
* memory_order_seq_cst[link /reference/atomic/memory_order.md]

##概要

<b>減算を行う</b>


##効果

`order`で指定されたメモリオーダーにしたがって、現在の値に`operandを減算した値`でアトミックに置き換える



##戻り値

変更前の値が返される


##備考

この関数は、`atomic`クラスの整数型およびポインタに対する特殊化で定義される。

符号付き整数型に対しては、2の補数表現による演算が行われ、未定義動作はない。アドレス型に関しては結果として未定義アドレスになる場合があるが、それ以外の未定義動作はない。



##例

```cpp
#include <iostream>
#include <atomic>

int main()
{
  std::atomic<int> x(3);

  int before = x.fetch_sub(2);

  std::cout << before << std::endl;
  std::cout << x.load() << std::endl;
}
```
* fetch_sub[color ff0000]

###出力

```cpp
3
1
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


