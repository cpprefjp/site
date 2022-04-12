# 機能テストマクロ
* cpp20[meta cpp]

## 概要

### 言語機能

| マクロ名 | 値 | 機能 |
|----------|----|------|
|`__cpp_aggregate_paren_init`|`201902L`|[丸カッコの値リストからの集成体初期化を許可](allow_initializing_aggregates_from_a_parenthesized_list_of_values.md)|
|`__cpp_char8_t`|`201811L`|[UTF-8エンコーディングされた文字の型として`char8_t`を追加](char8_t.md)|
|`__cpp_concepts`|`201907L`|[コンセプト](concepts.md)|
|`__cpp_conditional_explicit`|`201806L`|[関数を条件付きで`explicit`にする構文を追加](explicit_bool.md)|
|`__cpp_constexpr`|`201907L`|[定数式からの仮想関数の呼び出しを許可](allow_virtual_function_calls_in_constant_expressions.md)<br/>[定数式での`dynamic_cast`、多態的な`typeid`を許可](allowing_dynamic_cast_polymorphic_typeid_in_constant_expressions.md)<br/>[constexpr関数内でのtry-catchブロックを許可](try-catch_blocks_in_constexpr_functions.md)<br/>[定数式内での共用体のアクティブメンバの変更を許可](changing_the_active_member_of_a_union_inside_constexpr.md)<br/>[constexpr関数内でのトリビアルなデフォルト初期化を許可](permitting_trivial_default_initialization_in_constexpr_contexts.md)<br/>[constexpr関数内で未評価のインラインアセンブリを許可することによる組み込み関数のconstexpr有効化](enabling_constexpr_intrinsics_by_permitting_unevaluated_inline-assembly_in_constexpr_functions.md)|
|`__cpp_constexpr_dynamic_alloc`|`201907L`|[可変サイズをもつコンテナの`constexpr`化](more_constexpr_containers.md)|
|`__cpp_constexpr_in_decltype`|`201711L`|[評価されない文脈での定数式評価によって特殊メンバ関数がインスタンス化されることを規定](less_eager_instantiation_of_constexpr_functions.md)|
|`__cpp_consteval`|`201811L`|[即時関数](immediate_functions.md)|
|`__cpp_constinit`|`201907L`|[コンパイル時初期化を強制する`constinit`キーワードを追加](constinit.md)|
|`__cpp_deduction_guides`|`201907L`|[集成体クラステンプレートのテンプレート引数推論](class_template_argument_deduction_for_aggregates.md)<br/>[エイリアステンプレート経由でのクラステンプレートのテンプレート引数推論](class_template_argument_deduction_for_alias_templates.md)|
|`__cpp_designated_initializers`|`201707L`|[指示付き初期化](designated_initialization.md)|
|`__cpp_generic_lambdas`|`201707L`|[ジェネリックラムダのテンプレート構文](familiar_template_syntax_for_generic_lambdas.md)|
|`__cpp_impl_coroutine`|`201902L`|[コルーチン](coroutines.md)|
|`__cpp_impl_destroying_delete`|`201806L`|[可変長データを扱うクラスの効率的な`delete`](efficient_sized_delete_for_variable_sized_classes.md.nolink)|
|`__cpp_impl_three_way_comparison`|`201907L`|[一貫比較](consistent_comparison.md)|
|`__cpp_init_captures`|`201803L`|[ラムダ式の初期化キャプチャでのパック展開を許可](allow_pack_expansion_in_lambda_init_capture.md)|
|`__cpp_modules`|`201907L`|[モジュール](modules.md)|
|`__cpp_nontype_template_args`|`201911L`|[非型テンプレートパラメータとしてクラス型を許可する](class_types_in_non-type_template_parameters.md)|
|`__cpp_using_enum`|`201907L`|[スコープ付き列挙型のusing宣言](using_enum.md)|

### ライブラリ

ライブラリの機能テストマクロは全て[`<version>`](/reference/version.md)でも提供される。

| マクロ名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
|`__cpp_lib_array_constexpr`|`201803L`<br/>`201806L`<br/>`201811L`|`std::array`の完全`constexpr`対応)|[`<iterator>`](/reference/iterator.md)<br/>[`<array>`](/reference/array.md)|
|`__cpp_lib_assume_aligned`|`201811L`|[`std::assume_aligned()`](/reference/memory/assume_aligned.md)|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_atomic_flag_test`|`201907L`|[`std::atomic_flag::test()`](/reference/atomic/atomic_flag/test.md)|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_float`|`201711L`|[`std::atomic`の浮動小数点数型に対する特殊化](/reference/atomic/atomic.md)|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_lock_free_type_aliases`|`201907L`|[`atomic_signed_lock_free/atomic_unsigned_lock_free`](/reference/atomic/atomic.md)|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_ref`|`201806L`|[`std::atomic_ref`](/reference/atomic/atomic_ref.md)|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_shared_ptr`|`201711L`|[`std::atomic`の`std::shared_ptr/std::weak_ptr`に対する特殊化](/reference/memory/atomic.md)|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_atomic_value_initialization`|`201911L`|[`std::atomic_flag`の値初期化](/reference/atomic/atomic_flag/op_constructor.md)|[`<atomic>`](/reference/atomic.md)<br/>[`<memory>`](/reference/memory.md)|
|`__cpp_lib_atomic_wait`|`201907L`|[`std::atomic::wait()`](/reference/atomic/atomic/wait.md)、[`std::atomic::notify_one()`](/reference/atomic/atomic/notify_one.md)、[`std::atomic::notify_all()`](/reference/atomic/atomic/notify_all.md)|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_barrier`|`201907L`||[`<barrier>`](/reference/barrier.md)|
|`__cpp_lib_bind_front`|`201811L`<br/>`201907L`||[`<functional>`](/reference/functional.md)|
|`__cpp_lib_bit_cast`|`201806L`||[`<bit>`](/reference/bit.md)|
|`__cpp_lib_bitops`|`201907L`||[`<bit>`](/reference/bit.md)|
|`__cpp_lib_bounded_array_traits`|`201902L`||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_char8_t`|`201811L`<br/>`201907L`||[`<atomic>`](/reference/atomic.md)<br/>[`<filesystem>`](/reference/filesystem.md)<br/>[`<istream>`](/reference/istream.md)<br/>[`<limits>`](/reference/limits.md)<br/>[`<locale>`](/reference/locale.md)<br/>[`<ostream>`](/reference/ostream.md)<br/>[`<string>`](/reference/string.md)<br/>[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_chrono`|`201907L`||[`<chrono>`](/reference/chrono.md)|
|`__cpp_lib_concepts`|`202002L`||[`<concepts>`](/reference/concepts.md)|
|`__cpp_lib_constexpr_algorithms`|`201806L`||[`<algorithm>`](/reference/algorithm.md)|
|`__cpp_lib_constexpr_complex`|`201711L`||[`<complex>`](/reference/complex.md)|
|`__cpp_lib_constexpr_dynamic_alloc`|`201907L`||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_constexpr_functional`|`201907L`||[`<functional>`](/reference/functional.md)|
|`__cpp_lib_constexpr_iterator`|`201811L`||[`<iterator>`](/reference/iterator.md)|
|`__cpp_lib_constexpr_memory`|`201811L`||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_constexpr_numeric`|`201911L`||[`<numeric>`](/reference/numeric.md)|
|`__cpp_lib_constexpr_string`|`201907L`||[`<string>`](/reference/string.md)|
|`__cpp_lib_constexpr_string_view`|`201811L`||[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_constexpr_tuple`|`201811L`||[`<tuple>`](/reference/tuple.md)|
|`__cpp_lib_constexpr_utility`|`201811L`||[`<utility>`](/reference/utility.md)|
|`__cpp_lib_constexpr_vector`|`201907L`||[`<vector>`](/reference/vector.md)|
|`__cpp_lib_coroutine`|`201902L`||[`<coroutine>`](/reference/coroutine.md)|
|`__cpp_lib_destroying_delete`|`201806L`||[`<new>`](/reference/new.md)|
|`__cpp_lib_endian`|`201907L`||[`<bit>`](/reference/bit.md)|
|`__cpp_lib_erase_if`|`202002L`||[`<string>`](/reference/string.md)<br/>[`<deque>`](/reference/deque.md)<br/>[`<forward_list>`](/reference/forward_list.md)<br/>[`<list>`](/reference/list.md)<br/>[`<vector>`](/reference/vector.md)<br/>[`<map>`](/reference/map.md)<br/>[`<set>`](/reference/set.md)<br/>[`<unordered_map>`](/reference/unordered_map.md)<br/>[`<unordered_set>`](/reference/unordered_set.md)|
|`__cpp_lib_execution`|`201902L`||[`<execution>`](/reference/execution.md)|
|`__cpp_lib_format`|`201907L`||[`<format>`](/reference/format.md)|
|`__cpp_lib_generic_unordered_lookup`|`201811L`||[`<unordered_map>`](/reference/unordered_map.md)<br/>[`<unordered_set>`](/reference/unordered_set.md)|
|`__cpp_lib_int_pow2`|`202002L`||[`<bit>`](/reference/bit.md)|
|`__cpp_lib_integer_comparison_functions`|`202002L`||[`<utility>`](/reference/utility.md)|
|`__cpp_lib_interpolate`|`201902L`||[`<cmath>`](/reference/cmath.md)<br/>[`<numeric>`](/reference/numeric.md)|
|`__cpp_lib_is_constant_evaluated`|`201811L`||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_is_layout_compatible`|`201907L`||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_is_nothrow_convertible`|`201806L`||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_is_pointer_interconvertible`|`201907L`||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_jthread`|`201911L`||[`<stop_token>`](/reference/stop_token.md)<br/>[`<thread>`](/reference/thread.md)|
|`__cpp_lib_latch`|`201907L`||[`<latch>`](/reference/latch.md)|
|`__cpp_lib_list_remove_return_type`|`201806L`||[`<forward_list>`](/reference/forward_list.md)<br/>[`<list>`](/reference/list.md)|
|`__cpp_lib_math_constants`|`201907L`||[`<numbers>`](/reference/numbers.md)|
|`__cpp_lib_polymorphic_allocator`|`201902L`||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_ranges`|`201911L`||[`<algorithm>`](/reference/algorithm.md)<br/>[`<functional>`](/reference/functional.md)<br/>[`<iterator>`](/reference/iterator.md)<br/>[`<memory>`](/reference/memory.md)<br/>[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_remove_cvref`|`201711L`||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_semaphore`|`201907L`||[`<semaphore>`](/reference/semaphore.md)|
|`__cpp_lib_shared_ptr_arrays`|`201707L`||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_shift`|`201806L`||[`<algorithm>`](/reference/algorithm.md)|
|`__cpp_lib_smart_ptr_for_overwrite`|`202002L`||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_source_location`|`201907L`||[`<source_location>`](/reference/source_location.md)|
|`__cpp_lib_span`|`202002L`||[`<span>`](/reference/span.md)|
|`__cpp_lib_ssize`|`201902L`||[`<iterator>`](/reference/iterator.md)|
|`__cpp_lib_starts_ends_with`|`201711L`||[`<string>`](/reference/string.md)<br/>[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_string_view`|`201803L`||[`<string>`](/reference/string.md)<br/>[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_syncbuf`|`201803L`||[`<syncstream>`](/reference/syncstream.md)|
|`__cpp_lib_three_way_comparison`|`201907L`||[`<compare>`](/reference/compare.md)|
|`__cpp_lib_to_address`|`201711L`||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_to_array`|`201907L`||[`<array>`](/reference/array.md)|
|`__cpp_lib_type_identity`|`201806L`||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_unwrap_ref`|`201811L`||[`<type_traits>`](/reference/type_traits.md)|

## 参照

- [SD-FeatureTest: Feature-Test Macros and Policies - isocpp](https://isocpp.org/std/standing-documents/sd-6-sg10-feature-test-recommendations)
