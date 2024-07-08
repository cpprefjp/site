# 機能テストマクロ
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため関連項目を参照してください。

<!-- last lang caution -->

## 概要

### 言語機能

| マクロ名 | 値 | 機能 |
|----------|----|------|
|`__cpp_aggregate_paren_init`|`201902L`|[丸カッコの値リストからの集成体初期化を許可](allow_initializing_aggregates_from_a_parenthesized_list_of_values.md)|
|`__cpp_char8_t`|`201811L`|[UTF-8エンコーディングされた文字の型として`char8_t`を追加](char8_t.md)|
|`__cpp_concepts`|`201907L`|[コンセプト](concepts.md)|
|`__cpp_conditional_explicit`|`201806L`|[関数を条件付きで`explicit`にする構文を追加](explicit_bool.md)|
|`__cpp_constexpr`|`201907L`<br/>`202002L`|[定数式からの仮想関数の呼び出しを許可](allow_virtual_function_calls_in_constant_expressions.md)<br/>[定数式での`dynamic_cast`、多態的な`typeid`を許可](allowing_dynamic_cast_polymorphic_typeid_in_constant_expressions.md)<br/>[constexpr関数内でのtry-catchブロックを許可](try-catch_blocks_in_constexpr_functions.md)<br/>[定数式内での共用体のアクティブメンバの変更を許可](changing_the_active_member_of_a_union_inside_constexpr.md)<br/>[constexpr関数内でのトリビアルなデフォルト初期化を許可](permitting_trivial_default_initialization_in_constexpr_contexts.md)<br/>[constexpr関数内で未評価のインラインアセンブリを許可することによる組み込み関数のconstexpr有効化](enabling_constexpr_intrinsics_by_permitting_unevaluated_inline-assembly_in_constexpr_functions.md)|
|`__cpp_constexpr_dynamic_alloc`|`201907L`|[可変サイズをもつコンテナの`constexpr`化](more_constexpr_containers.md)|
|`__cpp_constexpr_in_decltype`|`201711L`|[評価されない文脈での定数式評価によって特殊メンバ関数がインスタンス化されることを規定](less_eager_instantiation_of_constexpr_functions.md)|
|`__cpp_consteval`|`201811L`|[即時関数](immediate_functions.md)|
|`__cpp_constinit`|`201907L`|[コンパイル時初期化を強制する`constinit`キーワードを追加](constinit.md)|
|`__cpp_deduction_guides`|`201907L`|[集成体クラステンプレートのテンプレート引数推論](class_template_argument_deduction_for_aggregates.md)<br/>[エイリアステンプレート経由でのクラステンプレートのテンプレート引数推論](class_template_argument_deduction_for_alias_templates.md)|
|`__cpp_designated_initializers`|`201707L`|[指示付き初期化](designated_initialization.md)|
|`__cpp_generic_lambdas`|`201707L`|[ジェネリックラムダのテンプレート構文](familiar_template_syntax_for_generic_lambdas.md)|
|`__cpp_impl_coroutine`|`201902L`|[コルーチン](coroutines.md)|
|`__cpp_impl_destroying_delete`|`201806L`|[可変長データを扱うクラスの効率的な`delete`](efficient_sized_delete_for_variable_sized_classes.md)|
|`__cpp_impl_three_way_comparison`|`201907L`|[一貫比較](consistent_comparison.md)|
|`__cpp_init_captures`|`201803L`|[ラムダ式の初期化キャプチャでのパック展開を許可](allow_pack_expansion_in_lambda_init_capture.md)|
|`__cpp_modules`|`201907L`|[モジュール](modules.md)|
|`__cpp_nontype_template_args`|`201911L`|[非型テンプレートパラメータとしてクラス型を許可する](class_types_in_non-type_template_parameters.md)|
|`__cpp_using_enum`|`201907L`|[スコープ付き列挙型のusing宣言](using_enum.md)|

### ライブラリ

ライブラリの機能テストマクロは全て[`<version>`](/reference/version.md)でも提供される。

| マクロ名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
|`__cpp_lib_array_constexpr`|`201803L`<br/>`201806L`<br/>`201811L`|`std::array`の完全`constexpr`対応|[`<iterator>`](/reference/iterator.md)<br/>[`<array>`](/reference/array.md)|
|`__cpp_lib_assume_aligned`|`201811L`|[`std::assume_aligned()`](/reference/memory/assume_aligned.md)|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_atomic_flag_test`|`201907L`|[`std::atomic_flag::test()`](/reference/atomic/atomic_flag/test.md)|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_float`|`201711L`|[`std::atomic`の浮動小数点数型に対する特殊化](/reference/atomic/atomic.md)|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_lock_free_type_aliases`|`201907L`|[`atomic_signed_lock_free/atomic_unsigned_lock_free`](/reference/atomic/atomic.md)|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_ref`|`201806L`|[`std::atomic_ref`](/reference/atomic/atomic_ref.md)|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_shared_ptr`|`201711L`|[`std::atomic`の`std::shared_ptr/std::weak_ptr`に対する特殊化](/reference/memory/atomic.md)|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_atomic_value_initialization`|`201911L`|[`std::atomic_flag`の値初期化](/reference/atomic/atomic_flag/op_constructor.md)|[`<atomic>`](/reference/atomic.md)<br/>[`<memory>`](/reference/memory.md)|
|`__cpp_lib_atomic_wait`|`201907L`|[`std::atomic::wait()`](/reference/atomic/atomic/wait.md)、[`std::atomic::notify_one()`](/reference/atomic/atomic/notify_one.md)、[`std::atomic::notify_all()`](/reference/atomic/atomic/notify_all.md)|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_barrier`|`201907L`|[`<barrier>`](/reference/barrier.md)の追加|[`<barrier>`](/reference/barrier.md)|
|`__cpp_lib_bind_front`|`201811L`<br/>`201907L`|[`std::bind_front()`](/reference/functional/bind_front.md)|[`<functional>`](/reference/functional.md)|
|`__cpp_lib_bit_cast`|`201806L`|[`std::bit_cast()`](/reference/bit/bit_cast.md)|[`<bit>`](/reference/bit.md)|
|`__cpp_lib_bitops`|`201907L`|[`<bit>`](/reference/bit.md)の追加|[`<bit>`](/reference/bit.md)|
|`__cpp_lib_bounded_array_traits`|`201902L`|[`std::is_bounded_array`](/reference/type_traits/is_bounded_array.md)、[`std::is_unbounded_array`](/reference/type_traits/is_unbounded_array.md)|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_char8_t`|`201811L`<br/>`201907L`|`char8_t`に対する特殊化の追加|[`<atomic>`](/reference/atomic.md)<br/>[`<filesystem>`](/reference/filesystem.md)<br/>[`<istream>`](/reference/istream.md)<br/>[`<limits>`](/reference/limits.md)<br/>[`<locale>`](/reference/locale.md)<br/>[`<ostream>`](/reference/ostream.md)<br/>[`<string>`](/reference/string.md)<br/>[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_chrono`|`201907L`|カレンダーとタイムゾーン|[`<chrono>`](/reference/chrono.md)|
|`__cpp_lib_concepts`|`202002L`|[`<concepts>`](/reference/concepts.md)の追加|[`<concepts>`](/reference/concepts.md)|
|`__cpp_lib_constexpr_algorithms`|`201806L`|多くのアルゴリズムに`constexpr`を追加|[`<algorithm>`](/reference/algorithm.md)|
|`__cpp_lib_constexpr_complex`|`201711L`|[`std::complex`](/reference/complex/complex.md)の`constexpr`対応|[`<complex>`](/reference/complex.md)|
|`__cpp_lib_constexpr_dynamic_alloc`|`201907L`|[`std::destroy_at`](/reference/memory/destroy_at.md)ファミリと[`std::allocator`](/reference/memory/allocator.md)/[`std::alocator_traits`](/reference/memory/allocator_traits.md)の`constexpr`対応<br/>[`std::construct_at`](/reference/memory/construct_at.md)|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_constexpr_functional`|`201907L`|`std::invoke`、`std::reference_wrapper`、`std::not_fn`、`std::bind_front`、`std::bind`、`std::mem_fn`の`constexpr`対応|[`<functional>`](/reference/functional.md)|
|`__cpp_lib_constexpr_iterator`|`201811L`|[`back_insert_iterator`](/reference/iterator/back_insert_iterator.md)、[`front_insert_iterator`](/reference/iterator/front_insert_iterator.md)、[`insert_iterator`](/reference/iterator/insert_iterator.md)の`constexpr`対応|[`<iterator>`](/reference/iterator.md)|
|`__cpp_lib_constexpr_memory`|`201811L`|[`std::pointer_traits`](/reference/memory/pointer_traits.md)の`constexpr`対応|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_constexpr_numeric`|`201911L`|[`<numeric>`](/reference/numeric.md)の数値アルゴリズムの`constexpr`対応|[`<numeric>`](/reference/numeric.md)|
|`__cpp_lib_constexpr_string`|`201907L`|[`std::string`](/reference/string/basic_string.md)の`constexpr`対応|[`<string>`](/reference/string.md)|
|`__cpp_lib_constexpr_string_view`|`201811L`|[`std::string_view::copy`](/reference/string_view/basic_string_view/copy.md)の`constexpr`対応|[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_constexpr_tuple`|`201811L`|[`std::tuple`](/reference/tuple/tuple.md)の`constexpr`追加対応（一部のコンストラクタと代入演算子）|[`<tuple>`](/reference/tuple.md)|
|`__cpp_lib_constexpr_utility`|`201811L`|[`std::pair`](/reference/utility/pair.md)の`constexpr`追加対応（一部のコンストラクタと代入演算子）|[`<utility>`](/reference/utility.md)|
|`__cpp_lib_constexpr_vector`|`201907L`|[`std::vector`](/reference/vector/vector.md)の`constexpr`対応|[`<vector>`](/reference/vector.md)|
|`__cpp_lib_coroutine`|`201902L`|[`<coroutine>`](/reference/coroutine.md)ヘッダの追加|[`<coroutine>`](/reference/coroutine.md)|
|`__cpp_lib_destroying_delete`|`201806L`|[`std::destroying_delete_t`](/reference/new/destroying_delete_t.md)|[`<new>`](/reference/new.md)|
|`__cpp_lib_endian`|`201907L`|[`std::endian`](/reference/bit/endian.md)|[`<bit>`](/reference/bit.md)|
|`__cpp_lib_erase_if`|`202002L`|各コンテナに対する`std::erase`、`std::erase_if`の特殊化|[`<string>`](/reference/string.md)<br/>[`<deque>`](/reference/deque.md)<br/>[`<forward_list>`](/reference/forward_list.md)<br/>[`<list>`](/reference/list.md)<br/>[`<vector>`](/reference/vector.md)<br/>[`<map>`](/reference/map.md)<br/>[`<set>`](/reference/set.md)<br/>[`<unordered_map>`](/reference/unordered_map.md)<br/>[`<unordered_set>`](/reference/unordered_set.md)|
|`__cpp_lib_execution`|`201902L`|[`std::execution::unsequenced_policy`](/reference/execution/execution/execution_policy.md)|[`<execution>`](/reference/execution.md)|
|`__cpp_lib_format`|`201907L`<br/>`202106L`<br/>`202110L`|`<format>`ヘッダ<br/>コンパイル時フォーマット文字列検査/[`std::vformat`](/reference/format/vformat.md)のコードサイズ削減<br/>`std::chrono`のフォーマットにおけるロケール指定の修正/`const`だとフォーマットできない型に対する対応|[`<format>`](/reference/format.md)|
|`__cpp_lib_generic_unordered_lookup`|`201811L`|非順序連想コンテナの`find(), count(), contains(), equal_range()`に対するHeterogeneous Overload追加|[`<unordered_map>`](/reference/unordered_map.md)<br/>[`<unordered_set>`](/reference/unordered_set.md)|
|`__cpp_lib_int_pow2`|`202002L`|`<bit>`の2の冪乗に関する操作を行う関数の名前変更|[`<bit>`](/reference/bit.md)|
|`__cpp_lib_integer_comparison_functions`|`202002L`|[`std::cmp_equal()`](/reference/utility/cmp_equal.md)等の整数比較関数と[`std::in_range()`](/reference/utility/in_range.md)|[`<utility>`](/reference/utility.md)|
|`__cpp_lib_interpolate`|`201902L`|[`std::lerp()`](/reference/cmath/lerp.md)と[`std::midpoint()`](/reference/numeric/midpoint.md)|[`<cmath>`](/reference/cmath.md)<br/>[`<numeric>`](/reference/numeric.md)|
|`__cpp_lib_is_constant_evaluated`|`201811L`|[`std::is_constant_evaluated()`](/reference/type_traits/is_constant_evaluated.md)|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_is_layout_compatible`|`201907L`|[`std::is_layout_compatible`](/reference/type_traits/is_layout_compatible.md)と[`is_corresponding_member`](/reference/type_traits/is_corresponding_member.md)|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_is_nothrow_convertible`|`201806L`|[`std::is_nothrow_convertible`](/reference/type_traits/is_nothrow_convertible.md)|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_is_pointer_interconvertible`|`201907L`|[`std::is_corresponding_member`](/reference/type_traits/is_corresponding_member.md)と[`std::is_pointer_interconvertible_base_of`](/reference/type_traits/is_pointer_interconvertible_base_of.md)|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_jthread`|`201911L`|[`std::jthread`](/reference/thread/jthread.md)と`stop_token`による協調的キャンセル機構|[`<stop_token>`](/reference/stop_token.md)<br/>[`<thread>`](/reference/thread.md)|
|`__cpp_lib_latch`|`201907L`|[`std::latch`](/reference/latch/latch.md)|[`<latch>`](/reference/latch.md)|
|`__cpp_lib_list_remove_return_type`|`201806L`|`std::list`と`std::forward_list`の`remove(), remove_if(), unique()`の戻り値型変更|[`<forward_list>`](/reference/forward_list.md)<br/>[`<list>`](/reference/list.md)|
|`__cpp_lib_math_constants`|`201907L`|数学定数|[`<numbers>`](/reference/numbers.md)|
|`__cpp_lib_polymorphic_allocator`|`201902L`|[`std::pmr::polymorphic_allocator`](/reference/memory_resource/polymorphic_allocator.md)の改修|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_ranges`|`201911L`<br/>`202106L`<br/>`202110L`|RangeライブラリとRangeアルゴリズム<br/>[`view`](/reference/ranges/view.md)コンセプトのデフォルト構築要求を削除<br/>所有権を持つ`view`の許可と[`owning_view`](/reference/ranges/owning_view.md)|[`<algorithm>`](/reference/algorithm.md)<br/>[`<functional>`](/reference/functional.md)<br/>[`<iterator>`](/reference/iterator.md)<br/>[`<memory>`](/reference/memory.md)<br/>[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_remove_cvref`|`201711L`|[`std::remove_cvref`](/reference/type_traits/remove_cvref.md)|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_semaphore`|`201907L`|[`std::counting_semaphore`](/reference/semaphore/counting_semaphore.md)と`std::binary_semaphore`|[`<semaphore>`](/reference/semaphore.md)|
|`__cpp_lib_shared_ptr_arrays`|`201707L`|[`std::make_shared`](/reference/memory/make_shared.md)と[`std::allocate_shared`](/reference/memory/allocate_shared.md)の配列対応|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_shift`|`201806L`|[`std::shift_left`](/reference/algorithm/shift_left.md)と[`std::shift_right`](/reference/algorithm/shift_right.md)|[`<algorithm>`](/reference/algorithm.md)|
|`__cpp_lib_smart_ptr_for_overwrite`|`202002L`|[`std::make_shared_for_overwrite()`](/reference/memory/make_shared_for_overwrite.md)と[`std::allocate_shared_for_overwrite()`](/reference/memory/allocate_shared_for_overwrite.md)|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_source_location`|`201907L`|[`std::source_location`](/reference/source_location/source_location.md)|[`<source_location>`](/reference/source_location.md)|
|`__cpp_lib_span`|`202002L`|[`std::span`](/reference/span/span.md)|[`<span>`](/reference/span.md)|
|`__cpp_lib_ssize`|`201902L`|[`std::ssize()`](/reference/iterator/ssize.md)と`std::span`で使用する整数型の符号なし（`size_t`）への変更|[`<iterator>`](/reference/iterator.md)|
|`__cpp_lib_starts_ends_with`|`201711L`|`std::string`と`std::string_view`の`starts_with()`と`ends_with()`|[`<string>`](/reference/string.md)<br/>[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_string_view`|`201803L`|`std::string`と`std::string_view`のイテレータの`constexpr`対応|[`<string>`](/reference/string.md)<br/>[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_syncbuf`|`201803L`|同期化出力ストリーム（`std::osyncstream`）とバッファ（`std::syncbuf`）|[`<syncstream>`](/reference/syncstream.md)|
|`__cpp_lib_three_way_comparison`|`201907L`|標準ライブラリの三方比較演算子対応|[`<compare>`](/reference/compare.md)|
|`__cpp_lib_to_address`|`201711L`|[`std::to_address()`](/reference/memory/to_address.md)|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_to_array`|`201907L`|[`std::to_array()`](/reference/array/to_array.md)|[`<array>`](/reference/array.md)|
|`__cpp_lib_type_identity`|`201806L`|[`std::type_identity`](/reference/type_traits/type_identity.md)|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_unwrap_ref`|`201811L`|[`std::unwrap_reference`](/reference/type_traits/unwrap_reference.md)と[`std::unwrap_ref_decay`](/reference/type_traits/unwrap_ref_decay.md)|[`<type_traits>`](/reference/type_traits.md)|

## 参照

- [SD-FeatureTest: Feature-Test Macros and Policies - isocpp](https://isocpp.org/std/standing-documents/sd-6-sg10-feature-test-recommendations)