# operator sys_days
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_day_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr operator sys_days() const noexcept; // (1) C++20
```
* sys_days[link /reference/chrono/sys_time.md]

## 概要
`year_month_day_last`オブジェクトをシステム時間の日付に、暗黙に型変換する。


## 戻り値
```cpp
return sys_days{year()/month()/day()};
```
* sys_days[link /reference/chrono/sys_time.md]
* year()[link year.md]
* month()[link month.md]
* day()[link day.md]

([`year_month_day`](/reference/chrono/year_month_day.md)クラスの[`sys_days`への変換演算子](/reference/chrono/year_month_day/op_sys_days.md)で変換される)


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // year_month_day_lastからsys_daysへの暗黙変換
  chrono::sys_days date = 2020y/2/chrono::last;
  std::cout << date << std::endl;
}
```
* chrono::sys_days[link /reference/chrono/sys_time.md]
* 2020y[link /reference/chrono/year/op_y.md]
* chrono::last[link /reference/chrono/last_spec.md]

### 出力
```
2020-02-29
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 11.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
