# DBL_MAX_EXP
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define DBL_MAX_EXP implementation-defined
```

## 概要
[`FLT_RADIX`](flt_radix.md) の $n - 1$ 乗が、`double` の有限の値として表現可能であるような、最大の整数値 $n$ を表すマク�。  
[`<cfloat>`](../cfloat.md) のモデルにおける $e_{\rm max}$。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<double>::`[`max_exponent`](/reference/limits/numeric_limits/max_exponent.md) と�しい。


## 備考
- 本マク�は `#if` プリプ�セッサディレクティブに使用可能な定数式である。
- `DBL_MAX_EXP` は DouBLe MAXimum EXPonent（maximum：最大値、exponent：指数）に由来する。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << DBL_MAX_EXP << '\n';

  std::cout << std::setprecision(DBL_DIG);

  // double の有限の値として表現可能
  std::cout << std::pow(FLT_RADIX, DBL_MAX_EXP - 1) << '\n';

  // double の有限の値として表現不可能
  std::cout << std::pow(FLT_RADIX, DBL_MAX_EXP) << '\n';
}
```
* DBL_MAX_EXP[color ff0000]
* FLT_RADIX[link flt_radix.md]
* DBL_DIG[link dbl_dig.md]
* std::pow[link ../cmath/pow.md]

## 出力例
```
1024
8.98846567431158e+307
inf
```
