# operator local_days
* chrono[meta header]
* std::chrono[meta namespace]
* year_month_day_last[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr explicit operator local_days() const noexcept; // (1) C++20
```
* local_days[link /reference/chrono/local_time.md]

## 概要
`year_month_day_last`オブジェクトをローカル時間の日付に、明示的に型変換する。


## 戻り値
```cpp
return local_days{sys_days{*this}.time_since_epoch()};
```
* local_days[link /reference/chrono/local_time.md]
* sys_days[link /reference/chrono/sys_time.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  chrono::local_days date {2020y/2/chrono::last};
  std::cout << date << std::endl;
}
```
* chrono::local_days[link /reference/chrono/local_time.md]
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
- [GCC](/implementation.md#gcc): 11.1 [mark verified], 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [`operator sys_days`](op_sys_days.md)
