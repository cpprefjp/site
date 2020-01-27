# UINT64_MAX
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define UINT64_MAX implementation-defined
```

## 概要
[`uint64_t`](uint64_t.md) の最大値を表す定数。

ビット数64をNとして、このマク�の値は2<sup>N</sup> - 1である18446744073709551615となる。

その値の型は、[`uint64_t`](uint64_t.md)を整数昇格したものとなる。

なお、このマク�は [`uint64_t`](uint64_t.md) が定義されていない場合には定義されない。

## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  std::cout << UINT64_MAX << std::endl;
}
```
* UINT64_MAX[color ff0000]

### 出力
```
18446744073709551615
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015

