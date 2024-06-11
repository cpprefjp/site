# operator/
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr month_day
    operator/(const month& m, const day& d) noexcept;               // (1) C++20
  constexpr month_day
    operator/(const month& m, int d) noexcept;                      // (2) C++20
  constexpr month_day
    operator/(int m, const day& d) noexcept;                        // (3) C++20

  constexpr month_day_last
    operator/(const month& m, last_spec) noexcept;                  // (4) C++20
  constexpr month_day_last
    operator/(int m, last_spec) noexcept;                           // (5) C++20

  constexpr month_weekday
    operator/(const month& m, const weekday_indexed& wdi) noexcept; // (6) C++20
  constexpr month_weekday
    operator/(int m, const weekday_indexed& wdi) noexcept;          // (7) C++20

  constexpr month_weekday_last
    operator/(const month& m, const weekday_last& wdl) noexcept;    // (8) C++20
  constexpr month_weekday_last
    operator/(int m, const weekday_last& wdl) noexcept;             // (9) C++20
}
```
* day[link /reference/chrono/day.md]
* month_day[link /reference/chrono/month_day.md]
* last_spec[link /reference/chrono/last_spec.md]
* month_day_last[link /reference/chrono/month_day_last.md]
* month_weekday[link /reference/chrono/month_weekday.md]
* weekday_indexed[link /reference/chrono/weekday_indexed.md]
* weekday_last[link /reference/chrono/weekday_last.md]
* month_weekday_last[link /reference/chrono/month_weekday_last.md]

## 概要
カレンダー要素同士をつなぎ合わせる。

- (1) : `month`型と[`day`](/reference/chrono/day.md)型をつなぎ、月と日の両方の情報をもつ型にまとめる
- (2) : `month`型と`int`型での日の値をつなぎ、月と日の両方の情報をもつ型にまとめる
- (3) : `int`型での月の値と[`day`](/reference/chrono/day.md)型をつなぎ、月と日の両方の情報をもつ型にまとめる
- (4) : `month`型と終了値を受け取り、月と月の最終日の情報をもつ型にまとめる
- (5) : `int`型での月の値と終了値を受け取り、月と月の最終日の情報をもつ型にまとめる
- (6) : `month`型とN番目の曜日を受け取り、月とN番目の曜日の情報をもつ型にまとめる
- (7) : `int`型での月の値と、N番目の曜日を受け取り、月とN番目の曜日の情報をもつ型にまとめる
- (8) : `month`型と月の最終指定曜日を受け取り、月と月の最終指定曜日の情報をもつ型にまとめる
- (9) : `int`型での月の値と、月の最終指定曜日を受け取り、月と月の最終指定曜日の情報をもつ型にまとめる


## 戻り値
- (1) : `return {m, d};`
- (2) : `return m /` [`day`](/reference/chrono/day.md)`{d};`
- (3) : `return` [`month`](/reference/chrono/month.md)`{m} / d;`
- (4) : `return` [`month_day_last`](/reference/chrono/month_day_last.md)`{m};`
- (5) : `return` [`month`](/reference/chrono/month.md)`{m} /` [`last`](/reference/chrono/last_spec.md)`;`
- (6) : `return {m, wdi};`
- (7) : `return` [`month`](/reference/chrono/month.md)`{m} / wdi;`
- (8) : `return {m, wdl};`
- (9) : `return` [`month`](/reference/chrono/month.md)`{m} / wdl;`


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // 3月1日 (年の情報をもたない)
  chrono::month_day md1 = chrono::March/1d;
  chrono::month_day md2 = chrono::March/1;
  chrono::month_day md3 = 3/1d;
  assert(md1.month() == chrono::March);
  assert(md1.day() == 1d);
  assert(md1 == md2);
  assert(md1 == md3);

  // 2月の最終日 (年の情報をもたないため、2月かどうかに関わらず日を算出できない状態)
  chrono::month_day_last mdl1 = chrono::February/chrono::last;
  chrono::month_day_last mdl2 = 2/chrono::last;
  assert(mdl1.month() == chrono::February);
  assert(mdl1 == mdl2);

  // 3月の最初の日曜日 (年の情報をもたないため、日を算出できない状態)
  chrono::month_weekday mw1 = chrono::March/chrono::Sunday[0];
  chrono::month_weekday mw2 = 3/chrono::Sunday[0];
  assert(mw1.month() == chrono::March);
  assert(mw1.weekday_indexed() == chrono::Sunday[0]);
  assert(mw1 == mw2);

  // 3月の最後の日曜日 (年の情報をもたないため、日を算出できない状態)
  chrono::month_weekday_last mwl1 = chrono::March/chrono::Sunday[chrono::last];
  chrono::month_weekday_last mwl2 = 3/chrono::Sunday[chrono::last];
  assert(mwl1.month() == chrono::March);
  assert(mwl1.weekday_last() == chrono::Sunday[chrono::last]);
  assert(mwl1 == mwl2);
}
```
* chrono::March[link /reference/chrono/month_constants.md]
* chrono::February[link /reference/chrono/month_constants.md]
* 1d[link /reference/chrono/day/op_d.md]
* chrono::month_day[link /reference/chrono/month_day.md]
* md1.month()[link /reference/chrono/month_day/month.md]
* md1.day()[link /reference/chrono/month_day/day.md]
* chrono::last[link /reference/chrono/last_spec.md]
* chrono::month_day_last[link /reference/chrono/month_day_last.md]
* mdl1.month()[link /reference/chrono/month_day_last/month.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::month_weekday[link /reference/chrono/month_weekday.md]
* mw1.month()[link /reference/chrono/month_weekday/month.md]
* mw1.weekday_indexed()[link /reference/chrono/month_weekday/weekday_indexed.md]
* chrono::month_weekday_last[link /reference/chrono/month_weekday_last.md]
* mwl1.month()[link /reference/chrono/month_weekday_last/month.md]
* mwl1.weekday_last()[link /reference/chrono/month_weekday_last/weekday_last.md]

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
