#INT16_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define INT16_MAX implementation-defined
```
* implementation-defined[italic]

##概要
[`int16_t`](int16_t.md) の最大値を表す定数。

ビット数16をNとして、このマクロの値は2<sup>N-1</sup> - 1である32767となる。

その値の型は、[`int16_t`](int16_t.md)を整数昇格したものとなる。


##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::int16_t max_value = INT16_MAX;
  std::cout << static_cast<int>(max_value) << std::endl;
}
```
* std::int16_t[link int16_t.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]


###出力
```
32767
```


##バージョン
###言語
- C++11

###処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

