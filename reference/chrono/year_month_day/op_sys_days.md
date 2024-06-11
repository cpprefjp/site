# operator sys_days
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_day[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr operator sys_days() const noexcept; // (1) C++20
```
* sys_days[link /reference/chrono/sys_time.md]

## 概要
`year_month_day`オブジェクトをシステム時間の日付に、暗黙に型変換する。


## 戻り値
[`year()`](year.md)によって返される値を`y`、[`month()`](month.md)によって返される値を`m`、[`day()`](day.md)によって返される値を`d`として、

- [`ok()`](ok.md) `== true`の場合、[`sys_days`](/reference/chrono/sys_time.md)のエポックから`*this`までの経過日を返す
- それ以外で`y.`[`ok()`](/reference/chrono/year/ok.md) `== true`かつ`m.`[`ok()`](/reference/chrono/month/ok.md) `== true`である場合、`sys_days{y/m/1d} + (d - 1d)`を返す
- それ以外の場合、返される値は未規定


## 備考
- 日のみ範囲外の場合、以下のように、表そうとしている日付はそのままにしてシステム時間のエポックからの経過時間を求めて変換される
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
  chrono::sys_days date = 2020y/3/1;
  std::cout << date << std::endl;

  // 日だけ範囲外に大きくなった場合でも、システム日付を求められる
  chrono::sys_days over_day = 2019y/2/29;
  std::cout << over_day << std::endl;

  chrono::sys_days over_min_day = 2020y/1/0;
  std::cout << over_min_day << std::endl;
}
```
* chrono::sys_days[link /reference/chrono/sys_time.md]
* 2020y[link /reference/chrono/year/op_y.md]
* 2019y[link /reference/chrono/year/op_y.md]

### 出力
```
2020-03-01
2019-03-01
2019-12-31
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [LWG Issue 3206. `year_month_day` conversion to `sys_days` uses not-existing member function](https://wg21.cmeerw.net/lwg/issue3206)
