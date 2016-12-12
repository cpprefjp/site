#LDBL_MIN_EXP
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
#define LDBL_MIN_EXP implementation-defined
```

##概要
[`FLT_RADIX`](flt_radix.md) の $n - 1$ 乗が、`long double` の正規化数として表現可能であるような、最小の整数値 $n$ を表すマクロ。  
[`<cfloat>`](../cfloat.md) のモデルにおける $e_{\rm min}$。

`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<long double>::`[`min_exponent`](/reference/limits/numeric_limits/min_exponent.md) と等しい。


##備考
- 本マクロは `#if` プリプロセッサディレクティブに使用可能な定数式である。
- `LDBL_MIN_EXP` は Long DouBLe MINimum EXPonent（minimum：最小値、exponent：指数）に由来する。


##例
```cpp
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << LDBL_MIN_EXP << '\n';

  std::cout << std::setprecision(LDBL_DIG) << std::boolalpha;

  // long double の正規化数として表現可能
  long double ld1 = std::pow((long double)FLT_RADIX, LDBL_MIN_EXP - 1);
  std::cout << ld1 << ", " << std::isnormal(ld1) << '\n';

  // long double の正規化数として表現不可能
  long double ld2 = std::pow((long double)FLT_RADIX, LDBL_MIN_EXP - 2);
  std::cout << ld2 << ", " << std::isnormal(ld2) << '\n';
}
```
* <iostream>[link ../iostream.md]
* <iomanip>[link ../iomanip.md]
* <cfloat>[link ../cfloat.md]
* <cmath>[link ../cmath.md]
* cout[link ../iostream/cout.md]
* setprecision[link ../iomanip/setprecision.md.nolink]
* boolalpha[link ../ios/boolalpha.md]
* LDBL_MIN_EXP[color ff0000]
* LDBL_DIG[link ldbl_dig.md]
* FLT_RADIX[link flt_radix.md]
* LDBL_MIN_EXP[link ldbl_min_exp.md]
* pow[link ../cmath/pow.md]
* isnormal[link ../cmath/isnormal.md]

##出力例
```
-16381
3.36210314311209351e-4932, true
1.68105157155604675e-4932, false
```
