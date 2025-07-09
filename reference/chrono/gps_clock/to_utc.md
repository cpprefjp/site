# to_utc
* chrono[meta header]
* std::chrono[meta namespace]
* gps_clock[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template <class Duration>
static utc_time<common_type_t<Duration, seconds>>
  to_utc(const gps_time<Duration>& t) noexcept;
```
* gps_time[link /reference/chrono/gps_time.md]
* utc_time[link /reference/chrono/utc_time.md]
* common_type_t[link /reference/chrono/common_type.md]

## 概要
GPS時間からUTC時間に変換する。


## 戻り値
```cpp
return utc_time<common_type_t<Duration, seconds>>{t.time_since_epoch()} + 315964809s;
```
* utc_time[link /reference/chrono/utc_time.md]
* common_type_t[link /reference/chrono/common_type.md]
* t.time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* 315964809s[link /reference/chrono/duration/op_s.md]

ここで`315964809`は、システム時間のエポック1970年1月1日とGPS時間のエポック1980年1月6日 (この年の最初の日曜日) との差である秒数に、その間に挿入されたうるう秒である9秒を加算した秒数である。

```cpp
315964809s == sys_days{1980y/January/Sunday[1]} - sys_days{1970y/January/1} + 9s
```
* 315964809s[link /reference/chrono/duration/op_s.md]
* 9s[link /reference/chrono/duration/op_s.md]
* sys_days[link /reference/chrono/sys_time.md]
* 1970y[link /reference/chrono/year/op_y.md]
* 1980y[link /reference/chrono/year/op_y.md]
* January[link /reference/chrono/month_constants.md]
* Sunday[link /reference/chrono/weekday_constants.md]


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  auto tt = chrono::clock_cast<chrono::gps_clock>(chrono::sys_days{2019y/10/24});
  auto ut = chrono::gps_clock::to_utc(tt);

  // うるう秒
  chrono::leap_second_info info = chrono::get_leap_second_info(ut);

  std::cout << tt << " GPS" << std::endl;
  std::cout << ut << " UTC" << std::endl;
  std::cout << info.elapsed.count() << std::endl;
}
```
* to_utc[color ff0000]
* chrono::clock_cast[link /reference/chrono/clock_cast.md]
* chrono::sys_days[link /reference/chrono/sys_time.md]
* 2019y[link /reference/chrono/year/op_y.md]
* chrono::get_leap_second_info[link /reference/chrono/get_leap_second_info.md]
* chrono::leap_second_info[link /reference/chrono/leap_second_info.md]
* count()[link /reference/chrono/duration/count.md]


### 出力
```
2019-10-24 00:00:18 GPS
2019-10-24 00:00:00 UTC
27
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
