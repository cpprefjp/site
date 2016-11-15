#ldexp
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  float ldexp(float x, int exp);
  double ldexp(double x, int exp);
  long double ldexp(long double x, int exp);

  float ldexpf(float x, int exp);
  long double ldexpl(long double x, int exp);

  Integral ldexp(Integral value, int exp);
}
```
* Integral[italic]

##概要
`ldexp`関数 (load exponent)は、`x`に2の`exp`乗を掛けた値を計算する。


##戻り値
`x * 2`<sup>exp</sup>

- 結果値が大きすぎる場合、値域エラーが発生する。その場合、プログラムは以下の状態になる:

- [`math_errhandling`](math_errhandling.md) `&` [`MATH_ERRNO`](math_errno.md.nolink)が非ゼロとなり、
- [`errno`](/reference/cerrno/errno.md)の値は[`ERANGE`](/reference/cerrno.md)となり、
- [`math_errhandling`](math_errhandling.md) `&` [`MATH_ERREXCEPT`](math_errexcept.md.nolink)が非ゼロとなり、
- 浮動小数点例外として[overflow](/reference/cfenv/fe_overflow.md)が送出される
- 戻り値として、
    - パラメータ`x`の型が`double`であれば[`HUGE_VAL`](huge_val.md)
    - パラメータ`x`の型が`float`であれば[`HUGE_VALF`](huge_valf.md)
    - パラメータ`x`の型が`long double`であれば[`HUGE_VALL`](huge_vall.md)が返る


##例
```cpp
#include <iostream>
#include <iomanip>
#include <cmath>

int main()
{
  // 3.0 * (2^4)
  double result = std::ldexp(3.0, 4);
  std::cout << result << std::endl;

  // 円周率
  double pi = std::ldexp(std::acos(0.0), 1);
  std::cout << std::setprecision(8) << pi << std::endl;
}
```
* std::ldexp[color ff0000]
* std::acos[link acos.md]
* std::setprecision[link /reference/iomanip/setprecision.md]

###出力
```
48
3.1415927
```

###備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##実装例
```cpp
namespace std {
  double ldexp(double x, int exp)
  {
    return x * std::pow(2.0, exp);
  }

  float ldexp(float x, int exp)
  {
    return x * std::pow(2.0f, exp);
  }

  long double ldexp(long double x, int exp)
  {
    return x * std::pow(2.0L, exp);
  }
}
```
* std::pow[link pow.md]
