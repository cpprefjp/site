#UINT16_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define UINT16_MAX (uint16_t)65535U
```
* uint16_t[link uint16_t.md]

##概要
[`uint16_t`](uint16_t.md) の最大値。

ビット数16をNとして、このマクロの値は2<sup>N</sup> - 1となる。


##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::uint16_t max_value = UINT16_MAX;
  std::cout << static_cast<unsigned int>(max_value) << std::endl;
}
```
* std::uint16_t[link uint16_t.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]


###出力
```
65535
```


##バージョン
###言語
- C++11

###処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

