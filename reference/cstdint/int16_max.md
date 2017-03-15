# INT16_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define INT16_MAX implementation-defined
```

## 概要
[`int16_t`](int16_t.md) の最大値を表す定数。

ビット数16をNとして、このマクロの値は2<sup>N-1</sup> - 1である32767となる。

その値の型は、[`int16_t`](int16_t.md)を整数昇格したものとなる。

なお、このマクロは [`int16_t`](int16_t.md) が定義されていない場合には定義されない。

## 例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::cout << INT16_MAX << std::endl;
}
```
* INT16_MAX[color ff0000]

### 出力
```
32767
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang C++11 mode](/implementation.md#clang): 3.3
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0
	- 11.0以降、値の型は`short`となっており、標準規格に合致していないことに注意。

