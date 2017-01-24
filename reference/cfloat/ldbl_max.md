#LDBL_MAX
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
#define LDBL_MAX implementation-defined
```

##概要
`long double` の最大の有限値を表すマクロ。  
以下の式で表される。

$$
(1-b^{-p})b^{e_{\rm max}}
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p$ は精度（基数 $b$ での仮数部の桁数、[`LDBL_MANT_DIG`](ldbl_mant_dig.md)）、$e_{\rm max}$ は指数の最大値（[`LDBL_MAX_EXP`](ldbl_max_exp.md)）である。  
$b$ や $p$、$e_{\rm max}$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<long double>::`[`max`](/reference/limits/numeric_limits/max.md)`()` と等しい。


##備考
規格で 1E+37（$10^{37}$）以上であることが規定されている。


##例
```cpp
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << std::setprecision(LDBL_DIG);
  std::cout << LDBL_MAX << '\n';

  // 以下の式と同一（std::pow((long double)FLT_RADIX, LDBL_MAX_EXP) は long double の最大値を超えてしまうため、式を調整してある）
  std::cout << (1 - std::pow((long double)FLT_RADIX, -LDBL_MANT_DIG)) * std::pow((long double)FLT_RADIX, LDBL_MAX_EXP - 1) * FLT_RADIX << '\n';
}
```
* sts::setprecision[link /reference/iomanip/setprecision.md]
* LDBL_MAX[color ff0000]
* FLT_RADIX[link flt_radix.md]
* LDBL_DIG[link ldbl_dig.md]
* LDBL_MANT_DIG[link ldbl_mant_dig.md]
* LDBL_MAX_EXP[link ldbl_max_exp.md]
* std::pow[link ../cmath/pow.md]

##出力例
```
1.18973149535723177e+4932
1.18973149535723177e+4932
```
