# FLT_EPSILON
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define FLT_EPSILON implementation-defined
```

## 概要
`float` における、$1$ と $1$ より大きい最小の数との差（機械イプシ�ン）を表すマク�。  
以下の式で表される。

$$
b^{1-p}
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p$ は精度（基数 $b$ での仮数部の桁数、[`FLT_MANT_DIG`](flt_mant_dig.md)）である。  
$b$ や $p$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<float>::`[`epsilon`](/reference/limits/numeric_limits/epsilon.md)`()` と�しい。

## 備考
規格で `1E-5`（$10^{-5}$）以下であることが規定されている。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << std::setprecision(FLT_DIG);
  std::cout << FLT_EPSILON << '\n';

  // 以下の式と�価
  std::cout << std::pow(FLT_RADIX, 1 - FLT_MANT_DIG) << '\n';
}
```
* sts::setprecision[link /reference/iomanip/setprecision.md]
* FLT_EPSILON[color ff0000]
* FLT_RADIX[link flt_radix.md]
* FLT_DIG[link flt_dig.md]
* FLT_MANT_DIG[link flt_mant_dig.md]
* std::pow[link ../cmath/pow.md]

## 出力例
```
1.19209e-07
1.19209e-07
```
