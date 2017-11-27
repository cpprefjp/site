# 十六進浮動小数点数リテラル
* cpp17[meta cpp]
* [mathjax enable]

## 概要

2を底とする、指数表記の十六進浮動小数点数リテラルがサポートされた。

## 仕様

```
十六進プレフィックス 仮数部 指数部 サフィックス
```

1. 十六進プレフィックス: `0[xX]`
    * `0x` または `0X`
1. 仮数部: `([0-9a-fA-F]*\.[0-9a-fA-F]+|[0-9a-fA-F]+\.?)`
    * 十六進整数部`.`十六進小数部
    * 十六進整数部`.`
    * `.`十六進小数部
    * 十六進整数
1. 指数部 (底2): `[pP][+-]?[0-9]+`
    1. `p` または `P`
    1. 符号 `+` または `-` (任意)
    1. 十進数
1. サフィックス: `[flFL]?`
    * `f`, `F`, `l`, `L` のいずれか (任意)
    * サフィックスを省略した場合は`double`型、`f`もしくは`F`を指定した場合は`float`型、`l`もしくは`L`を指定した場合は`long double`型となる

`0xSIGpEXP` は $(\text{SIG})\_{16} \times 2^{(\text{EXP})\_{10}}$ である。
たとえば `0xABCp-3` は十進数で $(10 \times 16^2 + 11 \times 16 + 12) \times 2^{-3} = 343.5$ である。

十六進浮動小数点数リテラルには [桁区切り文字](/lang/cpp14/digit_separators.md)を使用できる。

十六進表記で浮動小数点数を出力するには、
`std::ostream` では [`std::hexfloat`](/reference/ios/hexfloat.md)、
`std::printf` では `%a`/`%A` を用いる。

[`std::strtod`](/reference/string/stod.md) は十六進表記で浮動小数点数の入力を受け取る
(が実際には機能しない; 詳細は[備考](#notes-iostreams)参照)。


## 例
```cpp example
#include <iostream>

int main()
{
  std::cout << 0xABCp-3f << '\n';
  double dbl_min = 0x1.0p-1'022; // 1 * 2^-1022 (double の正の正規化数の最小値)
  std::cout << dbl_min << '\t' << std::hexfloat << dbl_min << '\n';
  return 0;
}
```
* std::hexfloat[link /reference/ios/hexfloat.md]

### 出力
```
343.5
2.22507e-308	0x1p-1022
```


## この機能が必要になった背景・経緯
十六進リテラルによってある浮動小数点数を正確に表現することができるようになった。

## 備考

### C
C99 で十六進浮動小数リテラルが採用された。

### <a name="notes-iostreams"></a>iostream の問題
[`std::strtod`](/reference/string/stod.md) は `pP` を認識しないため、十六進表記で浮動小数点数を受け取って適切に変換することができない
([LWG issue 2381](http://cplusplus.github.io/LWG/lwg-active.html#2381))。


## 参照

* [P00245R0 Hexadecimal floating literals for C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0245r0.html)
* [P00245R1 Hexadecimal floating literals for C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0245r1.html)
