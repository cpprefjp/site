#UINT8_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define UINT8_MAX implementation-defined
```

##概要
[`uint8_t`](uint8_t.md) の最大値を表す定数。

ビット数8をNとして、このマクロの値は2<sup>N</sup> - 1である255となる。

その値の型は、[`uint8_t`](uint8_t.md)を整数昇格したものとなる。

なお、このマクロは [`uint8_t`](uint8_t.md) が定義されていない場合には定義されない。

##例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::cout << UINT8_MAX << std::endl;
}
```

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

