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
  // year_month_dayからlocal_daysへの暗黙変換
  chrono::local_days date1{2020y/3/chrono::Sunday[1]};
  assert(chrono::year_month_day{date1} == 2020y/3/1);

  chrono::local_days date2{2020y/3/chrono::Sunday[2]};
  assert(chrono::year_month_day{date2} == 2020y/3/8);

  chrono::local_days date3{2020y/3/chrono::Sunday[0]};
  assert(chrono::year_month_day{date3} == 2020y/2/23);
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
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): 11.1
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)

#### 備考
- GCC 11のtrunkバージョンでは`index() == 0`の場合に間違った値が返る。正式リリース時には直っている可能性がある
    - [Bug 97613 - `chrono::year_month_weekday` cast to `sys_days` : return bad value if `index() == 0`](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=97613)


## 関連項目
- [`operator sys_days`](op_sys_days.md)
