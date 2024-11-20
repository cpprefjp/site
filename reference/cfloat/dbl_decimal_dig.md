# DBL_DECIMAL_DIG
* cfloat[meta header]
* macro[meta id-type]
* cpp17[meta cpp]
* [mathjax enable]

```cpp
# define DBL_DECIMAL_DIG implementation-defined
```

## 概要
`double`型の数値を10進数で正確に表すのに必要な有効数字の桁数を表すマクロ。  
より正確には、`double`型のあらゆる数値を、$n$ 桁の10進数に変換し、また元に戻した場合に値が変わらないような最小の整数値 $n$ を表すマクロ。  
以下の式で表される。

$$
\left\{
\begin{array}{ll}
p \log_{10} b&\text{$b$ が $10$ の累乗の場合}\\
\lceil 1 + p \log_{10} b\rceil&\text{上記以外の場合}\\
\end{array}
\right.
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p$ は`double`型の精度（基数 $b$ での仮数部の桁数）である。  
$b$ や $p$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<double>::`[`max_digits10`](/reference/limits/numeric_limits/max_digits10.md) と等しい。

## 備考
- 規格で 10 以上であることが規定されている。
- 本マクロは `#if` プリプロセッサディレクティブに使用可能な定数式である。
- `DBL_DECIMAL_DIG` は DouBLe DECIMAL DIGits（decimal：10進数、digit：桁）に由来する。


## 例
```cpp example
#include <iostream>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << DBL_DECIMAL_DIG << '\n';

  // 以下の式と等価
  double log10b = std::log10(FLT_RADIX);
  double intpart;
  if (std::modf(log10b, &intpart) == 0.0) {
    std::cout << DBL_MANT_DIG * log10b << '\n';
  } else {
    std::cout << std::ceil(1 + DBL_MANT_DIG * log10b) << '\n';
  }
}
```
* DBL_DECIMAL_DIG[color ff0000]
* FLT_RADIX[link flt_radix.md]
* DBL_MANT_DIG[link ldbl_mant_dig.md]
* std::log10[link ../cmath/log10.md]
* std::ceil[link ../cmath/ceil.md]
* std::modf[link ../cmath/modf.md]

## 出力例
```
17
17
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.9 [mark verified]
- [GCC](/implementation.md#gcc): 9.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0063R3 C++17 should refer to C11 instead of C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
