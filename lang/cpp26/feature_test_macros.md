# 機能テストマクロ
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

### 言語機能

| マクロ名 | 値 | 機能 |
|----------|----|------|
|`__cpp_constexpr`|`202406L`|[定数式での`void*`からポインタ型へのキャストを許可](/lang/cpp26/constexpr_cast_from_voidptr.md)<br/>[`constexpr`配置`new`](/lang/cpp26/constexpr_placement_new.md)|
|`__cpp_constexpr_exceptions`|`202411L`|[定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)|
|`__cpp_constexpr_virtual_inheritance`|`202506L`|`constexpr`仮想継承を許可|
|`__cpp_contracts`|`202502L`|[契約プログラミングをサポートする](/lang/cpp26/contracts.md)|
|`__cpp_deleted_function`|`202403L`|[関数宣言を削除する理由を指定できるようにする](/lang/cpp26/delete_reason.md)|
|`__cpp_expansion_statements`|`202506L`|[コンパイル時のタプルやリストを展開処理する`template for`文](/lang/cpp26/expansion_statements.md.nolink)|
|`__cpp_impl_reflection`|`202506L`|静的リフレクション|
|`__cpp_pack_indexing`|`202311L`|[パラメータパックへのインデックスアクセスを許可](/lang/cpp26/pack_indexing.md)|
|`__cpp_placeholder_variables`|`202306L`|[宣言のみで使用しない変数の名前として`_`をサポート](/lang/cpp26/nice_placeholder_with_no_name.md)|
|`__cpp_pp_embed`|`202502L`|[ファイルを読み込む`#embed`命令を追加](/lang/cpp26/embed.md)|
|`__cpp_static_assert`|`202306L`|[`static_assert`の診断メッセージにユーザーが生成した文字列の指定を許可](/lang/cpp26/user-generated_static_assert_messages.md)|
|`__cpp_structured_bindings`|`202411L`|[構造化束縛への属性を許可](/lang/cpp26/attributes_for_structured_bindings.md)<br/>[構造化束縛でパックを導入できるようにする](/lang/cpp26/structured_bindings_can_introduce_a_pack.md)|
|`__cpp_template_parameters`|`202502L`|コンセプトと変数テンプレートにテンプレートテンプレートパラメータのサポートを追加|
|`__cpp_trivial_relocatability`|`202502L`|トリビアルな再配置|
|`__cpp_trivial_union`|`202502L`|共用体をトリビアルに未初期化できるようにする|
|`__cpp_variadic_friend`|`202403L`|[可変引数テンプレートで`friend`宣言をできるようにする](/lang/cpp26/variadic_friends.md)|


### ライブラリ

ライブラリの機能テストマクロは全て[`<version>`](/reference/version.md)でも提供される。

| マクロ名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
|`__cpp_lib_algorithm_default_value_type`|`202403L`|一部アルゴリズムに、値を波カッコ初期化で渡せるよう制約を追加|[`<algorithm>`](/reference/algorithm.md), [`<ranges>`](/reference/ranges.md), [`<string>`](/reference/string.md), [`<deque>`](/reference/deque.md), [`<list>`](/reference/list.md), [`<forward_list>`](/reference/forward_list.md), [`<vector>`](/reference/vector.md)|
|`__cpp_lib_aligned_accessor`|`202411L`|[`<mdspan>`](/reference/mdspan.md)に、要素アクセスにアライメント保証を与える[`std::aligned_accessor`](/reference/mdspan/aligned_accessor.md)を追加|[`<mdspan>`](/reference/mdspan.md)|
|`__cpp_lib_associative_heterogeneous_insertion`|`202306L`|連想コンテナの一部メンバ関数に、一時オブジェクト生成のコストを抑える拡張を追加|[`<map>`](/reference/map.md), [`<set>`](/reference/set.md), [`<unordered_map>`](/reference/unordered_map.md), [`<unordered_set>`](/reference/unordered_set.md)|
|`__cpp_lib_apply`|`202506L`| [`std::apply`](/reference/tuple/apply.md)の戻り値型推論をやめて、戻り値型用の[`std::apply_result`](/reference/tuple/apply_result.md.nolink)クラスを追加|[`<tuple>`](/reference/tuple.md), [`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_atomic_min_max`|`202506L`|[`std::atomic`](/reference/atomic/atomic.md)オブジェクトに対する2つの値の最大値・最小値を取得する関数を追加|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_reductions`|`202506L`|[`std::atomic`](/reference/atomic/atomic.md)と[`std::atomic_ref`](/reference/atomic/atomic_ref.md)に高速な縮約用の操作を追加|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_atomic_ref`|`202411L`|[`std::atomic_ref`](/reference/atomic/atomic_ref.md)に[`address()`](/reference/atomic/atomic_ref/address.md)メンバ関数を追加|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_bind_back`|`202306L`|[`std::bind_back()`](/reference/functional/bind_back.md)に、非型テンプレート引数として関数を指定するオーバーロードを追加|[`<functional>`](/reference/functional.md)|
|`__cpp_lib_bind_front`|`202306L`|[`std::bind_front()`](/reference/functional/bind_front.md)に、非型テンプレート引数として関数を指定するオーバーロードを追加|[`<functional>`](/reference/functional.md)|
|`__cpp_lib_bitset`|`202306L`|[`std::bitset`](/reference/bitset/bitset.md)に、[`std::basic_string_view`](/reference/string_view/basic_string_view.md)を受け取るコンストラクタを追加|[`<bitset>`](/reference/bitset.md)|
|`__cpp_lib_chrono`|`202306L`|[`<chrono>`](/reference/chrono.md)のクラスに、ハッシュ値サポートとして[`std::hash`](/reference/functional/hash.md)の特殊化を追加|[`<chrono>`](/reference/chrono.md)|
|`__cpp_lib_constant_wrapper`|`202506L`|[`<type_traits>`](/reference/type_traits.md)に[`std::constant_wrapper`](/reference/type_traits/constant_wrapper.md.nolink)を追加|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_constexpr_algorithms`|`202306L`|[`std::stable_sort()`](/reference/algorithm/stable_sort.md) / [`std::ranges::stable_sort()`](/reference/algorithm/ranges_stable_sort.md)を`constexpr`対応|[`<algorithm>`](/reference/algorithm.md), [`<utility>`](/reference/utility.md)|
|`__cpp_lib_constexpr_atomic`|`202411L`|[`<atomic>`](/reference/atomic.md)ライブラリのアトミック操作を`constexpr`対応|[`<atomic>`](/reference/atomic.md)|
|`__cpp_lib_constexpr_cmath`|`202306L`|[`<cmath>`](/reference/cmath.md)の関数 (特殊関数と丸めモードに依存する関数以外の全て) を`constexpr`対応|[`<cmath>`](/reference/cmath.md), [`<cstdlib>`](/reference/cstdlib.md)|
|`__cpp_lib_constexpr_complex`|`202306L`|[`std::complex`](/reference/complex/complex.md)の全関数を`constexpr`対応|[`<complex>`](/reference/complex.md)|
|`__cpp_lib_constexpr_deque`|`202502L`|[`std::deque`](/reference/deque/deque.md)を`constexpr`対応|[`<deque>`](/reference/deque.md)|
|`__cpp_lib_constexpr_exceptions`|`202502L`|[定数式での例外送出が許可されること](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)にともない、例外クラスの関連機能を`constexpr`対応|[`<exception>`](/reference/exception.md), [`<stdexcept>`](/reference/stdexcept.md), [`<expected>`](/reference/expected.md), [`<optional>`](/reference/optional.md), [`<variant>`](/reference/variant.md), [`<format>`](/reference/format.md)|
|`__cpp_lib_constexpr_flat_map`|`202502L`|[`std::flat_map`](/reference/flat_map/flat_map.md) / [`std::flat_multimap`](/reference/flat_map/flat_multimap.md)を`constexpr`対応|[`<flat_map>`](/reference/flat_map.md)|
|`__cpp_lib_constexpr_flat_set`|`202502L`|[`std::flat_set`](/reference/flat_set/flat_set.md) / [`std::flat_multiset`](/reference/flat_set/flat_multiset.md)を`constexpr`対応|[`<flat_set>`](/reference/flat_set.md)|
|`__cpp_lib_constexpr_forward_list`|`202502L`|[`std::forward_list`](/reference/forward_list/forward_list.md)を`constexpr`対応|[`<forward_list>`](/reference/forward_list.md)|
|`__cpp_lib_constexpr_inplace_vector`|`202502L`|[`std::inplace_vector`](/reference/inplace_vector/inplace_vector.md.nolink)を`constexpr`対応|[`<inplace_vector>`](/reference/inplace_vector.md.nolink)|
|`__cpp_lib_constexpr_list`|`202502L`|[`std::list`](/reference/list/list.md)を`constexpr`対応|[`<list>`](/reference/list.md)|
|`__cpp_lib_constexpr_map`|`202502L`|[`std::map`](/reference/map/map.md) / [`std::multimap`](/reference/map/multimap.md)を`constexpr`対応|[`<map>`](/reference/map.md)|
|`__cpp_lib_constexpr_memory`|`202506L`|[`std::shared_ptr`](/reference/memory/shared_ptr.md)クラスとその関連機能を`constexpr`対応|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_constexpr_new`|`202406L`|[`constexpr`配置`new`](/lang/cpp26/constexpr_placement_new.md)|[`<new>`](/reference/new.md)|
|`__cpp_lib_constexpr_queue`|`202502L`|[`std::queue`](/reference/queue/queue.md) / [`std::priority_queue`](/reference/queue/priority_queue.md)を`constexpr`対応|[`<queue>`](/reference/queue.md)|
|`__cpp_lib_constexpr_set`|`202502L`|[`std::set`](/reference/set/set.md) / [`std::multiset`](/reference/set/multiset.md)を`constexpr`対応|[`<set>`](/reference/set.md)|
|`__cpp_lib_constexpr_stack`|`202502L`|[`std::stack`](/reference/stack/stack.md)を`constexpr`対応|[`<stack>`](/reference/stack.md)|
|`__cpp_lib_constexpr_unordered_map`|`202502L`|[`std::unordered_map`](/reference/unordered_map/unordered_map.md) / [`std::unordered_multimap`](/reference/unordered_map/unordered_multimap.md)を`constexpr`対応|[`<unordered_map>`](/reference/unordered_map.md)|
|`__cpp_lib_constexpr_unordered_set`|`202502L`|[`std::unordered_set`](/reference/unordered_set/unordered_set.md) / [`std::unordered_multiset`](/reference/unordered_set/unordered_multiset.md)を`constexpr`対応|[`<unordered_set>`](/reference/unordered_set.md)|
|`__cpp_lib_constrained_equality`|`202411L`|[`std::reference_wrapper`](/reference/functional/reference_wrapper.md)に、比較演算子[`==`](/reference/functional/reference_wrapper/op_equal.md)と[`<=>`](/reference/functional/reference_wrapper/op_compare_3way.md)を追加|[`<utility>`](/reference/utility.md), [`<tuple>`](/reference/tuple.md), [`<optional>`](/reference/optional.md), [`<variant>`](/reference/variant.md), [`<expected>`](/reference/expected.md)|
|`__cpp_lib_contracts`|`202502L`|[契約プログラミングをサポートする](/lang/cpp26/contracts.md)|[`<contracts>`](/reference/contracts.md)|
|`__cpp_lib_copyable_function`|`202306L`|[`<functional>`](/reference/functional.md)に[`std::copyable_function`](/reference/functional/copyable_function.md)を追加|[`<functional>`](/reference/functional.md)|
|`__cpp_lib_counting_scope`|`202506L`|[`<execution>`](/reference/execution.md)に[`std::execution::spawn`](/reference/execution/execution/spawn.md)、[`std::execution::scope_token`](/reference/execution/execution/scope_token.md)などを追加|[`<execution>`](/reference/execution.md)|
|`__cpp_lib_debugging`|`202403L`|デバッグサポートのライブラリとして[`<debugging>`](/reference/debugging.md)を追加|[`<debugging>`](/reference/debugging.md)|
|`__cpp_lib_define_static`|`202506L`||[`<meta>`](/reference/meta.md.nolink)|
|`__cpp_lib_exception_ptr_cast`|`202506L`|[`std::exception_ptr`](/reference/exception/exception_ptr.md)を指定した例外型にキャストする[`std::exception_ptr_cast()`](/reference/exception/exception_ptr_cast.md)関数を追加|[`<exception>`](/reference/exception.md)|
|`__cpp_lib_format`|`202311L`||[`<format>`](/reference/format.md)|
|`__cpp_lib_format_path`|`202506L`|[`std::filesystem::path`](/reference/filesystem/path.md)クラスに、文字列フォーマットのサポートを追加<br/>[`std::filesystem::path`](/reference/filesystem/path.md)クラスに、出力用の文字列を取得するためのメンバ関数を追加|[`<filesystem>`](/reference/filesystem.md)|
|`__cpp_lib_format_uchar`|`202311L`|[`std::format`](/reference/format/format.md)が`char`を数値出力する際は符号なしとして扱う|[`<format>`](/reference/format.md)|
|`__cpp_lib_freestanding_algorithm`|`202502L`||[`<algorithm>`](/reference/algorithm.md)|
|`__cpp_lib_freestanding_array`|`202311L`||[`<array>`](/reference/array.md)|
|`__cpp_lib_freestanding_char_traits`|`202306L`||[`<string>`](/reference/string.md)|
|`__cpp_lib_freestanding_charconv`|`202306L`||[`<charconv>`](/reference/charconv.md)|
|`__cpp_lib_freestanding_cstdlib`|`202306L`||[`<cstdlib>`](/reference/cstdlib.md), [`<cmath>`](/reference/cmath.md)|
|`__cpp_lib_freestanding_cstring`|`202311L`||[`<cstring>`](/reference/cstring.md)|
|`__cpp_lib_freestanding_cwchar`|`202306L`||[`<cwchar>`](/reference/cwchar.md.nolink)|
|`__cpp_lib_freestanding_errc`|`202306L`||[`<cerrno>`](/reference/cerrno.md), [`<system_error>`](/reference/system_error.md)|
|`__cpp_lib_freestanding_execution`|`202502L`||[`<execution>`](/reference/execution.md)|
|`__cpp_lib_freestanding_expected`|`202311L`||[`<expected>`](/reference/expected.md)|
|`__cpp_lib_freestanding_feature_test_macros`|`202306L`|||
|`__cpp_lib_freestanding_functional`|`202306L`||[`<functional>`](/reference/functional.md)|
|`__cpp_lib_freestanding_iterator`|`202306L`||[`<iterator>`](/reference/iterator.md)|
|`__cpp_lib_freestanding_mdspan`|`202311L`||[`<mdspan>`](/reference/mdspan.md)|
|`__cpp_lib_freestanding_memory`|`202502L`||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_freestanding_numeric`|`202502L`||[`<numeric>`](/reference/numeric.md)|
|`__cpp_lib_freestanding_operator_new`|`202306L` or `0`||[`<new>`](/reference/new.md)|
|`__cpp_lib_freestanding_optional`|`202506L`||[`<optional>`](/reference/optional.md)|
|`__cpp_lib_freestanding_random`|`202502L`||[`<random>`](/reference/random.md)|
|`__cpp_lib_freestanding_ranges`|`202306L`||[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_freestanding_ratio`|`202306L`||[`<ratio>`](/reference/ratio.md)|
|`__cpp_lib_freestanding_string_view`|`202311L`||[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_freestanding_tuple`|`202306L`||[`<tuple>`](/reference/tuple.md)|
|`__cpp_lib_freestanding_utility`|`202306L`||[`<utility>`](/reference/utility.md)|
|`__cpp_lib_freestanding_variant`|`202311L`||[`<variant>`](/reference/variant.md)|
|`__cpp_lib_fstream_native_handle`|`202306L`|[`std::basic_fstream`](/reference/fstream/basic_fstream.md)などのメンバに、ファイルのネイティブハンドルを追加|[`<fstream>`](/reference/fstream.md)|
|`__cpp_lib_function_ref`|`202306L`|[`<functional>`](/reference/functional.md)に[`std::function_ref`](/reference/functional/function_ref.md)を追加|[`<functional>`](/reference/functional.md)|
|`__cpp_lib_hazard_pointer`|`202306L`|ハザードポインタのライブラリ[`<hazard_pointer>`](/reference/hazard_pointer.md.nolink)を追加|[`<hazard_pointer>`](/reference/hazard_pointer.md.nolink)|
|`__cpp_lib_hive`|`202502L`|シーケンスコンテナのライブラリ[`<hive>`](/reference/hive.md.nolink)を追加|[`<hive>`](/reference/hive.md.nolink)|
|`__cpp_lib_indirect`|`202502L`|[`<memory>`](/reference/memory.md)に[`std::indirect`](/reference/memory/indirect.md.nolink)と[`std::polymorphic`](/reference/memory/polymorphic.md.nolink)を追加|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_inplace_vector`|`202406L`|容量固定の可変長配列のライブラリ[`<inplace_vector>`](/reference/inplace_vector.md.nolink)を追加|[`<inplace_vector>`](/reference/inplace_vector.md.nolink)|
|`__cpp_lib_is_sufficiently_aligned`|`202411L`|[`<mdspan>`](/reference/mdspan.md)に、要素アクセスにアライメント保証を与える[`std::aligned_accessor`](/reference/mdspan/aligned_accessor.md)を追加|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_is_virtual_base_of`|`202406L`|[`<type_traits>`](/reference/type_traits.md)に[`std::is_virtual_base_of`](/reference/type_traits/is_virtual_base_of.md)を追加|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_is_within_lifetime`|`202306L`|[`<type_traits>`](/reference/type_traits.md)に[`std::is_within_lifetime()`](/reference/type_traits/is_within_lifetime.md)を追加|[`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_linalg`|`202412L`|線形代数ライブラリとして[`<linalg>`](/reference/linalg.md)を追加|[`<linalg>`](/reference/linalg.md)|
|`__cpp_lib_mdspan`|`202406L`|[`std::mdspan`](/reference/mdspan/mdspan.md)に対する[`std::dextents`](/reference/mdspan/extents.md)指定の冗長さを解決する[`std::dims`](/reference/mdspan/extents.md)を追加|[`<mdspan>`](/reference/mdspan.md)|
|`__cpp_lib_not_fn`|`202306L`|[`std::not_fn()`](/reference/functional/not_fn.md)に、非型テンプレート引数として関数を指定するオーバーロードを追加|[`<functional>`](/reference/functional.md)|
|`__cpp_lib_observable_checkpoint`|`202506L`|[`<utility>`](/reference/utility.md)に[`std::observable_checkpoint()`](/reference/utility/observable_checkpoint.md.nolink)を追加|[`<utility>`](/reference/utility.md)|
|`__cpp_lib_optional`|`202506L`|[`std::optional`](/reference/optional/optional.md)に、参照を保持するための`T&`の部分特殊化を追加|[`<optional>`](/reference/optional.md)|
|`__cpp_lib_optional_range_support`|`202406L`|[`std::optional`](/reference/optional/optional.md)にイテレータインタフェースを追加|[`<optional>`](/reference/optional.md)|
|`__cpp_lib_out_ptr`|`202311L`||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_parallel_algorithm`|`202506L`|[`<algorithm>`](/reference/algorithm.md)と[`<memory>`](/reference/memory.md)のアルゴリズムを並列実行に対応|[`<algorithm>`](/reference/algorithm.md), [`<numeric>`](/reference/numeric.md), [`<memory>`](/reference/memory.md)|
|`__cpp_lib_parallel_scheduler`|`202506L`|[`<execution>`](/reference/execution.md)に[`std::execution::parallel_scheduler`](/reference/execution/execution/parallel_scheduler.md)を追加|[`<execution>`](/reference/execution.md)|
|`__cpp_lib_philox_engine`|`202406L`|[`<random>`](/reference/random.md)に[`std::philox_engine`](/reference/random/philox_engine.md)、[`std::philox4x32`](/reference/random/philox4x32.md)、[`std::philox4x64`](/reference/random/philox4x64.md)を追加|[`<random>`](/reference/random.md)|
|`__cpp_lib_polymorphic`|`202502L`|[`<memory>`](/reference/memory.md)に[`std::indirect`](/reference/memory/indirect.md.nolink)と[`std::polymorphic`](/reference/memory/polymorphic.md.nolink)を追加|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_print`|`202406L`|[`std::print()`](/reference/print/print.md)と[`std::println()`](/reference/print/println.md)にロックを取得せず高速に書き出す最適化を許可<br/>[`std::enable_nonlocking_formatter_optimization`](/reference/format/enable_nonlocking_formatter_optimization.md)を追加|[`<print>`](/reference/print.md), [`<ostream>`](/reference/ostream.md)|
|`__cpp_lib_ranges`|`202406L`|[`std::indirectly_unary_invocable`](/reference/iterator/indirectly_unary_invocable.md)などのコンセプトの共通参照要件を削除|[`<algorithm>`](/reference/algorithm.md), [`<functional>`](/reference/functional.md), [`<iterator>`](/reference/iterator.md), [`<memory>`](/reference/memory.md), [`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_as_const`|`202311L`|[`std::basic_const_iterator`](/reference/iterator/basic_const_iterator.md)を元の要素へのキャストを可能にする|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_cache_latest`|`202411L`|[`std::views::cache_latest`](/reference/ranges/cache_latest.md.nolink)を追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_concat`|`202403L`|[`std::views::concat`](/reference/ranges/concat_view.md)を追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_generate_random`|`202403L`|[`<random>`](/reference/random.md)に、乱数列を生成する[`std::ranges::generate_random()`](/reference/random/generate_random.md)関数を追加|[`<random>`](/reference/random.md)|
|`__cpp_lib_ranges_indices`|`202506L`|インデックス列を生成する[`std::views::indices`](/reference/ranges/indices.md.nolink)を追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_reserve_hint`|`202502L`|各viewクラスに`reserve_hint()`メンバ関数を追加<br/>[`std::ranges::reserve_hint()`](/reference/ranges/reserve_hint.md.nolink)関数を追加<br/>[`std::ranges::approximately_sized_range`](/reference/ranges/approximately_sized_range.md.nolink)コンセプトを追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ranges_to_input`|`202502L`|[`std::views::to_input`](/reference/ranges/to_input_view.md)を追加|[`<ranges>`](/reference/ranges.md)|
|`__cpp_lib_ratio`|`202306L`|[`<ratio>`](/reference/ratio.md)に、新たなSI接頭辞を追加|[`<ratio>`](/reference/ratio.md)|
|`__cpp_lib_raw_memory_algorithms`|`202411L`|[`std::uninitialized_default_construct()`](/reference/memory/uninitialized_default_construct.md)などの未初期化領域に対する操作を`constexpr`対応|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_rcu`|`202306L`|RCU (Read Copy Update) のライブラリとして[`<rcu>`](/reference/rcu.md)を追加|[`<rcu>`](/reference/rcu.md)|
|`__cpp_lib_reference_wrapper`|`202403L`|[`std::reference_wrapper`](/reference/functional/reference_wrapper.md)に、比較演算子[`==`](/reference/functional/reference_wrapper/op_equal.md)と[`<=>`](/reference/functional/reference_wrapper/op_compare_3way.md)を追加|[`<functional>`](/reference/functional.md)|
|`__cpp_lib_reflection`|`202506L`||[`<meta>`](/reference/meta.md.nolink)|
|`__cpp_lib_saturation_arithmetic`|`202311L`|[`<numeric>`](/reference/numeric.md)に飽和演算 (Saturation Arithmetic) として[`std::add_sat()`](/reference/numeric/add_sat.md)などの関数を追加|[`<numeric>`](/reference/numeric.md)|
|`__cpp_lib_senders`|`202506L`||[`<execution>`](/reference/execution.md)|
|`__cpp_lib_simd`|`202506L`|データ並列ライブラリとして、[`<simd>`](/reference/simd.md.nolink)を追加|[`<simd>`](/reference/simd.md.nolink)|
|`__cpp_lib_simd_complex`|`202502L`|[`<simd>`](/reference/simd.md.nolink)が[`std::complex`](/reference/complex/complex.md)をサポートする|[`<simd>`](/reference/simd.md.nolink)|
|`__cpp_lib_simd_permutations`|`202506L`|[`<simd>`](/reference/simd.md.nolink)に`permute()`などを追加する|[`<simd>`](/reference/simd.md.nolink)|
|`__cpp_lib_smart_ptr_owner_equality`|`202306L`|[`<memory>`](/reference/memory.md)に[`std::owner_hash`](/reference/memory/owner_hash.md)と[`std::owner_equal`](/reference/memory/owner_equal.md)を追加|[`<memory>`](/reference/memory.md)|
|`__cpp_lib_span`|`202311L`|[`std::mdspan`](/reference/mdspan/mdspan.md)に[`at()`](/reference/mdspan/mdspan/at.md)メンバ関数を追加|[`<span>`](/reference/span.md)|
|`__cpp_lib_span_initializer_list`|`202311L`|[`std::span`](/reference/span/span.md)に[`std::initializer_list`](/reference/initializer_list/initializer_list.md)をとるコンストラクタを追加|[`<span>`](/reference/span.md)|
|`__cpp_lib_sstream_from_string_view`|`202306L`|[`std::basic_stringstream`](/reference/sstream/basic_stringstream.md)などが[`std::basic_string_view`](/reference/string_view/basic_string_view.md)から構築可能に|[`<sstream>`](/reference/sstream.md)|
|`__cpp_lib_string_subview`|`202506L`|[`std::basic_string`](/reference/string/basic_string.md)と[`std::basic_string_view`](/reference/string_view/basic_string_view.md)に`subview()`を追加|[`<string>`](/reference/string.md), [`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_string_view`|`202403L`|[`std::basic_string`](/reference/string/basic_string.md)と[`std::basic_string_view`](/reference/string_view/basic_string_view.md)を連結させる`operator+`を追加|[`<string>`](/reference/string.md), [`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_submdspan`|`202411L`|[`std::mdspan`](/reference/mdspan/mdspan.md)から部分ビューを取り出す[`std::submdspan()`](/reference/mdspan/submdspan.md)を追加|[`<mdspan>`](/reference/mdspan.md)|
|`__cpp_lib_task`|`202506L`||[`<execution>`](/reference/execution.md)|
|`__cpp_lib_text_encoding`|`202306L`|文字列エンコーディングを識別するライブラリ[`<text_encoding>`](/reference/text_encoding.md.nolink)を追加|[`<text_encoding>`](/reference/text_encoding.md.nolink)|
|`__cpp_lib_to_chars`|`202306L`|[`std::to_chars_result`](/reference/charconv/to_chars_result.md)と[`std::from_chars_result`](/reference/charconv/from_chars_result.md)に`operator bool`を追加|[`<charconv>`](/reference/charconv.md)|
|`__cpp_lib_to_string`|`202306L`|[`std::to_string`](/reference/string/to_string.md)の変換結果を`sprintf()`ベースから`std::format()`ベースに変更|[`<string>`](/reference/string.md)|
|`__cpp_lib_trivially_relocatable`|`202502L`|トリビアルな再配置|[`<memory>`](/reference/memory.md), [`<type_traits>`](/reference/type_traits.md)|
|`__cpp_lib_tuple_like`|`202311L`|[`std::complex`](/reference/complex/complex.md)にタプルインタフェースの特殊化を追加|[`<utility>`](/reference/utility.md), [`<tuple>`](/reference/tuple.md), [`<map>`](/reference/map.md), [`<unordered_map>`](/reference/unordered_map.md)|
|`__cpp_lib_type_order`|`202506L`|[`std::type_info::before`](/reference/typeinfo/type_info/before.md)のconstexpr化|[`<compare>`](/reference/compare.md)|
|`__cpp_lib_variant`|`202306L`|[`std::variant`](/reference/variant/variant.md)クラスに、メンバ関数版の[`visit()`](/reference/variant/variant/visit.md)を追加|[`<variant>`](/reference/variant.md)|

実装依存のマクロ。

| マクロ名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
|`__cpp_lib_hardened_array`|`202502L`||[`<array>`](/reference/array.md)|
|`__cpp_lib_hardened_basic_stacktrace`|`202506L`||[`<stacktrace>`](/reference/stacktrace.md)|
|`__cpp_lib_hardened_basic_string`|`202502L`||[`<string>`](/reference/string.md)|
|`__cpp_lib_hardened_basic_string_view`|`202502L`||[`<string_view>`](/reference/string_view.md)|
|`__cpp_lib_hardened_bitset`|`202502L`||[`<bitset>`](/reference/bitset.md)|
|`__cpp_lib_hardened_common_iterator`|`202506L`||[`<iterator>`](/reference/iterator.md)|
|`__cpp_lib_hardened_counted_iterator`|`202506L`||[`<iterator>`](/reference/iterator.md)|
|`__cpp_lib_hardened_deque`|`202502L`||[`<deque>`](/reference/deque.md)|
|`__cpp_lib_hardened_expected`|`202502L`||[`<expected>`](/reference/expected.md)|
|`__cpp_lib_hardened_forward_list`|`202502L`||[`<forward_list>`](/reference/forward_list.md)|
|`__cpp_lib_hardened_inplace_vector`|`202502L`||[`<inplace_vector>`](/reference/inplace_vector.md.nolink)|
|`__cpp_lib_hardened_list`|`202502L`||[`<list>`](/reference/list.md)|
|`__cpp_lib_hardened_mdspan`|`202502L`||[`<mdspan>`](/reference/mdspan.md)|
|`__cpp_lib_hardened_optional`|`202502L`||[`<optional>`](/reference/optional.md)|
|`__cpp_lib_hardened_shared_ptr_array`|`202506L`||[`<memory>`](/reference/memory.md)|
|`__cpp_lib_hardened_span`|`202502L`||[`<span>`](/reference/span.md)|
|`__cpp_lib_hardened_valarray`|`202502L`||[`<valarray>`](/reference/valarray.md)|
|`__cpp_lib_hardened_vector`|`202502L`||[`<vector>`](/reference/vector.md)|
|`__cpp_lib_hardened_view_interface`|`202506L`||[`<ranges>`](/reference/ranges.md)|


## 参照

- [SD-FeatureTest: Feature-Test Macros and Policies - isocpp](https://isocpp.org/std/standing-documents/sd-6-sg10-feature-test-recommendations)
