# operator/
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  constexpr year_month_day
    operator/(const month_day& md, const year& y) noexcept; // (1) C++20

  constexpr year_month_day
    operator/(const month_day& md, int y) noexcept;         // (2) C++20
}
```
* month_day[link /reference/chrono/month_day.md]
* year[link /reference/chrono/year.md]
* year_month_day[link /reference/chrono/year_month_day.md]

## 概要
カレンダー要素同士をつなぎ合わせる。

- (1) : `month_day`型と[`year`](/reference/chrono/year.md)型をつなぎ、年月日の情報をもつ型にまとめる
- (2) : `month_day`型と`int`型での年の値をつなぎ、年月日の情報をもつ型にまとめる


## 戻り値
- (1) : `return y / md;`
- (2) : `return` [`year`](/reference/chrono/year.md)`{y} / md;`


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
  chrono::month_day md = chrono::March/1;

  // 2020年3月1日
  chrono::year_month_day ymd1 = md / 2020y;
  chrono::year_month_day ymd2 = md / 2020;

  assert(ymd1.year() == 2020y);
  assert(ymd1.month() == chrono::March);
  assert(ymd1.day() == 1d);
  assert(ymd1 == ymd2);
}
```
* chrono::March[link /reference/chrono/month_constants.md]
* 2020y[link /reference/chrono/year/op_y.md]
* 1d[link /reference/chrono/day/op_d.md]
* chrono::month_day[link /reference/chrono/month_day.md]
* ymd1.year()[link /reference/chrono/year_month_day/year.md]
* ymd1.month()[link /reference/chrono/year_month_day/month.md]
* ymd1.day()[link /reference/chrono/year_month_day/day.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
