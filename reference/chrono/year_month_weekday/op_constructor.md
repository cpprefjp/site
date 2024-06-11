# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
year_month_weekday() = default;                            // (1) C++20

constexpr year_month_weekday(
  const chrono::year& y,
  const chrono::month& m,
  const chrono::weekday_indexed& wdi) noexcept;            // (2) C++20

constexpr
  year_month_weekday(const sys_days& dp) noexcept;         // (3) C++20
constexpr explicit
  year_month_weekday(const local_days& dp) noexcept;       // (4) C++20

year_month_weekday(const year_month_weekday&) = default; // (5) C++20
year_month_weekday(year_month_weekday&&) = default;      // (6) C++20
```
* chrono::year[link /reference/chrono/year.md]
* chrono::month[link /reference/chrono/month.md]
* chrono::weekday_indexed[link /reference/chrono/weekday_indexed.md]
* sys_days[link /reference/chrono/sys_time.md]
* local_days[link /reference/chrono/local_time.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 年、月、N回目の曜日の値をそれぞれ指定して構築する
- (3) : 日単位のシステム時間から変換して構築
- (4) : 日単位のローカル時間から変換して構築
- (5) : コピーコンストラクタ
- (6) : ムーブコンストラクタ


## 効果
- (1) : デフォルト初期化では年、月、曜日とN回目の値がそれぞれ符号なし整数の未初期化値となり、値初期化では値0となる
- (2) : `y`、`m`、`wdi`をメンバ変数として保持する
- (3) : `dp`が指すシステム時間に対応する年、月、日の値を求めて構築する
- (4) : [`sys_days`](/reference/chrono/sys_time.md)`{dp.`[`time_since_epoch()`](/reference/chrono/time_point/time_since_epoch.md)`}`と等価


## 例外
投げない


## 備考
- (3) : `year_month_weekday`クラスのあらゆる値`ymwd`について、`ymwd.`[`ok()`](ok.md)が`true`である値はすべて、`ymwd == year_month_weekday{sys_days{ymwd}}`が`true`となる


### 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::year_month_weekday date1{2020y, chrono::March, chrono::Sunday[2]};
  chrono::year_month_weekday date2{chrono::year{2020}, chrono::month{3}, chrono::Sunday[2]};
  assert(date1 == 2020y/3/chrono::Sunday[2]);
  assert(date2 == 2020y/3/chrono::Sunday[2]);
}
```
* 2020y[link /reference/chrono/year/op_y.md]
* chrono::March[link /reference/chrono/month_constants.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::year[link /reference/chrono/year.md]
* chrono::month[link /reference/chrono/month.md]

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
