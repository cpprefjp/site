#logb
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float logb(float x);
  double logb(double x);
  long double logb(long double x);

  float logbf(float x);
  long double logbl(long double x);

  Integral logb(Integral);
}
```
* Integral[italic]

##概要
`logb`関数(log binary)は、浮動小数点数 `x` の指数部である符号あり整数を、浮動小数点形式で返す。


##戻り値
`x *` [`FLT_RADIX`](/reference/cfloat/flt_radix.md)<code><sup>logb(x)</sup></code>が範囲`[1, FLT_RADIX)`に収まるように指数を求めて返す。

`x`がゼロである場合、定義域エラーが発生する。その場合、プログラムは以下の状態になる:

- [`math_errhandling`](math_errhandling.md) `&` [`MATH_ERRNO`](math_errno.md.nolink)が非ゼロとなり、
- [`errno`](/reference/cerrno/errno.md)の値は[`EDOM`](/reference/cerrno.md)となり、
- [`math_errhandling`](math_errhandling.md) `&` [`MATH_ERREXCEPT`](math_errexcept.md.nolink)が非ゼロとなり、
- 浮動小数点例外として[invalid](/reference/cfenv/fe_invalid.md)が送出される


##例
```cpp
#include <iostream>
#include <cmath>

int main()
{
  double value = 48.0;
  double exp = std::logb(value);
  std::cout << exp << std::endl;
}
```
* std::logb[color ff0000]

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
