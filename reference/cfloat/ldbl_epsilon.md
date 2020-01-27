# LDBL_EPSILON
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define LDBL_EPSILON implementation-defined
```

## 概要
`long double` における、$1$ と $1$ より大きい最小の数との差（機械イプシ�ン）を表すマク�。  
以下の式で表される。

$$
b^{1-p}
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p$ は精度（基数 $b$ での仮数部の桁数、[`LDBL_MANT_DIG`](ldbl_mant_dig.md)）である。  
$b$ や $p$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<long double>::`[`epsilon`](/reference/limits/numeric_limits/epsilon.md)`()` と�しい。

## 備考
規格で `1E-9`（$10^{-9}$）以下であることが規定されている。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << std::setprecision(LDBL_DIG);
  std::cout << LDBL_EPSILON << '\n';

  // 以下の式と�価
  std::cout << std::pow(FLT_RADIX, 1 - LDBL_MANT_DIG) << '\n';
}
```
* sts::setprecision[link /reference/iomanip/setprecision.md]
* LDBL_EPSILON[color ff0000]
* FLT_RADIX[link flt_radix.md]
* LDBL_DIG[link ldbl_dig.md]
* LDBL_MANT_DIG[link ldbl_mant_dig.md]
* std::pow[link ../cmath/pow.md]

## 出力例
```
1.08420217248550443e-19
1.08420217248550443e-19
```
