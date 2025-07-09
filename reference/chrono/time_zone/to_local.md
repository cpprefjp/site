# to_local
* chrono[meta header]
* std::chrono[meta namespace]
* time_zone[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template<class Duration>
local_time<common_type_t<Duration, seconds>>
  to_local(const sys_time<Duration>& tp) const; // (1) C++20
```
* sys_time[link /reference/chrono/sys_time.md]
* local_time[link /reference/chrono/local_time.md]
* common_type_t[link /reference/chrono/common_type.md]

## 概要
システム時間からローカル時間に変換する。

この関数は、UTCタイムゾーンをもつシステム時間から、指定されたタイムゾーンのローカル時間に変換する。

ローカル時間からシステム時間への変換では、サマータイムによってあいまいな時間や、存在しない時間が発生する可能性があるが、システム時間からローカル時間への変換ではそのような問題は発生しない。


## 戻り値
`tp`と指定されたタイムゾーンに対応するローカル時間を返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  auto now = chrono::system_clock::now();
  chrono::local_time local_now{now.time_since_epoch()};
  chrono::local_time local_jst_now = local_now + 9h;

  // システム時間 (UTCタイムゾーン) を日本のローカル時間に変換する
  const chrono::time_zone* jst = chrono::locate_zone("Asia/Tokyo");
  chrono::local_time utc_to_jst = jst->to_local(now);
  assert(chrono::floor<chrono::seconds>(utc_to_jst) == chrono::floor<chrono::seconds>(local_jst_now));
}
```
* to_local[color ff0000]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* chrono::local_time[link /reference/chrono/local_time.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* chrono::locate_zone[link /reference/chrono/locate_zone.md]
* 9h[link /reference/chrono/duration/op_h.md]
* chrono::floor[link /reference/chrono/time_point/floor.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [`sys_info`](/reference/chrono/sys_info.md)
