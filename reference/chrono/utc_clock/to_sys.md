# to_sys
* chrono[meta header]
* std::chrono[meta namespace]
* utc_clock[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template<class Duration>
static sys_time<common_type_t<Duration, seconds>>
  to_sys(const utc_time<Duration>& u);
```
* sys_time[link /reference/chrono/sys_time.md]
* utc_time[link /reference/chrono/utc_time.md]

## 概要
UTC時間からシステム時間に変換する。


## 戻り値
UTC時間`u`からうるう秒を除外した、システム時間として表現可能な最後の日時を返す。

変換元と変換先の時間単位は同じとなる。


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  auto u = utc_clock::from_sys(sys_days{July/1/2015});
  sys_days t = utc_clock::to_sys(u);

  auto leap_seconds = duration_cast<seconds>(u.time_since_epoch() - t.time_since_epoch());

  std::cout << u << std::endl;
  std::cout << t << std::endl;
  std::cout << leap_seconds << std::endl;
}
```
* to_sys[color ff0000]
* from_sys[link from_sys.md]
* sys_days[link /reference/chrono/sys_time.md]
* system_clock[link /reference/chrono/system_clock.md]
* July[link /reference/chrono/month_constants.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]

### 出力
```
2015-01-01 00:00:00
2015-01-01
26
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
