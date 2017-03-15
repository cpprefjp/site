# DBL_MIN_10_EXP
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define DBL_MIN_10_EXP implementation-defined
```

## 概要
$10$ の $n$ 乗が `double` の正の正規化数であるような最小の負の整数値 $n$ を表すマクロ。  
以下の式で表される。

$$
\lceil\log_{10} DBL\_MIN\rceil = \lceil\log_{10} b^{e_{\rm min} - 1}\rceil
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$e_{\rm min}$ は指数の最小値（[`DBL_MIN_EXP`](dbl_min_exp.md)）である。  
$b$ や $e_{\rm min}$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<double>::`[`min_exponent10`](/reference/limits/numeric_limits/min_exponent10.md) と等しい。


## 備考
- 規格で -37 以下であることが規定されている。
- 本マクロは `#if` プリプロセッサディレクティブに使用可能な定数式である。
- `DBL_MIN_10_EXP` は DouBLe MINimum base-10 EXPonent（minimum：最小値、base-10：10を底とした、exponent：指数）に由来する。


## 例
```cpp
#include <iostream>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << DBL_MIN_10_EXP << '\n';

  // 以下の式と同一
  std::cout << std::ceil(std::log10(DBL_MIN)) << '\n';

  // 以下の式とも同一
  std::cout << std::ceil(std::log10(std::pow(FLT_RADIX, DBL_MIN_EXP - 1))) << '\n';
}
```
* DBL_MIN_10_EXP[color ff0000]
* FLT_RADIX[link flt_radix.md]
* DBL_MIN_EXP[link dbl_min_exp.md]
* DBL_MIN[link dbl_min.md]
* std::pow[link ../cmath/pow.md]
* std::log10[link ../cmath/log10.md]
* std::ceil[link ../cmath/ceil.md]

## 出力例
```
-307
-307
-307
```
