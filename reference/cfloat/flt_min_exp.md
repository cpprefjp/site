# FLT_MIN_EXP
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define FLT_MIN_EXP implementation-defined
```

## 概要
[`FLT_RADIX`](flt_radix.md) の $n - 1$ 乗が、`float` の�規化数として表現可能であるような、最小の整数値 $n$ を表すマク�。  
[`<cfloat>`](../cfloat.md) のモデルにおける $e_{\rm min}$。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<float>::`[`min_exponent`](/reference/limits/numeric_limits/min_exponent.md) と�しい。


## 備考
- 本マク�は `#if` プリプ�セッサディレクティブに使用可能な定数式である。
- `FLT_MIN_EXP` は FLoaT MINimum EXPonent（minimum：最小値、exponent：指数）に由来する。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << FLT_MIN_EXP << '\n';

  std::cout << std::setprecision(FLT_DIG) << std::boolalpha;

  // float の�規化数として表現可能
  float f1 = std::pow((float)FLT_RADIX, (float)(FLT_MIN_EXP - 1));
  std::cout << f1 << ", " << std::isnormal(f1) << '\n';

  // float の�規化数として表現不可能
  float f2 = std::pow((float)FLT_RADIX, (float)(FLT_MIN_EXP - 2));
  std::cout << f2 << ", " << std::isnormal(f2) << '\n';
}
```
* std::setprecision[link ../iomanip/setprecision.md]
* FLT_MIN_EXP[color ff0000]
* FLT_DIG[link flt_dig.md]
* FLT_RADIX[link flt_radix.md]
* FLT_MIN_EXP[link flt_min_exp.md]
* std::pow[link ../cmath/pow.md]
* std::isnormal[link ../cmath/isnormal.md]

## 出力例
```
-125
1.17549e-38, true
5.87747e-39, false
```
