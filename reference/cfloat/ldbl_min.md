# LDBL_MIN
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define LDBL_MIN implementation-defined
```

## 概要
`long double` の�の�規化数のうち最小のものを表すマク�。  
以下の式で表される。

$$
b^{e_{\rm min} - 1}
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$e_{\rm min}$ は指数の最小値（[`LDBL_MIN_EXP`](ldbl_min_exp.md)）である。  
$b$ や $e_{\rm min}$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<long double>::`[`min`](/reference/limits/numeric_limits/min.md)`()` と�しい。


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
  std::cout << std::setprecision(LDBL_DIG);
  std::cout << LDBL_MIN << '\n';

  // 以下の式と�価
  std::cout << std::pow((long double)FLT_RADIX, LDBL_MIN_EXP - 1) << '\n';
}
```
* sts::setprecision[link /reference/iomanip/setprecision.md]
* LDBL_MIN[color ff0000]
* FLT_RADIX[link flt_radix.md]
* LDBL_DIG[link ldbl_dig.md]
* LDBL_MIN_EXP[link ldbl_min_exp.md]
* std::pow[link ../cmath/pow.md]

## 出力例
```
2.2250738585072e-308
2.2250738585072e-308
```
