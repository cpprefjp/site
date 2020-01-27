# INT8_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define INT8_MAX implementation-defined
```

## 概要
[`int8_t`](int8_t.md) の最大値を表す定数。

ビット数8をNとして、このマク�の値は2<sup>N-1</sup> - 1である127となる。

その値の型は、[`int8_t`](int8_t.md)を整数昇格したものとなる。

なお、このマク�は [`int8_t`](int8_t.md) が定義されていない場合には定義されない。

## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  std::cout << INT8_MAX << std::endl;
}
```
* INT8_MAX[color ff0000]


### 出力
```
127
```

Visual C++では、`static_cast<int>(INT8_MAX)`としないと、このとおりに出力されない。

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015
	- 2012以降、値の型は`char`となっており、標準規格に合致していないことに注意。

