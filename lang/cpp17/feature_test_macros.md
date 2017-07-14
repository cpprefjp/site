# 機能テストマクロ
* cpp17[meta cpp]

## 概要

SD-6 は C++17 の機能について以下のテストマクロを定義することを推奨している：

| マクロ名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
| `__cpp_enumerator_attributes`                | `201411` | [列挙子への属性付加を許可](attributes_for_namespaces_and_enumerators.md) | predefined |
| `__cpp_fold_expressions`                     | `201411` | [畳み込み式](folding_expressions.md) | predefined |
| `__cpp_inheriting_constructors`              | `201511` | 継承コンストラクタの新仕様 | predefined |
| `__cpp_lib_allocator_traits_is_always_equal` | `201411` | ライブラリー内の `noexcept` のクリーンアップ | [`<deque>`](/reference/deque.md), [`<forward_list>`](/reference/forward_list.md), [`<list>`](/reference/list.md), [`<map>`](/reference/map.md), [`<memory>`](/reference/memory.md), [`<scoped_allocator>`](/reference/scoped_allocator.md), [`<set>`](/reference/set.md), [`<string>`](/reference/string.md), [`<unordered_map>`](/reference/unordered_map.md), [`<unordered_set>`](/reference/unordered_set.md), [`<vector>`](/reference/vector.md) |
| `__cpp_lib_as_const`                         | `201510` | [`std::as_const`](/reference/utility/as_const.md) | [`<utility>`](/reference/utility.md) |
| `__cpp_lib_bool_constant`                    | `201505` | [`std::bool_constant`](/reference/type_traits/bool_constant.md.nolink) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_chrono`                           | `201510` | [`<chrono>`](/reference/chrono.md) の改良 | [`<chrono>`](/reference/chrono.md) |
| `__cpp_lib_incomplete_container_elements`    | `201505` | 標準コンテナについて不完全型を最小限サポート | headers ([`<forward_list>`](/reference/forward_list.md), [`<list>`](/reference/list.md), [`<vector>`](/reference/vector.md)) |
| `__cpp_lib_invoke`                           | `201411` | [`std::invoke`](/reference/functional/invoke.md.nolink) | [`<functional>`](/reference/functional.md)  |
| `__cpp_lib_lock_guard_variadic`              | `201510` | [可変長引数 `std::lock_guard`](/reference/mutex/lock_guard.md) | [`<thread>`](/reference/thread.md) |
| `__cpp_lib_logical_traits`                   | `201510` | 論理演算子型トレイト ([`std::conjunction`](/reference/type_traits/conjunction.md.nolink), [`std::disjunction`](/reference/type_traits/disjunction.md.nolink), [`std::negation`](/reference/type_traits/negation.md.nolink)) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_map_try_emplace`                  | `201411` | [`std::map::try_emplace`](/reference/map/map/try_emplace.md.nolink) | [`<map>`](/reference/map.md) |
| `__cpp_lib_nonmember_container_access`       | `201411` | 非メンバー関数 `std::size`, `std::empty`, `std::data` | [`<array>`](/reference/array.md), [`<deque>`](/reference/deque.md), [`<forward_list>`](/reference/forward_list.md), [`<iterator>`](/reference/iterator.md), [`<list>`](/reference/list.md), [`<map>`](/reference/map.md), [`<regex>`](/reference/regex.md), [`<set>`](/reference/set.md), [`<string>`](/reference/string.md), [`<unordered_map>`](/reference/unordered_map.md), [`<unordered_set>`](/reference/unordered_set.md), [`<vector>`](/reference/vector.md) |
| `__cpp_lib_shared_mutex`                     | `201505` | [`std::shared_mutex`](/reference/shared_mutex/shared_mutex.md) | [`<shared_mutex>`](/reference/shared_mutex.md) |
| `__cpp_lib_transparent_operators`            | `201510` | [`std::owner_less`](/reference/memory/owner_less.md) の柔軟性向上 | [`<functional>`](/reference/functional.md), [`<memory>`](/reference/memory.md) |
| `__cpp_lib_type_trait_variable_templates`    | `201510` | 型トレイト変数テンプレート (`some_trait_v<T> = some_trait<T>::value`) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_uncaught_exceptions`              | `201411` | [`std::uncaught_exceptions`](/reference/exception/uncaught_exceptions.md.nolink) | [`<exception>`](/reference/exception.md) |
| `__cpp_lib_unordered_map_try_emplace`        | `201411` | [`std::unordered_map::try_emplace`](/reference/unordered_map/unordered_map/try_emplace.md.nolink) | [`<unordered_map>`](/reference/unordered_map.md) |
| `__cpp_lib_void_t`                           | `201411` | [`std::void_t`](/reference/type_traits/void_t.md.nolink) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_namespace_attributes`                 | `201411` | [名前空間への属性付加を許可](attributes_for_namespaces_and_enumerators.md) | predefined |
| `__cpp_nested_namespace_definitions`         | `201411` | [入れ子名前空間の定義](nested_namespace.md) | predefined |
| `__cpp_noexcept_function_type`               | `201510` | [例外仕様を型システムの一部にする](exception_spec_be_part_of_the_type_system.md) | predefined |
| `__cpp_nontype_template_args`                | `201411` | 非型テンプレートパラメータの定数式を評価 | predefined |
| `__cpp_static_assert`                        | `201411` | [`static_assert` のメッセージ省略を許可](extending_static_assert.md) | predefined |

## 参照
- [SD-6: SG10 Feature Test Recommendations: Standard C++](https://isocpp.org/std/standing-documents/sd-6-sg10-feature-test-recommendations#recs.cpp17)
