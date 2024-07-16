# FLT_HAS_SUBNORM
* cfloat[meta header]
* macro[meta id-type]
* cpp17[meta cpp]

```cpp
# define FLT_HAS_SUBNORM implementation-defined
```

## 概要
`FLT_HAS_SUBNORM` は、`float`型における非正規化数のサポート状況を表すマクロである。

| 値   | 名前 | 非正規化数のサポート状況 |
|------|------|--------------------------|
| `-1` | indeterminable | 許可するか判定できない   |
| `0`  | absent         | 許可しない               |
| `1`  | present        | 許可する                 |

値`-1`は、浮動小数点操作が、非正規化数の表現をゼロか非ゼロかで一貫して解釈しない場合に、判定不能として表される。

値`0`は、型のフォーマットに非正規化数が含まれる場合でも、正規化されていない浮動小数点数の入力から結果として非正規化数を生成しない場合に、サポートされていないと判定される。

[`std::numeric_limits`](/reference/limits/numeric_limits.md)`<float>::`[`has_denorm`](/reference/limits/numeric_limits/has_denorm.md)と等しい。


## 備考
- このマクロは、非正規化数を表現できる場合の、浮動小数点数の正の最小値を表す[`FLT_TRUE_MIN`](flt_true_min.md)のために定義された


## 例
```cpp example
#include <iostream>
#include <cfloat>

int main()
{
  std::cout << DBL_HAS_SUBNORM << std::endl;
  std::cout << FLT_HAS_SUBNORM << std::endl;
  std::cout << LDBL_HAS_SUBNORM << std::endl;
}
```
* FLT_HAS_SUBNORM[color ff0000]
* DBL_HAS_SUBNORM[link dbl_has_subnorm.md]
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
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [WG14/N1378 `xxx_TRUE_MIN` macros for `<float.h>`](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1378.htm)
- [P0063R3 C++17 should refer to C11 instead of C99](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0063r3.html)
- [P0175R1 Synopses for the C library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0175r1.html)
