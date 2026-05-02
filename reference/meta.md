# meta
* meta[meta header]
* cpp26[meta cpp]

`<meta>`ヘッダでは、[静的リフレクション](/lang/cpp26/reflection.md)のためのメタ関数群を定義する。リフレクション演算子`^^`で取得した[`std::meta::info`](meta/info.md)型の値を操作・検査するための機能を提供する。

このヘッダのすべての関数は`consteval`であり、コンパイル時にのみ使用できる。


## リフレクション型

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`info`](meta/info.md) | リフレクションを表す型 (`using info = decltype(^^::);`) | C++26 |


## コンセプト

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`reflection_range`](meta/reflection_range.md) | 要素型が`info`であるRange (concept) | C++26 |


## アクセス制御

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`access_context`](meta/access_context.md) | メンバ取得時のアクセス制御コンテキスト (class) | C++26 |


## 演算子

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`operators`](meta/operators.md) | 演算子の種類を表す列挙型 (enum class) | C++26 |
| [`operator_of`](meta/operator_of.md) | 演算子のリフレクションから演算子の種類を取得 | C++26 |
| [`symbol_of`](meta/symbol_of.md) | 演算子の種類から記号文字列を取得 | C++26 |
| [`u8symbol_of`](meta/symbol_of.md) | 演算子の種類から記号文字列を`u8string_view`で取得 | C++26 |


## 名前とソース位置

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`has_identifier`](meta/has_identifier.md) | 識別子を持つかどうかを判定 | C++26 |
| [`identifier_of`](meta/identifier_of.md) | 識別子を`string_view`で取得 | C++26 |
| [`u8identifier_of`](meta/identifier_of.md) | 識別子を`u8string_view`で取得 | C++26 |
| [`display_string_of`](meta/display_string_of.md) | 表示用の文字列を`string_view`で取得 | C++26 |
| [`u8display_string_of`](meta/display_string_of.md) | 表示用の文字列を`u8string_view`で取得 | C++26 |
| [`source_location_of`](meta/source_location_of.md) | ソース位置を取得 | C++26 |


## エンティティの性質

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`type_of`](meta/type_of.md) | 型のリフレクションを取得 | C++26 |
| [`object_of`](meta/object_of.md) | オブジェクトのリフレクションを取得 | C++26 |
| [`constant_of`](meta/constant_of.md) | 定数のリフレクションを取得 | C++26 |
| [`dealias`](meta/dealias.md) | エイリアスを解決する | C++26 |
| [`has_parent`](meta/has_parent.md) | 親スコープがあるかどうかを判定 | C++26 |
| [`parent_of`](meta/parent_of.md) | 親スコープのリフレクションを取得 | C++26 |


## アクセス指定子

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`is_public`](meta/is_public.md) | `public`であるか | C++26 |
| [`is_protected`](meta/is_protected.md) | `protected`であるか | C++26 |
| [`is_private`](meta/is_private.md) | `private`であるか | C++26 |
| [`is_accessible`](meta/is_accessible.md) | 指定したアクセスコンテキストでアクセス可能か | C++26 |
| [`has_inaccessible_nonstatic_data_members`](meta/has_inaccessible_nonstatic_data_members.md) | アクセス不可能なメンバ変数があるか | C++26 |
| [`has_inaccessible_bases`](meta/has_inaccessible_bases.md) | アクセス不可能な基底クラスがあるか | C++26 |
| [`has_inaccessible_subobjects`](meta/has_inaccessible_subobjects.md) | アクセス不可能な基底クラスまたはメンバ変数があるか | C++26 |


## エンティティの分類

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`is_variable`](meta/is_variable.md) | 変数であるか | C++26 |
| [`is_type`](meta/is_type.md) | 型であるか | C++26 |
| [`is_namespace`](meta/is_namespace.md) | 名前空間であるか | C++26 |
| [`is_type_alias`](meta/is_type_alias.md) | 型エイリアスであるか | C++26 |
| [`is_namespace_alias`](meta/is_namespace_alias.md) | 名前空間エイリアスであるか | C++26 |
| [`is_function`](meta/is_function.md) | 関数であるか | C++26 |
| [`is_enumerator`](meta/is_enumerator.md) | 列挙子であるか | C++26 |
| [`is_value`](meta/is_value.md) | 値であるか | C++26 |
| [`is_object`](meta/is_object.md) | オブジェクトであるか | C++26 |
| [`is_structured_binding`](meta/is_structured_binding.md) | 構造化束縛であるか | C++26 |
| [`is_class_member`](meta/is_class_member.md) | クラスメンバであるか | C++26 |
| [`is_namespace_member`](meta/is_namespace_member.md) | 名前空間メンバであるか | C++26 |
| [`is_nonstatic_data_member`](meta/is_nonstatic_data_member.md) | メンバ変数であるか | C++26 |
| [`is_static_member`](meta/is_static_member.md) | 静的メンバであるか | C++26 |
| [`is_base`](meta/is_base.md) | 基底クラス関係であるか | C++26 |
| [`is_function_parameter`](meta/is_function_parameter.md) | 関数パラメータであるか | C++26 |
| [`is_template`](meta/is_template.md) | テンプレートであるか | C++26 |
| [`is_function_template`](meta/is_function_template.md) | 関数テンプレートであるか | C++26 |
| [`is_variable_template`](meta/is_variable_template.md) | 変数テンプレートであるか | C++26 |
| [`is_class_template`](meta/is_class_template.md) | クラステンプレートであるか | C++26 |
| [`is_alias_template`](meta/is_alias_template.md) | エイリアステンプレートであるか | C++26 |
| [`is_conversion_function_template`](meta/is_conversion_function_template.md) | 変換関数テンプレートであるか | C++26 |
| [`is_operator_function_template`](meta/is_operator_function_template.md) | 演算子関数テンプレートであるか | C++26 |
| [`is_literal_operator_template`](meta/is_literal_operator_template.md) | リテラル演算子テンプレートであるか | C++26 |
| [`is_constructor_template`](meta/is_constructor_template.md) | コンストラクタテンプレートであるか | C++26 |
| [`is_concept`](meta/is_concept.md) | コンセプトであるか | C++26 |
| [`is_complete_type`](meta/is_complete_type.md) | 完全型であるか | C++26 |
| [`is_enumerable_type`](meta/is_enumerable_type.md) | 列挙可能型であるか | C++26 |


## 関数の分類

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`is_conversion_function`](meta/is_conversion_function.md) | 変換関数であるか | C++26 |
| [`is_operator_function`](meta/is_operator_function.md) | 演算子関数であるか | C++26 |
| [`is_literal_operator`](meta/is_literal_operator.md) | リテラル演算子であるか | C++26 |
| [`is_special_member_function`](meta/is_special_member_function.md) | 特殊メンバ関数であるか | C++26 |
| [`is_constructor`](meta/is_constructor.md) | コンストラクタであるか | C++26 |
| [`is_default_constructor`](meta/is_default_constructor.md) | デフォルトコンストラクタであるか | C++26 |
| [`is_copy_constructor`](meta/is_copy_constructor.md) | コピーコンストラクタであるか | C++26 |
| [`is_move_constructor`](meta/is_move_constructor.md) | ムーブコンストラクタであるか | C++26 |
| [`is_assignment`](meta/is_assignment.md) | 代入演算子であるか | C++26 |
| [`is_copy_assignment`](meta/is_copy_assignment.md) | コピー代入演算子であるか | C++26 |
| [`is_move_assignment`](meta/is_move_assignment.md) | ムーブ代入演算子であるか | C++26 |
| [`is_destructor`](meta/is_destructor.md) | デストラクタであるか | C++26 |
| [`is_deleted`](meta/is_deleted.md) | `= delete`されているか | C++26 |
| [`is_defaulted`](meta/is_defaulted.md) | `= default`されているか | C++26 |
| [`is_explicit`](meta/is_explicit.md) | `explicit`であるか | C++26 |
| [`is_noexcept`](meta/is_noexcept.md) | `noexcept`であるか | C++26 |
| [`is_user_provided`](meta/is_user_provided.md) | ユーザー提供であるか | C++26 |
| [`is_user_declared`](meta/is_user_declared.md) | ユーザー宣言であるか | C++26 |


## 関数パラメータの検査

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`parameters_of`](meta/parameters_of.md) | 関数パラメータのリフレクションを取得 | C++26 |
| [`return_type_of`](meta/return_type_of.md) | 関数の戻り値型のリフレクションを取得 | C++26 |
| [`variable_of`](meta/variable_of.md) | パラメータ変数のリフレクションを取得 | C++26 |
| [`has_default_argument`](meta/has_default_argument.md) | デフォルト引数を持つか | C++26 |
| [`has_ellipsis_parameter`](meta/has_ellipsis_parameter.md) | 可変長引数を持つか | C++26 |
| [`is_explicit_object_parameter`](meta/is_explicit_object_parameter.md) | 明示的オブジェクトパラメータであるか | C++26 |


## メンバの性質

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`is_virtual`](meta/is_virtual.md) | `virtual`であるか | C++26 |
| [`is_pure_virtual`](meta/is_pure_virtual.md) | 純粋仮想であるか | C++26 |
| [`is_override`](meta/is_override.md) | `override`であるか | C++26 |
| [`is_final`](meta/is_final.md) | `final`であるか | C++26 |
| [`is_const`](meta/is_const.md) | `const`修飾されているか | C++26 |
| [`is_volatile`](meta/is_volatile.md) | `volatile`修飾されているか | C++26 |
| [`is_mutable_member`](meta/is_mutable_member.md) | `mutable`メンバであるか | C++26 |
| [`is_lvalue_reference_qualified`](meta/is_lvalue_reference_qualified.md) | 左辺値参照修飾されているか | C++26 |
| [`is_rvalue_reference_qualified`](meta/is_rvalue_reference_qualified.md) | 右辺値参照修飾されているか | C++26 |
| [`is_bit_field`](meta/is_bit_field.md) | ビットフィールドであるか | C++26 |
| [`has_default_member_initializer`](meta/has_default_member_initializer.md) | デフォルトメンバ初期化子を持つか | C++26 |


## 記憶域とリンケージ

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`has_static_storage_duration`](meta/has_static_storage_duration.md) | 静的記憶域期間を持つか | C++26 |
| [`has_thread_storage_duration`](meta/has_thread_storage_duration.md) | スレッド記憶域期間を持つか | C++26 |
| [`has_automatic_storage_duration`](meta/has_automatic_storage_duration.md) | 自動記憶域期間を持つか | C++26 |
| [`has_internal_linkage`](meta/has_internal_linkage.md) | 内部リンケージを持つか | C++26 |
| [`has_module_linkage`](meta/has_module_linkage.md) | モジュールリンケージを持つか | C++26 |
| [`has_external_linkage`](meta/has_external_linkage.md) | 外部リンケージを持つか | C++26 |
| [`has_c_language_linkage`](meta/has_c_language_linkage.md) | C言語リンケージを持つか | C++26 |
| [`has_linkage`](meta/has_linkage.md) | リンケージを持つか | C++26 |


## メンバ・基底クラスの取得

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`members_of`](meta/members_of.md) | すべてのメンバを取得 | C++26 |
| [`bases_of`](meta/bases_of.md) | 基底クラスを取得 | C++26 |
| [`static_data_members_of`](meta/static_data_members_of.md) | 静的データメンバを取得 | C++26 |
| [`nonstatic_data_members_of`](meta/nonstatic_data_members_of.md) | メンバ変数を取得 | C++26 |
| [`enumerators_of`](meta/enumerators_of.md) | 列挙子を取得 | C++26 |
| [`subobjects_of`](meta/subobjects_of.md) | 基底クラスとメンバ変数を統合して取得 | C++26 |


## テンプレート操作

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`has_template_arguments`](meta/has_template_arguments.md) | テンプレート引数を持つか | C++26 |
| [`template_of`](meta/template_of.md) | テンプレートのリフレクションを取得 | C++26 |
| [`template_arguments_of`](meta/template_arguments_of.md) | テンプレート引数のリフレクションを取得 | C++26 |
| [`can_substitute`](meta/can_substitute.md) | テンプレート引数が置換可能か判定 | C++26 |
| [`substitute`](meta/substitute.md) | テンプレートにテンプレート引数を適用 | C++26 |


## レイアウト情報

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`member_offset`](meta/member_offset.md) | メンバオフセットを表す型 (class) | C++26 |
| [`offset_of`](meta/offset_of.md) | メンバのオフセットを取得 | C++26 |
| [`size_of`](meta/size_of.md) | サイズを取得 | C++26 |
| [`alignment_of`](meta/alignment_of.md) | アライメントを取得 | C++26 |
| [`bit_size_of`](meta/bit_size_of.md) | ビットサイズを取得 | C++26 |


## 値の抽出と生成

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`extract`](meta/extract.md) | リフレクションから値を抽出 | C++26 |
| [`reflect_constant`](meta/reflect_constant.md) | 値からリフレクションを生成 | C++26 |
| [`reflect_object`](meta/reflect_object.md) | オブジェクトからリフレクションを生成 | C++26 |
| [`reflect_function`](meta/reflect_function.md) | 関数からリフレクションを生成 | C++26 |


## 集成体の定義

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`data_member_options`](meta/data_member_options.md) | データメンバの仕様を指定するオプション (class) | C++26 |
| [`data_member_spec`](meta/data_member_spec.md) | データメンバの仕様を作成 | C++26 |
| [`is_data_member_spec`](meta/is_data_member_spec.md) | データメンバの仕様であるか | C++26 |
| [`define_aggregate`](meta/define_aggregate.md) | 集成体型を定義 | C++26 |


## 静的ストレージへの配置

以下の`define_static_*`と`is_string_literal`は`std`名前空間に定義される（`std::meta`名前空間ではない）。`reflect_constant_*`は`std::meta`名前空間に定義される。

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`define_static_string`](meta/define_static_string.md) | コンパイル時文字列を静的ストレージに配置し`const CharT*`を返す | C++26 |
| [`define_static_array`](meta/define_static_array.md) | コンパイル時配列を静的ストレージに配置し`span<const T>`を返す | C++26 |
| [`define_static_object`](meta/define_static_object.md) | コンパイル時オブジェクトを静的ストレージに配置し`const T*`を返す | C++26 |
| [`reflect_constant_string`](meta/reflect_constant_string.md) | コンパイル時文字列のリフレクションを生成する | C++26 |
| [`reflect_constant_array`](meta/reflect_constant_array.md) | コンパイル時配列のリフレクションを生成する | C++26 |
| [`is_string_literal`](meta/is_string_literal.md) | ポインタが文字列リテラルを指しているかを判定する | C++26 |


## アノテーション

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`is_annotation`](meta/is_annotation.md) | アノテーションであるか | C++26 |
| [`annotations_of`](meta/annotations_of.md) | すべてのアノテーションを取得 | C++26 |
| [`annotations_of_with_type`](meta/annotations_of_with_type.md) | 指定した型のアノテーションのみ取得 | C++26 |


## 型特性（プライマリ型カテゴリ）

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`is_void_type`](meta/is_void_type.md) | `void`型か | C++26 |
| [`is_null_pointer_type`](meta/is_null_pointer_type.md) | `nullptr_t`型か | C++26 |
| [`is_integral_type`](meta/is_integral_type.md) | 整数型か | C++26 |
| [`is_floating_point_type`](meta/is_floating_point_type.md) | 浮動小数点数型か | C++26 |
| [`is_array_type`](meta/is_array_type.md) | 配列型か | C++26 |
| [`is_pointer_type`](meta/is_pointer_type.md) | ポインタ型か | C++26 |
| [`is_lvalue_reference_type`](meta/is_lvalue_reference_type.md) | 左辺値参照型か | C++26 |
| [`is_rvalue_reference_type`](meta/is_rvalue_reference_type.md) | 右辺値参照型か | C++26 |
| [`is_member_object_pointer_type`](meta/is_member_object_pointer_type.md) | メンバオブジェクトポインタ型か | C++26 |
| [`is_member_function_pointer_type`](meta/is_member_function_pointer_type.md) | メンバ関数ポインタ型か | C++26 |
| [`is_enum_type`](meta/is_enum_type.md) | 列挙型か | C++26 |
| [`is_union_type`](meta/is_union_type.md) | 共用体型か | C++26 |
| [`is_class_type`](meta/is_class_type.md) | クラス型か | C++26 |
| [`is_function_type`](meta/is_function_type.md) | 関数型か | C++26 |
| [`is_reflection_type`](meta/is_reflection_type.md) | リフレクション型か | C++26 |


## 型特性（複合型カテゴリ）

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`is_reference_type`](meta/is_reference_type.md) | 参照型か | C++26 |
| [`is_arithmetic_type`](meta/is_arithmetic_type.md) | 算術型か | C++26 |
| [`is_fundamental_type`](meta/is_fundamental_type.md) | 基本型か | C++26 |
| [`is_object_type`](meta/is_object_type.md) | オブジェクト型か | C++26 |
| [`is_scalar_type`](meta/is_scalar_type.md) | スカラ型か | C++26 |
| [`is_compound_type`](meta/is_compound_type.md) | 複合型か | C++26 |
| [`is_member_pointer_type`](meta/is_member_pointer_type.md) | メンバポインタ型か | C++26 |


## 型特性（型の性質）

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`is_const_type`](meta/is_const_type.md) | `const`型か | C++26 |
| [`is_volatile_type`](meta/is_volatile_type.md) | `volatile`型か | C++26 |
| [`is_trivially_copyable_type`](meta/is_trivially_copyable_type.md) | トリビアルコピー可能型か | C++26 |
| [`is_standard_layout_type`](meta/is_standard_layout_type.md) | スタンダードレイアウト型か | C++26 |
| [`is_empty_type`](meta/is_empty_type.md) | 空の型か | C++26 |
| [`is_polymorphic_type`](meta/is_polymorphic_type.md) | 多態的型か | C++26 |
| [`is_abstract_type`](meta/is_abstract_type.md) | 抽象型か | C++26 |
| [`is_final_type`](meta/is_final_type.md) | `final`型か | C++26 |
| [`is_aggregate_type`](meta/is_aggregate_type.md) | 集成体型か | C++26 |
| [`is_signed_type`](meta/is_signed_type.md) | 符号付き型か | C++26 |
| [`is_unsigned_type`](meta/is_unsigned_type.md) | 符号なし型か | C++26 |
| [`is_bounded_array_type`](meta/is_bounded_array_type.md) | 境界付き配列型か | C++26 |
| [`is_unbounded_array_type`](meta/is_unbounded_array_type.md) | 境界なし配列型か | C++26 |
| [`is_scoped_enum_type`](meta/is_scoped_enum_type.md) | スコープ付き列挙型か | C++26 |
| [`is_constructible_type`](meta/is_constructible_type.md) | 構築可能型か | C++26 |
| [`is_default_constructible_type`](meta/is_default_constructible_type.md) | デフォルト構築可能型か | C++26 |
| [`is_copy_constructible_type`](meta/is_copy_constructible_type.md) | コピー構築可能型か | C++26 |
| [`is_move_constructible_type`](meta/is_move_constructible_type.md) | ムーブ構築可能型か | C++26 |
| [`is_assignable_type`](meta/is_assignable_type.md) | 代入可能型か | C++26 |
| [`is_copy_assignable_type`](meta/is_copy_assignable_type.md) | コピー代入可能型か | C++26 |
| [`is_move_assignable_type`](meta/is_move_assignable_type.md) | ムーブ代入可能型か | C++26 |
| [`is_swappable_with_type`](meta/is_swappable_with_type.md) | 指定型とのswap可能型か | C++26 |
| [`is_swappable_type`](meta/is_swappable_type.md) | swap可能型か | C++26 |
| [`is_destructible_type`](meta/is_destructible_type.md) | 破棄可能型か | C++26 |
| [`is_trivially_constructible_type`](meta/is_trivially_constructible_type.md) | トリビアルに構築可能型か | C++26 |
| [`is_trivially_default_constructible_type`](meta/is_trivially_default_constructible_type.md) | トリビアルにデフォルト構築可能型か | C++26 |
| [`is_trivially_copy_constructible_type`](meta/is_trivially_copy_constructible_type.md) | トリビアルにコピー構築可能型か | C++26 |
| [`is_trivially_move_constructible_type`](meta/is_trivially_move_constructible_type.md) | トリビアルにムーブ構築可能型か | C++26 |
| [`is_trivially_assignable_type`](meta/is_trivially_assignable_type.md) | トリビアルに代入可能型か | C++26 |
| [`is_trivially_copy_assignable_type`](meta/is_trivially_copy_assignable_type.md) | トリビアルにコピー代入可能型か | C++26 |
| [`is_trivially_move_assignable_type`](meta/is_trivially_move_assignable_type.md) | トリビアルにムーブ代入可能型か | C++26 |
| [`is_trivially_destructible_type`](meta/is_trivially_destructible_type.md) | トリビアルに破棄可能型か | C++26 |
| [`is_nothrow_constructible_type`](meta/is_nothrow_constructible_type.md) | 例外を送出せずに構築可能型か | C++26 |
| [`is_nothrow_default_constructible_type`](meta/is_nothrow_default_constructible_type.md) | 例外を送出せずにデフォルト構築可能型か | C++26 |
| [`is_nothrow_copy_constructible_type`](meta/is_nothrow_copy_constructible_type.md) | 例外を送出せずにコピー構築可能型か | C++26 |
| [`is_nothrow_move_constructible_type`](meta/is_nothrow_move_constructible_type.md) | 例外を送出せずにムーブ構築可能型か | C++26 |
| [`is_nothrow_assignable_type`](meta/is_nothrow_assignable_type.md) | 例外を送出せずに代入可能型か | C++26 |
| [`is_nothrow_copy_assignable_type`](meta/is_nothrow_copy_assignable_type.md) | 例外を送出せずにコピー代入可能型か | C++26 |
| [`is_nothrow_move_assignable_type`](meta/is_nothrow_move_assignable_type.md) | 例外を送出せずにムーブ代入可能型か | C++26 |
| [`is_nothrow_swappable_with_type`](meta/is_nothrow_swappable_with_type.md) | 例外を送出せずに指定型とswap可能型か | C++26 |
| [`is_nothrow_swappable_type`](meta/is_nothrow_swappable_type.md) | 例外を送出せずにswap可能型か | C++26 |
| [`is_nothrow_destructible_type`](meta/is_nothrow_destructible_type.md) | 例外を送出せずに破棄可能型か | C++26 |
| [`is_consteval_only_type`](meta/is_consteval_only_type.md) | consteval-only型か | C++26 |
| [`is_implicit_lifetime_type`](meta/is_implicit_lifetime_type.md) | 暗黙の生存期間型か | C++26 |
| [`has_virtual_destructor`](meta/has_virtual_destructor.md) | 仮想デストラクタを持つか | C++26 |
| [`has_unique_object_representations`](meta/has_unique_object_representations.md) | 一意なオブジェクト表現を持つか | C++26 |
| [`reference_constructs_from_temporary`](meta/reference_constructs_from_temporary.md) | 参照が一時オブジェクトから構築されるか | C++26 |
| [`reference_converts_from_temporary`](meta/reference_converts_from_temporary.md) | 参照への変換が一時オブジェクトを経由するか | C++26 |



## 型特性（型プロパティクエリ）

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`rank`](meta/rank.md) | 配列型の次元数を取得 | C++26 |
| [`extent`](meta/extent.md) | 配列型の指定次元の要素数を取得 | C++26 |


## 型特性（型の関係）

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`is_same_type`](meta/is_same_type.md) | 同じ型か | C++26 |
| [`is_base_of_type`](meta/is_base_of_type.md) | 基底クラスであるか | C++26 |
| [`is_virtual_base_of_type`](meta/is_virtual_base_of_type.md) | 仮想基底クラスであるか | C++26 |
| [`is_convertible_type`](meta/is_convertible_type.md) | 変換可能か | C++26 |
| [`is_nothrow_convertible_type`](meta/is_nothrow_convertible_type.md) | 例外を送出せずに変換可能か | C++26 |
| [`is_layout_compatible_type`](meta/is_layout_compatible_type.md) | レイアウト互換か | C++26 |
| [`is_pointer_interconvertible_base_of_type`](meta/is_pointer_interconvertible_base_of_type.md) | ポインタ相互変換可能な基底クラスか | C++26 |
| [`is_invocable_type`](meta/is_invocable_type.md) | 呼び出し可能か | C++26 |
| [`is_invocable_r_type`](meta/is_invocable_r_type.md) | 指定戻り値型で呼び出し可能か | C++26 |
| [`is_nothrow_invocable_type`](meta/is_nothrow_invocable_type.md) | 例外を送出せずに呼び出し可能か | C++26 |
| [`is_nothrow_invocable_r_type`](meta/is_nothrow_invocable_r_type.md) | 例外を送出せずに指定戻り値型で呼び出し可能か | C++26 |

## 型変換

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`remove_const`](meta/remove_const.md) | `const`を除去 | C++26 |
| [`remove_volatile`](meta/remove_volatile.md) | `volatile`を除去 | C++26 |
| [`remove_cv`](meta/remove_cv.md) | CV修飾を除去 | C++26 |
| [`add_const`](meta/add_const.md) | `const`を付加 | C++26 |
| [`add_volatile`](meta/add_volatile.md) | `volatile`を付加 | C++26 |
| [`add_cv`](meta/add_cv.md) | CV修飾を付加 | C++26 |
| [`remove_reference`](meta/remove_reference.md) | 参照を除去 | C++26 |
| [`add_lvalue_reference`](meta/add_lvalue_reference.md) | 左辺値参照を付加 | C++26 |
| [`add_rvalue_reference`](meta/add_rvalue_reference.md) | 右辺値参照を付加 | C++26 |
| [`remove_cvref`](meta/remove_cvref.md) | CV修飾と参照を除去 | C++26 |
| [`remove_pointer`](meta/remove_pointer.md) | ポインタを除去 | C++26 |
| [`add_pointer`](meta/add_pointer.md) | ポインタを付加 | C++26 |
| [`decay`](meta/decay.md) | 配列・関数からポインタへの変換を適用 | C++26 |
| [`make_signed`](meta/make_signed.md) | 符号付き型に変換 | C++26 |
| [`make_unsigned`](meta/make_unsigned.md) | 符号なし型に変換 | C++26 |
| [`remove_extent`](meta/remove_extent.md) | 配列の次元を除去 | C++26 |
| [`remove_all_extents`](meta/remove_all_extents.md) | 配列のすべての次元を除去 | C++26 |
| [`common_type`](meta/common_type.md) | 共通型を取得 | C++26 |
| [`common_reference`](meta/common_reference.md) | 共通参照型を取得 | C++26 |
| [`underlying_type`](meta/underlying_type.md) | 基底型を取得 | C++26 |
| [`invoke_result`](meta/invoke_result.md) | 呼び出し結果型を取得 | C++26 |
| [`unwrap_reference`](meta/unwrap_reference.md) | `reference_wrapper`を展開 | C++26 |
| [`unwrap_ref_decay`](meta/unwrap_ref_decay.md) | `decay`後に`reference_wrapper`を展開 | C++26 |
| [`tuple_size`](meta/tuple_size.md) | tuple-like型の要素数を取得 | C++26 |
| [`tuple_element`](meta/tuple_element.md) | tuple-like型の要素型を取得 | C++26 |
| [`variant_size`](meta/variant_size.md) | variant型の候補型の数を取得 | C++26 |
| [`variant_alternative`](meta/variant_alternative.md) | variant型の候補型を取得 | C++26 |
| [`type_order`](meta/type_order.md) | 型の順序を取得 | C++26 |


## エラー処理

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`exception`](meta/exception.md) | リフレクションメタ関数のエラーを表す例外クラス (class) | C++26 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++26 静的リフレクション](/lang/cpp26/reflection.md)
- [C++26 コンパイル時のタプルやリストを展開処理する`template for`文](/lang/cpp26/expansion_statements.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
- [P3394R4 Annotations for Reflection](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3394r4.html)
- [P3293R3 Splicing a base class subobject](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3293r3.html)
- [P3096R12 Function Parameter Reflection in Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3096r12.pdf)
- [P3491R3 `define_static_{string,object,array}`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3491r3.html)
- [P3560R2 Error Handling in Reflection](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3560r2.html)
- [P3920R0 Wording for NB comment resolution on trivial relocation](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3920r0.html)
    - C++26策定中に、trivially relocatable関係が一旦削除された
