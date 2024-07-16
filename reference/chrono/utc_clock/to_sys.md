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
* common_type_t[link /reference/chrono/common_type.md]

## 概要
UTC時間からシステム時間に変換する。


## 戻り値
対応するシステム時間が存在する場合、[`from_sys`](from_sys.md)`(t) == u`となるようなシステム時間`t`を返す。そうでない場合、UTC時間`u`は正のうるう秒が挿入されている時間点を表しており、この変換によってうるう秒が挿入されていないものとして時間をカウントし、うるう秒が挿入される前のシステム時間として表現可能な最後の日時を返す。


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
* July[link /reference/chrono/month_constants.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]

### 出力
```
2015-01-01 00:00:00 UTC
2015-01-01
26
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 参照
- [LWG Issue 3359. `<chrono>` leap second support should allow for negative leap seconds](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html#3359)
