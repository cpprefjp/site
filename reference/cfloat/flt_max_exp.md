#FLT_MAX_EXP
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
#define FLT_MAX_EXP implementation-defined
```

##概要
[`FLT_RADIX`](flt_radix.md) の $n - 1$ 乗が、`float` の有限の値として表現可能であるような、最大の整数値 $n$ を表すマクロ。  
[`<cfloat>`](../cfloat.md) のモデルにおける $e_{\rm max}$。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<float>::`[`max_exponent`](/reference/limits/numeric_limits/max_exponent.md) と等しい。


##備考
- 本マクロは `#if` プリプロセッサディレクティブに使用可能な定数式である。
- `FLT_MAX_EXP` は FLoaT MAXimum EXPonent（maximum：最大値、exponent：指数）に由来する。


##例
```cpp
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << FLT_MAX_EXP << '\n';

  std::cout << std::setprecision(FLT_DIG);

  // float の有限の値として表現可能
  std::cout << std::pow((float)FLT_RADIX, (float)(FLT_MAX_EXP - 1)) << '\n';

  // float の有限の値として表現不可能
  std::cout << std::pow((float)FLT_RADIX, (float)FLT_MAX_EXP) << '\n';
}
```
* FLT_MAX_EXP[color ff0000]
* FLT_RADIX[link flt_radix.md]
* FLT_DIG[link flt_dig.md]
* std::pow[link ../cmath/pow.md]

##出力例
```
128
1.70141e+38
inf
```
