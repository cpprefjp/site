# DBL_DIG
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define DBL_DIG implementation-defined
```

## 概要
`double` で正確に表現可能な10進数の最大の桁数を表すマクロ。  
より正確には、$n$ 桁の10進数を `double` に変換し、また元に戻した場合に値が変わらないような $n$ のうち最大のもの。  
以下の式で表される。

$$
\left\{
\begin{array}{ll}
p \log_{10}b&\text{もし $b$ が $10$ の累乗の場合}\\
\lfloor (p - 1) \log_{10} b\rfloor&\text{上記以外の場合}\\
\end{array}
\right.
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p$ は精度（基数 $b$ での仮数部の桁数、[`DBL_MANT_DIG`](dbl_mant_dig.md)）である。  
$b$ や $p$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<double>::`[`digits10`](/reference/limits/numeric_limits/digits10.md) と等しい。

## 備考
- 規格で 10 以上であることが規定されている。
- 本マクロは `#if` プリプロセッサディレクティブに使用可能な定数式である。
- `DBL_DIG` は DouBLe DIGits（digit：桁）に由来する。


## 例
```cpp
#include <iostream>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << DBL_DIG << '\n';

  // 以下の式と同一
  double log10b = std::log10(FLT_RADIX);
  double intpart;
  if (std::modf(log10b, &intpart) == 0.0) {
    std::cout << DBL_MANT_DIG * log10b << '\n';
  } else {
    std::cout << std::floor((DBL_MANT_DIG - 1) * log10b) << '\n';
  }
}
```
* DBL_DIG[color ff0000]
* FLT_RADIX[link flt_radix.md]
* DBL_MANT_DIG[link dbl_mant_dig.md]
* std::log10[link ../cmath/log10.md]
* std::floor[link ../cmath/floor.md]
* std::modf[link ../cmath/modf.md]

## 出力例
```
15
15
```
