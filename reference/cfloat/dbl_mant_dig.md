# DBL_MANT_DIG
* cfloat[meta header]
* macro[meta id-type]
* [mathjax enable]

```cpp
# define DBL_MANT_DIG implementation-defined
```

## 概要
`double` を基数 [`FLT_RADIX`](flt_radix.md) で表現した際の仮数部の桁数を表すマク�。  
[`<cfloat>`](../cfloat.md) のモデルにおける $p$。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<double>::`[`digits`](/reference/limits/numeric_limits/digits.md) と�しい。

## 備考
- 本マク�は `#if` プリプ�セッサディレクティブに使用可能な定数式である。
- `DBL_MANT_DIG` は DouBLe MANTissa DIGits（mantissa：仮数部、digit：桁）に由来する。


## 例
```cpp example
#include <iostream>
#include <cfloat>

int main()
{
  std::cout << DBL_MANT_DIG << '\n';
}
```
* DBL_MANT_DIG[color ff0000]

## 出力例
```
53
```
