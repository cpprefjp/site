# LDBL_MAX_EXP
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define LDBL_MAX_EXP implementation-defined
```

## 概要
[`FLT_RADIX`](flt_radix.md) の $n - 1$ 乗が、`long double` の有限の値として表現可能であるような、最大の整数値 $n$ を表すマクロ。  
[`<cfloat>`](../cfloat.md) のモデルにおける $e_{\rm max}$。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<long double>::`[`max_exponent`](/reference/limits/numeric_limits/max_exponent.md) と等しい。


## 備考
- 本マクロは `#if` プリプロセッサディレクティブに使用可能な定数式である。
- `LDBL_MAX_EXP` は Long DouBLe MAXimum EXPonent（maximum：最大値、exponent：指数）に由来する。


## 例
```cpp
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << LDBL_MAX_EXP << '\n';

  std::cout << std::setprecision(LDBL_DIG);

  // long double の有限の値として表現可能
  std::cout << std::pow((long double)FLT_RADIX, LDBL_MAX_EXP - 1) << '\n';

  // long double の有限の値として表現不可能
  std::cout << std::pow((long double)FLT_RADIX, LDBL_MAX_EXP) << '\n';
}
```
* sts::setprecision[link /reference/iomanip/setprecision.md]
* LDBL_MAX_EXP[color ff0000]
* FLT_RADIX[link flt_radix.md]
* LDBL_DIG[link ldbl_dig.md]
* std::pow[link ../cmath/pow.md]

## 出力例
```
16384
5.94865747678615883e+4931
inf
```
