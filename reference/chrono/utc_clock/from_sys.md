# from_sys
* chrono[meta header]
* std::chrono[meta namespace]
* utc_clock[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template<class Duration>
static utc_time<common_type_t<Duration, seconds>>
  from_sys(const sys_time<Duration>& t);
```
* utc_time[link /reference/chrono/utc_time.md.nolink]
* sys_time[link /reference/chrono/sys_time.md]

## 概要
システム時間からUTC時間に変換する。


## 戻り値
システム時間`t`にエポックからのうるう秒を加算することで、UTC時間に変換して返す。

変換元と変換先の時間単位は同じとなる。


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  // ここでは日付 (sys_days) から日付 (日単位のutc_time) に変換しているが、
  // 日時 (sys_seconds) を渡せば日時 (utc_seconds) が返る。
  // system_clock::time_pointを渡せば、それと同じ時間単位のutc_clockのtime_pointが返る
  auto t = sys_days{July/1/2015};
  auto u = utc_clock::from_sys(t); // 日単位のUTC時間が返る

  auto leap_seconds = duration_cast<seconds>(u.time_since_epoch() - t.time_since_epoch());

  std::cout << t << std::endl;
  std::cout << u << std::endl;
  std::cout << leap_seconds << std::endl;
}
```
* from_sys[color ff0000]
* sys_days[link /reference/chrono/sys_time.md]
* utc_time[link /reference/chrono/utc_time.md.nolink]
* sys_seconds[link /reference/chrono/sys_time.md]
* utc_seconds[link /reference/chrono/utc_time.md.nolink]
* system_clock[link /reference/chrono/system_clock.md]
* July[link /reference/chrono/month_constants.md.nolink]
* duration_cast[link /reference/chrono/duration_cast.md]
* seconds[link /reference/chrono/duration-aliases.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]

### 出力
```
2015-01-01
2015-01-01 00:00:00 UTC
26
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
