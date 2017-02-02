#UINT32_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define UINT32_MAX implementation-defined
```

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
  std::cout << UINT32_MAX << std::endl;
}
```
* UINT32_MAX[color ff0000]

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
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0

