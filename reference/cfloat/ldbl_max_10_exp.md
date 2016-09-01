#LDBL_MAX_10_EXP
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
#define LDBL_MAX_10_EXP implementation-defined
```

##概要
$10$ の $n$ 乗が `long double` の有限の値として表現可能であるような最大の整数値 $n$ を表すマクロ。  
以下の式で表される。

$$
\lfloor\log_{10} LDBL\_MAX\rfloor = \lfloor\log_{10} ((1-b^{-p})b^{e_{\rm max}})\rfloor
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p$ は精度（基数 $b$ での仮数部の桁数、[`LDBL_MANT_DIG`](ldbl_mant_dig.md)）、$e_{\rm max}$ は指数の最大値（[`LDBL_MAX_EXP`](ldbl_max_exp.md)）である。  
$b$ や $p$、$e_{\rm max}$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<long double>::`[`max_exponent10`](/reference/limits/numeric_limits/max_exponent10.md) と等しい。


##備考
- 規格で +37 以上であることが規定されている。
- 本マクロは `#if` プリプロセッサディレクティブに使用可能な定数式である。
- `DBL_MAX_10_EXP` は Long DouBLe MAXimum base-10 EXPonent（maximum：最大値、base-10：10を底とした、exponent：指数）に由来する。


##例
```cpp
#include <iostream>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << LDBL_MAX_10_EXP << '\n';

  // 以下の式と同一
  std::cout << std::floor(std::log10(LDBL_MAX)) << '\n';

  // 以下の式とも同一（std::pow((long double)FLT_RADIX, LDBL_MAX_EXP) は long double の最大値を超えてしまうため、式を調整してある）
  std::cout << std::floor(std::log10((1 - std::pow((long double)FLT_RADIX, -LDBL_MANT_DIG)) * std::pow((long double)FLT_RADIX, LDBL_MAX_EXP - 1) * FLT_RADIX)) << '\n';

  std::cout << std::boolalpha;

  // long double の有限の値として表現可能
  long double ld1 = std::pow(10.0L, LDBL_MAX_10_EXP);
  std::cout << ld1 << ", " << std::isfinite(ld1) << '\n';

  // long double の有限の値として表現不可能
  long double ld2 = std::pow(10.0L, LDBL_MAX_10_EXP + 1);
  std::cout << ld2 << ", " << std::isfinite(ld2) << '\n';
}
```
* <iostream>[link ../iostream.md]
* <cfloat>[link ../cfloat.md]
* <cmath>[link ../cmath.md]
* cout[link ../iostream/cout.md]
* boolalpha[link ../ios/boolalpha.md]
* LDBL_MAX_10_EXP[color ff0000]
* FLT_RADIX[link flt_radix.md]
* LDBL_MANT_DIG[link ldbl_mant_dig.md]
* LDBL_MAX_EXP[link ldbl_max_exp.md]
* LDBL_MAX[link ldbl_max.md]
* pow[link ../cmath/pow.md]
* log10[link ../cmath/log10.md]
* floor[link ../cmath/floor.md]
* isfinite[link ../cmath/isfinite.md.nolink]

##出力例
```
4932
4932
4932
1e+4932, true
inf, false
```
