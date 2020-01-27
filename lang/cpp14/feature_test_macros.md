# 機能テストマク�
* cpp14[meta cpp]

## 概要

SD-6 は C++14 の機能について以下のテストマク�を定義することを推奨している：

| マク�名 | 値 | 機能 | ヘッダ |
|----------|----|------|--------|
| `__cpp_aggregate_nsdmi`                  | `201304` | メンバ初期化�と集約 | predefined |
| `__cpp_binary_literals`                  | `201304` | [二進数リテラル](binary_literals.md) | predefined |
| `__cpp_constexpr`                        | `201304` | [`constexpr`の制限緩和/`constexpr` メンバ関数の暗黙的な `const`](relaxing_constraints_on_constexpr.md) | predefined |
| `__cpp_decltype_auto`                    | `201304` | [通常関数の戻り値型推論](return_type_deduction_for_normal_functions.md) | predefined |
| `__cpp_generic_lambdas`                  | `201304` | [ジェネリックラムダ](generic_lambdas.md) | predefined |
| `__cpp_init_captures`                    | `201304` | [ラムダ式の初期化�ャプチャ](initialize_capture.md) | predefined |
| `__cpp_lib_chrono_udls` 				   | `201304` | [`std::chrono::duration`](/reference/chrono/duration.md) のユーザー定義リテラル ([`ns`](/reference/chrono/duration/op_ns.md), [`us`](/reference/chrono/duration/op_us.md), [`ms`](/reference/chrono/duration/op_ms.md), [`s`](/reference/chrono/duration/op_s.md), [`min`](/reference/chrono/duration/op_min.md), [`h`](/reference/chrono/duration/op_h.md)) | [`<chrono>`](/reference/chrono.md) |
| `__cpp_lib_complex_udls`                 | `201309` | ユーザー定義虚数リテラル ([`i`](/reference/complex/complex/op_i.md), [`if`](/reference/complex/complex/op_if.md), [`il`](/reference/complex/complex/op_il.md)) | [`<complex>`](/reference/complex.md) |
| `__cpp_lib_exchange_function`            | `201304` | [`std::exchange`](/reference/utility/exchange.md)            | [`<utility>`](/reference/utility.md) |
| `__cpp_lib_generic_associative_lookup`   | `201304` | 連想配列 ([`std::map`](/reference/map/map.md), [`std::multimap`](/reference/map/multimap.md), [`std::set`](/reference/set/set.md), [`std::multiset`](/reference/set/multiset.md)) における異なる型の比較 (`count`, `equal_range`, `find`, `lower_bound`, `upper_bound`) | [`<map>`](/reference/map.md), [`<set>`](/reference/set.md) |
| `__cpp_lib_integer_sequence`             | `201304` | [コンパイル時整数列](/reference/utility/integer_sequence.md) | [`<utility>`](/reference/utility.md) |
| `__cpp_lib_integral_constant_callable`   | `201304` | [`std::integral_constant`](/reference/type_traits/integral_constant.md) に `operator()` を追加 | [`<type_traits>`](/reference/type_traits.md)
| `__cpp_lib_is_final`                     | `201402` | [`std::is_final`](/reference/type_traits/is_final.md)               | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_is_null_pointer`              | `201309` | [`std::is_null_pointer`](/reference/type_traits/is_null_pointer.md) | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_make_reverse_iterator`        | `201402` | [`std::make_reverse_iterator`](/reference/iterator/make_reverse_iterator.md) | [`<iterator>`](/reference/iterator.md) |
| `__cpp_lib_make_unique`                  | `201304` | [`std::make_unique`](/reference/memory/make_unique.md) | [`<memory>`](/reference/memory/make_unique.md)
| `__cpp_lib_null_iterators`               | `201304` | ヌル前方向イテレータ | [`<iterator>`](/reference/algorithm.md) |
| `__cpp_lib_quoted_string_io`             | `201304` | [`std::quoted`](/reference/iomanip/quoted.md) | [`<iomanip>`](/reference/iomanip.md)
| `__cpp_lib_result_of_sfinae`             | `201210` | [`std::result_of`](/reference/type_traits/result_of.md) と SFINAE | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_robust_nonmodifying_seq_ops`  | `201304` | シーケンスを変更しない操作をより�バストに | [`<algorithm>`](/reference/algorithm.md) |
| `__cpp_lib_shared_timed_mutex`           | `201402` | `shared_mutex` を [`shared_timed_mutex`](/reference/shared_mutex/shared_timed_mutex.md) にリネーム     | [`<shared_mutex>`](/reference/shared_mutex.md) |
| `__cpp_lib_string_udls` 				   | `201304` | ユーザー定義 [`std::string_literals::basic_string::sリテラル`](/reference/string/basic_string/op_s.md) | [`<string>`](/reference/string.md) |
| `__cpp_lib_transformation_trait_aliases` | `201304` | 型トレイトにエイリアステンプレートを追加 | [`<type_traits>`](/reference/type_traits.md) |
| `__cpp_lib_transparent_operators`        | `201210` | [`<functional>`](/reference/functional.md) の二項演算のデフォルトテンプレート引数を `void` に | [`<functional>`](/reference/functional.md) |
| `__cpp_lib_tuple_element_t`              | `201402` | [`std::tuple_element_t`](/reference/tuple/tuple_element.md)  | [`<utility>`](/reference/utility.md) |
| `__cpp_lib_tuples_by_type`               | `201304` | [型による `std::tuple::get`](/reference/tuple/tuple/get.md)  | [`<utility>`](/reference/utility.md) |
| `__cpp_return_type_deduction`            | `201304` | [通常関数の戻り値型推論](return_type_deduction_for_normal_functions.md) | predefined |
| `__cpp_sized_deallocation`               | `201309` | [サイズ付きデア�ケーション](sized_deallocation.md) | predefined |
| `__cpp_variable_templates`               | `201304` | [変数テンプレート](variable_templates.md)  | predefined |
| `__has_cpp_attribute(deprecated)`        | `201309` | [`[[deprecated]]`属性](deprecated_attr.md) | predefined |
| `__has_include(<shared_mutex>)`          | `1`      | [共有�ック](/reference/shared_mutex.md)   | predefined |

## 参照
- [SD-6: SG10 Feature Test Recommendations: Standard C++](https://isocpp.org/std/standing-documents/sd-6-sg10-feature-test-recommendations#recs.cpp14)
