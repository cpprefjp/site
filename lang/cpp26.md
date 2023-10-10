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
### アルゴリズム
- 以下のアルゴリズムを`constexpr`に対応
    - [`std::stable_sort()`](/reference/algorithm/stable_sort.md) / [`std::ranges::stable_sort()`](/reference/algorithm/ranges_stable_sort.md)
    - [`std::stable_partition()`](/reference/algorithm/stable_partition.md) / [`std::ranges::stable_partition()`](/reference/algorithm/ranges_stable_partition.md)
    - [`std::inplace_merge()`](/reference/algorithm/inplace_merge.md) / [`std::ranges::stable_partition()`](/reference/algorithm/ranges_inplace_merge.md)


### 文字列
- [`<charconv>`](/reference/charconv.md)の変換結果[`std::to_chars_result`](/reference/charconv/to_chars_result.md)と[`std::from_chars_result`](/reference/charconv/from_chars_result.md)に、変換が正しく完了したかを判定する`operator bool`を追加
- [`std::to_string()`](/reference/string/to_string.md)の仕様が`std::sprintf()`で説明されていたが、[`std::format()`](/reference/format/format.md)で定義するよう仕様を変更


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
