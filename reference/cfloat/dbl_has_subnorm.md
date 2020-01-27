# DBL_HAS_SUBNORM
* cfloat[meta header]
* macro[meta id-type]
* cpp17[meta cpp]

```cpp
# define DBL_HAS_SUBNORM implementation-defined
```

## 概要
`DBL_HAS_SUBNORM` は、`double`型における非�規化数のサポート状況を表すマク�である。

| 値   | 名前 | 非�規化数のサポート状況 |
|------|------|--------------------------|
| `-1` | indeterminable | 許可するか判定できない   |
| `0`  | absent         | 許可しない               |
| `1`  | present        | 許可する                 |

値`-1`は、浮動小数点操作が、非�規化数の表現をゼ�か非ゼ�かで一貫して解釈しない場合に、判定不能として表される。

値`0`は、型のフォーマットに非�規化数が含まれる場合でも、�規化されていない浮動小数点数の入力から結果として非�規化数を生成しない場合に、サポートされていないと判定される。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<double>::`[`has_denorm`](/reference/limits/numeric_limits/has_denorm.md)と�しい。


## 備考
- このマク�は、非�規化数を表現できる場合の、浮動小数点数の�の最小値を表す[`DBL_TRUE_MIN`](dbl_true_min.md)のために定義された


## 例
```cpp example
#include <iostream>
#include <cfloat>

int main()
{
  std::cout << FLT_HAS_SUBNORM << std::endl;
  std::cout << DBL_HAS_SUBNORM << std::endl;
  std::cout << LDBL_HAS_SUBNORM << std::endl;
}
```
* DBL_HAS_SUBNORM[color ff0000]
* FLT_HAS_SUBNORM[link flt_has_subnorm.md]
* LDBL_HAS_SUBNORM[link ldbl_has_subnorm.md]

### 出力例
```
1
1
1
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
