# FLT_MIN
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define FLT_MIN implementation-defined
```

## 概要
`float` の�の�規化数のうち最小のものを表すマク�。  
以下の式で表される。

$$
b^{e_{\rm min} - 1}
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$e_{\rm min}$ は指数の最小値（[`FLT_MIN_EXP`](flt_min_exp.md)）である。  
$b$ や $e_{\rm min}$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<float>::`[`min`](/reference/limits/numeric_limits/min.md)`()` と�しい。


## 備考
規格で 1E-37（$10^{-37}$）以下であることが規定されている。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << std::setprecision(FLT_DIG);
  std::cout << FLT_MIN << '\n';

  // 以下の式と�価
  std::cout << std::pow((float)FLT_RADIX, (float)(FLT_MIN_EXP - 1)) << '\n';
}
```
* sts::setprecision[link /reference/iomanip/setprecision.md]
* FLT_MIN[color ff0000]
* FLT_RADIX[link flt_radix.md]
* FLT_DIG[link flt_dig.md]
* FLT_MIN_EXP[link flt_min_exp.md]
* std::pow[link ../cmath/pow.md]

## 出力例
```
1.17549e-38
1.17549e-38
```
