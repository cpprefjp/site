#UINT64_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define UINT64_MAX implementation-defined
```
* implementation-defined[italic]

##概要
[`uint64_t`](uint64_t.md) の最大値を表す定数。

ビット数64をNとして、このマクロの値は2<sup>N</sup> - 1である18446744073709551615となる。

その値の型は、[`uint64_t`](uint64_t.md)を整数昇格したものとなる。

なお、このマクロは [`uint64_t`](uint64_t.md) が定義されていない場合には定義されない。

##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::cout << UINT64_MAX << std::endl;
}
```
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]


###出力
```
18446744073709551615
```


##バージョン
###言語
- C++11

###処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

