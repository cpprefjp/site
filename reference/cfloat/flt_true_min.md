# FLT_TRUE_MIN
* cfloat[meta header]
* macro[meta id-type]
* cpp17[meta cpp]
* [mathjax enable]

```cpp
# define FLT_TRUE_MIN implementation-defined
```

## 概要
`float` の�の最小値を表すマク�。

このマク�は、非�規化数を含む、その環境での�の最小値を表すマク�である。非�規化数を表現できない、または非�規化数の有無を判定できない場合は、その型の最小�規化数以下の�数を表す。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<float>::`[`denorm_min`](/reference/limits/numeric_limits/denorm_min.md)`()` と�しい。


## 備考
- 規格で 1E-37（$10^{-37}$）以下であることが規定されている。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <cfloat>

int main()
{
  std::cout << std::setprecision(FLT_DIG);

  std::cout << FLT_HAS_SUBNORM << std::endl;
  std::cout << FLT_MIN << std::endl;
  std::cout << FLT_TRUE_MIN << std::endl;
}
```
* FLT_TRUE_MIN[color ff0000]
* sts::setprecision[link /reference/iomanip/setprecision.md]
* FLT_DIG[link flt_dig.md]
* FLT_HAS_SUBNORM[link flt_has_subnorm.md]
* FLT_MIN[link flt_min.md]

## 出力例
```
1
1.17549e-38
1.4013e-45
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): (9.1時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [WG14/N1378 `xxx_TRUE_MIN` macros for `<float.h>`](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1378.htm)
- [P0063R3 C++17 should refer to C11 instead of C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
