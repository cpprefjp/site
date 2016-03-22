#INT8_MIN
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define INT8_MIN (int8_t)-128
```
* int8_t[link int8_t.md]

##概要
[`int8_t`](int8_t.md) の最大値。

ビット数8をNとして、このマクロの値は-(2<sup>N-1</sup>)となる。


##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::int8_t min_value = INT8_MIN;
  std::cout << static_cast<int>(min_value) << std::endl;
}
```
* std::int8_t[link int8_t.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]


###出力
```
-128
```


##バージョン
###言語
- C++11

###処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

