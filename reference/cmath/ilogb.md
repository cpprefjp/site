#ilogb
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int ilogb(float);

  int ilogb(double);

  int ilogb(long double);

  int ilogb(Integral);
}
```
* Integral[italic]

##概要
`ilogb(x)` は浮動小数点数 `x` の指数部を `int` として返す。

`x` が 0 のときは [`FP_ILOGB0`](./fp_ilogb0.md) を、無限大のときは [`INT_MAX`](/reference/climits/int_max.md) を、`NaN`のときは [`FP_ILOGBNAN`](./fp_ilogbnan.md) を返す。


##バージョン
###言語
- C++11
