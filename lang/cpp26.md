# C++26

## 概要
C++26とは、2026年中に改訂される予定の、C++バージョンの通称である。

このバージョンは、策定中のためC++2cと呼ばれることがある。「(2020年代の3つ目のバージョンが) 202c年にリリースされる」という伏せ字として「c」が使われているが、3年周期に次のバージョンが策定されることが決まっているため、伏せ字になっている年数がずれることはない。


## 言語機能
### 変数

| 言語機能 | 説明 |
|----------|------|
| [`std::initializer_list`の配列を静的ストレージに配置する](/lang/cpp26/static_storage_for_braced_initializers.md.nolink) | `std::vector v = {1, 2, 3};`のような初期化で初期化子リストを静的ストレージに配置することで無駄なコピーをなくす |
| [宣言のみで使用しない変数の名前として`_`をサポート](/lang/cpp26/nice_placeholder_with_no_name.md.nolink) | 変数名`_`は暗黙で`[[maybe_unused]]`が指定される |
| [非推奨となっていた列挙値から算術型への暗黙変換を削除](/lang/cpp26/remove_deprecated_arithmetic_conversion_on_enumerations.md.nolink) | C++20から非推奨となっていた列挙値への算術演算で算術型に暗黙変換される仕様を削除 |
| [不完全型へのポインタに対する`delete`を不適格とする](/lang/cpp26/deleting_a_pointer_to_an_incomplete_type_should_be_ill-formed.md.nolink) | 未定義動作となる操作をコンパイルエラーとする |
| [返却された左辺値から暗黙変換された一時オブジェクトが参照に束縛されることを禁止する](/lang/cpp26/disallow_binding_a_returned_glvalue_to_a_temporary.md.nolink) | 寿命切れの変数によって引き起こされるバグを防止する |
| [要素数不明の配列を集成体初期化する規則を明確化](/lang/cpp26/clarifying_rules_for_brace_elision_in_aggregate_initialization.md.nolink) | 配列要素の集成体初期化で`{}`が省略された場合の矛盾していた規定を修正 |
| [未初期化変数の読み取りを不正動作 (erroneous behaviour: EB) とする](/lang/cpp26/erroneous_behaviour_for_uninitialized_reads.md.nolink) | 初期化されていない自動変数の読み取りの安全性を規定する |


### 文字列

| 言語機能 | 説明 |
|----------|------|
| [文字列リテラルの文字エンコーディング失敗を不適格とする](/lang/cpp26/making_non-encodable_string_literals_ill-formed.md.nolink) | 文字列リテラルのエンコーディング時に文字表現が失われる場合にコンパイルエラーにする |
| [コンパイル時にのみ使用される文字列の扱いを明確化](/lang/cpp26/unevaluated_strings.md.nolink) | `static_assert`や`[[deprecated]]`などで使用されるコンパイル時の文字列について、文字コードの指定を禁止し、実行時エンコーディングが行われないことを規定 |


### 分岐・ループ

| 言語機能 | 説明 |
|----------|------|
| [条件式での構造化束縛の使用を許可](/lang/cpp26/structured_binding_declaration_as_a_condition.md) | 式全体を`bool`値に変換できる場合に条件式で構造化束縛を使用できることとする |
| [自明な無限ループは未定義動作ではないと規定](/lang/cpp26/trivial_infinite_loops_are_not_undefined_behavior.md.nolink) | 並行プログラムの進行保証などを考慮して無限ループを未定義動作ではないものとする |


### 関数


| 言語機能 | 説明 |
|----------|------|
| [関数宣言を削除する理由を指定できるようにする](/lang/cpp26/delete_reason.md.nolink) | `f() = delete("reason");` |


### 属性

| 言語機能 | 説明 |
|----------|------|
| [属性の無視性を見直し](/lang/cpp26/on_the_ignorability_of_standard_attributes.md.nolink) | 構文として適格な属性のみを無視できるようにし、そうでない属性の使用を不適格とする |
| [構造化束縛への属性を許可](/lang/cpp26/attributes_for_structured_bindings.md) | `auto [a, b [[maybe_unused]], c] = f();`のように構造化束縛の要素に対して属性を付加できるようにする |


### テンプレート

| 言語機能 | 説明 |
|----------|------|
| [パラメータパックへのインデックスアクセスを許可](/lang/cpp26/pack_indexing.md.nolink) | 可変引数テンプレートのパラメータパックに添字アクセスできるようにする |
| [制約式内での畳み込み式の順序付け](/lang/cpp26/ordering_of_constraints_involving_fold_expressions.md.nolink) | 畳み込み式では全体ではなく個別の制約を原子制約式として扱う |
| [可変引数テンプレートで`friend`宣言をできるようにする](/lang/cpp26/variadic_friends.md.nolink) | クラステンプレートの可変引数テンプレートでまとめて`friend`宣言できるようにする |


### 定数式

| 言語機能 | 説明 |
|----------|------|
| [定数式での`void*`からポインタ型へのキャストを許可](/lang/cpp26/constexpr_cast_from_voidptr.md.nolink) | 型消去のために`void*`からポインタ型へのキャストを許可する |
| [`static_assert`の診断メッセージにユーザーが生成した文字列の指定を許可](/lang/cpp26/user-generated_static_assert_messages.md) | `constexpr`な`S.size()`と`S.data()`メンバ関数をもつオブジェクトをコンパイル時文字列として指定できるようにする |
| [`constexpr`配置`new`](/lang/cpp26/constexpr_placement_new.md.nolink) | 定数式の文脈での配置`new`を許可 |


### ソースコード

| 言語機能 | 説明 |
|----------|------|
| [基本文字集合に@、$、\`を追加](/lang/cpp26/add_atsign_dollar_graveaccent_to_the_basic_character_set.md.nolink) | C言語との互換性のためにこれらの文字を基本文字集合に追加 |


### モジュール

| 言語機能 | 説明 |
|----------|------|
| [モジュール宣言でのモジュール名のマクロ展開を禁止する](/lang/cpp26/module_declarations_shouldnt_be_macros.md.nolink) | `export module MACRO_NAME;`を禁止 |


## ライブラリ更新の概要
### 新ライブラリ
- 文字列エンコーディングを識別するライブラリとして、[`<text_encoding>`](/reference/text_encoding.md.nolink)を追加
- 並行処理におけるデータの参照・更新を行うRCU (Read Copy Update) のライブラリとして、[`<rcu>`](/reference/rcu.md.nolink)を追加
- 並行処理において参照中のデータが更新されないよう保護するハザードポインタのライブラリとして、[`<hazard_pointer>`](/reference/hazard_pointer.md.nolink)を追加
- デバッグサポートのライブラリとして[`<debugging>`](/reference/debugging.md.nolink)を追加
- 線形代数ライブラリとして[`<linalg>`](/reference/linalg.md)を追加
- コンパイル時に容量を固定する可変長配列クラスのライブラリとして[`<inplace_vector>`](/reference/inplace_vector.md.nolink)を追加


### コンテナ
- [`std::mdspan`](/reference/mdspan/mdspan.md)から部分ビューを取り出す[`std::submdspan()`](/reference/mdspan/submdspan.md)を追加
- [`std::mdspan`](/reference/mdspan/mdspan.md)に対する[`std::dextents`](/reference/mdspan/extents.md)指定の冗長さを解決する[`std::dims`](/reference/mdspan/extents.md)を追加
- [`std::mdspan`](/reference/mdspan/mdspan.md)のレイアウトとして、[`std::layout_left_padded`](/reference/mdspan/layout_left_padded.md)と[`std::layout_right_padded`](/reference/mdspan/layout_right_padded.md)を追加
- [`std::span`](/reference/span/span.md)に、以下を追加
    - [`std::initializer_list`](/reference/initializer_list/initializer_list.md)をとるコンストラクタ
    - インデックスアクセスのための[`at()`](/reference/span/span/at.md)メンバ関数
- 連想コンテナの以下のメンバ関数に、一時オブジェクトが生成されるコストを抑える拡張を追加
    - [`std::map`](/reference/map/map.md)
        - [`operator[]`](/reference/map/map/op_at.md)
        - [`at()`](/reference/map/map/at.md)
        - [`try_emplace()`](/reference/map/map/try_emplace.md)
        - [`insert_or_assign()`](/reference/map/map/insert_or_assign.md)
    - [`std::set`](/reference/set/set.md)
        - [`insert()`](/reference/set/set/insert.md)
    - [`std::unordered_map`](/reference/unordered_map/unordered_map.md)
        - [`operator[]`](/reference/unordered_map/unordered_map/op_at.md)
        - [`at()`](/reference/unordered_map/unordered_map/at.md)
        - [`try_emplace()`](/reference/unordered_map/unordered_map/try_emplace.md)
        - [`insert_or_assign()`](/reference/unordered_map/unordered_map/insert_or_assign.md)
        - [`bucket()`](/reference/unordered_map/unordered_map/bucket.md)
    - [`std::unordered_multimap`](/reference/unordered_map/unordered_multimap.md)
        - [`bucket()`](/reference/unordered_map/unordered_multimap/bucket.md)
    - [`std::unordered_set`](/reference/unordered_set/unordered_set.md)
        - [`insert()`](/reference/unordered_set/unordered_set/insert.md)
        - [`bucket()`](/reference/unordered_set/unordered_set/bucket.md)
    - [`std::unordered_multiset`](/reference/unordered_set/unordered_multiset.md)
        - [`bucket()`](/reference/unordered_set/unordered_multiset/bucket.md)
- [`std::span`](/reference/span/span.md)と[`std::mdspan`](/reference/mdspan/mdspan.md)の推論補助を改善
- [`std::views::concat`](/reference/ranges/concat_view.md)を追加


### アルゴリズム
- 以下のアルゴリズムを`constexpr`に対応
    - [`std::stable_sort()`](/reference/algorithm/stable_sort.md) / [`std::ranges::stable_sort()`](/reference/algorithm/ranges_stable_sort.md)
    - [`std::stable_partition()`](/reference/algorithm/stable_partition.md) / [`std::ranges::stable_partition()`](/reference/algorithm/ranges_stable_partition.md)
    - [`std::inplace_merge()`](/reference/algorithm/inplace_merge.md) / [`std::ranges::inplace_merge()`](/reference/algorithm/ranges_inplace_merge.md)
- Rangeアルゴリズムが完全型を要求しないようにするため、[`std::projected`](/reference/iterator/projected.md)の制約を緩和
- 以下のアルゴリズムに、値を波カッコ初期化で渡せるよう制約を追加
    - `std::erase()`
        - [`std::basic_string`](/reference/string/basic_string.md)版[`std::erase()`](/reference/string/basic_string/erase_free.md)
        - [`std::deque`](/reference/deque/deque.md)版[`std::erase()`](/reference/deque/deque/erase_free.md)
        - [`std::forward_list`](/reference/forward_list/forward_list.md)版[`std::erase()`](/reference/forward_list/forward_list/erase_free.md)
        - [`std::list`](/reference/list/list.md)版[`std::erase()`](/reference/list/list/erase_free.md)
        - [`std::vector`](/reference/vector/vector.md)版[`std::erase()`](/reference/vector/vector/erase_free.md)
    - [`std::find()`](/reference/algorithm/find.md)と[`std::ranges::find()`](/reference/algorithm/ranges_find.md)
    - [`std::ranges::find_last()`](/reference/algorithm/ranges_find_last.md)
    - [`std::count()`](/reference/algorithm/count.md)と[`std::ranges::count()`](/reference/algorithm/ranges_count.md)
    - [`std::search_n()`](/reference/algorithm/search_n.md)と[`std::ranges::search_n()`](/reference/algorithm/ranges_search_n.md)
    - [`std::replace()`](/reference/algorithm/replace.md)と[`std::ranges::replace()`](/reference/algorithm/replace.md)
    - [`std::replace_if()`](/reference/algorithm/replace_if.md)と[`std::ranges::replace_if()`](/reference/algorithm/replace_if.md)
    - [`std::ranges::replace_copy()`](/reference/algorithm/replace_copy.md)
    - [`std::replace_copy_if()`](/reference/algorithm/replace_copy_if.md)と[`std::ranges::replace_copy_if()`](/reference/algorithm/replace_copy_if.md)
    - [`std::fill()`](/reference/algorithm/fill.md)と[`std::ranges::fill()`](/reference/algorithm/ranges_fill.md)
    - [`std::fill_n()`](/reference/algorithm/fill_n.md)と[`std::ranges::fill_n()`](/reference/algorithm/ranges_fill_n.md)
    - [`std::remove()`](/reference/algorithm/remove.md)と[`std::ranges::remove()`](/reference/algorithm/ranges_remove.md)
    - [`std::remove_copy()`](/reference/algorithm/remove_copy.md)と[`std::ranges::remove_copy()`](/reference/algorithm/ranges_remove_copy.md)
    - [`std::lower_bound()`](/reference/algorithm/lower_bound.md)と[`std::ranges::lower_bound()`](/reference/algorithm/ranges_lower_bound.md)
    - [`std::upper_bound()`](/reference/algorithm/upper_bound.md)と[`std::ranges::upper_bound()`](/reference/algorithm/ranges_upper_bound.md)
    - [`std::equal_range()`](/reference/algorithm/equal_range.md)と[`std::ranges::equal_range()`](/reference/algorithm/ranges_equal_range.md)
    - [`std::binary_search()`](/reference/algorithm/binary_search.md)と[`std::ranges::binary_search()`](/reference/algorithm/ranges_binary_search.md)
    - [`std::ranges::fold_left()`](/reference/algorithm/ranges_fold_left.md)
    - [`std::ranges::fold_right()`](/reference/algorithm/ranges_fold_right.md)
    - [`std::ranges::contains()`](/reference/algorithm/ranges_contains.md)


### 関数オブジェクト
- 所有権を保持しない[`std::function`](/reference/functional/function.md)として、[`<functional>`](/reference/functional.md)に[`std::function_ref`](/reference/functional/function_ref.md)クラスを追加
- [`std::move_only_function`](/reference/functional/move_only_function.md)のコピー可能版として、[`<functional>`](/reference/functional.md)に[`std::copyable_function`](/reference/functional/copyable_function.md)クラスを追加
- [`std::bind_front()`](/reference/functional/bind_front.md)と[`std::bind_back()`](/reference/functional/bind_back.md)に、非型テンプレート引数として関数を指定するオーバーロードを追加
    - 関連して、非型テンプレート引数の関数オブジェクトを反転させられるよう、[`not_fn()`](/reference/functional/not_fn.md)に非型テンプレート引数版のオーバーロードを追加
- [`std::reference_wrapper`](/reference/functional/reference_wrapper.md)に、比較演算子[`==`](/reference/functional/reference_wrapper/op_equal.md.nolink)と[`<=>`](/reference/functional/reference_wrapper/op_compare_3way.md.nolink)を追加


### 文字列
- [`<charconv>`](/reference/charconv.md)の変換結果[`std::to_chars_result`](/reference/charconv/to_chars_result.md)と[`std::from_chars_result`](/reference/charconv/from_chars_result.md)に、変換が正しく完了したかを判定する`operator bool`を追加
- [`std::to_string()`](/reference/string/to_string.md)の仕様が`std::sprintf()`で説明されていたが、[`std::format()`](/reference/format/format.md)で定義するよう仕様を変更
- [`std::basic_istringstream`](/reference/sstream/basic_istringstream.md)および[`std::basic_ostringstream`](/reference/sstream/basic_ostringstream.md)のコンストラクタおよび`str()`メンバ関数に、[`std::basic_string_view`](/reference/string_view/basic_string_view.md)を受け取るオーバーロードを追加
- [`std::format()`](/reference/format/format.md)に、以下の改善を導入
    - ポインタ出力のサポートを追加
    - 幅と精度を動的に指定した場合でも型の検証がコンパイル時に行われるよう仕様を見直し
    - コンパイル時の書式文字列だけでなく、実行時の書式文字列を渡せるよう仕様修正
- [`std::basic_string`](/reference/string/basic_string.md)と[`std::basic_string_view`](/reference/string_view/basic_string_view.md)を[`std::basic_string`](/reference/string/basic_string.md)として連結させる`operator+`を追加


### ファイル
- ファイルのネイティブハンドルを取得できるよう、[`std::basic_filebuf`](/reference/fstream/basic_filebuf.md)、[`std::basic_ifstream`](/reference/fstream/basic_ifstream.md)、[`std::basic_ofstream`](/reference/fstream/basic_ofstream.md)、[`std::basic_fstream`](/reference/fstream/basic_fstream.md)クラスに、以下のメンバを追加
    - `native_handle_type`型
    - `native_handle()`
- [`std::filesystem::path`](/reference/filesystem/path.md)に、文字列フォーマットのサポートを追加


### 入出力
- [`std::print()`](/reference/print/print.md)と[`std::println()`](/reference/print/println.md)に、ロックを取得せず高速に書き出す最適化を許可
- [`std::println()`](/reference/print/println.md)に、改行のみを出力するオーバーロードを追加
- [`std::print()`](/reference/print/print.md)と[`std::println()`](/reference/print/println.md)をより高速にできる最適化が可能か判定する[`std::enable_nonlocking_formatter_optimization`](/reference/format/enable_nonlocking_formatter_optimization.md)を追加


### 並行・並列処理
- [`std::atomic`](/reference/atomic/atomic.md)オブジェクトに対する2つの値の最大値・最小値を取得する関数として、メンバ関数[`fetch_max()`](/reference/atomic/atomic/fetch_max.md.nolink)と[`fetch_min()`](/reference/atomic/atomic/fetch_min.md.nolink)、非メンバ関数として[`std::atomic_fetch_max`](/reference/atomic/atomic_fetch_max.md.nolink)、[`std::atomic_fetch_max_explicit`](/reference/atomic/atomic_fetch_max_explicit.md.nolink)、[`std::atomic_fetch_min`](/reference/atomic/atomic_fetch_min.md.nolink)、[`std::atomic_fetch_min_explicit`](/reference/atomic/atomic_fetch_min_explicit.md.nolink)を追加


### スマートポインタ
- [`std::weak_ptr`](/reference/memory/weak_ptr.md)を非順序連想コンテナのキーとして使用できるよう、[`<memory>`](/reference/memory.md)に所有権ベースのハッシュ値を取得する関数オブジェクト[`std::owner_hash`](/reference/memory/owner_hash.md.nolink)、および所有権ベースの等値比較を行う関数オブジェクト[`std::owner_equal`](/reference/memory/owner_equal.md.nolink)を追加
    - 関連して、[`std::shared_ptr`](/reference/memory/shared_ptr.md)クラスと[`std::weak_ptr`](/reference/memory/weak_ptr.md)クラスのメンバ関数として、`owner_hash()`と`owner_equal()`を追加


### 日付・時間
- [`<chrono>`](/reference/chrono.md)の以下のクラスに、ハッシュ値サポートとして[`std::hash`](/reference/functional/hash.md)の特殊化を追加
    - [`std::chrono::duration`](/reference/chrono/duration.md)
    - [`std::chrono::time_point`](/reference/chrono/time_point.md)
    - [`std::chrono::day`](/reference/chrono/day.md)
    - [`std::chrono::month`](/reference/chrono/month.md)
    - [`std::chrono::year`](/reference/chrono/year.md)
    - [`std::chrono::weekday`](/reference/chrono/weekday.md)
    - [`std::chrono::weekday_indexed`](/reference/chrono/weekday_indexed.md)
    - [`std::chrono::weekday_last`](/reference/chrono/weekday_last.md)
    - [`std::chrono::month_day`](/reference/chrono/month_day.md)
    - [`std::chrono::month_day_last`](/reference/chrono/month_day_last.md)
    - [`std::chrono::month_weekday`](/reference/chrono/month_weekday.md)
    - [`std::chrono::month_weekday_last`](/reference/chrono/month_weekday_last.md)
    - [`std::chrono::year_month`](/reference/chrono/year_month.md)
    - [`std::chrono::year_month_day`](/reference/chrono/year_month_day.md)
    - [`std::chrono::year_month_day_last`](/reference/chrono/year_month_day_last.md)
    - [`std::chrono::year_month_weekday`](/reference/chrono/year_month_weekday.md)
    - [`std::chrono::year_month_weekday_last`](/reference/chrono/year_month_weekday_last.md)
    - [`std::chrono::zoned_time`](/reference/chrono/zoned_time.md)
    - [`std::chrono::leap_second`](/reference/chrono/leap_second.md)


### 数値
- [`<numeric>`](/reference/numeric.md)に、飽和演算 (Saturation Arithmetic) として、型の表現可能な範囲で演算を行う以下の関数を追加
    - [`std::add_sat()`](/reference/numeric/add_sat.md)
    - [`std::sub_sat()`](/reference/numeric/sub_sat.md)
    - [`std::mul_sat()`](/reference/numeric/mul_sat.md)
    - [`std::div_sat()`](/reference/numeric/div_sat.md)
    - [`std::saturate_cast()`](/reference/numeric/saturate_cast.md)
- [`<cmath>`](/reference/cmath.md)の以下の関数を、`constexpr`に対応 (特殊関数と、グローバルの丸めモードに依存する丸め関数以外の全て)
    - [`std::cos()`](/reference/cmath/cos.md)
    - [`std::sin()`](/reference/cmath/sin.md)
    - [`std::tan()`](/reference/cmath/tan.md)
    - [`std::cosh()`](/reference/cmath/cosh.md)
    - [`std::sinh()`](/reference/cmath/sinh.md)
    - [`std::tanh()`](/reference/cmath/tanh.md)
    - [`std::acos()`](/reference/cmath/acos.md)
    - [`std::asin()`](/reference/cmath/asin.md)
    - [`std::atan()`](/reference/cmath/atan.md)
    - [`std::atan2()`](/reference/cmath/atan2.md)
    - [`std::acosh()`](/reference/cmath/acosh.md)
    - [`std::asinh()`](/reference/cmath/asinh.md)
    - [`std::atanh()`](/reference/cmath/atanh.md)
    - [`std::exp()`](/reference/cmath/exp.md)
    - [`std::exp2()`](/reference/cmath/exp2.md)
    - [`std::expm1()`](/reference/cmath/expm1.md)
    - [`std::log()`](/reference/cmath/log.md)
    - [`std::log10()`](/reference/cmath/log10.md)
    - [`std::log1p()`](/reference/cmath/log1p.md)
    - [`std::log2()`](/reference/cmath/log2.md)
    - [`std::pow()`](/reference/cmath/pow.md)
    - [`std::sqrt()`](/reference/cmath/sqrt.md)
    - [`std::cbrt()`](/reference/cmath/cbrt.md)
    - [`std::hypot()`](/reference/cmath/hypot.md)
    - [`std::erf()`](/reference/cmath/erf.md)
    - [`std::erfc()`](/reference/cmath/erfc.md)
    - [`std::lgamma()`](/reference/cmath/lgamma.md)
    - [`std::tgamma()`](/reference/cmath/tgamma.md)
- [`<complex>`](/reference/complex.md)の以下の関数を、`constexpr`に対応 (すべて)
    - [`std::abs()`](/reference/complex/complex/abs.md)
    - [`std::arg()`](/reference/complex/complex/arg.md)
    - [`std::proj()`](/reference/complex/complex/proj.md)
    - [`std::polar()`](/reference/complex/complex/polar.md)
    - [`std::cos()`](/reference/complex/complex/cos.md)
    - [`std::sin()`](/reference/complex/complex/sin.md)
    - [`std::tan()`](/reference/complex/complex/tan.md)
    - [`std::cosh()`](/reference/complex/complex/cosh.md)
    - [`std::sinh()`](/reference/complex/complex/sinh.md)
    - [`std::tanh()`](/reference/complex/complex/tanh.md)
    - [`std::acos()`](/reference/complex/complex/acos.md)
    - [`std::asin()`](/reference/complex/complex/asin.md)
    - [`std::atan()`](/reference/complex/complex/atan.md)
    - [`std::acosh()`](/reference/complex/complex/acosh.md)
    - [`std::asinh()`](/reference/complex/complex/asinh.md)
    - [`std::atanh()`](/reference/complex/complex/atanh.md)
    - [`std::exp()`](/reference/complex/complex/exp.md)
    - [`std::log()`](/reference/complex/complex/log.md)
    - [`std::log10()`](/reference/complex/complex/log10.md)
    - [`std::pow()`](/reference/complex/complex/pow.md)
    - [`std::sqrt()`](/reference/complex/complex/sqrt.md)
    - [`std::norm()`](/reference/complex/complex/norm.md) (算術型オーバーロード)
    - [`std::conj()`](/reference/complex/complex/conj.md) (算術型オーバーロード)
    - [`std::imag()`](/reference/complex/complex/imag_free.md) (算術型オーバーロード)
    - [`std::real()`](/reference/complex/complex/real_free.md) (算術型オーバーロード)
- [`std::complex`](/reference/complex/complex.md)を構造化束縛や、将来のパターンマッチで使用できるようタプルインタフェースの特殊化を追加
- [`<random>`](/reference/random.md)の範囲`[0, 1)`の乱数を生成する[`std::generate_canonical()`](/reference/random/generate_canonical.md)を、望ましい統計的性質を保証するようアルゴリズムと制約を変更
- [`<random>`](/reference/random.md)に、乱数列を生成する[`std::ranges::generate_random()`](/reference/random/generate_random.md)関数を追加


### ユーティリティ
- [`std::variant`](/reference/variant/variant.md)クラスに、メンバ関数版の[`visit()`](/reference/variant/variant/visit.md.nolink)を追加
- [`std::optional`](/reference/optional/optional.md)クラスに、0もしくは1要素のRangeとして扱えるようにするための拡張として、イテレータインタフェースを追加
    - `iterator`型
    - `const_iterator`型
    - [`begin()`](/reference/optional/optional/begin.md.nolink)メンバ関数
    - [`end()`](/reference/optional/optional/end.md.nolink)メンバ関数
- [`std::ignore`](/reference/tuple/ignore.md)をファーストクラス・オブジェクトとして型を詳細に定義
- [`std::bitset`](/reference/bitset/bitset.md)に、[`std::basic_string_view`](/reference/string_view/basic_string_view.md)を受け取るコンストラクタを追加
- [`<ratio>`](/reference/ratio.md)に、新たなSI接頭辞として、以下を追加
    - [`ronna`](/reference/ratio/si_prefix.md) (10<sup>27</sup>)
    - [`ronto`](/reference/ratio/si_prefix.md) (10<sup>−27</sup>)
    - [`quetta`](/reference/ratio/si_prefix.md) (10<sup>30</sup>)
    - [`quecto`](/reference/ratio/si_prefix.md) (10<sup>−30</sup>)


### デバッグ
- [`assert`](/reference/cassert/assert.md)マクロの引数としてカンマを含む式を指定できるよう、可変引数化


### 型特性
- [`<type_traits>`](/reference/type_traits.md)に、共用体のどのメンバがアクティブかを判定するための関数として[`std::is_within_lifetime()`](/reference/type_traits/is_within_lifetime.md.nolink)を追加
- [`<type_traits>`](/reference/type_traits.md)に、仮想継承の関係を判定する[`std::is_virtual_base_of`](/reference/type_traits/is_virtual_base_of.md.nolink)を追加


### 制約
- 間接実行に関連する制約から、共通参照の要件を削除
    - [`std::indirectly_unary_invocable`](/reference/iterator/indirectly_unary_invocable.md)
    - [`std::indirectly_regular_unary_invocable`](/reference/iterator/indirectly_unary_invocable.md)
    - [`std::indirect_unary_predicate`](/reference/iterator/indirect_unary_predicate.md)
    - [`std::indirect_binary_predicate`](/reference/iterator/indirect_binary_predicate.md)
    - [`std::indirect_equivalence_relation`](/reference/iterator/indirect_equivalence_relation.md)
    - [`std::indirect_strict_weak_order`](/reference/iterator/indirect_strict_weak_order.md)


### 非推奨の取り消し
- [`std::polymorphic_allocator`](/reference/memory_resource/polymorphic_allocator.md)`::`[`destroy()`](/reference/memory_resource/polymorphic_allocator/destroy.md)の非推奨を取り消し


### 機能の削除
- C++98から非推奨となっていた`<strstream>`ライブラリを削除
- C++17から非推奨となっていたUnicode変換ライブラリ[`<codecvt>`](/reference/codecvt.md)と、[`std::wstring_convert`](/reference/locale/wstring_convert.md)クラス、[`std::wbuffer_convert`](/reference/locale/wbuffer_convert.md)クラスを削除
- C++20から非推奨となっていた、[`std::basic_string`](/reference/string/basic_string.md)`::`[`reserve()`](/reference/string/basic_string/reserve.md)のパラメータなしのオーバーロードを削除
- C++20から非推奨となっていた[`std::shared_ptr`](/reference/memory/shared_ptr.md)に対する、以下の古いアトミック操作関数のオーバーロードを削除
    - [`std::atomic_is_lock_free`](/reference/memory/shared_ptr/atomic_is_lock_free.md)
    - [`std::atomic_load`](/reference/memory/shared_ptr/atomic_load.md)
    - [`std::atomic_load_explicit`](/reference/memory/shared_ptr/atomic_load_explicit.md)
    - [`std::atomic_store`](/reference/memory/shared_ptr/atomic_store.md)
    - [`std::atomic_store_explicit`](/reference/memory/shared_ptr/atomic_store_explicit.md)
    - [`std::atomic_exchange`](/reference/memory/shared_ptr/atomic_exchange.md)
    - [`std::atomic_exchange_explicit`](/reference/memory/shared_ptr/atomic_exchange_explicit.md)
    - [`std::atomic_compare_exchange_weak`](/reference/memory/shared_ptr/atomic_compare_exchange_weak.md)
    - [`std::atomic_compare_exchange_strong`](/reference/memory/shared_ptr/atomic_compare_exchange_strong.md)
    - [`std::atomic_compare_exchange_weak_explicit`](/reference/memory/shared_ptr/atomic_compare_exchange_weak_explicit.md)
    - [`std::atomic_compare_exchange_strong_explicit`](/reference/memory/shared_ptr/atomic_compare_exchange_strong_explicit.md)
- C++23から非推奨となっていた、[`std::allocator`](/reference/memory/allocator.md)のメンバ型`is_always_equal`を削除

