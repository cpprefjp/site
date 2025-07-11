# operator sys_days
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr operator sys_days() const noexcept; // (1) C++20
```
* sys_days[link /reference/chrono/sys_time.md]

## 概要
`year_month_weekday`オブジェクトをシステム時間の日付に、暗黙に型変換する。

この関数では、N回目の曜日のNは月内である必要はなく、N == 0の場合は「1週目の指定した曜日の7日前」を意味し、N > 0の場合は「1週目の指定した曜日から(N - 1) * 7日を加算した日付」を意味し任意にNを大きく指定できる。


## 戻り値
- [`year()`](year.md)`.`[`ok()`](/reference/chrono/year/ok.md) `&&` [`month()`](month.md)`.`[`ok()`](/reference/chrono/month/ok.md) `&&` [`weekday()`](weekday.md)`.`[`ok()`](/reference/chrono/weekday/ok.md)が`true`である場合、[`year()`](year.md)`/`[`month()`](month.md)の最初の[`weekday()`](weekday.md)の`(`[`index()`](index.md) `- 1) * 7`日後を表す[`sys_days`](/reference/chrono/sys_time.md)を返す
- [`index()`](index.md)が`0`である場合、[`year()`](year.md)`/`[`month()`](month.md)の最初の[`weekday()`](weekday.md)の7日前の日付を表す[`sys_days`](/reference/chrono/sys_time.md)を返す
- そうでない場合、未規定の値を返す


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::sys_days date1 = 2020y/3/chrono::Sunday[1];
  assert(chrono::year_month_day{date1} == 2020y/3/1);

  chrono::sys_days date2 = 2020y/3/chrono::Sunday[2];
  assert(chrono::year_month_day{date2} == 2020y/3/8);

  chrono::sys_days date3 = 2020y/3/chrono::Sunday[0];
  assert(chrono::year_month_day{date3} == 2020y/2/23);

  chrono::sys_days date4 = 2020y/3/chrono::Sunday[10];
  assert(chrono::year_month_day{date4} == 2020y/5/3);
}
```
* chrono::sys_days[link /reference/chrono/sys_time.md]
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
