# to_utc
* chrono[meta header]
* std::chrono[meta namespace]
* tai_clock[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template <class Duration>
static utc_time<common_type_t<Duration, seconds>>
  to_utc(const tai_time<Duration>& t) noexcept;
```
* tai_time[link /reference/chrono/tai_time.md]
* utc_time[link /reference/chrono/utc_time.md]

## 概要
TAI時間からUTC時間に変換する。


## 戻り値
```cpp
return utc_time<common_type_t<Duration, seconds>>{t.time_since_epoch()} - 378691210s;
```
* utc_time[link /reference/chrono/utc_time.md]
* t.time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* 378691210s[link /reference/chrono/duration/op_s.md]

ここで`378691210`は、システム時間のエポック1970年1月1日とTAI時間のエポック1958年1月1日との差である秒数に、TAI時間がUTC時間より10秒進んでいるという差を加算した秒数である。

```cpp
378691210s == sys_days{1970y/January/1} - sys_days{1958y/January/1} + 10s
```
* 378691210s[link /reference/chrono/duration/op_s.md]
* 10s[link /reference/chrono/duration/op_s.md]
* sys_days[link /reference/chrono/sys_time.md]
* 1970y[link /reference/chrono/year/op_y.md]
* 1958y[link /reference/chrono/year/op_y.md]
* January[link /reference/chrono/month_constants.md]


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  auto tt = chrono::clock_cast<chrono::tai_clock>(chrono::sys_days{2019y/10/24});
  auto ut = chrono::tai_clock::to_utc(tt);

  // うるう秒
  chrono::leap_second_info info = chrono::get_leap_second_info(ut);

  std::cout << tt << std::endl;
  std::cout << ut << std::endl;
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
2019-10-24 00:00:37 TAI
2019-10-24 00:00:00 UTC
27
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
