# 機能テストマクロ
* cpp17[meta cpp]

## 概要

SD-6 は C++17 の機能について以下のテストマクロを定義することを推奨している：

### 言語機能

| マクロ名 | 値 | 機能 |
|----------|----|------|
| `__cpp_hex_float`                            | `201603` | [十六進浮動小数点数リテラル](hexadecimal_floating_literals.md) |
| `__cpp_inline_variables`                     | `201606` | [インライン変数](inline_variables.md) |
| `__cpp_aligned_new`                          | `201606` | [アライメント指定されたデータの動的メモリ確保](dynamic_memory_allocation_for_over-aligned_data.md) |
| `__cpp_guaranteed_copy_elision`              | `201606` | [値のコピー省略を保証](guaranteed_copy_elision.md) |
| `__cpp_noexcept_function_type`               | `201510` | [例外仕様を型システムの一部にする](exception_spec_be_part_of_the_type_system.md)
| `__cpp_fold_expressions`                     | `201411` | [畳み込み式](folding_expressions.md) |
| `__cpp_constexpr`                            | `201603` | [`constexpr`ラムダ](constexpr_lambda.md) |
| `__cpp_if_constexpr`                         | `201606` | [`if constexpr`文](if_constexpr.md) |
| `__cpp_range_based_for`                      | `201603` | [範囲 `for` ループの制限緩和](generalizing_the_range-based_for_loop.md) |
| `__cpp_static_assert`                        | `201411` | [`static_assert` のメッセージ省略を許可](extending_static_assert.md) |
| `__cpp_deduction_guides`                     | `201606`<br/> `201611` | [クラステンプレートのテンプレート引数推論](type_deduction_for_class_templates.md) |
| `__cpp_nontype_template_parameter_auto`      | `201606` | [非型テンプレートパラメータの`auto`宣言](declaring_non-type_template_arguments_with_auto.md) |
| `__cpp_namespace_attributes`                 | `201411` | [名前空間への属性付加を許可](attributes_for_namespaces_and_enumerators.md) |
| `__cpp_enumerator_attributes`                | `201411` | [列挙子への属性付加を許可](attributes_for_namespaces_and_enumerators.md) |
| `__cpp_inheriting_constructors`              | `201511` | 継承コンストラクタの新仕様 |
| `__cpp_variadic_using`                       | `201611` | [`using`宣言のパック展開](pack_expansions_in_using.md) |
| `__has_cpp_attribute(fallthrough)`           | `true`   | [`[[fallthrough]]`属性](fallthrough.md) |
| `__has_cpp_attribute(nodiscard)`             | `true`   | [`[[nodiscard]]`属性](nodiscard.md) |
| `__has_cpp_attribute(maybe_unused)`          | `true`   | [`[[maybe_unused]]`属性](maybe_unused.md) |
| `__cpp_structured_bindings`                  | `201606` | [構造化束縛](structured_bindings.md) |
| `__cpp_aggregate_bases`                      | `201603` | [集成体初期化の拡張](extension_to_aggregate_initialization.md.nolink) |
| `__cpp_nontype_template_args`                | `201411` | [非型テンプレートパラメータの定数式を評価](allow_constant_evaluation_for_all_non-type_template_arguments.md) |
| `__cpp_nested_namespace_definitions`         | `201411` | [入れ子名前空間の定義](nested_namespace.md) |


### ライブラリ

| マクロ名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
| `__cpp_lib_allocator_traits_is_always_equal` | `201411` | ライブラリー内の `noexcept` のクリーンアップ | [`<deque>`](/reference/deque.md), [`<forward_list>`](/reference/forward_list.md), [`<list>`](/reference/list.md), [`<map>`](/reference/map.md), [`<memory>`](/reference/memory.md), [`<scoped_allocator>`](/reference/scoped_allocator.md), [`<set>`](/reference/set.md), [`<string>`](/reference/string.md), [`<unordered_map>`](/reference/unordered_map.md), [`<unordered_set>`](/reference/unordered_set.md), [`<vector>`](/reference/vector.md) |
| `__cpp_lib_as_const`                         | `201510` | [`std::as_const`](/reference/utility/as_const.md) | [`<utility>`](/reference/utility.md) |
| `__cpp_lib_bool_constant`                    | `201505` | [`std::bool_constant`](/reference/type_traits/bool_constant.md) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_chrono`                           | `201510` | [`<chrono>`](/reference/chrono.md) の改良 | [`<chrono>`](/reference/chrono.md) |
| `__cpp_lib_incomplete_container_elements`    | `201505` | 標準コンテナについて不完全型を最小限サポート | headers ([`<forward_list>`](/reference/forward_list.md), [`<list>`](/reference/list.md), [`<vector>`](/reference/vector.md)) |
| `__cpp_lib_invoke`                           | `201411` | [`std::invoke`](/reference/functional/invoke.md) | [`<functional>`](/reference/functional.md)  |
| `__cpp_lib_scoped_lock`                      | `201510` | [可変長引数 `std::lock_guard`](/reference/mutex/lock_guard.md) | [`<mutex>`](/reference/mutex.md) |
| `__cpp_lib_logical_traits`                   | `201510` | 論理演算子型トレイト ([`std::conjunction`](/reference/type_traits/conjunction.md), [`std::disjunction`](/reference/type_traits/disjunction.md), [`std::negation`](/reference/type_traits/negation.md)) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_map_try_emplace`                  | `201411` | [`std::map::try_emplace`](/reference/map/map/try_emplace.md), [`std::map::insert_or_assign`](/reference/map/map/insert_or_assign.md) | [`<map>`](/reference/map.md) |
| `__cpp_lib_nonmember_container_access`       | `201411` | 非メンバー関数 `std::size`, `std::empty`, `std::data` | [`<array>`](/reference/array.md), [`<deque>`](/reference/deque.md), [`<forward_list>`](/reference/forward_list.md), [`<iterator>`](/reference/iterator.md), [`<list>`](/reference/list.md), [`<map>`](/reference/map.md), [`<regex>`](/reference/regex.md), [`<set>`](/reference/set.md), [`<string>`](/reference/string.md), [`<unordered_map>`](/reference/unordered_map.md), [`<unordered_set>`](/reference/unordered_set.md), [`<vector>`](/reference/vector.md) |
| `__cpp_lib_shared_mutex`                     | `201505` | [`std::shared_mutex`](/reference/shared_mutex/shared_mutex.md) | [`<shared_mutex>`](/reference/shared_mutex.md) |
| `__cpp_lib_transparent_operators`            | `201510` | [`std::owner_less`](/reference/memory/owner_less.md) の柔軟性向上 | [`<functional>`](/reference/functional.md), [`<memory>`](/reference/memory.md) |
| `__cpp_lib_type_trait_variable_templates`    | `201510` | 型トレイト変数テンプレート (`some_trait_v<T> = some_trait<T>::value`) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_uncaught_exceptions`              | `201411` | [`std::uncaught_exceptions`](/reference/exception/uncaught_exceptions.md) | [`<exception>`](/reference/exception.md) |
| `__cpp_lib_unordered_map_try_emplace`        | `201411` | [`std::unordered_map::try_emplace`](/reference/unordered_map/unordered_map/try_emplace.md), [`std::unordered_map::insert_or_assign`](/reference/unordered_map/unordered_map/insert_or_assign.md) | [`<unordered_map>`](/reference/unordered_map.md) |
| `__cpp_lib_void_t`                           | `201411` | [`std::void_t`](/reference/type_traits/void_t.md) | [`<type_traits>`](/reference/type_traits.md) |


## 参照
- [SD-6: SG10 Feature Test Recommendations: Standard C++](https://isocpp.org/std/standing-documents/sd-6-sg10-feature-test-recommendations#recs.cpp17)
