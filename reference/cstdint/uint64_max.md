#UINT64_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define UINT64_MAX (uint64_t)18446744073709551615ULL
```
* uint64_t[link uint64_t.md]

##概要
[`uint64_t`](uint64_t.md) の最大値。

ビット数64をNとして、このマクロの値は2<sup>N</sup> - 1となる。


##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::uint64_t max_value = UINT64_MAX;
  std::cout << static_cast<unsigned long long>(max_value) << std::endl;
}
```
* std::uint64_t[link uint64_t.md]
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

