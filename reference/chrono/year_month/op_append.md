# operator/
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month_day
    operator/(const year_month& ym, const day& d) noexcept; // (1) C++20
  constexpr year_month_day
    operator/(const year_month& ym, int d) noexcept;        // (2) C++20

  constexpr year_month_day_last
    operator/(const year_month& ym, last_spec) noexcept;    // (3) C++20

  constexpr year_month_weekday
    operator/(const year_month& ym,
              const weekday_indexed& wdi) noexcept;         // (4) C++20

  constexpr year_month_weekday_last
    operator/(const year_month& ym,
              const weekday_last& wdl) noexcept;            // (5) C++20
}
```
* day[link /reference/chrono/day.md]
* year_month_day[link /reference/chrono/year_month_day.md]
* year_month_day_last[link /reference/chrono/year_month_day_last.md]
* year_month_weekday[link /reference/chrono/year_month_weekday.md]
* year_month_weekday_last[link /reference/chrono/year_month_weekday_last.md]

## 概要
カレンダー要素同士をつなぎ合わせる。

- (1) : `year_month`型と[`day`](/reference/chrono/day.md)型をつなぎ、年月日の情報をもつ型にまとめる
- (2) : `year_month`型と`int`型での年の値をつなぎ、年月日の情報をもつ型にまとめる
- (3) : `year_month`型と最終日をつなぎ、年、月、その月の最終日の情報をもつ型にまとめる
- (4) : `year_month`型と指定したN回目の曜日をつなぎ、年、月、その月のN回目の指定した曜日の情報をもつ型にまとめる
- (4) : `year_month`型と指定した最終回目の曜日をつなぎ、年、月、その月の最終回目の指定した曜日の情報をもつ型にまとめる


## 戻り値
- (1) : `return` [`year_month_day`](/reference/chrono/year_month_day.md)`{ym.`[`year()`](year.md)`, ym.`[`month()`](month.md)`, d};`
- (2) : `return ym /` [`day`](/reference/chrono/day.md)`(d);`
- (3) : `return` [`year_month_day_last`](/reference/chrono/year_month_day_last.md)`{ym.`[`year()`](year.md)`,` [`month_day_last`](/reference/chrono/month_day_last.md)`{ym.`[`month()`](month.md)`}};`
- (4) : `return` [`year_month_weekday`](/reference/chrono/year_month_weekday.md)`{ym.`[`year()`](year.md)`, ym.`[`month()`](month.md)`, wdi};`
- (5) : `return` [`year_month_weekday_last`](/reference/chrono/year_month_weekday_last.md)`{ym.`[`year()`](year.md)`, ym.`[`month()`](month.md)`, wdl};`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  // (1), (2)
  assert((2020y/3)/1d == (year_month_day{2020y, March, 1d}));
  assert((2020y/3)/1 == (year_month_day{2020y, March, 1d}));

  // (3)
  assert((2020y/3)/last == (year_month_day_last{2020y, month_day_last{March}}));

  // (4)
  assert((2020y/3)/Sunday[1] == (year_month_weekday{2020y, March, Sunday[1]}));

  // (5)
  assert((2020y/3)/Sunday[last] == (year_month_weekday_last{2020y, March, Sunday[last]}));
}
```
* March[link /reference/chrono/month_constants.md]
* 2020y[link /reference/chrono/year/op_y.md]
* 1d[link /reference/chrono/day/op_d.md]
* year_month_day[link /reference/chrono/year_month_day.md]
* year_month_day_last[link /reference/chrono/year_month_day_last.md]
* month_day_last[link /reference/chrono/month_day_last.md]
* year_month_weekday[link /reference/chrono/year_month_weekday.md]
* year_month_weekday_last[link /reference/chrono/year_month_weekday_last.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
