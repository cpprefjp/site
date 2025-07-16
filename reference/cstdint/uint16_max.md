# UINT16_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define UINT16_MAX implementation-defined
```

## 概要
[`uint16_t`](uint16_t.md) の最大値を表す定数。

ビット数16をNとして、このマクロの値は2<sup>N</sup> - 1である65535となる。

その値の型は、[`uint16_t`](uint16_t.md)を整数昇格したものとなる。

なお、このマクロは [`uint16_t`](uint16_t.md) が定義されていない場合には定義されない。

## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  std::cout << UINT16_MAX << std::endl;
}
```
* UINT16_MAX[color ff0000]

### 出力
```
65535
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.4 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
	- 2012以降、値の型は`unsigned short`となっており、標準規格に合致していないことに注意。
