# LDBL_TRUE_MIN
* cfloat[meta header]
* macro[meta id-type]
* cpp17[meta cpp]
* [mathjax enable]

```cpp
#define LDBL_TRUE_MIN implementation-defined
```

## 概要
`long double` の正の最小値を表すマクロ。

このマクロは、非正規化数を含む、その環境での正の最小値を表すマクロである。非正規化数を表現できない、または非正規化数の有無を判定できない場合は、その型の最小正規化数以下の正数を表す。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<long double>::`[`denorm_min`](/reference/limits/numeric_limits/denorm_min.md)`()` と等しい。


## 備考
- 規格で 1E-37（$10^{-37}$）以下であることが規定されている。


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <cfloat>

int main()
{
  std::cout << std::setprecision(LDBL_DIG);

  std::cout << LDBL_HAS_SUBNORM << std::endl;
  std::cout << LDBL_MIN << std::endl;
  std::cout << LDBL_TRUE_MIN << std::endl;
}
```
* LDBL_TRUE_MIN[color ff0000]
* std::setprecision[link /reference/iomanip/setprecision.md]
* LDBL_DIG[link ldbl_dig.md]
* LDBL_HAS_SUBNORM[link ldbl_has_subnorm.md]
* LDBL_MIN[link ldbl_min.md]

## 出力例
```
1
3.36210314311209351e-4932
3.6451995318824746e-4951
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [WG14/N1378 `xxx_TRUE_MIN` macros for `<float.h>`](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1378.htm)
- [P0063R3 C++17 should refer to C11 instead of C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
