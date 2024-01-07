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


### 文字列

| 言語機能 | 説明 |
|----------|------|
| [文字列リテラルの文字エンコーディング失敗を不適格とする](/lang/cpp26/making_non-encodable_string_literals_ill-formed.md.nolink) | 文字列リテラルのエンコーディング時に文字表現が失われる場合にコンパイルエラーにする |
| [コンパイル時にのみ使用される文字列の扱いを明確化](/lang/cpp26/unevaluated_strings.md.nolink) | `static_assert`や`[[deprecated]]`などで使用されるコンパイル時の文字列について、文字コードの指定を禁止し、実行時エンコーディングが行われないことを規定 |


### 属性

| 言語機能 | 説明 |
|----------|------|
| [属性の無視性を見直し](/lang/cpp26/on_the_ignorability_of_standard_attributes.md.nolink) | 構文として適格な属性のみを無視できるようにし、そうでない属性の使用を不適格とする |


### 定数式

| 言語機能 | 説明 |
|----------|------|
| [定数式での`void*`からポインタ型へのキャストを許可](/lang/cpp26/constexpr_cast_from_voidptr.md.nolink) | 型消去のために`void*`からポインタ型へのキャストを許可する |
| [`static_assert`の診断メッセージにユーザーが生成した文字列の指定を許可](/lang/cpp26/user-generated_static_assert_messages.md.nolink) | `constexpr`な`S.size()`と`S.data()`メンバ関数をもつオブジェクトをコンパイル時文字列として指定できるようにする |


### ソースコード

| 言語機能 | 説明 |
|----------|------|
| [基本文字集合に@、$、\`を追加](/lang/cpp26/add_atsign_dollar_graveaccent_to_the_basic_character_set.md.nolink) | C言語との互換性のためにこれらの文字を基本文字集合に追加 |


## ライブラリ更新の概要
### 新ライブラリ
- 文字列エンコーディングを識別するライブラリとして、[`<text_encoding>`](/reference/text_encoding.md.nolink)を追加
- 並行処理におけるデータの参照・更新を行うRCU (Read Copy Update) のライブラリとして、[`<rcu>`](/reference/rcu.md.nolink)を追加
- 並行処理において参照中のデータが更新されないよう保護するハザードポインタのライブラリとして、[`<hazard_pointer>`](/reference/hazard_pointer.md.nolink)を追加


### コンテナ
- [`std::mdspan`](/reference/mdspan/mdspan.md)のサブ配列版として[`std::submdspan`](/reference/mdspan/submdspan.md.nolink)を追加
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


### アルゴリズム
- 以下のアルゴリズムを`constexpr`に対応
    - [`std::stable_sort()`](/reference/algorithm/stable_sort.md) / [`std::ranges::stable_sort()`](/reference/algorithm/ranges_stable_sort.md)
    - [`std::stable_partition()`](/reference/algorithm/stable_partition.md) / [`std::ranges::stable_partition()`](/reference/algorithm/ranges_stable_partition.md)
    - [`std::inplace_merge()`](/reference/algorithm/inplace_merge.md) / [`std::ranges::stable_partition()`](/reference/algorithm/ranges_inplace_merge.md)
- Rangeアルゴリズムが完全型を要求しないようにするため、[`std::projected`](/reference/iterator/projected.md)の制約を緩和


### 関数オブジェクト
- 所有権を保持しない[`std::function`](/reference/functional/function.md)として、[`<functional>`](/reference/functional.md)に[`std::function_ref`](/reference/functional/function_ref.md)クラスを追加
- [`std::move_only_function`](/reference/functional/move_only_function.md)のコピー可能版として、[`<functional>`](/reference/functional.md)に[`std::copyable_function`](/reference/functional/copyable_function.md)クラスを追加
- [`std::bind_front()`](/reference/functional/bind_front.md)と[`std::bind_back()`](/reference/functional/bind_back.md.nolink)に、非型テンプレート引数として関数を指定するオーバーロードを追加
    - 関連して、非型テンプレート引数の関数オブジェクトを反転させられるよう、[`not_fn()`](/reference/functional/not_fn.md)に非型テンプレート引数版のオーバーロードを追加


### 文字列
- [`<charconv>`](/reference/charconv.md)の変換結果[`std::to_chars_result`](/reference/charconv/to_chars_result.md)と[`std::from_chars_result`](/reference/charconv/from_chars_result.md)に、変換が正しく完了したかを判定する`operator bool`を追加
- [`std::to_string()`](/reference/string/to_string.md)の仕様が`std::sprintf()`で説明されていたが、[`std::format()`](/reference/format/format.md)で定義するよう仕様を変更
- [`std::basic_istringstream`](/reference/sstream/basic_istringstream.md)および[`std::basic_ostringstream`](/reference/sstream/basic_ostringstream.md)のコンストラクタおよび`str()`メンバ関数に、[`std::basic_string_view`](/reference/string_view/basic_string_view.md)を受け取るオーバーロードを追加
- [`std::format()`](/reference/format/format.md)に、ポインタ出力のサポートを追加
- [`std::format()`](/reference/format/format.md)で幅と精度を動的に指定した場合でも型の検証がコンパイル時に行われるよう仕様を見直し


### ファイル
- ファイルのネイティブハンドルを取得できるよう、[`std::basic_filebuf`](/reference/fstream/basic_filebuf.md)、[`std::basic_ifstream`](/reference/fstream/basic_ifstream.md)、[`std::basic_ofstream`](/reference/fstream/basic_ofstream.md)、[`std::basic_fstream`](/reference/fstream/basic_fstream.md)クラスに、以下のメンバを追加
    - `native_handle_type`型
    - `native_handle()`


### 並行・並列処理
- [`std::atomic`](/reference/atomic/atomic.md)オブジェクトに対する2つの値の最大値・最小値を取得する関数として、メンバ関数[`fetch_max()`](/reference/atomic/atomic/fetch_max.md.nolink)と[`fetch_min()`](/reference/atomic/atomic/fetch_min.md.nolink)、非メンバ関数として[`std::atomic_fetch_max`](/reference/atomic/atomic_fetch_max.md.nolink)、[`std::atomic_fetch_max_explicit`](/reference/atomic/atomic_fetch_max_explicit.md.nolink)、[`std::atomic_fetch_min`](/reference/atomic/atomic_fetch_min.md.nolink)、[`std::atomic_fetch_min_explicit`](/reference/atomic/atomic_fetch_min_explicit.md.nolink)を追加


### スマートポインタ
- [`std::weak_ptr`](/reference/memory/weak_ptr.md)を非順序連想コンテナのキーとして使用できるよう、[`<memory>`](/reference/memory.md)に所有権ベースのハッシュ値を取得する関数オブジェクト[`std::owner_hash`](/reference/memory/owner_hash.md.nolink)、および所有権ベースの等値比較を行う関数オブジェクト[`std::owner_equal`](/reference/memory/owner_equal.md.nolink)を追加
    - 関連して、[`std::shared_ptr`](/reference/memory/shared_ptr.md)クラスと[`std::weak_ptr`](/reference/memory/weak_ptr.md)クラスのメンバ関数として、`owner_hash()`と`owner_equal()`を追加


### 日付・時間
- [`<chrono>`](/reference/chrono.md)の以下のクラスに[`std::hash`](/reference/functional/hash.md)のサポートを追加
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


### 数学
- [`<cmath>`](/reference/cmath.md)の以下の関数を、`constexpr`に対応
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
- [`<complex>`](/reference/complex.md)の以下の関数を、`constexpr`に対応
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

### ユーティリティ
- [`std::variant`](/reference/variant/variant.md)クラスに、メンバ関数版の[`visit()`](/reference/variant/variant/visit.md.nolink)を追加
- [`<ratio>`](/reference/ratio.md)に、新たなSI接頭辞として、以下を追加
    - [`ronna`](/reference/ratio/si_prefix.md) (10<sup>27</sup>)
    - [`ronto`](/reference/ratio/si_prefix.md) (10<sup>−27</sup>)
    - [`quetta`](/reference/ratio/si_prefix.md) (10<sup>30</sup>)
    - [`quecto`](/reference/ratio/si_prefix.md) (10<sup>−30</sup>)


### 型特性
- 共用体のどのメンバがアクティブかを判定するための関数として、[`<type_traits>`](/reference/type_traits.md)に[`std::is_within_lifetime()`](/reference/type_traits/is_within_lifetime.md.nolink)を追加
- [`std::bitset`](/reference/bitset/bitset.md)に、[`std::basic_string_view`](/reference/string_view/basic_string_view.md)を受け取るコンストラクタを追加

