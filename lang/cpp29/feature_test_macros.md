# 機能テストマクロ
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

### ライブラリ

ライブラリの機能テストマクロは全て[`<version>`](/reference/version.md)でも提供される。

| マクロ名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
|`__cpp_lib_simd`|`202606L`|[`<simd>`](/reference/simd.md)に、SIMDデータ用の連番を生成する[`std::simd::iota`](/reference/simd/iota.md)変数テンプレートなどを追加|[`<simd>`](/reference/simd.md)|
|`__cpp_lib_simd_bitops`|`202607L`|[`<simd>`](/reference/simd.md)に、ビット列を操作する[`bit_reverse()`](/reference/simd/bit_reverse.md)・[`bit_repeat()`](/reference/simd/bit_repeat.md)・[`bit_compress()`](/reference/simd/bit_compress.md)・[`bit_expand()`](/reference/simd/bit_expand.md)関数と、未定義動作にならないシフト[`shl()`](/reference/simd/shl.md)・[`shr()`](/reference/simd/shr.md)関数を追加|[`<simd>`](/reference/simd.md)|


## 参照

- [SD-FeatureTest: Feature-Test Macros and Policies - isocpp](https://isocpp.org/std/standing-documents/sd-6-sg10-feature-test-recommendations)
