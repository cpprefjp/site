# DECIMAL_DIG
* cfloat[meta header]
* macro[meta id-type]
* cpp11[meta cpp]
* cpp26deprecated[meta cpp]
* [mathjax enable]

```cpp
#define DECIMAL_DIG implementation-defined
```

このマクロは、C++26で非推奨となった。型ごとの桁数を示す[`FLT_DECIMAL_DIG`](flt_decimal_dig.md)・[`DBL_DECIMAL_DIG`](dbl_decimal_dig.md)・[`LDBL_DECIMAL_DIG`](ldbl_decimal_dig.md)を使用すること。


## 概要
精度が一番高い浮動小数点型の数値を10進数で正確に表すのに必要な有効数字の桁数を表すマクロ。  
より正確には、精度が一番高い浮動小数点型のあらゆる数値を、$n$ 桁の10進数に変換し、また元に戻した場合に値が変わらないような最小の整数値 $n$ を表すマクロ。  
以下の式で表される。

$$
\left\{
\begin{array}{ll}
p_{\rm max} \log_{10} b&\text{$b$ が $10$ の累乗の場合}\\
\lceil 1 + p_{\rm max}\log_{10} b\rceil&\text{上記以外の場合}\\
\end{array}
\right.
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p_{\rm max}$ は精度が一番高い浮動小数点型の精度（基数 $b$ での仮数部の桁数）である。  
$b$ や $p$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

`T` を精度が一番高い浮動小数点型とすると、[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<T>::`[`max_digits10`](/reference/limits/numeric_limits/max_digits10.md) と等しい。

## 備考
- 規格で 10 以上であることが規定されている。
- 本マクロは `#if` プリプロセッサディレクティブに使用可能な定数式である。
- `DECIMAL_DIG` は DECIMAL DIGits（decimal：10進数、digit：桁）に由来する。
- 各型毎の桁数を示すマクロも定義されている
    - [`DBL_DECIMAL_DIG`](dbl_decimal_dig.md)
    - [`FLT_DECIMAL_DIG`](flt_decimal_dig.md)
    - [`LDBL_DECIMAL_DIG`](ldbl_decimal_dig.md)


## 非推奨・削除の詳細
C言語側で対応するマクロが非推奨となったため、C++側でも非推奨とする。

このマクロは、精度が一番高い浮動小数点型のみを対象とする値であり、実質的に[`LDBL_DECIMAL_DIG`](ldbl_decimal_dig.md)と同じものであった。型ごとに必要な桁数は異なるため、すべての浮動小数点型に対して単一の値を使用するこのマクロよりも、型ごとの桁数を表す以下のマクロを使用するほうが正確である：

- [`FLT_DECIMAL_DIG`](flt_decimal_dig.md) (`float`用)
- [`DBL_DECIMAL_DIG`](dbl_decimal_dig.md) (`double`用)
- [`LDBL_DECIMAL_DIG`](ldbl_decimal_dig.md) (`long double`用)


## 例
```cpp example
#include <iostream>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << DECIMAL_DIG << '\n';

  // 精度が一番高い浮動小数点型が long double の場合、以下の式と等価
  long double log10b = std::log10(FLT_RADIX);
  long double intpart;
  if (std::modf(log10b, &intpart) == 0.0) {
    std::cout << LDBL_MANT_DIG * log10b << '\n';
  } else {
    std::cout << std::ceil(1 + LDBL_MANT_DIG * log10b) << '\n';
  }
}
```
* DECIMAL_DIG[color ff0000]
* FLT_RADIX[link flt_radix.md]
* LDBL_MANT_DIG[link ldbl_mant_dig.md]
* std::log10[link ../cmath/log10.md]
* std::ceil[link ../cmath/ceil.md]
* std::modf[link ../cmath/modf.md]

## 出力例
```
21
21
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2013 [mark verified], 2015 [mark verified]
	- 2013は、正しく実装されていない。C++11での最低値である10と定義されている。しかし、`double`および`long double`がIEEE 754倍精度で実装されているため、少なくとも17以上でなければならない。
	- 2015は、正しく17と定義されている。


## 参照
- [P3348R4 C++26 should refer to C23 not C17](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3348r4.html)
    - C++26がC23を参照するようになり、このマクロが非推奨となった
