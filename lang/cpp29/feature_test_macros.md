# 機能テストマクロ
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

### 言語

| マクロ名 | 値 | 機能 |
|----------|----|------|
|`__cpp_concepts`|`202606L`|[requires式の複合要件で条件付き`noexcept`指定を許可](conditional_noexcept_specifiers_in_compound_requirements.md)|
|`__cpp_contracts`|`202606L`|[仮想関数への事前条件・事後条件の指定を許可](contracts_for_virtual_functions.md)|
|`__cpp_pack_indexing`|`202606L`|[テンプレートテンプレートパラメータのパックへのインデックスアクセスを許可](pack_indexing_for_template_names.md)|


### ライブラリ

ライブラリの機能テストマクロは全て[`<version>`](/reference/version.md)でも提供される。

| マクロ名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
|`__cpp_lib_hazard_pointer`|`202606L`|[`<hazard_pointer>`](/reference/hazard_pointer.md)に、複数のハザードポインタをまとめて構築・破棄する[`std::make_hazard_pointer_batch()`](/reference/hazard_pointer/make_hazard_pointer_batch.md)関数と[`std::clear_hazard_pointer_batch()`](/reference/hazard_pointer/clear_hazard_pointer_batch.md)関数を追加|[`<hazard_pointer>`](/reference/hazard_pointer.md)|
|`__cpp_lib_simd`|`202606L`|[`<simd>`](/reference/simd.md)に、SIMDデータ用の連番を生成する[`std::simd::iota`](/reference/simd/iota.md)変数テンプレートなどを追加|[`<simd>`](/reference/simd.md)|
|`__cpp_lib_simd_bitops`|`202607L`|[`<simd>`](/reference/simd.md)に、ビット列を操作する[`bit_reverse()`](/reference/simd/bit_reverse.md)・[`bit_repeat()`](/reference/simd/bit_repeat.md)・[`bit_compress()`](/reference/simd/bit_compress.md)・[`bit_expand()`](/reference/simd/bit_expand.md)関数と、未定義動作にならないシフト[`shl()`](/reference/simd/shl.md)・[`shr()`](/reference/simd/shr.md)関数を追加|[`<simd>`](/reference/simd.md)|
|`__cpp_lib_to_chars`|`202606L`|[`std::to_chars()`](/reference/charconv/to_chars.md)の浮動小数点数に対する既定表現を、値の範囲によって固定小数表記と指数表記を選択するよう変更|[`<charconv>`](/reference/charconv.md)|
|`__cpp_lib_view_interface`|`202606L`|[`std::ranges::view_interface`](/reference/ranges/view_interface.md)に、範囲チェックをともなって要素へアクセスする[`at()`](/reference/ranges/view_interface/at.md)メンバ関数を追加|[`<ranges>`](/reference/ranges.md)|


## 参照

- [SD-FeatureTest: Feature-Test Macros and Policies - isocpp](https://isocpp.org/std/standing-documents/sd-6-sg10-feature-test-recommendations)
- [P3097R3 Contracts for C++: Virtual functions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3097r3.pdf)
    - C++29で`__cpp_contracts`が`202606L`に更新された
- [P3822R2 Conditional noexcept specifiers in compound requirements](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3822r2.html)
    - C++29で`__cpp_concepts`が`202606L`に更新された
- [P3670R4 Pack Indexing for Template Names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3670r4.pdf)
    - C++29で`__cpp_pack_indexing`が`202606L`に更新された
- [P3428R4 Hazard Pointer Batches](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3428r4.pdf)
    - C++29で`__cpp_lib_hazard_pointer`が`202606L`に更新された
- [P3319R6 Add an iota object for simd (and more)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3319r6.pdf)
    - C++29で`__cpp_lib_simd`が`202606L`に更新された
- [P3772R2 std::simd overloads for bit permutations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3772r2.html)
    - C++29で`__cpp_lib_simd_bitops`が追加された
- [P3793R2 Better shifting](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3793r2.html)
    - C++29で`__cpp_lib_simd_bitops`が追加された
- [P3505R4 Fix the default floating-point representation in `std::format`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3505r4.html)
    - C++29で`__cpp_lib_to_chars`が`202606L`に更新された
- [P3052R2 `view_interface::at()`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3052r2.html)
    - C++29で`__cpp_lib_view_interface`が追加された
