# コンストラクタ
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_weekday_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
year_month_weekday_last() = delete;                                // (1) C++20

constexpr year_month_weekday_last(
  const chrono::year& y,
  const chrono::month& m,
  const chrono::weekday_last& wdl) noexcept;                       // (2) C++20

year_month_weekday_last(const year_month_weekday_last&) = default; // (3) C++20
year_month_weekday_last(year_month_weekday_last&&) = default;      // (4) C++20
```
* chrono::year[link /reference/chrono/year.md]
* chrono::month[link /reference/chrono/month.md]
* chrono::weekday_last[link /reference/chrono/weekday_last.md]

## 概要
- (1) : デフォルトコンストラクタ。定義されない
- (2) : 年、月、最終曜日の値をそれぞれ指定して構築する
- (3) : コピーコンストラクタ
- (4) : ムーブコンストラクタ


## 効果
- (2) : `y`、`m`、`wdl`をメンバ変数として保持する


## 例外
投げない


### 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  year_month_weekday_last date1{2020y, March, Sunday[last]};
  year_month_weekday_last date2{year{2020}, month{3}, Sunday[last]};
  assert(year_month_day{sys_days{date1}} == 2020y/3/29);
  assert(year_month_day{sys_days{date2}} == 2020y/3/29);
}
```
* 2020y[link /reference/chrono/year/op_y.md]
* March[link /reference/chrono/month_constants.md]
* Sunday[link /reference/chrono/weekday_constants.md]
* last[link /reference/chrono/last_spec.md]
* year[link /reference/chrono/year.md]
* month[link /reference/chrono/month.md]
* sys_days[link /reference/chrono/sys_time.md]
* year_month_day[link /reference/chrono/year_month_day.md]

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
