#INTPTR_MIN
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define INTPTR_MIN implementation-defined
```
* implementation-defined[italic]

##概要
[`intptr_t`](intptr_t.md) の最小値。

ビット数16をNとして、このマクロの値は-(2<sup>N-1</sup> - 1)以下となる。


##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::intptr_t min_value = INTPTR_MIN;
  std::cout << static_cast<long long>(min_value) << std::endl;
}
```
* std::intptr_t[link intptr_t.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]


###出力例
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

