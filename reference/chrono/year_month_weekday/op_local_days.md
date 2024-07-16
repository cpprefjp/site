# operator local_days
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr explicit operator local_days() const noexcept; // (1) C++20
```
* local_days[link /reference/chrono/local_time.md]

## 概要
`year_month_weekday`オブジェクトをローカル時間の日付に、明示的に型変換する。


## 戻り値
```cpp
return local_days{sys_days{*this}.time_since_epoch()};
```
* local_days[link /reference/chrono/local_time.md]
* sys_days[link /reference/chrono/sys_time.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::local_days date1{2020y/3/chrono::Sunday[1]};
  assert(chrono::year_month_day{date1} == 2020y/3/1);

  chrono::local_days date2{2020y/3/chrono::Sunday[2]};
  assert(chrono::year_month_day{date2} == 2020y/3/8);

  chrono::local_days date3{2020y/3/chrono::Sunday[0]};
  assert(chrono::year_month_day{date3} == 2020y/2/23);

  chrono::local_days date4{2020y/3/chrono::Sunday[10]};
  assert(chrono::year_month_day{date4} == 2020y/5/3);
}
```
* chrono::local_days[link /reference/chrono/local_time.md]
* 2020y[link /reference/chrono/year/op_y.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::year_month_day[link /reference/chrono/year_month_day.md]

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


## 関連項目
- [`operator sys_days`](op_sys_days.md)
