#INT64_MIN
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define INT64_MIN (int64_t)-9223372036854775808LL
```
* int64_t[link int64_t.md]

##概要
[`int64_t`](int64_t.md) の最小値。

ビット数64をNとして、このマクロの値は-(2<sup>N-1</sup>)となる。


##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::int64_t min_value = INT64_MIN;
  std::cout << static_cast<long long>(min_value) << std::endl;
}
```
* std::int64_t[link int64_t.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]


###出力
```
-9223372036854775808
```


##バージョン
###言語
- C++11

###処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

