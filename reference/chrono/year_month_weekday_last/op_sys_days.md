# operator sys_days
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_weekday_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr operator sys_days() const noexcept; // (1) C++20
```
* sys_days[link /reference/chrono/sys_time.md]

## 概要
`year_month_weekday_last`オブジェクトをシステム時間の日付に、暗黙に型変換する。


## 戻り値
[`ok()`](ok.md)が`true`である場合、[`year()`](year.md)`/`[`month()`](month.md)の最後の[`weekday()`](weekday.md)を表す[`sys_days`](/reference/chrono/sys_time.md)を返す。そうでなければ未規定の値を返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::sys_days date = 2020y/3/chrono::Sunday[chrono::last];
  assert(chrono::year_month_day{date} == 2020y/3/29);
}
```
* chrono::sys_days[link /reference/chrono/sys_time.md]
* 2020y[link /reference/chrono/year/op_y.md]
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::year_month_day[link /reference/chrono/year_month_day.md]
* chrono::last[link /reference/chrono/last_spec.md]

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

#### 備考
- GCC 11のtrunkバージョンでは`index() == 0`の場合に間違った値が返る。正式リリース時には直っている可能性がある
    - [Bug 97613 - `chrono::year_month_weekday` cast to `sys_days` : return bad value if `index() == 0`](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=97613)
