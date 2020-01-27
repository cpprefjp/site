# FLT_DECIMAL_DIG
* cfloat[meta header]
* macro[meta id-type]
* cpp17[meta cpp]
* [mathjax enable]

```cpp
# define FLT_DECIMAL_DIG implementation-defined
```

## 概要
`float`型の数値を10進数で�確に表すのに必要な有効数�の桁数を表すマク�。  
より�確には、`float`型のあらゆる数値を、$n$ 桁の10進数に変換し、また元に戻した場合に値が変わらないような最小の整数値 $n$ を表すマク�。  
以下の式で表される。

$$
\left\{
\begin{array}{ll}
p \log_{10} b&\text{$b$ が $10$ の累乗の場合}\\
\lceil 1 + p \log_{10} b\rceil&\text{上記以外の場合}\\
\end{array}
\right.
$$

ここで、$b$ は指数表現の基数（[`FLT_RADIX`](flt_radix.md)）、$p$ は`float`型の精度（基数 $b$ での仮数部の桁数）である。  
$b$ や $p$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<float>::`[`max_digits10`](/reference/limits/numeric_limits/max_digits10.md) と�しい。

## 備考
- 規格で 6 以上であることが規定されている。
- 本マク�は `#if` プリプ�セッサディレクティブに使用可能な定数式である。
- `FLT_DECIMAL_DIG` は FLoaT DECIMAL DIGits（decimal：10進数、digit：桁）に由来する。


## 例
```cpp example
#include <iostream>
#include <cfloat>
#include <cmath>

int main()
{
  std::cout << FLT_DECIMAL_DIG << '\n';

  // 以下の式と�価
  float log10b = std::log10(FLT_RADIX);
  float intpart;
  if (std::modf(log10b, &intpart) == 0.0) {
    std::cout << FLT_MANT_DIG * log10b << '\n';
  } else {
    std::cout << std::ceil(1 + FLT_MANT_DIG * log10b) << '\n';
  }
}
```
* FLT_DECIMAL_DIG[color ff0000]
* FLT_RADIX[link flt_radix.md]
* FLT_MANT_DIG[link ldbl_mant_dig.md]
* std::log10[link ../cmath/log10.md]
* std::ceil[link ../cmath/ceil.md]
* std::modf[link ../cmath/modf.md]

## 出力例
```
9
9
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 3.9
- [GCC](/implementation.md#gcc): (9.1時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0063R3 C++17 should refer to C11 instead of C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
