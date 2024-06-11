# operator sys_time
* chrono[meta header]
* std::chrono[meta namespace]
* zoned_time[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
operator sys_time<duration>() const; // (1) C++20
```
* sys_time[link /reference/chrono/sys_time.md]

## 概要
システム時間[`sys_time`](/reference/chrono/sys_time.md)に暗黙に型変換する。


## 戻り値
```cpp
return get_sys_time();
```
* get_sys_time()[link get_sys_time.md]


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

  chrono::zoned_time zt1{"Asia/Tokyo", now};
  assert(zt1 == now);

  chrono::sys_time sys_now = zt1;
  assert(sys_now == now);

  chrono::zoned_time zt2{"Asia/Tokyo", local_now};
  assert(zt2 == now);
}
```
* chrono::local_time[link /reference/chrono/local_time.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]

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
