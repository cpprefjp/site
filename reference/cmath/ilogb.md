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

  int ilogbf(float x);
  int ilogbl(long double x);

  int ilogb(Integral);
}
```
* Integral[italic]

##概要
`ilogb`関数(integer log binary)は、浮動小数点数 `x` の指数部を `int` として返す。


##戻り値
[`logb`](logb.md)`(x)`の戻り値を`int`にキャストして返すことと同等。

`x` が 0 のときは [`FP_ILOGB0`](fp_ilogb0.md) を、無限大のときは [`INT_MAX`](/reference/climits/int_max.md) を、`NaN`のときは [`FP_ILOGBNAN`](fp_ilogbnan.md) を返す。そのとき、[`math_errhandling`](math_errhandling.md) `&` [`MATH_ERREXCEPT`](math_errexcept.md.nolink)が非ゼロとなり、浮動小数点例外として[invalid](/reference/cfenv/fe_invalid.md)が送出される。


##例
```cpp
#include <iostream>
#include <cmath>

int main()
{
  double value = 48.0;
  int exp = std::ilogb(value);
  std::cout << exp << std::endl;
}
```
* std::ilogb[color ff0000]

###出力
```
5
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
