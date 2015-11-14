#LDBL_MAX
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
#define LDBL_MAX implementation-defined
```
* implementation-defined[italic]

##概要
`long double` の最大の有限値。  
以下の式で表される。

$$
(1-b^{-p})b^{e_{\rm max}}
$$

ここで、$b$ は指数表現の基数、$p$ は精度（基数 $b$ での仮数部の桁数）、$e_{\rm max}$ は指数の最大値である。  
$b$ や $p$、$e_{\rm max}$ については [`<cfloat>`](../cfloat.md) のモデルも参照。

`std::`[`numeric_limits`](/reference/limits/numeric_limits.md)`<long double>::`[`max`](/reference/limits/numeric_limits/max.md)`()` と等しい。


##備考
規格で 1E+37（$10^{37}$）以上であることが規定されている。


##例
```cpp
#include <iostream>
#include <cfloat>

int main()
{
  std::cout << LDBL_MAX << '\n';
}
```
* <iostream>[link ../iostream.md]
* <cfloat>[link ../cfloat.md]
* cout[link ../iostream/cout.md]
* LDBL_MAX[color ff0000]

##出力例
```
1.18973e+4932
```
