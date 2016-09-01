#DBL_MIN
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
#define DBL_MIN implementation-defined
```

##概要
`double` の正の正規化数のうち最小のものを表すマクロ。  
以下の式で表される。

$$
b^{e_{\rm min} - 1}
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$e_{\rm min}$ は指数の最小値（[`DBL_MIN_EXP`](dbl_min_exp.md)）である。  
$b$ や $e_{\rm min}$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<double>::`[`min`](/reference/limits/numeric_limits/min.md)`()` と等しい。


##備考
規格で 1E-37（$10^{-37}$）以下であることが規定されている。


##例
```cpp
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << std::setprecision(DBL_DIG);
  std::cout << DBL_MIN << '\n';

  // 以下の式と同一
  std::cout << std::pow(FLT_RADIX, DBL_MIN_EXP - 1) << '\n';
}
```
* <iostream>[link ../iostream.md]
* <iomanip>[link ../iomanip.md]
* <cfloat>[link ../cfloat.md]
* <cmath>[link ../cmath.md]
* cout[link ../iostream/cout.md]
* DBL_MIN[color ff0000]
* FLT_RADIX[link flt_radix.md]
* DBL_DIG[link dbl_dig.md]
* DBL_MIN_EXP[link dbl_min_exp.md]
* pow[link ../cmath/pow.md]

##出力例
```
2.2250738585072e-308
2.2250738585072e-308
```
