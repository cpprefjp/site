#LDBL_MIN_10_EXP
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
#define LDBL_MIN_10_EXP implementation-defined
```
* implementation-defined[italic]

##概要
$10$ の $n$ 乗が `long double` の正の正規化数の最小値以上であるような最小の負の整数値 $n$ を表すマクロ。  
以下の式で表される。

$$
\lceil\log_{10} LDBL\_MIN\rceil = \lceil\log_{10} b^{e_{\rm min} - 1}\rceil
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$e_{\rm min}$ は指数の最小値（[`LDBL_MIN_EXP`](ldbl_min_exp.md.nolink)）である。  
$b$ や $e_{\rm min}$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<long double>::`[`min_exponent10`](/reference/limits/numeric_limits/min_exponent10.md) と等しい。


##備考
- 規格で -37 以下であることが規定されている。
- 本マクロは `#if` プリプロセッサディレクティブに使用可能な定数式である。
- `LDBL_MIN_10_EXP` は Long DouBLe MINimum base-10 EXPonent（minimum：最小値、base-10：10を底とした、exponent：指数）に由来する。


##例
```cpp
#include <iostream>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << LDBL_MIN_10_EXP << '\n';

  // 以下の式と同一
  std::cout << std::ceil(std::log10(LDBL_MIN)) << '\n';

  // 以下の式とも同一
  std::cout << std::ceil(std::log10(std::pow((long double)FLT_RADIX, LDBL_MIN_EXP - 1))) << '\n';
}
```
* <iostream>[link ../iostream.md]
* <cfloat>[link ../cfloat.md]
* <cmath>[link ../cmath.md]
* cout[link ../iostream/cout.md]
* LDBL_MIN_10_EXP[color ff0000]
* FLT_RADIX[link flt_radix.md]
* LDBL_MIN_EXP[link ldbl_min_exp.md.nolink]
* LDBL_MIN[link ldbl_min.md]
* pow[link ../cmath/pow.md]
* log10[link ../cmath/log10.md]
* ceil[link ../cmath/ceil.md.nolink]

##出力例
```
-4931
-4931
-4931
```
