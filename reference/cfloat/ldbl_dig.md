#LDBL_DIG
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
#define LDBL_DIG implementation-defined
```
* implementation-defined[italic]

##概要
`long double` で正確に表現可能な10進数の最大の桁数を表すマクロ。  
より正確には、$n$ 桁の10進数を `long double` に変換し、また元に戻した場合に値が変わらないような $n$ のうち最大のもの。  
以下の式で表される。

$$
\left\{
\begin{array}{ll}
p \log_{10}b&\text{もし $b$ が $10$ の累乗の場合}\\
\lfloor (p - 1) \log_{10} b\rfloor&\text{上記以外の場合}\\
\end{array}
\right.
$$

ここで、$b$ は指数表現の基数、$p$ は精度（基数 $b$ での仮数部の桁数）である。  
$b$ や $p$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<long double>::`[`digits10`](/reference/limits/numeric_limits/digits10.md) と等しい。

##備考
- 規格で 10 以上であることが規定されている。
- 本マクロは `#if` プリプロセッサディレクティブに使用可能な定数式である。
- `LDBL_DIG` は Long DouBLe DIGits（digit：桁）に由来する。


##例
```cpp
#include <iostream>
#include <cfloat>

int main()
{
  std::cout << LDBL_DIG << '\n';
}
```
* <iostream>[link ../iostream.md]
* <cfloat>[link ../cfloat.md]
* cout[link ../iostream/cout.md]
* LDBL_DIG[color ff0000]

##出力例
```
18
```
