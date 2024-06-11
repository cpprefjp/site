# operator/
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month
    operator/(const year& y,
              const month& m) noexcept;                 // (1) C++20
  constexpr year_month
    operator/(const year& y,
              int m) noexcept;                          // (2) C++20

  constexpr year_month_day
    operator/(const year& y,
              const month_day& md) noexcept;            // (3) C++20
  constexpr year_month_day
    operator/(int y,
              const month_day& md) noexcept;            // (4) C++20

  constexpr year_month_day_last
    operator/(const year& y,
              const month_day_last& mdl) noexcept;      // (5) C++20
  constexpr year_month_day_last
    operator/(int y,
              const month_day_last& mdl) noexcept;      // (6) C++20

  constexpr year_month_weekday
    operator/(const year& y,
              const month_weekday& mwd) noexcept;       // (7) C++20
  constexpr year_month_weekday
    operator/(int y,
              const month_weekday& mwd) noexcept;       // (8) C++20

  constexpr year_month_weekday_last
    operator/(const year& y,
              const month_weekday_last& mwdl) noexcept; // (9) C++20
  constexpr year_month_weekday_last
    operator/(int y,
              const month_weekday_last& mwdl) noexcept; // (10) C++20
}
```
* month[link /reference/chrono/month.md]
* year_month[link /reference/chrono/year_month.md]
* year_month_day[link /reference/chrono/year_month_day.md]
* month_day[link /reference/chrono/month_day.md]
* year_month_day_last[link /reference/chrono/year_month_day_last.md]
* month_day_last[link /reference/chrono/month_day_last.md]
* year_month_weekday[link /reference/chrono/year_month_weekday.md]
* month_weekday[link /reference/chrono/month_weekday.md]
* year_month_weekday_last[link /reference/chrono/year_month_weekday_last.md]
* month_weekday_last[link /reference/chrono/month_weekday_last.md]

## 概要
カレンダー要素同士をつなぎ合わせる。

- (1) : `year`型と[`month`](/reference/chrono/month.md)型をつなぎ、年と月の両方の情報をもつ型にまとめる
- (2) : `year`型と`int`型での月の値をつなぎ、年と月の両方の情報をもつ型にまとめる
- (3) : `year`型と[`month_day`](/reference/chrono/month_day.md)型をつなぎ、年月日の情報をもつ型にまとめる
- (4) : `int`型の年と[`month_day`](/reference/chrono/month_day.md)型をつなぎ、年月日の情報をもつ型にまとめる
- (5) : `year`型と[`month_day_last`](/reference/chrono/month_day_last.md)型をつなぎ、年月の最終日の情報をもつ型にまとめる
- (6) : `int`型の年と[`month_day_last`](/reference/chrono/month_day_last.md)型をつなぎ、年月の最終日の情報をもつ型にまとめる
- (7) : `year`型と[`month_weekday`](/reference/chrono/month_weekday.md)型をつなぎ、年月のN回目の曜日の情報をもつ型にまとめる
- (8) : `int`型の年と[`month_weekday`](/reference/chrono/month_weekday.md)型をつなぎ、年月のN回目の曜日の情報をもつ型にまとめる
- (9) : `year`型と[`month_weekday_last`](/reference/chrono/month_weekday_last.md)型をつなぎ、年月の指定した最終曜日の情報をもつ型にまとめる
- (10) : `int`型の年と[`month_weekday_last`](/reference/chrono/month_weekday_last.md)型をつなぎ、年月の指定した最終曜日の情報をもつ型にまとめる


## 戻り値
- (1) : `return {y, m};`
- (2) : `return y /` [`month`](/reference/chrono/month.md)`{m};`
- (3) : `return y / md.`[`month()`](/reference/chrono/month_day/month.md) `/ md.`[`day()`](/reference/chrono/month_day/day.md)`;`
- (4) : `return year(y) / md;`
- (5) : `return` [`year_month_day_last`](/reference/chrono/year_month_day_last.md)`{y, mdl};`
- (6) : `return year(y) / mdl;`
- (7) : `return` [`year_month_weekday`](/reference/chrono/year_month_weekday.md)`{y, mwd.`[`month()`](/reference/chrono/month_weekday/month.md)`, mwd.`[`weekday_indexed()`](/reference/chrono/month_weekday/weekday_indexed.md)`};`
- (8) : `return year(y) / mwd;`
- (9) : `return` [`year_month_weekday_last`](/reference/chrono/year_month_weekday_last.md)`{y, mwdl.`[`month()`](/reference/chrono/month_weekday_last/month.md)`, mwdl.`[`weekday_last()`](/reference/chrono/month_weekday_last/weekday_last.md)`};`
- (10) : `return year(y) / mwdl;`


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
  assert(2020y/March == (year_month{2020y, March}));
  assert(2020y/3 == (year_month{2020y, March}));

  // (3), (4)
  assert(2020y/(March/1) == (year_month_day{2020y, March, 1d}));
  assert(2020/(March/1) == (year_month_day{2020y, March, 1d}));

  // (5), (6)
  assert(2020y/(March/last) == (year_month_day_last{2020y, March/last}));
  assert(2020/(March/last) == (year_month_day_last{2020y, March/last}));

  // (7), (8)
  assert(2020y/(March/Sunday[1]) == (year_month_weekday{2020y, March, Sunday[1]}));
  assert(2020/(March/Sunday[1]) == (year_month_weekday{2020y, March, Sunday[1]}));

  // (9), (10)
  assert(2020y/(March/Sunday[last]) == (year_month_weekday_last{2020y, March, Sunday[last]}));
  assert(2020/(March/Sunday[last]) == (year_month_weekday_last{2020y, March, Sunday[last]}));
}
```
* 2020y[link op_y.md]
* March[link /reference/chrono/month_constants.md]
* 1d[link /reference/chrono/day/op_d.md]
* last[link /reference/chrono/last_spec.md]
* Sunday[link /reference/chrono/weekday_constants.md]
* year_month[link /reference/chrono/year_month.md]
* year_month_day[link /reference/chrono/year_month_day.md]
* year_month_day_last[link /reference/chrono/year_month_day_last.md]
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
