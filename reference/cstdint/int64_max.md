#INT64_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define INT64_MAX implementation-defined
```

##概要
[`int64_t`](int64_t.md) の最大値を表す定数。

ビット数64をNとして、このマクロの値は2<sup>N-1</sup> - 1である9223372036854775807となる。

その値の型は、[`int64_t`](int64_t.md)を整数昇格したものとなる。

なお、このマクロは [`int64_t`](int64_t.md) が定義されていない場合には定義されない。

##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::cout << INT64_MAX << std::endl;
}
```
* INT64_MAX[color ff0000]

###出力
```
9223372036854775807
```


##バージョン
###言語
- C++11

###処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0

