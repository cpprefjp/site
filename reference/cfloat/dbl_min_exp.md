# DBL_MIN_EXP
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define DBL_MIN_EXP implementation-defined
```

## 概要
[`FLT_RADIX`](flt_radix.md) の $n - 1$ 乗が、`double` の�規化数として表現可能であるような、最小の整数値 $n$ を表すマク�。  
[`<cfloat>`](../cfloat.md) のモデルにおける $e_{\rm min}$。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<double>::`[`min_exponent`](/reference/limits/numeric_limits/min_exponent.md) と�しい。


## 備考
- 本マク�は `#if` プリプ�セッサディレクティブに使用可能な定数式である。
- `DBL_MIN_EXP` は DouBLe MINimum EXPonent（minimum：最小値、exponent：指数）に由来する。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << DBL_MIN_EXP << '\n';

  std::cout << std::setprecision(DBL_DIG) << std::boolalpha;

  // double の�規化数として表現可能
  double d1 = std::pow(FLT_RADIX, DBL_MIN_EXP - 1);
  std::cout << d1 << ", " << std::isnormal(d1) << '\n';

  // double の�規化数として表現不可能
  double d2 = std::pow(FLT_RADIX, DBL_MIN_EXP - 2);
  std::cout << d2 << ", " << std::isnormal(d2) << '\n';
}
```
* std::setprecision[link ../iomanip/setprecision.md]
* DBL_MIN_EXP[color ff0000]
* DBL_DIG[link dbl_dig.md]
* FLT_RADIX[link flt_radix.md]
* DBL_MIN_EXP[link dbl_min_exp.md]
* std::pow[link ../cmath/pow.md]
* std::isnormal[link ../cmath/isnormal.md]

## 出力例
```
-1021
2.2250738585072e-308, true
1.1125369292536e-308, false
```
