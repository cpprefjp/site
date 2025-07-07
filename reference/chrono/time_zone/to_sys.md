# to_sys
* chrono[meta header]
* std::chrono[meta namespace]
* time_zone[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template<class Duration>
sys_time<common_type_t<Duration, seconds>>
  to_sys(const local_time<Duration>& tp) const;           // (1) C++20

template<class Duration>
sys_time<common_type_t<Duration, seconds>>
  to_sys(const local_time<Duration>& tp, choose z) const; // (2) C++20
```
* sys_time[link /reference/chrono/sys_time.md]
* local_time[link /reference/chrono/local_time.md]
* choose[link /reference/chrono/choose.md]

## 概要
ローカル時間からシステム時間に変換する。

- (1) : ローカル時間からシステム時間に変換する。あいまいなローカル時間もしくは存在しないローカル時間が指定された場合は例外を送出する
- (2) : ローカル時間からシステム時間に変換する。あいまいなローカル時間が指定された場合は`z`で指定された方のシステム時間を返し、存在しないローカル時間が指定された場合は同じ時間点のシステム時間を返す


## 戻り値
- (1) : 少なくとも秒以上の分解能で、タイムゾーンの規則に従ったUTCのシステム時間を返す
- (2) : (1)に加え、`tp`からシステム時間への変換があいまいである場合、`z ==` [`choose::earliest`](/reference/chrono/choose.md)であるなら早い方のシステム時間候補を返し、`z ==` [`choose::latest`](/reference/chrono/choose.md)であるなら遅い方のシステム時間候補を返す。`tp`とUTC時間点の間に表現できる時間が存在しない場合、同じ時間点のシステム時間を返す


## 例外
- (1) :
    - `tp`からシステム時間への変換があいまいである場合、[`ambiguous_local_time`](/reference/chrono/ambiguous_local_time.md)例外を送出する
    - `tp`とUTC時間点の間に表現できる時間が存在しない場合、[`nonexistent_local_time`](/reference/chrono/nonexistent_local_time.md)例外を送出する


## 備考
- 存在しないローカル時間およびあいまいなローカル時間は、サマータイムを採用しているタイムゾーンで生じる可能性がある
    - 存在しないローカル時間の例として、タイムゾーン`"America/New_York"`のローカル時刻 2016-03-13 02:30:00 は以下の隙間に位置するため存在しえない：
        - 2016-03-13 02:00:00 EST
        - 2016-03-13 03:00:00 EDT
        - 2016-03-13 07:00:00 UTC
    - あいまいなローカル時間の例として、タイムゾーン`"America/New_York"`のローカル時刻 2016-11-06 01:30:00 は、以下のいずれかとなり、一意に決まらない：
        - 2016-11-06 05:30:00 UTC
        - 2016-11-06 06:30:00 UTC


## 例
```cpp example
#include <iostream>
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  auto now = chrono::system_clock::now();
  chrono::local_time local_now{now.time_since_epoch()};
  chrono::local_time local_jst_now = local_now + 9h;

  // 日本のローカル時間をシステム時間 (UTCタイムゾーン) に変換する
  const chrono::time_zone* jst = chrono::locate_zone("Asia/Tokyo");
  chrono::sys_time jst_to_utc = jst->to_sys(local_jst_now);
  assert(chrono::floor<chrono::seconds>(jst_to_utc) == chrono::floor<chrono::seconds>(now));

  // ニューヨーク (EDTタイムゾーン) のローカル時間を、システム時間 (UTCタイムゾーン) に変換する。
  // ローカル時間2016-11-06 01:30:00 EDTに対応するシステム時間は、以下の2つがあり、一意に決まらない：
  //   2016-11-06 05:30:00 UTC
  //   2016-11-06 06:30:00 UTC
  // ここではlatestを指定することで、遅い時間 (06:30:00) を選択する
  chrono::local_time edt_now = chrono::local_days{2016y/11/6} + 1h + 30min;
  const chrono::time_zone* edt = chrono::locate_zone("America/New_York");

  // chooseを指定しない場合、あいまいなローカル時間を与えると例外が送出される
  try {
    edt->to_sys(edt_now);
    assert(false);
  }
  catch (chrono::ambiguous_local_time& e) {
    std::cout << e.what() << std::endl;
  }

  // chooseを指定した場合は、早い時間か遅い時間のどちらかを返す。
  // ここではlatestを指定しているため、遅い方の時間を返す
  chrono::sys_time edt_to_utc = edt->to_sys(edt_now, choose::latest);
  std::cout << edt_to_utc << std::endl;
}
```
* to_sys[color ff0000]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* chrono::local_time[link /reference/chrono/local_time.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* chrono::locate_zone[link /reference/chrono/locate_zone.md]
* 2016y[link /reference/chrono/year/op_y.md]
* 1h[link /reference/chrono/duration/op_h.md]
* 9h[link /reference/chrono/duration/op_h.md]
* 30min[link /reference/chrono/duration/op_min.md]
* chrono::local_days[link /reference/chrono/local_time.md]
* chrono::sys_time[link /reference/chrono/sys_time.md]
* chrono::ambiguous_local_time[link /reference/chrono/ambiguous_local_time.md]
* choose::latest[link /reference/chrono/choose.md]
* chrono::floor[link /reference/chrono/time_point/floor.md]

### 出力例
```
```

(未検証)

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [`local_info`](/reference/chrono/local_info.md)
