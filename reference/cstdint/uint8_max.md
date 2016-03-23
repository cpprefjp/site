#UINT8_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define UINT8_MAX implementation-defined
```
* implementation-defined[italic]

##概要
[`uint8_t`](uint8_t.md) の最大値を表す定数。

ビット数8をNとして、このマクロの値は2<sup>N</sup> - 1である255となる。

その値の型は、[`uint8_t`](uint8_t.md)を整数昇格したものとなる。


##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::uint8_t max_value = UINT8_MAX;
  std::cout << static_cast<unsigned int>(max_value) << std::endl;
}
```
* std::uint8_t[link uint8_t.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]


###出力
```
255
```


##バージョン
###言語
- C++11

###処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

