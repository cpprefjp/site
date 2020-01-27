# FLT_MAX_10_EXP
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define FLT_MAX_10_EXP implementation-defined
```

## 概要
$10$ の $n$ 乗が `float` の有限の値として表現可能であるような最大の整数値 $n$ を表すマク�。
以下の式で表される。

$$
\lfloor\log_{10} FLT\_MAX \rfloor = \lfloor\log_{10} ((1-b^{-p})b^{e_{\rm max}})\rfloor
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p$ は精度（基数 $b$ での仮数部の桁数、[`FLT_MANT_DIG`](flt_mant_dig.md)）、$e_{\rm max}$ は指数の最大値（[`FLT_MAX_EXP`](flt_max_exp.md)）である。  
$b$ や $p$、$e_{\rm max}$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<float>::`[`max_exponent10`](/reference/limits/numeric_limits/max_exponent10.md) と�しい。


## 備考
- 規格で +37 以上であることが規定されている。
- 本マク�は `#if` プリプ�セッサディレクティブに使用可能な定数式である。
- `FLT_MAX_10_EXP` は FLoaT MAXimum base-10 EXPonent（maximum：最大値、base-10：10を底とした、exponent：指数）に由来する。


## 例
```cpp example
#include <iostream>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << FLT_MAX_10_EXP << '\n';

  // 以下の式と�価
  std::cout << std::floor(std::log10(FLT_MAX)) << '\n';

  // 以下の式とも�価（std::pow((float)FLT_RADIX, FLT_MAX_EXP) は float の最大値を超えてしまうため、式を調整してある）
  std::cout << std::floor(std::log10((1 - std::pow((float)FLT_RADIX, -FLT_MANT_DIG)) * std::pow((float)FLT_RADIX, FLT_MAX_EXP - 1) * FLT_RADIX)) << '\n';

  std::cout << std::boolalpha;

  // float の有限の値として表現可能
  float f1 = std::pow(10.0F, (float)FLT_MAX_10_EXP);
  std::cout << f1 << ", " << std::isfinite(f1) << '\n';

  // float の有限の値として表現不可能
  float f2 = std::pow(10.0F, (float)(FLT_MAX_10_EXP + 1));
  std::cout << f2 << ", " << std::isfinite(f2) << '\n';
}
```
* FLT_MAX_10_EXP[color ff0000]
* FLT_RADIX[link flt_radix.md]
* FLT_MANT_DIG[link flt_mant_dig.md]
* FLT_MAX_EXP[link flt_max_exp.md]
* FLT_MAX[link flt_max.md]
* std::pow[link ../cmath/pow.md]
* std::log10[link ../cmath/log10.md]
* std::floor[link ../cmath/floor.md]
* std::isfinite[link ../cmath/isfinite.md]

## 出力例
```
38
38
38
1e+38, true
inf, false
```
