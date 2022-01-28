# 機能テストマクロ
* cpp20[meta cpp]

## 概要

### 言語機能

| マクロ名 | 値 | 機能 |
|----------|----|------|
|`__cpp_aggregate_paren_init`|201902L||
|`__cpp_char8_t`|201811L||
|`__cpp_concepts`|201907L||
|`__cpp_conditional_explicit`|201806L||
|`__cpp_constexpr`|201907L||
|`__cpp_constexpr_dynamic_alloc`|201907L||
|`__cpp_constexpr_in_decltype`|201711L||
|`__cpp_consteval`|201811L||
|`__cpp_constinit`|201907L||
|`__cpp_deduction_guides`|201907L||
|`__cpp_designated_initializers`|201707L||
|`__cpp_generic_lambdas`|201707L||
|`__cpp_impl_coroutine`|201902L||
|`__cpp_impl_destroying_delete`|201806L||
|`__cpp_impl_three_way_comparison`|201907L||
|`__cpp_init_captures`|201803L||
|`__cpp_modules`|201907L||
|`__cpp_nontype_template_args`|201911L||
|`__cpp_using_enum`|201907L||

### ライブラリ

ライブラリの機能テストマクロは全て[`<version>`](/reference/version.md)でも提供される。

| マクロ名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
|`__cpp_lib_array_constexpr`|201811L||[`<iterator>`](/reference/iterator.md)<br/>[`<array>`](/reference/array.md)|
|`__cpp_lib_assume_aligned`|201811L||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_atomic_flag_test`|201907L||[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_float`|201711L||[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_lock_free_type_aliases`|201907L||[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_ref`|201806L||[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_shared_ptr`|201711L||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_atomic_value_initialization`|201911L||[`<atomic>`](/reference/atomic.md)<br/>[`<memory>`](/reference/memory.md)|
|`__cpp_lib_atomic_wait`|201907L||[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_barrier`|201907L||[`<barrier>`](/reference/barrier.md)|
|`__cpp_lib_bind_front`|201907L||[`<functional>`](/reference/functional.md)|
|`__cpp_lib_bit_cast`|201806L||[`<bit>`](/reference/bit.md)|
|`__cpp_lib_bitops`|201907L||[`<bit>`](/reference/bit.md)|
|`__cpp_lib_bounded_array_traits`|201902L||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_char8_t`|201907L||[`<atomic>`](/reference/atomic.md)<br/>[`<filesystem>`](/reference/filesystem.md)<br/>[`<istream>`](/reference/istream.md)<br/>[`<limits>`](/reference/limits.md)<br/>[`<locale>`](/reference/locale.md)<br/>[`<ostream>`](/reference/ostream.md)<br/>[`<string>`](/reference/string.md)<br/>[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_chrono`|201907L||[`<chrono>`](/reference/chrono.md)|
|`__cpp_lib_concepts`|202002L||[`<concepts>`](/reference/concepts.md)|
|`__cpp_lib_constexpr_algorithms`|201806L||[`<algorithm>`](/reference/algorithm.md)|
|`__cpp_lib_constexpr_complex`|201711L||[`<complex>`](/reference/complex.md)|
|`__cpp_lib_constexpr_dynamic_alloc`|201907L||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_constexpr_functional`|201907L||[`<functional>`](/reference/functional.md)|
|`__cpp_lib_constexpr_iterator`|201811L||[`<iterator>`](/reference/iterator.md)|
|`__cpp_lib_constexpr_memory`|201811L||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_constexpr_numeric`|201911L||[`<numeric>`](/reference/numeric.md)|
|`__cpp_lib_constexpr_string`|201907L||[`<string>`](/reference/string.md)|
|`__cpp_lib_constexpr_string_view`|201811L||[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_constexpr_tuple`|201811L||[`<tuple>`](/reference/tuple.md)|
|`__cpp_lib_constexpr_utility`|201811L||[`<utility>`](/reference/utility.md)|
|`__cpp_lib_constexpr_vector`|201907L||[`<vector>`](/reference/vector.md)|
|`__cpp_lib_coroutine`|201902L||[`<coroutine>`](/reference/coroutine.md)|
|`__cpp_lib_destroying_delete`|201806L||[`<new>`](/reference/new.md)|
|`__cpp_lib_endian`|201907L||[`<bit>`](/reference/bit.md)|
|`__cpp_lib_erase_if`|202002L||[`<string>`](/reference/string.md)<br/>[`<deque>`](/reference/deque.md)<br/>[`<forward_list>`](/reference/forward_list.md)<br/>[`<list>`](/reference/list.md)<br/>[`<vector>`](/reference/vector.md)<br/>[`<map>`](/reference/map.md)<br/>[`<set>`](/reference/set.md)<br/>[`<unordered_map>`](/reference/unordered_map.md)<br/>[`<unordered_set>`](/reference/unordered_set.md)|
|`__cpp_lib_execution`|201902L||[`<execution>`](/reference/execution.md)|
|`__cpp_lib_format`|201907L||[`<format>`](/reference/format.md)|
|`__cpp_lib_generic_unordered_lookup`|201811L||[`<unordered_map>`](/reference/unordered_map.md)<br/>[`<unordered_set>`](/reference/unordered_set.md)|
|`__cpp_lib_int_pow2`|202002L||[`<bit>`](/reference/bit.md)|
|`__cpp_lib_integer_comparison_functions`|202002L||[`<utility>`](/reference/utility.md)|
|`__cpp_lib_interpolate`|201902L||[`<cmath>`](/reference/cmath.md)<br/>[`<numeric>`](/reference/numeric.md)|
|`__cpp_lib_is_constant_evaluated`|201811L||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_is_layout_compatible`|201907L||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_is_nothrow_convertible`|201806L||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_is_pointer_interconvertible`|201907L||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_jthread`|201911L||[`<stop_token>`](/reference/stop_token.md)<br/>[`<thread>`](/reference/thread.md)|
|`__cpp_lib_latch`|201907L||[`<latch>`](/reference/latch.md)|
|`__cpp_lib_list_remove_return_type`|201806L||[`<forward_list>`](/reference/forward_list.md)<br/>[`<list>`](/reference/list.md)|
|`__cpp_lib_math_constants`|201907L||[`<numbers>`](/reference/numbers.md)|
|`__cpp_lib_polymorphic_allocator`|201902L||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_ranges`|201911L||[`<algorithm>`](/reference/algorithm.md)<br/>[`<functional>`](/reference/functional.md)<br/>[`<iterator>`](/reference/iterator.md)<br/>[`<memory>`](/reference/memory.md)<br/>[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_remove_cvref`|201711L||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_semaphore`|201907L||[`<semaphore>`](/reference/semaphore.md)|
|`__cpp_lib_shared_ptr_arrays`|201707L||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_shift`|201806L||[`<algorithm>`](/reference/algorithm.md)|
|`__cpp_lib_smart_ptr_for_overwrite`|202002L||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_source_location`|201907L||[`<source_location>`](/reference/source_location.md)|
|`__cpp_lib_span`|202002L||[`<span>`](/reference/span.md)|
|`__cpp_lib_ssize`|201902L||[`<iterator>`](/reference/iterator.md)|
|`__cpp_lib_starts_ends_with`|201711L||[`<string>`](/reference/string.md)<br/>[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_string_view`|201803L||[`<string>`](/reference/string.md)<br/>[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_syncbuf`|201803L||[`<syncstream>`](/reference/syncstream.md)|
|`__cpp_lib_three_way_comparison`|201907L||[`<compare>`](/reference/compare.md)|
|`__cpp_lib_to_address`|201711L||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_to_array`|201907L||[`<array>`](/reference/array.md)|
|`__cpp_lib_type_identity`|201806L||[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_unwrap_ref`|201811L||[`<type_traits>`](/reference/type_traits.md)|

## 参照