# chrono
* chrono[meta header]
* cpp11[meta cpp]

`<chrono>`ヘッダは、時間に関するユーティリティとして機能する関数・クラスを提供する。このヘッダに含まれる関数・クラスは、`std::chrono`名前空間で定義される。

このライブラリは、タイムアウト、操作間隔、スケジューリングといった�期間の操作を主な用途として想定している。そのためカレンダー機能としては遥かな過去・未来を扱えるようにはなっていない。


## 時間を表す型

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------|-------|
| [`duration`](chrono/duration.md)               | 時間の間隔(class template) | C++11 |
| [`time_point`](chrono/time_point.md)           | 時間軸上の一点(class template) | C++11 |
| [`treat_as_floating_point`](chrono/treat_as_floating_point.md) | `duration`内部表現の型が浮動小数点型かを判定するためのトレイト(class template) | C++11 |
| [`duration_values`](chrono/duration_values.md) | `duration`内部表現の特別な値を取得するためのトレイト(class template) | C++11 |


## 時間の単位を表す型

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------|-------|
| [`nanoseconds`](chrono/duration_aliases.md)  | ナノ秒を表現するためのdurationの別名(type-alias) | C++11 |
| [`microseconds`](chrono/duration_aliases.md) | マイク�秒を表現するためのdurationの別名(type-alias) | C++11 |
| [`milliseconds`](chrono/duration_aliases.md) | ミリ秒を表現するためのdurationの別名(type-alias) | C++11 |
| [`seconds`](chrono/duration_aliases.md)      | 秒を表現するためのdurationの別名(type-alias) | C++11 |
| [`minutes`](chrono/duration_aliases.md)      | 分を表現するためのdurationの別名(type-alias) | C++11 |
| [`hours`](chrono/duration_aliases.md)        | 時を表現するためのdurationの別名(type-alias) | C++11 |
| [`days`](chrono/duration_aliases.md)         | 日を表現するためのdurationの別名(type-alias) | C++20 |
| [`weeks`](chrono/duration_aliases.md)        | 週を表現するためのdurationの別名(type-alias) | C++20 |
| [`years`](chrono/duration_aliases.md)        | 年を表現するためのdurationの別名(type-alias) | C++20 |
| [`months`](chrono/duration_aliases.md)       | 月を表現するためのdurationの別名(type-alias) | C++20 |


## 時計型

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------|-------|
| [`is_clock`](chrono/is_clock.md.nolink) | ク�ック型かを判定する (class template) | C++20 |
| [`system_clock`](chrono/system_clock.md)       | システム時間のク�ック(class) | C++11 |
| [`steady_clock`](chrono/steady_clock.md)       | 時間が逆行しないク�ック(class) | C++11 |
| [`high_resolution_clock`](chrono/high_resolution_clock.md) | 高分解能ク�ック(class) | C++11 |
| [`utc_clock`](chrono/utc_clock.md) | UTC時間 (協定世界時) のク�ック (class) | C++20 |
| [`tai_clock`](chrono/tai_clock.md.nolink) | TAI時間 (国際原�時) のク�ック (class) | C++20 |
| [`gps_clock`](chrono/gps_clock.md.nolink) | GPS時間のク�ック (class) | C++20 |
| [`file_clock`](chrono/file_clock.md.nolink) | ファイル時間を作るために使用されるク�ック (class) | C++20 |

### システム時間用の機能

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`sys_time`](chrono/sys_time.md) | システム時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`sys_seconds`](chrono/sys_time.md) | 秒単位でシステム時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`sys_days`](chrono/sys_time.md) | 日単位でシステム時間の一点を指すtime_pointの別名 (type-alias) | C++20 |


### �ーカル時間用の機能

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`local_t`](chrono/local_time.md) | �ーカル時間を表す擬似的なク�ック (class) | C++20 |
| [`local_time`](chrono/local_time.md) | �ーカル時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`local_seconds`](chrono/local_time.md) | 秒単位で�ーカル時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`local_days`](chrono/local_time.md) | 日単位で�ーカル時間の一点を指すtime_pointの別名 (type-alias) | C++20 |


### UTC時間用の機能

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`utc_time`](chrono/utc_time.md) | UTC時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`utc_seconds`](chrono/utc_time.md) | 秒単位でUTC時間の一点を指すtime_pointの別名 (type-alias) | C++20 |


### TAI時間用の機能

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`tai_time`](chrono/tai_time.md.nolink) | TAI時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`tai_seconds`](chrono/tai_time.md.nolink) | 秒単位でTAI時間の一点を指すtime_pointの別名 (type-alias) | C++20 |


### GPS時間用の機能

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`gps_time`](chrono/gps_time.md.nolink) | GPS時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`gps_seconds`](chrono/gps_time.md.nolink) | 秒単位でGPS時間の一点を指すtime_pointの別名 (type-alias) | C++20 |


### ファイル時間用の機能

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`file_time`](chrono/file_time.md.nolink) | ファイル時間の一点を指すtime_pointの別名 (type-alias) | C++20 |


### 時計時間の変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`clock_time_conversion`](chrono/clock_time_conversion.md.nolink) | 時計間の変換方法を組み合わせごとに定義するためのクラス (class template) | C++20 |
| [`clock_cast`](chrono/clock_cast.md.nolink) | ほかの時計時間のtime_pointに変換する (function template) | C++20 |


### うるう秒の情報

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`leap_second_info`](chrono/leap_second_info.md.nolink) | うるう秒の情報を扱うクラス (class) | C++20 |
| [`get_leap_second_info`](chrono/get_leap_second_info.md.nolink) | 指定した日時までに挿入されたうるう秒の回数を取得する (function template) | C++20 |


## カレンダー型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`last_spec`](chrono/last_spec.md) | 月の最終日、週の最終日など、文脈に応じた「最後」を表す型 (class) | C++20 |
| [`day`](chrono/day.md) | 未規定の月の指定した日を表す型 (class) | C++20 |
| [`month`](chrono/month.md) | 月単体の値を表す型 (class) | C++20 |
| [`year`](chrono/year.md) | カレンダーの年を表す型 (class) | C++20 |
| [`weekday`](chrono/weekday.md) | 週の日を表す型 (class) | C++20 |
| [`weekday_indexed`](chrono/weekday_indexed.md.nolink) | N回目の指定した曜日を表す型 (class) | C++20 |
| [`weekday_last`](chrono/weekday_last.md.nolink) | 未規定の月の最後の指定した曜日を表す型 (class) | C++20 |
| [`month_day`](chrono/month_day.md.nolink) | 月と日を表す型 (class) | C++20 |
| [`month_day_last`](chrono/month_day_last.md.nolink) | 指定した月の最終日を表す型 (class) | C++20 |
| [`month_weekday`](chrono/month_weekday.md.nolink) | 月の指定したN番目の曜日を表す型 (class) | C++20 |
| [`month_weekday_last`](chrono/month_weekday_last.md.nolink) | 月の最後の指定した曜日を表す型 (class) | C++20 |
| [`year_month`](chrono/year_month.md.nolink) | 年と月を表す型 (class) | C++20 |
| [`year_month_day`](chrono/year_month_day.md) | 年、月、日を表す型 (class) | C++20 |
| [`year_month_day_last`](chrono/year_month_day_last.md.nolink) | 年、月、月の最終日を表す型 (class) | C++20 |
| [`year_month_weekday`](chrono/year_month_weekday.md.nolink) | 年、月、N回目の指定した曜日を表す型 (class) | C++20 |
| [`year_month_weekday_last`](chrono/year_month_weekday_last.md.nolink) | 年、月、月の最後の指定した曜日を表す型 (class) | C++20 |


## 1日内の時間情報

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`time_of_day`](chrono/time_of_day.md.nolink) | 1日内の時間情報を取得するクラス (class) | C++20 |
| [`hh_mm_ss`](chrono/hh_mm_ss.md.nolink) | 時、分、秒を表すクラス (class) | C++20 |
| [`is_am`](chrono/is_am.md.nolink) | 時間が午前かを判定する (function) | C++20 |
| [`is_pm`](chrono/is_pm.md.nolink) | 時間が午後かを判定する (function) | C++20 |
| [`make12`](chrono/make12.md.nolink) | `[1h, 12h]`の時間範囲に変換する (function) | C++20 |
| [`make24`](chrono/make24.md.nolink) | 時間を午前`[0h, 11h]`か午後`[12h, 23h]`の範囲に変換する (function) | C++20 |


## タイムゾーン
### タイムゾーンのデータベース

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`tzdb`](chrono/tzdb.md.nolink) | タイムゾーンのデータベース型 (class) | C++20 |
| [`get_tzdb`](chrono/get_tzdb.md.nolink) | 先�のタイムゾーンを取得する (function) | C++20 |
| [`get_tzdb_list`](chrono/get_tzdb_list.md.nolink) | タイムゾーンのリストを取得する (function) | C++20 |
| [`locate_zone`](chrono/locate_zone.md) | 指定した名前のタイムゾーンを取得する (function) | C++20 |
| [`current_zone`](chrono/current_zone.md) | 現在のタイムゾーンを取得する (function) | C++20 |

### リモートタイムゾーンのサポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`reload_tzdb`](chrono/reload_tzdb.md.nolink) | リモートタイムゾーンを再�み込みする (function) | C++20 |
| [`remote_version`](chrono/remote_version.md.nolink) | リモートタイムゾーンの最新バージョン番号を取得する | C++20 |


### 例外クラス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`nonexistent_local_time`](chrono/nonexistent_local_time.md.nolink) | �在しない�ーカル時間をシステム時間に変換しようとした (class) | C++20 |
| [`ambiguous_local_time`](chrono/ambiguous_local_time.md.nolink) | �ーカル時間があいまい (class) | C++20 |


### 情報クラス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`sys_info`](chrono/sys_info.md.nolink) | タイムゾーンと時間の情報 (class) | C++20 |


### タイムゾーン

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`choose`](chrono/choose.md.nolink) | タイムゾーンを変換する際に、早い時間側と遅い時間側どちらに丸めるかの種類 (enum) | C++20 |
| [`time_zone`](chrono/time_zone.md.nolink) | タイムゾーンの変換を扱うクラス (class) | C++20 |
| [`zoned_traits`](chrono/zone_traits.md.nolink) | `zoned_time`のカスタマイズ (class) | C++20 |
| [`zoned_time`](chrono/zoned_time.md) | タイムゾーンを考慮した時間軸上の一点を表す型 (class) | C++20 |
| [`zoned_seconds`](chrono/zoned_time.md) | 秒単位でタイムゾーンを考慮した時間軸上の一点を表す型 (type-alias) | C++20 |


### うるう秒サポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`leap`](chrono/leap.md.nolink) | うるう秒が挿入された日付を表す型 (class) | C++20 |


### リンク

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`link`](chrono/link.md.nolink) | タイムゾーンの代替名を表す型 (class) | C++20 |


## 文�列フォーマット

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`local_time_format`](chrono/local_time_format.md.nolink) | �ーカル時間の文�列フォーマット用オブジェクトを生成する (function template) | C++20 |
| `template<class Rep, class Period, class charT>`<br/> `struct formatter<chrono::duration<Rep, Period>, charT>;` | `duration`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class Duration, class charT>`<br/> `struct formatter<chrono::sys_time<Duration>, charT>;` | `sys_time`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class Duration, class charT>`<br/> `struct formatter<chrono::utc_time<Duration>, charT>;` | `utc_time`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class Duration, class charT>`<br/> `struct formatter<chrono::tai_time<Duration>, charT>;` | `tai_time`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class Duration, class charT>`<br/> `struct formatter<chrono::gps_time<Duration>, charT>;` | `gps_time`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class Duration, class charT>`<br/> `struct formatter<chrono::file_time<Duration>, charT>;` | `file_time`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class Duration, class charT>`<br/> `struct formatter<chrono::local_time<Duration>, charT>;` | `local_time`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class Duration, class charT>` `struct formatter<chrono::local-time-format-t <Duration>, charT>;` | `local_time_format()`の戻り値型に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::month, charT>;` | `month`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::year, charT>;` | `year`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::weekday, charT>;` | `weekday`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::weekday_indexed, charT>;` | `weekday_indexed`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::weekday_last, charT>;` | `weekday_last`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::month_day, charT>;` | `month_day`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::month_day_last, charT>;` | `month_day_last`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::month_weekday, charT>;` | `month_weekday`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::month_weekday_last, charT>;` | `month_weekday_last`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::year_month, charT>;` | `year_month`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::year_month_day, charT>;` | `year_month_day`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::year_month_day_last, charT>;` | `year_month_day_last`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::year_month_weekday, charT>;` | `year_month_weekday`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::year_month_weekday_last, charT>;` | `year_month_weekday_last`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class Rep, class Period, class charT>`<br/> `struct formatter<chrono::hh_mm_ss<duration<Rep, Period>>, charT>;` | `hh_mm_ss`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::sys_info, charT>;` | `sys_info`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class charT>`<br/> `struct formatter<chrono::local_info, charT>;` | `local_info`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |
| `template<class Duration, class TimeZonePtr, class charT>`<br/> `struct formatter<chrono::zoned_time<Duration, TimeZonePtr>, charT>;` | `zoned_time`に対する[`formatter`](/reference/format/formatter.md)の特殊化 | C++20 |


## 文�列解析

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`parse`](chrono/parse.md.nolink) | 日時文�列を解析する (function template) | C++20 |


## カレンダー定数
### 最後

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`last`](chrono/last_spec.md) | 月の最終日、週の最終日など、文脈に応じた「最後」を表す定数 (variable) | C++20 |

### 曜日

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`Sunday`](chrono/weekday_constants.md)    | 日曜日を表す定数 (variable) | C++20 |
| [`Monday`](chrono/weekday_constants.md)    | 月曜日を表す定数 (variable) | C++20 |
| [`Tuesday`](chrono/weekday_constants.md)   | 火曜日を表す定数 (variable) | C++20 |
| [`Wednesday`](chrono/weekday_constants.md) | 水曜日を表す定数 (variable) | C++20 |
| [`Thursday`](chrono/weekday_constants.md)  | 木曜日を表す定数 (variable) | C++20 |
| [`Friday`](chrono/weekday_constants.md)    | 金曜日を表す定数 (variable) | C++20 |
| [`Saturday`](chrono/weekday_constants.md)  | 土曜日を表す定数 (variable) | C++20 |


### 月

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`January`](chrono/month_constants.md)   | 1月を表す定数 (variable)  | C++20 |
| [`February`](chrono/month_constants.md)  | 2月を表す定数 (variable)  | C++20 |
| [`March`](chrono/month_constants.md)     | 3月を表す定数 (variable)  | C++20 |
| [`April`](chrono/month_constants.md)     | 4月を表す定数 (variable)  | C++20 |
| [`May`](chrono/month_constants.md)       | 5月を表す定数 (variable)  | C++20 |
| [`June`](chrono/month_constants.md)      | 6月を表す定数 (variable)  | C++20 |
| [`July`](chrono/month_constants.md)      | 7月を表す定数 (variable)  | C++20 |
| [`August`](chrono/month_constants.md)    | 8月を表す定数 (variable)  | C++20 |
| [`September`](chrono/month_constants.md) | 9月を表す定数 (variable)  | C++20 |
| [`October`](chrono/month_constants.md)   | 10月を表す定数 (variable) | C++20 |
| [`November`](chrono/month_constants.md)  | 11月を表す定数 (variable) | C++20 |
| [`December`](chrono/month_constants.md)  | 12月を表す定数 (variable) | C++20 |



## バージョン
### 言語
- C++11

## 参照
- [N2661 A Foundation to Sleep On](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2661.htm)
- [P0355R7 Extending `<chrono>` to Calendars and Time Zones](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0355r7.html)
