# 機能テストマク�
* cpp11[meta cpp]

## 概要

SD-6 は C++11 の機能について以下のテストマク�を定義することを推奨している：

| マク�名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
| `__cpp_alias_templates`                   | `200704` | [エイリアステンプレート](alias_templates.md)     | predefined |
| `__cpp_attributes`                        | `200809` | [属性](attributes.md)                            | predefined |
| `__cpp_constexpr`                         | `200704` | [`constexpr`](constexpr.md)                      | predefined |
| `__cpp_decltype`                          | `200707` | [`decltype`](decltype.md)                        | predefined |
| `__cpp_delegating_constructors`           | `200604` | [移�コンストラクタ](delegating_constructors.md) | predefined |
| `__cpp_inheriting_constructors`           | `200802` | [継承コンストラクタ](inheriting_constructors.md) | predefined |
| `__cpp_initializer_lists`                 | `200806` | [初期化�リスト](initializer_lists.md)           | predefined |
| `__cpp_lambdas`                           | `200907` | [ラムダ式](lambda_expressions.md)                | predefined |
| `__cpp_nsdmi`                             | `200809` | [非静的データメンバ初期化�](non_static_data_member_initializers.md) | predefined |
| `__cpp_range_based_for`                   | `200907` | [範囲for文](range_based_for.md)                  | predefined |
| `__cpp_raw_strings`                       | `200710` | [生文�列リテラル](raw_string_literals.md)       | predefined |
| `__cpp_ref_qualifiers`                    | `200710` | [`*this` のムーブセマンティクス](ref_qualifier_for_this.md) | predefined |
| `__cpp_rvalue_references`                 | `200610` | [右辺値参照](rvalue_ref_and_move_semantics.md)   | predefined |
| `__cpp_static_assert`                     | `200410` | [コンパイル時アサート](static_assert.md)         | predefined |
| `__cpp_unicode_characters`                | `200704` | [ユニコード文�](char16_32.md)                   | predefined |
| `__cpp_unicode_literals`                  | `200710` | [ユニコードリテラル](char16_32.md)               | predefined |
| `__cpp_user_defined_literals`             | `200809` | [ユーザー定義リテラル](user_defined_literals.md) | predefined |
| `__cpp_variadic_templates`                | `200704` | [可変引数テンプレート](variadic_templates.md)    | predefined |
| `__has_cpp_attribute(carries_dependency)` | `200809` | [属性](attributes.md#carries_dependency)         | predefined |
| `__has_cpp_attribute(noreturn)`           | `200809` | [属性](attributes.md#noreturn)                   | predefined |

## 参照
- [SD-6: SG10 Feature Test Recommendations: Standard C++](https://isocpp.org/std/standing-documents/sd-6-sg10-feature-test-recommendations#recs.cpp11)
