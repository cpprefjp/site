# int_least64_t
* cstdint[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  using int_least64_t = signed-integer-type;
}
```
* signed-integer-type[italic]

## 概要
64ビット以上の、最も小さい符号付き整数型。

[`int64_t`](int64_t.md)型が環境によっては定義されないため、そのような状況でこの型を使用する。

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0
