#DBL_EPSILON
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
#define DBL_EPSILON implementation-defined
```

##概要
`double` における、$1$ と $1$ より大きい最小の数との差（機械イプシロン）を表すマクロ。  
以下の式で表される。

$$
b^{1-p}
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p$ は精度（基数 $b$ での仮数部の桁数、[`DBL_MANT_DIG`](dbl_mant_dig.md)）である。  
$b$ や $p$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<double>::`[`epsilon`](/reference/limits/numeric_limits/epsilon.md)`()` と等しい。

##備考
規格で `1E-9`（$10^{-9}$）以下であることが規定されている。


##例
```cpp
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << std::setprecision(DBL_DIG);
  std::cout << DBL_EPSILON << '\n';

  // 以下の式と同一
  std::cout << std::pow(FLT_RADIX, 1 - DBL_MANT_DIG) << '\n';
}
```
* <iostream>[link ../iostream.md]
* <iomanip>[link ../iomanip.md]
* <cfloat>[link ../cfloat.md]
* <cmath>[link ../cmath.md]
* cout[link ../iostream/cout.md]
* DBL_EPSILON[color ff0000]
* FLT_RADIX[link flt_radix.md]
* DBL_DIG[link dbl_dig.md]
* DBL_MANT_DIG[link dbl_mant_dig.md]
* pow[link ../cmath/pow.md]

##出力例
```
2.22044604925031e-16
2.22044604925031e-16
```
