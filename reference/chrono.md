# chrono
* chrono[meta header]
* cpp11[meta cpp]

`<chrono>`ヘッダは、時間に関するユーティリティとして機能する関数・クラスを提供する。このヘッダに含まれる関数・クラスは、`std::chrono`名前空間で定義される。

このライブラリは、タイムアウト、操作間隔、スケジューリングといった短期間の操作を主な用途として想定している。そのためカレンダー機能としては遥かな過去・未来を扱えるようにはなっていない。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<compare>`](compare.md) (C++20)

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
| [`microseconds`](chrono/duration_aliases.md) | マイクロ秒を表現するためのdurationの別名(type-alias) | C++11 |
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
| [`is_clock`](chrono/is_clock.md) | クロック型かを判定する (class template) | C++20 |
| [`system_clock`](chrono/system_clock.md) | システム時間のクロック(class) | C++11 |
| [`steady_clock`](chrono/steady_clock.md) | 時間が逆行しないクロック(class) | C++11 |
| [`high_resolution_clock`](chrono/high_resolution_clock.md) | 高分解能クロック(class) | C++11 |
| [`utc_clock`](chrono/utc_clock.md) | UTC時間 (協定世界時) のクロック (class) | C++20 |
| [`tai_clock`](chrono/tai_clock.md) | TAI時間 (国際原子時) のクロック (class) | C++20 |
| [`gps_clock`](chrono/gps_clock.md) | GPS時間のクロック (class) | C++20 |
| [`file_clock`](chrono/file_clock.md) | ファイル時間を作るために使用されるクロック (type-alias) | C++20 |

### システム時間用の機能

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`sys_time`](chrono/sys_time.md) | システム時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`sys_seconds`](chrono/sys_time.md) | 秒単位でシステム時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`sys_days`](chrono/sys_time.md) | 日単位でシステム時間の一点を指すtime_pointの別名 (type-alias) | C++20 |


### ローカル時間用の機能

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`local_t`](chrono/local_time.md) | ローカル時間を表す擬似的なクロック (class) | C++20 |
| [`local_time`](chrono/local_time.md) | ローカル時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`local_seconds`](chrono/local_time.md) | 秒単位でローカル時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`local_days`](chrono/local_time.md) | 日単位でローカル時間の一点を指すtime_pointの別名 (type-alias) | C++20 |


### UTC時間用の機能

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`utc_time`](chrono/utc_time.md) | UTC時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`utc_seconds`](chrono/utc_time.md) | 秒単位でUTC時間の一点を指すtime_pointの別名 (type-alias) | C++20 |


### TAI時間用の機能

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`tai_time`](chrono/tai_time.md) | TAI時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`tai_seconds`](chrono/tai_time.md) | 秒単位でTAI時間の一点を指すtime_pointの別名 (type-alias) | C++20 |


### GPS時間用の機能

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`gps_time`](chrono/gps_time.md) | GPS時間の一点を指すtime_pointの別名 (type-alias) | C++20 |
| [`gps_seconds`](chrono/gps_time.md) | 秒単位でGPS時間の一点を指すtime_pointの別名 (type-alias) | C++20 |


### ファイル時間用の機能

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`file_time`](chrono/file_time.md) | ファイル時間の一点を指すtime_pointの別名 (type-alias) | C++20 |


### 時計時間の変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`clock_time_conversion`](chrono/clock_time_conversion.md) | 時計間の変換方法を組み合わせごとに定義するためのクラス (class template) | C++20 |
| [`clock_cast`](chrono/clock_cast.md) | ほかの時計時間のtime_pointに変換する (function template) | C++20 |


### うるう秒の情報

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`leap_second_info`](chrono/leap_second_info.md) | うるう秒の情報を扱うクラス (class) | C++20 |
| [`get_leap_second_info`](chrono/get_leap_second_info.md) | 指定した日時までに挿入されたうるう秒の回数を取得する (function template) | C++20 |


## カレンダー型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`last_spec`](chrono/last_spec.md) | 月の最終日、月の最終曜日など、文脈に応じた「最後」を表す型 (class) | C++20 |
| [`day`](chrono/day.md) | 未規定の月の指定した日を表す型 (class) | C++20 |
| [`month`](chrono/month.md) | 月単体の値を表す型 (class) | C++20 |
| [`year`](chrono/year.md) | カレンダーの年を表す型 (class) | C++20 |
| [`weekday`](chrono/weekday.md) | 週の日を表す型 (class) | C++20 |
| [`weekday_indexed`](chrono/weekday_indexed.md) | N回目の指定した曜日を表す型 (class) | C++20 |
| [`weekday_last`](chrono/weekday_last.md) | 未規定の月の最後の指定した曜日を表す型 (class) | C++20 |
| [`month_day`](chrono/month_day.md) | 月と日を表す型 (class) | C++20 |
| [`month_day_last`](chrono/month_day_last.md) | 指定した月の最終日を表す型 (class) | C++20 |
| [`month_weekday`](chrono/month_weekday.md) | 月の指定したN番目の曜日を表す型 (class) | C++20 |
| [`month_weekday_last`](chrono/month_weekday_last.md) | 月の指定した最終回目の曜日を表す型 (class) | C++20 |
| [`year_month`](chrono/year_month.md) | 年と月を表す型 (class) | C++20 |
| [`year_month_day`](chrono/year_month_day.md) | 年、月、日を表す型 (class) | C++20 |
| [`year_month_day_last`](chrono/year_month_day_last.md) | 年、月、月の最終日を表す型 (class) | C++20 |
| [`year_month_weekday`](chrono/year_month_weekday.md) | 年、月、N回目の指定した曜日を表す型 (class) | C++20 |
| [`year_month_weekday_last`](chrono/year_month_weekday_last.md) | 年、月、月の最後の指定した曜日を表す型 (class) | C++20 |


## 1日内の時間情報

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`hh_mm_ss`](chrono/hh_mm_ss.md) | 時間間隔を時、分、秒に分割するクラス (class) | C++20 |
| [`is_am`](chrono/is_am.md) | 時間が午前かを判定する (function) | C++20 |
| [`is_pm`](chrono/is_pm.md) | 時間が午後かを判定する (function) | C++20 |
| [`make12`](chrono/make12.md) | 24時間ベースの時間を12時間ベースの時間範囲に変換する (function) | C++20 |
| [`make24`](chrono/make24.md) | 12時間ベースの時間を24時間ベースの時間範囲に変換する (function) | C++20 |


## タイムゾーン
### タイムゾーンのデータベース

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`tzdb`](chrono/tzdb.md) | タイムゾーンのデータベース型 (class) | C++20 |
| [`get_tzdb`](chrono/get_tzdb.md) | タイムゾーンデータベースを取得する (function) | C++20 |
| [`tzdb_list`](chrono/tzdb_list.md) | タイムゾーンデータベースのリスト (class) | C++20 |
| [`get_tzdb_list`](chrono/get_tzdb_list.md) | タイムゾーンデータベースのリストを取得する (function) | C++20 |
| [`locate_zone`](chrono/locate_zone.md) | 指定した名前のタイムゾーンを取得する (function) | C++20 |
| [`current_zone`](chrono/current_zone.md) | 現在のタイムゾーンを取得する (function) | C++20 |


### リモートタイムゾーンデータベースのサポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`reload_tzdb`](chrono/reload_tzdb.md) | リモートタイムゾーンデータベースを再読み込みする (function) | C++20 |
| [`remote_version`](chrono/remote_version.md) | リモートタイムゾーンデータベースの最新バージョン番号を取得する (function) | C++20 |

### 例外クラス

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`nonexistent_local_time`](chrono/nonexistent_local_time.md) | 存在しないローカル時間をシステム時間に変換しようとした (class) | C++20 |
| [`ambiguous_local_time`](chrono/ambiguous_local_time.md) | ローカル時間があいまい (class) | C++20 |


### タイムゾーン

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`sys_info`](chrono/sys_info.md) | システム時間用のタイムゾーン情報 (class) | C++20 |
| [`local_info`](chrono/local_info.md) | ローカル時間用のタイムゾーン情報 (class) | C++20 |
| [`choose`](chrono/choose.md) | タイムゾーンを変換する際に、早い時間側と遅い時間側どちらに丸めるかの種類 (enum) | C++20 |
| [`time_zone`](chrono/time_zone.md) | タイムゾーンの変換を扱うクラス (class) | C++20 |
| [`zoned_traits`](chrono/zoned_traits.md) | タイムゾーン取得のカスタマイズ用中間インタフェース (class) | C++20 |
| [`zoned_time`](chrono/zoned_time.md) | タイムゾーンを考慮した時間軸上の一点を表す型 (class) | C++20 |
| [`zoned_seconds`](chrono/zoned_time.md) | 秒単位でタイムゾーンを考慮した時間軸上の一点を表す型 (type-alias) | C++20 |


### うるう秒サポート

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`leap_second`](chrono/leap_second.md) | うるう秒が挿入された日時を表す型 (class) | C++20 |


### リンク

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`time_zone_link`](chrono/time_zone_link.md) | タイムゾーンの代替名を管理する型 (class) | C++20 |


## 文字列フォーマット

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`local-time-format-t`](chrono/local-time-format-t.md) | ローカル時間を文字列フォーマットするために必要な情報をまとめた説明用の型 (class template) | C++20 |
| [`local_time_format`](chrono/local_time_format.md) | ローカル時間の文字列フォーマット用オブジェクトを生成する (function template) | C++20 |
| [`format`](chrono/format.md) | 文字列フォーマット | C++20 |


## 文字列解析

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`parse`](chrono/parse.md) | 日時文字列を解析する入力マニピュレータ (function template) | C++20 |


## カレンダー定数
### 最後

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`last`](chrono/last_spec.md) | 月の最終日、月の最終曜日など、文脈に応じた「最後」を表す定数 (variable) | C++20 |

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
- [P0216R0 C++ Standard Proposal — A Time-Zone Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0216r0.html)
- [P0355R7 Extending `<chrono>` to Calendars and Time Zones](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0355r7.html)
- [P2051R0 C++ Standard Library Issues to be moved in Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2051r0.html)
