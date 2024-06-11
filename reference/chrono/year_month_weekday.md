# year_month_weekday
* chrono[meta header]
* std::chrono[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  class year_month_weekday;
}
```

## 概要
`year_month_weekday`は、年、月、N回目の曜日を表すカレンダー表現のためクラスである。

このクラスは、年、および月に関する演算に対応している。ただし、日に関する演算はできない。日を求める`day()`メンバ関数は持っておらず、日は`sys_days`への変換演算子でより効率的に求めることができる。

このクラスは等値比較ができ、[EqualityComparable](/reference/concepts/equality_comparable.md)の要件を満たす。

このクラスは、[トリビアルコピー可能](/reference/type_traits/is_trivially_copyable.md)で、かつ[スタンダードレイアウト型](/reference/type_traits/is_standard_layout.md)である。


## メンバ関数
### 構築／コピー／破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](year_month_weekday/op_constructor.md) | コンストラクタ | C++20 |
| `year_month_weekday& operator=(const year_month_weekday&) = default;`<br/> `year_month_weekday& operator=(year_month_weekday&&) = default;` | 代入演算子 | C++20 |


### 算術演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+=`](year_month_weekday/op_plus_assign.md)  | 加算の複合代入 | C++20 |
| [`operator-=`](year_month_weekday/op_minus_assign.md) | 減算の複合代入 | C++20 |


### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`year`](year_month_weekday/year.md)       | 年要素を取得する | C++20 |
| [`month`](year_month_weekday/month.md)     | 月要素を取得する | C++20 |
| [`weekday`](year_month_weekday/weekday.md) | 曜日要素を取得する | C++20 |
| [`index`](year_month_weekday/index.md)     | 何回目の曜日かを取得する | C++20 |
| [`weekday_indexed`](year_month_weekday/weekday_indexed.md) | N回目の曜日要素を取得する | C++20 |


### 変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator sys_days`](year_month_weekday/op_sys_days.md)     | システム時間の日付への型変換演算子 | C++20 |
| [`operator local_days`](year_month_weekday/op_local_days.md) | ローカル時間の日付への型変換演算子 | C++20 |


### 検証

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`ok`](year_month_weekday/ok.md) | 値が範囲に収まっているか判定する | C++20 |


## 非メンバ関数
### 算術演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator+`](year_month_weekday/op_plus.md)  | 加算 | C++20 |
| [`operator-`](year_month_weekday/op_minus.md) | 減算 | C++20 |


### 比較演算

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](year_month_weekday/op_equal.md) | 等値比較を行う | C++20 |
| `bool operator!=(const year_month_weekday&, const year_month_weekday&) noexcept;` | 非等値比較を行う (`==`により使用可能) | C++20 |


### 入出力

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator<<`](year_month_weekday/op_ostream.md) | 出力ストリームに出力する | C++20 |


## 文字列フォーマット

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`formatter`](year_month_weekday/formatter.md) | [`std::formatter`](/reference/format/formatter.md)クラスの特殊化 | C++20 |


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  // すべて2020年3月の2回目の日曜日を表す
  year_month_weekday date1 = 2020y/3/Sunday[2];
  year_month_weekday date2 = 2020y/March/Sunday[2];
  year_month_weekday date3 = March/Sunday[2]/2020y;
  year_month_weekday date4 = March/Sunday[2]/2020;

  // 各カレンダー要素のコンストラクタはexplicitなので、
  // 指定順は年、月、N回目の曜日で決まっているが、int値は指定できない
  year_month_weekday date5{2020y, March, Sunday[2]};
  std::cout << date5 << std::endl;

  // 日単位のシステム時間に変換
  sys_days sd{date5};
  std::cout << sd << std::endl;

  // 年月日に変換
  year_month_day ymd{sd};
  std::cout << ymd << std::endl;
}
```
* 2020y[link year/op_y.md]
* March[link month_constants.md]
* Sunday[link weekday_constants.md]
* sys_days[link sys_time.md]
* year_month_day[link year_month_day.md]

### 出力
```
2020/Mar/Sun[2]
2020-03-08
2020-03-08
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 (出力ストリームなし) [mark verified]
- [GCC](/implementation.md#gcc): 11.1 (出力ストリームなし) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
