# operator local_days
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_day[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr explicit operator local_days() const noexcept; // (1) C++20
```
* local_days[link /reference/chrono/local_time.md]

## 概要
`year_month_day`オブジェクトを�ーカル時間の日付に、明示的に型変換する。


## 戻り値
```cpp
return local_days{sys_days{*this}.time_since_epoch()};
```
* local_days[link /reference/chrono/local_time.md]
* sys_days[link /reference/chrono/sys_time.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]


## 備考
- 日のみ範囲外の場合、以下のように、表そうとしている日付はそのままにしてシステム時間のエポックからの経過時間を求めて、�ーカル時間に変換される
    - (うるう年以外の年)年2月29日は、(そのままの年)年3月1日に変換される
    - xxxx年1月0日は、xxxx - 1年12月31日に変換される


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  // year_month_dayからsys_daysへの暗黙変換
  chrono::local_days date {2020y/3/1};
  std::cout << date << std::endl;

  // 日だけ範囲外に大きくなった場合でも、システム日付を求められる
  chrono::local_days over_day {2019y/2/29};
  std::cout << over_day << std::endl;

  chrono::local_days over_min_day {2020y/1/0};
  std::cout << over_min_day << std::endl;
}
```
* ok()[color ff0000]
* chrono::local_days[link /reference/chrono/local_time.md]
* 2020y[link /reference/chrono/year/op_y.md]
* 2019y[link /reference/chrono/year/op_y.md]

### 出力
```
2020-03-01 00:00:00
2019-03-01 00:00:00
2019-12-31 00:00:00
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)


## 関連項目
- [`operator sys_days`](op_sys_days.md)
