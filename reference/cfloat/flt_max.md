# FLT_MAX
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define FLT_MAX implementation-defined
```

## 概要
`float` の最大の有限値を表すマク�。  
以下の式で表される。

$$
(1-b^{-p})b^{e_{\rm max}}
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p$ は精度（基数 $b$ での仮数部の桁数、[`FLT_MANT_DIG`](flt_mant_dig.md)）、$e_{\rm max}$ は指数の最大値（[`FLT_MAX_EXP`](flt_max_exp.md)）である。  
$b$ や $p$、$e_{\rm max}$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<float>::`[`max`](/reference/limits/numeric_limits/max.md)`()` と�しい。


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
  std::cout << std::setprecision(FLT_DIG);
  std::cout << FLT_MAX << '\n';

  // 以下の式と�価（std::pow((float)FLT_RADIX, (float)FLT_MAX_EXP) は float の最大値を超えてしまうため、式を調整してある）
  std::cout << (1 - std::pow((float)FLT_RADIX, (float)-FLT_MANT_DIG)) * std::pow((float)FLT_RADIX, (float)(FLT_MAX_EXP - 1)) * FLT_RADIX << '\n';
}
```
* FLT_MAX[color ff0000]
* FLT_RADIX[link flt_radix.md]
* FLT_DIG[link flt_dig.md]
* FLT_MANT_DIG[link flt_mant_dig.md]
* FLT_MAX_EXP[link flt_max_exp.md]
* std::pow[link ../cmath/pow.md]

## 出力例
```
3.40282e+38
3.40282e+38
```
