# INT8_MIN
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define INT8_MIN implementation-defined
```

## 概要
[`int8_t`](int8_t.md) の最小値を表す定数。

ビット数8をNとして、このマクロの値は-(2<sup>N-1</sup>)である-128となる。

その値の型は、[`int8_t`](int8_t.md)を整数昇格したものとなる。

なお、このマクロは [`int8_t`](int8_t.md) が定義されていない場合には定義されない。

## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  std::cout << INT8_MIN << std::endl;
}
```
* INT8_MIN[color ff0000]

### 出力
```
-128
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.4 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]
