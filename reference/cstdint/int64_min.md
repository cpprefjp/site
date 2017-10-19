# INT64_MIN
* cstdint[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
# define INT64_MIN implementation-defined
```

## 概要
[`int64_t`](int64_t.md) の最小値。

ビット数64をNとして、このマクロの値は-(2<sup>N-1</sup>)である-9223372036854775808となる。

その値の型は、[`int64_t`](int64_t.md)を整数昇格したものとなる。

なお、このマクロは [`int64_t`](int64_t.md) が定義されていない場合には定義されない。

## 例
```cpp
#include <iostream>
#include <cstdint>

int main()
{
  std::cout << INT64_MIN << std::endl;
}
```
* INT64_MIN[color ff0000]

### 出力
```
-9223372036854775808
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang C++11 mode](/implementation.md#clang): 3.2
- [GCC, C++11 mode](/implementation.md#gcc): 4.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0

