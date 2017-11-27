# DBL_MAX
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define DBL_MAX implementation-defined
```

## 概要
`double` の最大の有限値を表すマクロ。  
以下の式で表される。

$$
(1-b^{-p})b^{e_{\rm max}}
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p$ は精度（基数 $b$ での仮数部の桁数、[`DBL_MANT_DIG`](dbl_mant_dig.md)）、$e_{\rm max}$ は指数の最大値（[`DBL_MAX_EXP`](dbl_max_exp.md)）である。  
$b$ や $p$、$e_{\rm max}$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<double>::`[`max`](/reference/limits/numeric_limits/max.md)`()` と等しい。


## 備考
規格で 1E+37（$10^{37}$）以上であることが規定されている。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << std::setprecision(DBL_DIG);
  std::cout << DBL_MAX << '\n';

  // 以下の式と同一（std::pow(FLT_RADIX, DBL_MAX_EXP) は double の最大値を超えてしまうため、式を調整してある）
  std::cout << (1 - std::pow(FLT_RADIX, -DBL_MANT_DIG)) * std::pow(FLT_RADIX, DBL_MAX_EXP - 1) * FLT_RADIX << '\n';
}
```
* sts::setprecision[link /reference/iomanip/setprecision.md]
* DBL_MAX[color ff0000]
* FLT_RADIX[link flt_radix.md]
* DBL_DIG[link dbl_dig.md]
* DBL_MANT_DIG[link dbl_mant_dig.md]
* DBL_MAX_EXP[link dbl_max_exp.md]
* std::pow[link ../cmath/pow.md]

## 出力例
```
1.79769313486232e+308
1.79769313486232e+308
```
