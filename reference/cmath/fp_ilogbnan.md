# FP_ILOGBNAN
* cmath[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define FP_ILOGBNAN integer-constant-expression
```
* integer-constant-expression[italic]

## 概要
`FP_ILOGBNAN` は、[`std::ilogb()`](ilogb.md) に `NaN` を渡したときの戻り値を表す整数定数式である。

[`INT_MIN`](/reference/climits/int_min.md) と [`INT_MAX`](/reference/climits/int_max.md) いずれかと等しい値でなければならない。


## バージョン
### 言語
- C++11
