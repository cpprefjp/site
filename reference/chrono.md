#chrono
* chrono[meta header]
* cpp11[meta cpp]

`<chrono>`ヘッダは、時間に関するユーティリティとして機能する関数・クラスを提供する。このヘッダに含まれる関数・クラスは、`std::chrono`名前空間で定義される。

##時間を表す型

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------|-------|
| [`duration`](./chrono/duration.md)               | 時間の単位(class template) | C++11 |
| [`time_point`](./chrono/time_point.md)           | 時間軸上の一点(class template) | C++11 |
| [`treat_as_floating_point`](./chrono/treat_as_floating_point.md) | `duration`内部表現の型が浮動小数点型かを判定するためのトレイト(class template) | C++11 |
| [`duration_values`](./chrono/duration_values.md) | `duration`内部表現の特別な値を取得するためのトレイト(class template) | C++11 |
| [`duration_cast`](./chrono/duration_cast.md)     | 分解能の低いdurationへの変換 | C++11 |
| [`time_point_cast`](./chrono/time_point_cast.md) | 分解能の低い`duration`を内部表現に持つ`time_point`への変換 | C++11 |


##時間の単位を表す型

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------|-------|
| [`nanoseconds`](./chrono/nanoseconds.md)   | ナノ秒を表現するためのdurationの別名(typedef) | C++11 |
| [`microseconds`](./chrono/microseconds.md) | マイクロ秒を表現するためのdurationの別名(typedef) | C++11 |
| [`milliseconds`](./chrono/milliseconds.md) | ミリ秒を表現するためのdurationの別名(typedef) | C++11 |
| [`seconds`](./chrono/seconds.md)           | 秒を表現するためのdurationの別名(typedef) | C++11 |
| [`minutes`](./chrono/minutes.md)           | 分を表現するためのdurationの別名(typedef) | C++11 |
| [`hours`](./chrono/hours.md)               | 時を表現するためのdurationの別名(typedef) | C++11 |


##時計型

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|----------------------------|-------|
| [`system_clock`](./chrono/system_clock.md)       | システム時間のクロック(class) | C++11 |
| [`steady_clock`](./chrono/steady_clock.md)       | 時間が逆行しないクロック(class) | C++11 |
| [`high_resolution_clock`](./chrono/high_resolution_clock.md) | 高分解能クロック(class) | C++11 |


##バージョン
###言語
- C++11

##参照
* [N2661 A Foundation to Sleep On](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2661.htm)

