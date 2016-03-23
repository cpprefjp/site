#UINT32_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define UINT32_MAX implementation-defined
```
* implementation-defined[italic]

##概要
[`uint32_t`](uint32_t.md) の最大値を表す定数。

ビット数32をNとして、このマクロの値は2<sup>N</sup> - 1である4294967295となる。

その値の型は、[`uint32_t`](uint32_t.md)を整数昇格したものとなる。

なお、このマクロは [`uint32_t`](uint32_t.md) が定義されていない場合には定義されない。

##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::uint32_t max_value = UINT32_MAX;
  std::cout << static_cast<unsigned long>(max_value) << std::endl;
}
```
* std::uint32_t[link uint32_t.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]


###出力
```
4294967295
```


##バージョン
###言語
- C++11

###処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

