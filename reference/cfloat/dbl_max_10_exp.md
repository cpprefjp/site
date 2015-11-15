#DBL_MAX_10_EXP
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
#define DBL_MAX_10_EXP implementation-defined
```
* implementation-defined[italic]

##概要
$10$ の $n$ 乗が `double` の正の正規化数であるような最大の整数値 $n$ を表すマクロ。  
以下の式で表される。

$$
\lfloor\log_{10} DBL\_MAX \rfloor = \lfloor\log_{10} ((1-b^{-p})b^{e_{\rm max}})\rfloor
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p$ は精度（基数 $b$ での仮数部の桁数、[`DBL_MANT_DIG`](dbl_mant_dig.md)）、$e_{\rm max}$ は指数の最大値（[`DBL_MAX_EXP`](dbl_max_exp.md.nolink)）である。  
$b$ や $p$、$e_{\rm max}$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<double>::`[`max_exponent10`](/reference/limits/numeric_limits/max_exponent10.md) と等しい。


##備考
規格で +37 以上であることが規定されている。


##例
```cpp
#include <iostream>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << DBL_MAX_10_EXP << '\n';

  // 以下の式と同一
  std::cout << std::floor(std::log10(DBL_MAX)) << '\n';

  // 以下の式とも同一（std::pow(FLT_RADIX, DBL_MAX_EXP) は double の最大値を超えてしまうため、式を調整してある）
  std::cout << std::floor(std::log10((1 - std::pow(FLT_RADIX, -DBL_MANT_DIG)) * std::pow(FLT_RADIX, DBL_MAX_EXP - 1) * FLT_RADIX)) << '\n';
}
```
* <iostream>[link ../iostream.md]
* <cfloat>[link ../cfloat.md]
* <cmath>[link ../cmath.md]
* cout[link ../iostream/cout.md]
* DBL_MAX_10_EXP[color ff0000]
* FLT_RADIX[link flt_radix.md]
* DBL_MANT_DIG[link dbl_mant_dig.md]
* DBL_MAX_EXP[link dbl_max_exp.md.nolink]
* DBL_MAX[link dbl_max.md]
* pow[link ../cmath/pow.md]
* log10[link ../cmath/log10.md]
* floor[link ../cmath/floor.md.nolink]

##出力例
```
308
308
308
```
