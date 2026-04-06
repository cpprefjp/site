# __STDC_ENDIAN_BIG__
* stdbit.h[meta header]
* macro[meta id-type]
* cpp26[meta cpp]

## 概要
ビッグエンディアンを表す定数マクロ。

C言語の`<stdbit.h>`で定義される定数であり、C++においてはC互換性のために提供される。

## 備考
- C言語では`<stdbit.h>`で定義される定数マクロである
- C++では、[`std::endian::big`](/reference/bit/endian.md)が対応する機能である

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::endian`](/reference/bit/endian.md) - C++標準のエンディアン列挙型

## 参照
- [N3022 Modern Bit Utilities](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3022.htm)
- [P3370R1 Add new C headers as C++ headers](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3370r1.html)
