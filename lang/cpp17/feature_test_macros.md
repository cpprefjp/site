# 機能テストマクロ
* cpp17[meta cpp]

<!-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<!-- last lang caution -->

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
| `__cpp_aggregate_bases`                      | `201603` | [集成体初期化の拡張](extension_to_aggregate_initialization.md) |
| `__cpp_nontype_template_args`                | `201411` | [非型テンプレートパラメータの定数式を評価](allow_constant_evaluation_for_all_non-type_template_arguments.md) |
| `__cpp_nested_namespace_definitions`         | `201411` | [入れ子名前空間の定義](nested_namespace.md) |


### ライブラリ

| マクロ名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
| `__cpp_lib_byte`                              | `201603` | [`std::byte`](/reference/cstddef/byte.md) | [`<cstddef>`](/reference/cstddef.md) |
| `__cpp_lib_hardware_interference_size`        | `201703` | [`std::hardware_destructive_interference_size`](/reference/new/hardware_destructive_interference_size.md)と[`std::hardware_constructive_interference_size`](/reference/new/hardware_constructive_interference_size.md) | [`<new>`](/reference/new.md) |
| `__cpp_lib_launder`                           | `201606` | [`std::launder()`](/reference/new/launder.md) | | [`<new>`](/reference/new.md) |
| `__cpp_lib_uncaught_exceptions`               | `201411` | [`std::uncaught_exceptions()`](/reference/exception/uncaught_exceptions.md) | [`<exception>`](/reference/exception.md) |
| `__cpp_lib_as_const`                          | `201510` | [`std::as_const()`](/reference/utility/as_const.md) | [`<utility>`](/reference/utility.md) |
| `__cpp_lib_make_from_tuple`                   | `201606` | [`std::make_from_tuple()`](/reference/tuple/make_from_tuple.md) | [`<utility>`](/reference/utility.md) |
| `__cpp_lib_apply`                             | `201603` | [`std::apply()`](/reference/tuple/apply.md) | [`<tuple>`](/reference/tuple.md) |
| `__cpp_lib_optional`                          | `201606` | [`std::optional`](/reference/optional/optional.md) | [`<optional>`](/reference/optional.md) |
| `__cpp_lib_any`                               | `201606` | [`std::any`](/reference/any/any.md) | [`<any>`](/reference/any.md) |
| `__cpp_lib_variant`                           | `201606` | [`std::variant`](/reference/variant/variant.md) | [`<variant>`](/reference/variant.md) |
| `__cpp_lib_memory_resource`                   | `201603` | [`std::memory_resource`](/reference/memory_resource/memory_resource.md)と関連する機能 | [`<memory_resource>`](/reference/memory_resource.md) |
| `__cpp_lib_boyer_moore_searcher`              | `201603` | [`std::boyer_morre_searcher`](/reference/functional/boyer_moore_searcher.md)と関連する機能 | [`<functional>`](/reference/functional.md) |
| `__cpp_lib_string_view`                       | `201606` | [`std::string_view`](/reference/string_view/basic_string_view.md) | [`<string_view>`](/reference/string_view.md) |
| `__cpp_lib_sample`                            | `201603` | [`std::sample()`](/reference/algorithm/sample.md) | [`<algorithm>`](/reference/algorithm.md) |
| `__cpp_lib_addressof_constexpr`               | `201603` | [`std::addressof()`](/reference/memory/addressof.md) | [`<memory>`](/reference/memory.md) |
| `__cpp_lib_raw_memory_algorithms`             | `201606` | [`std::uninitialized_default_construct()`](/reference/memory/uninitialized_default_construct.md)と関連する機能 | [`<memory>`](/reference/memory.md) |
| `__cpp_lib_transparent_operators`             | `201510` | [`std::owner_less`](/reference/memory/owner_less.md) の柔軟性向上 | [`<functional>`](/reference/functional.md)<br/> [`<memory>`](/reference/memory.md) |
| `__cpp_lib_enable_shared_from_this`           | `201603` | [`std::enable_shared_from_this`](/reference/memory/enable_shared_from_this.md) | [`<memory>`](/reference/memory.md) |
| `__cpp_lib_shared_ptr_weak_type`              | `201606` | [`std::shared_ptr`](/reference/memory/shared_ptr.md)クラスのメンバ型`weak_type` | [`<memory>`](/reference/memory.md) |
| `__cpp_lib_shared_ptr_arrays`                 | `201611` | [`std::shared_ptr`](/reference/memory/shared_ptr.md)クラスの配列サポート | [`<memory>`](/reference/memory.md) |
| `__cpp_lib_invoke`                            | `201411` | [`std::invoke()`](/reference/functional/invoke.md) | [`<functional>`](/reference/functional.md) |
| `__cpp_lib_not_fn`                            | `201603` | [`std::not_fn()`](/reference/functional/not_fn.md) | [`<functional>`](/reference/functional.md) |
| `__cpp_lib_void_t`                            | `201411` | [`std::void_t`](/reference/type_traits/void_t.md) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_bool_constant`                     | `201505` | [`std::bool_constant`](/reference/type_traits/bool_constant.md) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_type_trait_variable_templates`     | `201510` | 型トレイト変数テンプレート (`some_trait_v<T> = some_trait<T>::value`) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_logical_traits`                    | `201510` | 論理演算子型トレイト ([`std::conjunction`](/reference/type_traits/conjunction.md), [`std::disjunction`](/reference/type_traits/disjunction.md), [`std::negation`](/reference/type_traits/negation.md)) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_is_swappable`                      | `201603` | [`std::is_swappable`](/reference/type_traits/is_swappable.md)と関連する機能 | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_is_invocable`                      | `201703` | [`std::is_invocable`](/reference/type_traits/is_invocable.md)と関連する機能 | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_has_unique_object_representations` | `201606` | [`std::has_unique_object_representations`](/reference/type_traits/has_unique_object_representations.md) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_is_aggregate`                      | `201703` | [`std::is_aggregate`](/reference/type_traits/is_aggregate.md) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_chrono`                            | `201510` | [`<chrono>`](/reference/chrono.md) の改良 | [`<chrono>`](/reference/chrono.md) |
| `__cpp_lib_execution`                         | `201603` | [`<execution>`](/reference/execution.md) の追加 | [`<execution>`](/reference/execution.md) |
| `__cpp_lib_parallel_algorithm`                | `201603` | 並列アルゴリズム | [`<algorithm>`](/reference/algorithm.md)<br/> [`<numeric>`](/reference/numeric.md)<br/> [`<memory>`](/reference/memory.md) |
| `__cpp_lib_to_chars`                          | `201611` | [`std::to_chars()`](/reference/charconv/to_chars.md)と[`std::from_chars()`](/reference/charconv/from_chars.md) | [`<charconv>`](/reference/charconv.md) |
| `__cpp_lib_allocator_traits_is_always_equal`  | `201411` | ライブラリ内の `noexcept` のクリーンアップ | [`<deque>`](/reference/deque.md)<br/> [`<forward_list>`](/reference/forward_list.md)<br/> [`<list>`](/reference/list.md)<br/> [`<map>`](/reference/map.md)<br/> [`<memory>`](/reference/memory.md)<br/> [`<scoped_allocator>`](/reference/scoped_allocator.md)<br/> [`<set>`](/reference/set.md)<br/> [`<string>`](/reference/string.md)<br/> [`<unordered_map>`](/reference/unordered_map.md)<br/> [`<unordered_set>`](/reference/unordered_set.md)<br/> [`<vector>`](/reference/vector.md) |
| `__cpp_lib_incomplete_container_elements`     | `201505` | 標準コンテナについて不完全型を最小限サポート | [`<forward_list>`](/reference/forward_list.md)<br/> [`<list>`](/reference/list.md)<br/> [`<vector>`](/reference/vector.md) |
| `__cpp_lib_map_try_emplace`                   | `201411` | [`std::map::try_emplace()`](/reference/map/map/try_emplace.md), [`std::map::insert_or_assign()`](/reference/map/map/insert_or_assign.md) | [`<map>`](/reference/map.md) |
| `__cpp_lib_unordered_map_try_emplace`         | `201411` | [`std::unordered_map::try_emplace()`](/reference/unordered_map/unordered_map/try_emplace.md), [`std::unordered_map::insert_or_assign()`](/reference/unordered_map/unordered_map/insert_or_assign.md) | [`<unordered_map>`](/reference/unordered_map.md) |
| `__cpp_lib_node_extract`                      | `201606` | 連想コンテナのsplice | [`<map>`](/reference/map.md)<br/> [`<set>`](/reference/set.md)<br/> [`<unordered_map>`](/reference/unordered_map.md)<br/> [`<unordered_set>`](/reference/unordered_set.md) |
| `__cpp_lib_array_constexpr`                   | `201603` | 配列関係のランダムアクセスに`constexpr`を追加 | [`<array>`](/reference/array.md), [`<iterator>`](/reference/iterator.md) |
| `__cpp_lib_nonmember_container_access`        | `201411` | 非メンバ関数 [`std::size()`](/reference/iterator/size.md), [`std::empty()`](/reference/iterator/empty.md), [`std::data()`](/reference/iterator/data.md) | [`<iterator>`](/reference/iterator.md) |
| `__cpp_lib_clamp`                             | `201603` | [`std::clamp()`](/reference/algorithm/clamp.md) | [`<algorithm>`](/reference/algorithm.md) |
| `__cpp_lib_gcd_lcm`                           | `201606` | [`std::gcd()`](/reference/numeric/gcd.md)と[`std::lcm()`](/reference/numeric/lcm.md) | [`<numeric>`](/reference/numeric.md) |
| `__cpp_lib_hypot`                             | `201603` | 3引数版の[`std::hypot()`](/reference/cmath/hypot.md) | [`<cmath>`](/reference/cmath.md) |
| `__cpp_lib_math_special_functions`            | `201603` | 数学の特殊関数 | [`<cmath>`](/reference/cmath.md) |
| `__cpp_lib_filesystem`                        | `201703` | ファイルシステムライブラリ | [`<filesystem>`](/reference/filesystem.md) |
| `__cpp_lib_atomic_is_always_lock_free`        | `201603` | [`std::atomic`](/reference/atomic/atomic.md)クラスの静的メンバ定数`is_always_lock_free` | [`<atomic>`](/reference/atomic.md) |
| `__cpp_lib_shared_mutex`                      | `201505` | [`std::shared_mutex`](/reference/shared_mutex/shared_mutex.md) | [`<shared_mutex>`](/reference/shared_mutex.md) |
| `__cpp_lib_scoped_lock`                       | `201703` | 可変個のミューテックスのロックを管理する[`std::scoped_lock`](/reference/mutex/scoped_lock.md) | [`<mutex>`](/reference/mutex.md) |


## 参照
- [SD-6: SG10 Feature Test Recommendations: Standard C++](https://isocpp.org/std/standing-documents/sd-6-sg10-feature-test-recommendations#recs.cpp17)