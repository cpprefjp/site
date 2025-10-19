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
* utc_time[link /reference/chrono/utc_time.md]
* sys_time[link /reference/chrono/sys_time.md]
* common_type_t[link /reference/chrono/common_type.md]

## 概要
システム時間からUTC時間に変換する。


## 戻り値
`u.`[`time_since_epoch()`](/reference/chrono/time_point/time_since_epoch.md) `- t.`[`time_since_epoch()`](/reference/chrono/time_point/time_since_epoch.md)が1970年1月1日からの挿入されたうるう秒の合計と等しくなるような[`utc_time`](/reference/chrono/utc_time.md)型オブジェクト`u`を返す。`t`がうるう秒が挿入されたちょうどその日付だえる場合、この変換ではうるう秒が挿入されたものとしてカウントされる。


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
* utc_time[link /reference/chrono/utc_time.md]
* sys_seconds[link /reference/chrono/sys_time.md]
* utc_seconds[link /reference/chrono/utc_time.md]
* system_clock[link /reference/chrono/system_clock.md]
* July[link /reference/chrono/month_constants.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]

### 出力
```
2015-07-01
2015-07-01 00:00:00
26s
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [LWG Issue 3359. `<chrono>` leap second support should allow for negative leap seconds](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3359)
