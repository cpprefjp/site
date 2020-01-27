# INT32_MIN
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define INT32_MIN implementation-defined
```

## 概要
[`int32_t`](int32_t.md) の最小値を表す定数。

ビット数32をNとして、このマク�の値は-(2<sup>N-1</sup>)である-2147483648となる。

その値の型は、[`int32_t`](int32_t.md)を整数昇格したものとなる。

なお、このマク�は [`int32_t`](int32_t.md) が定義されていない場合には定義されない。

## 例
```cpp example
#include <iostream>
#include <cstdint>

int main()
{
  std::cout << INT32_MIN << std::endl;
}
```
* INT32_MIN[color ff0000]

### 出力
```
-2147483648
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015

