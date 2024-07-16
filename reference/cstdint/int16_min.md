# INT16_MIN
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define INT16_MIN implementation-defined
```

## 概要
[`int16_t`](int16_t.md) の最小値を表す定数。

ビット数16をNとして、このマクロの値は-(2<sup>N-1</sup>)である-32768となる。

その値の型は、[`int16_t`](int16_t.md)を整数昇格したものとなる。

なお、このマクロは [`int16_t`](int16_t.md) が定義されていない場合には定義されない。

## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  std::cout << INT16_MIN << std::endl;
}
```
* INT16_MIN[color ff0000]

### 出力
```
-32768
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.4 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]

