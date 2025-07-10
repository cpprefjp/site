# 機能テストマクロ
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

### 言語機能

| マクロ名 | 値 | 機能 |
|----------|----|------|
|`__cpp_auto_cast`|`202110L`|`auto(x)`および`auto{x}`によるキャスト|
|`__cpp_constexpr`|`202211L`|[constexpr関数内でのstatic constexpr変数を許可](permitting_static_constexpr_variables_in_constexpr_functions.md)|
|`__cpp_explicit_this_parameter`|`202110L`|自身のオブジェクトを明示的にパラメータとして指定する|
|`__cpp_if_consteval`|`202106L`|[if consteval](if_consteval.md)|
|`__cpp_implicit_move`|`202207L`|[暗黙的なムーブを簡略化](simpler_implicit_move.md)|
|`__cpp_multidimensional_subscript`|`202211L`|[添字演算子の多次元サポート](multidimensional_subscript_operator.md)|
|`__cpp_named_character_escapes`|`202207L`|[名前付きユニバーサルキャラクタ名](named_universal_character_escapes.md)|
|`__cpp_range_based_for`|`202211L`|[範囲for文が範囲初期化子内で生じた一時オブジェクトを延命することを規定](lifetime_extension_in_range_based_for_loop.md)|
|`__cpp_size_t_suffix`|`202011L`|[(符号付き)size_tリテラルのためのサフィックス](literal_suffix_for_signed_size_t.md)|
|`__cpp_static_call_operator`|`202207L`|[thisポインタをもつ必要のない演算子をstaticとして宣言できるようにする](static_operator.md)|


### ライブラリ

ライブラリの機能テストマクロは全て[`<version>`](/reference/version.md)でも提供される。

| マクロ名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
|`__cpp_lib_adaptor_iterator_pair_constructor`|`202106L`|[`std::queue`](/reference/queue.md)と[`std::stack`](/reference/stack.md)にイテレータ２つのコンストラクタを追加|[`<queue>`](/reference/queue.md)<br/>[`<stack>`](/reference/stack.md)|
|`__cpp_lib_algorithm_iterator_requirements`|`202207L`|[`<algorithm>`](/reference/algorithm.md)のRangeイテレータ対応|[`<algorithm>`](/reference/algorithm.md)<br/>[`<memory>`](/reference/memory.md)<br/>[`<numeric>`](/reference/numeric.md)|
|`__cpp_lib_allocate_at_least`|`202302L`|[`std::allocator::allocate_at_least()`](/reference/memory/allocator/allocate_at_least.md)の追加|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_associative_heterogeneous_erasure`|`202110L`|テンプレート型を受ける`erase()`の追加|[`<map>`](/reference/map.md)<br/>[`<set>`](/reference/set.md)<br/>[`<unordered_map>`](/reference/unordered_map.md)<br/>[`<unordered_set>`](/reference/unordered_set.md)|
|`__cpp_lib_barrier`|`202302L`|バリアフェーズの完了ステップの仕様変更|[`<barrier>`](/reference/barrier.md)|
|`__cpp_lib_bind_back`|`202202L`|[`std::bind_back()`](/reference/functional/bind_back.md)の追加|[`<functional>`](/reference/functional.md)|
|`__cpp_lib_byteswap`|`202110L`|[`std::byteswap()`](/reference/bit/byteswap.md)の追加|[`<bit>`](/reference/bit.md)|
|`__cpp_lib_common_reference`|`202302L`|`T&`と`reference_wrapper<T>`の`common_reference`を`T&`に変換|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_common_reference_wrapper`|`202302L`|`T&`と`reference_wrapper<T>`の`common_reference`を`T&`に変換|[`<functional>`](/reference/functional.md)|
|`__cpp_lib_concepts`|`202207L`|[`std::equality_comparable_with`](/reference/concepts/equality_comparable.md)などをムーブのみ可能な型に対応|[`<compare>`](/reference/compare.md)<br/>[`<concepts>`](/reference/concepts.md)|
|`__cpp_lib_constexpr_bitset`|`202207L`|[`std::bitset`](/reference/bitset/bitset.md)の`constexpr`対応|[`<bitset>`](/reference/bitset.md)|
|`__cpp_lib_constexpr_charconv`|`202207L`|[`std::to_chars()`](/reference/charconv/to_chars.md)と[`std::from_chars()`](/reference/charconv/from_chars.md)の`constexpr`対応|[`<charconv>`](/reference/charconv.md)|
|`__cpp_lib_constexpr_cmath`|`202202L`|いくつかの関数を`constexpr`対応|[`<cmath>`](/reference/cmath.md)<br/>[`<cstdlib>`](/reference/cstdlib.md)|
|`__cpp_lib_constexpr_memory`|`202202L`|[`std::unique_ptr`](/reference/memory/unique_ptr.md)の`constexpr`対応|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_constexpr_typeinfo`|`202106L`|[`std::type_info::operator==()`](/reference/typeinfo/type_info/op_equal.md)の`constexpr`対応|[`<typeinfo>`](/reference/typeinfo.md)|
|`__cpp_lib_containers_ranges`|`202202L`|コンテナのコンストラクタのRange対応|[`<vector>`](/reference/vector.md)<br/>[`<list>`](/reference/list.md)<br/>[`<forward_list>`](/reference/forward_list.md)<br/>[`<map>`](/reference/map.md)<br/>[`<set>`](/reference/set.md)<br/>[`<unordered_map>`](/reference/unordered_map.md)<br/>[`<unordered_set>`](/reference/unordered_set.md)<br/>[`<deque>`](/reference/deque.md)<br/>[`<queue>`](/reference/queue.md)<br/>[`<stack>`](/reference/stack.md)<br/>[`<string>`](/reference/string.md)|
|`__cpp_lib_expected`|`202211L`|[`<expected>`](/reference/expected.md)の追加|[`<expected>`](/reference/expected.md)|
|`__cpp_lib_flat_map`|`202207L`|[`std::flat_map`](/reference/flat_map/flat_map.md)と[`std::flat_multimap`](/reference/flat_map/flat_multimap.md)の追加|[`<flat_map>`](/reference/flat_map.md)|
|`__cpp_lib_flat_set`|`202207L`|[`std::flat_set`](/reference/flat_set/flat_set.md)と[`std::flat_multiset`](/reference/flat_set/flat_multiset.md)の追加|[`<flat_set>`](/reference/flat_set.md)|
|`__cpp_lib_format`|`202207L`|`std::format`の時刻型のローカライズ対応|[`<format>`](/reference/format.md)|
|`__cpp_lib_format_ranges`|`202207L`|[`std::formatter`](/reference/format/formatter.md)のRange対応|[`<format>`](/reference/format.md)|
|`__cpp_lib_formatters`|`202302L`|[`std::formatter`](/reference/format/formatter.md)の[`std::stacktrace`](/reference/stacktrace/basic_stacktrace.md)対応と[`std::thread::id`](/reference/thread/thread/id.md)対応|[`<stacktrace>`](/reference/stacktrace.md)<br/>[`<thread>`](/reference/thread.md)|
|`__cpp_lib_forward_like`|`202207L`|[`std::forward_like()`](/reference/utility/forward_like.md)の追加|[`<utility>`](/reference/utility.md)|
|`__cpp_lib_generator`|`202207L`|[`std::generator`](/reference/generator/generator.md)の追加|[`<generator>`](/reference/generator.md)|
|`__cpp_lib_invoke_r`|`202106L`|[`std::invoke_r()`](/reference/functional/invoke_r.md)の追加|[`<functional>`](/reference/functional.md)|
|`__cpp_lib_ios_noreplace`|`202207L`|[`std::ios::noreplace`](/reference/ios/ios_base/type-openmode.md)の追加|[`<ios>`](/reference/ios.md)|
|`__cpp_lib_is_implicit_lifetime`|`202302L`|[`std::is_implicit_lifetime`](/reference/type_traits/is_implicit_lifetime.md)の追加|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_is_scoped_enum`|`202011L`|[`std::is_scoped_enum`](/reference/type_traits/is_scoped_enum.md)の追加|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_mdspan`|`202207L`|[`<mdspan>`](/reference/mdspan.md)の追加|[`<mdspan>`](/reference/mdspan.md)|
|`__cpp_lib_modules`|`202207L`|モジュール[`<std>`](/module/std.md)と[`<std.compat>`](/module/std.compat.md)の追加||
|`__cpp_lib_move_iterator_concept`|`202207L`|[`std::move_iterator<T*>`](/reference/iterator/move_iterator.md)をランダムアクセスイテレータにする|[`<iterator>`](/reference/iterator.md)|
|`__cpp_lib_move_only_function`|`202110L`|[`std::move_only_function`](/reference/functional/move_only_function.md)の追加|[`<functional>`](/reference/functional.md)|
|`__cpp_lib_optional`|`202110L`|[`std::optional`](/reference/optional/optional.md)にモナド操作を追加|[`<optional>`](/reference/optional.md)|
|`__cpp_lib_out_ptr`|`202106L`|[`std::out_ptr`](/reference/memory/out_ptr.md)と[`std::inout_ptr`](/reference/memory/inout_ptr.md)の追加|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_ranges`|`202302L`|[`std::ranges::range_adaptor_closure`](/reference/ranges/range_adaptor_closure.md)の追加<br/>[`<ranges>`](/reference/ranges.md)の様々な機能追加|[`<algorithm>`](/reference/algorithm.md)<br/>[`<functional>`](/reference/functional.md)<br/>[`<iterator>`](/reference/iterator.md)<br/>[`<memory>`](/reference/memory.md)<br/>[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_as_const`|`202207L`|[`std::ranges::cbegin`](/reference/ranges/cbegin.md)が常に定数イテレータを返すようにする。[`std::ranges::as_const_view`](/reference/ranges/as_const_view.md)の追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_as_rvalue`|`202207L`|[`std::ranges::as_rvalue_view`](/reference/ranges/as_rvalue_view.md)の追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_cartesian_product`|`202207L`|[`std::ranges::cartesian_product_view`](/reference/ranges/cartesian_product_view.md)の追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_chunk`|`202202L`|[`std::ranges::chunk_view`](/reference/ranges/chunk_view.md)の追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_chunk_by`|`202202L`|[`std::ranges::chunk_by_view`](/reference/ranges/chunk_by_view.md)の追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_contains`|`202207L`|[`std::ranges::contains()`](/reference/algorithm/ranges_contains.md)の追加|[`<algorithm>`](/reference/algorithm.md)|
|`__cpp_lib_ranges_enumerate`|`202302L`|[`std::ranges::enumerate_view`](/reference/ranges/enumerate_view.md)の追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_find_last`|`202207L`|[`std::ranges::find_last()`](/reference/algorithm/ranges_find_last.md)と[`std::ranges::find_last_if()`](/reference/algorithm/ranges_find_last_if.md)と[`std::ranges::find_last_if_not()`](/reference/algorithm/ranges_find_last_if_not.md)の追加|[`<algorithm>`](/reference/algorithm.md)|
|`__cpp_lib_ranges_fold`|`202207L`|`std::ranges::`に`fold`アルゴリズムの追加|[`<algorithm>`](/reference/algorithm.md)|
|`__cpp_lib_ranges_iota`|`202202L`|[`std::ranges::iota()`](/reference/numeric/ranges_iota.md)の追加|[`<numeric>`](/reference/numeric.md)|
|`__cpp_lib_ranges_join_with`|`202202L`|[`std::ranges::join_with_view`](/reference/ranges/join_with_view.md)の追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_repeat`|`202207L`|[`std::ranges::repeat_view`](/reference/ranges/repeat_view.md)の追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_slide`|`202202L`|[`std::ranges::slide_view`](/reference/ranges/slide_view.md)の追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_starts_ends_with`|`202106L`|[`std::ranges::starts_with()`](/reference/algorithm/ranges_starts_with.md)と[`std::ranges::ends_with()`](/reference/algorithm/ranges_ends_with.md)の追加|[`<algorithm>`](/reference/algorithm.md)|
|`__cpp_lib_ranges_stride`|`202207L`|[`std::ranges::stride_view`](/reference/ranges/stride_view.md)の追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_to_container`|`202202L`|[`std::ranges::to`](/reference/ranges/to.md)の追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_zip`|`202110L`|[`std::ranges::zip_view`](/reference/ranges/zip_view.md)と[`std::ranges::zip_transform_view`](/reference/ranges/zip_transform_view.md)と[`std::ranges::adjacent_view`](/reference/ranges/adjacent_view.md)と[`std::ranges::adjacent_transform_view`](/reference/ranges/adjacent_transform_view.md)の追加|[`<ranges>`](/reference/ranges.md)<br/>[`<tuple>`](/reference/tuple.md)<br/>[`<utility>`](/reference/utility.md)|
|`__cpp_lib_reference_from_temporary`|`202202L`|[`std::reference_constructs_from_temporary`](/reference/type_traits/reference_constructs_from_temporary.md)と[`std::reference_converts_from_temporary`](/reference/type_traits/reference_converts_from_temporary.md)の追加|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_shift`|`202202L`|[`std::ranges::shift_left()`](/reference/algorithm/ranges_shift_left.md)と[`std::ranges::shift_right()`](/reference/algorithm/ranges_shift_right.md)の追加|[`<algorithm>`](/reference/algorithm.md)|
|`__cpp_lib_spanstream`|`202106L`|`<spanstream>`の追加|`<spanstream>`|
|`__cpp_lib_stacktrace`|`202011L`|[`<stacktrace>`](/reference/stacktrace.md)の追加|[`<stacktrace>`](/reference/stacktrace.md)|
|`__cpp_lib_start_lifetime_as`|`202207L`|[`std::start_lifetime_as()`](/reference/memory/start_lifetime_as.md)の追加|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_stdatomic_h`|`202011L`|[`<stdatomic.h>`](/reference/stdatomic.h.md)の追加|[`<stdatomic.h>`](/reference/stdatomic.h.md)|
|`__cpp_lib_string_contains`|`202011L`|[`std::basic_string::contains()`](/reference/string/basic_string/contains.md)と[`std::basic_string_view::contains()`](/reference/string_view/basic_string_view/contains.md)の追加|[`<string>`](/reference/string.md)<br/>[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_string_resize_and_overwrite`|`202110L`|[`std::basic_string::resize_and_overwrite()`](/reference/string/basic_string/resize_and_overwrite.md)の追加|[`<string>`](/reference/string.md)|
|`__cpp_lib_to_underlying`|`202102L`|[`std::to_underlying()`](/reference/utility/to_underlying.md)の追加|[`<utility>`](/reference/utility.md)|
|`__cpp_lib_tuple_like`|`202207L`|[`tuple-like`](/reference/tuple/tuple-like.md)コンセプトの追加|[`<map>`](/reference/map.md)<br/>[`<tuple>`](/reference/tuple.md)<br/>[`<unordered_map>`](/reference/unordered_map.md)<br/>[`<utility>`](/reference/utility.md)|
|`__cpp_lib_unreachable`|`202202L`|[`std::unreachable()`](/reference/utility/unreachable.md)の追加|[`<utility>`](/reference/utility.md)|
|`__cpp_lib_print`|`202403L`|[`<print>`](/reference/print.md)の追加|[`<ostream>`](/reference/ostream.md)<br/>[`<print>`](/reference/print.md)|


## 参照

- [SD-FeatureTest: Feature-Test Macros and Policies - isocpp](https://isocpp.org/std/standing-documents/sd-6-sg10-feature-test-recommendations)
