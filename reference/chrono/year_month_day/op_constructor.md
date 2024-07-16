# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_day[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
year_month_day() = default;                                         // (1) C++20

constexpr year_month_day(
  const chrono::year& y,
  const chrono::month& m,
  const chrono::day& d
  ) noexcept;                                                       // (2) C++20

constexpr year_month_day(const year_month_day_last& ymdl) noexcept; // (3) C++20
constexpr year_month_day(const sys_days& dp) noexcept;              // (4) C++20
constexpr explicit year_month_day(const local_days& dp) noexcept;   // (5) C++20

year_month_day(const year_month_day&) = default;                    // (6) C++20
year_month_day(year_month_day&&) = default;                         // (7) C++20
```
* chrono::year[link /reference/chrono/year.md]
* chrono::month[link /reference/chrono/month.md]
* chrono::day[link /reference/chrono/day.md]
* year_month_day_last[link /reference/chrono/year_month_day_last.md]
* sys_days[link /reference/chrono/sys_time.md]
* local_days[link /reference/chrono/local_time.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 年、月、日の値をそれぞれ指定して構築する
- (3) : `year_month_day_last`オブジェクトから変換し、日の値を求めて構築する
- (4) : 日単位のシステム時間から変換して構築
- (5) : 日単位のローカル時間から変換して構築
- (6) : コピーコンストラクタ
- (7) : ムーブコンストラクタ


## 効果
- (1) :
    - デフォルト初期化では年、月、日の値がそれぞれ符号なし整数の未初期化値となり、値初期化では値0となる
- (2) :
    - `y`、`m`、`d`をメンバ変数として保持する
- (3) :
    - 年のメンバ変数として`ymdl.`[`year()`](/reference/chrono/year_month_day_last/year.md)の値、月のメンバ変数として`ymdl.`[`month()`](/reference/chrono/year_month_day_last/month.md)の値、日のメンバ変数として`ymdl.`[`day()`](/reference/chrono/year_month_day_last/day.md)の値を保持する
- (4) : `dp`が指すシステム時間に対応する年、月、日の値を求めて構築する
- (5) : `dp`が指すローカル時間に対応する年、月、日の値を求めて構築する


## 例外
投げない


## 備考
- (3) : `year_month_day_last`から`sys_days`に一旦変換し、そこから`year_month_day`へ変換した方がより効率がよい可能性がある
- (4) : `year_month_day`型オブジェクト`ymd`において`ymd.`[`ok()`](ok.md)である場合、`ymd == year_month_day{sys_days{ymd}}`は常に`true`となる
- (5) : `sys_days{dp.`[`time_since_epoch()`](/reference/chrono/time_point/time_since_epoch.md)`}`からの構築と等価


### 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // 年、月、日のカレンダー要素を順に指定して構築
  chrono::year_month_day date1{2020y, chrono::March, 1d};
  chrono::year_month_day date2{chrono::year{2020}, chrono::month{3}, chrono::day{1}};
  assert(date1 == 2020y/3/1);
  assert(date2 == 2020y/3/1);

  // 年、月、月の最終日から構築
  chrono::year_month_day date3 = 2020y/2/chrono::last; // 2020年2月の最終日
  assert(date3 == 2020y/2/29);

  // システム時間から変換
  auto tp = chrono::system_clock::now();
  chrono::sys_days dp = chrono::time_point_cast<chrono::days>(tp);
  chrono::year_month_day date4 {dp};
  std::cout << date4 << std::endl;

  // ローカル時間から変換
  chrono::local_days lp {dp.time_since_epoch()};
  chrono::year_month_day date5 {lp};
  std::cout << date5 << std::endl;
}
```
* 2020y[link /reference/chrono/year/op_y.md]
* chrono::March[link /reference/chrono/month_constants.md]
* 1d[link /reference/chrono/day/op_d.md]
* chrono::year[link /reference/chrono/year.md]
* chrono::month[link /reference/chrono/month.md]
* chrono::day[link /reference/chrono/day.md]
* chrono::last[link /reference/chrono/last_spec.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* chrono::time_point_cast[link /reference/chrono/time_point_cast.md]
* dp.time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* chrono::sys_days[link /reference/chrono/sys_time.md]
* chrono::local_days[link /reference/chrono/local_time.md]

### 出力例
```
2019-12-19
2019-12-19
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
