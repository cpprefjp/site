#INT8_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define INT8_MAX implementation-defined
```

##概要
[`int8_t`](int8_t.md) の最大値を表す定数。

ビット数8をNとして、このマクロの値は2<sup>N-1</sup> - 1である127となる。

その値の型は、[`int8_t`](int8_t.md)を整数昇格したものとなる。

なお、このマクロは [`int8_t`](int8_t.md) が定義されていない場合には定義されない。

##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::cout << INT8_MAX << std::endl;
}
```
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]


###出力
```
127
```

Visual C++では、`static_cast<int>(INT8_MAX)`としないと、このとおりに出力されない。

##バージョン
###言語
- C++11

###処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0
	- 11.0以降、値の型は`char`となっており、標準規格に合致していないことに注意。

