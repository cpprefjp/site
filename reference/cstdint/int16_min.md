#INT16_MIN
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define INT16_MIN implementation-defined
```
* implementation-defined[italic]

##概要
[`int16_t`](int16_t.md) の最小値を表す定数。

ビット数16をNとして、このマクロの値は-(2<sup>N-1</sup>)である-32768となる。

その値の型は、[`int16_t`](int16_t.md)を整数昇格したものとなる。

なお、このマクロは [`int16_t`](int16_t.md) が定義されていない場合には定義されない。

##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::int16_t min_value = INT16_MIN;
  std::cout << min_value + 0 << std::endl;
}
```
* std::int16_t[link int16_t.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]


###出力
```
-32768
```


##バージョン
###言語
- C++11

###処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

