#FLT_EPSILON
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
#define FLT_EPSILON implementation-defined
```
* implementation-defined[italic]

##概要
`float` における、$1$ と $1$ より大きい最小の数との差（機械イプシロン）を表すマクロ。  
以下の式で表される。

$$
b^{1-p}
$$

ここで、$b$ は指数表現の基数、$p$ は精度（基数 $b$ での仮数部の桁数）である。  
$b$ や $p$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<float>::`[`epsilon`](/reference/limits/numeric_limits/epsilon.md)`()` と等しい。

##備考
規格で `1E-6`（$10^{-6}$）以下であることが規定されている。
