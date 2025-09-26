# get_local_time
* chrono[meta header]
* std::chrono[meta namespace]
* zoned_time[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
local_time<duration> get_local_time() const; // (1) C++20
```
* local_time[link /reference/chrono/local_time.md]

## 概要
ローカル時間を取得する。

この関数によって、タイムゾーンを考慮した時間への変換が行われる (UTC -> 日本時間であれば9時間が加算される)。


## 戻り値
コンストラクタで設定されたタイムゾーンオブジェクトへのポインタ`zone`、およびシステム時間の時間点`tp`があるとして、以下を返す：

```cpp
return zone->to_local(tp);
```
* to_local[link /reference/chrono/time_zone/to_local.md]


## 例
```cpp example
#include <cassert>
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;
using namespace std::chrono_literals;

int main()
{
  auto now = chrono::system_clock::now();
  chrono::local_time local_now{now.time_since_epoch()};
  chrono::local_time local_jst_now = local_now + chrono::hours{9};

  // UTCタイムゾーンのシステム時間から、Asia/Tokyoタイムゾーンのローカル時間に変換する
  chrono::zoned_time zt1{"Asia/Tokyo", now};
  chrono::local_time lt1 = zt1.get_local_time();
  assert(lt1 == local_jst_now);

  // Asia/Tokyoタイムゾーンのローカル時間から、Asia/Tokyoタイムゾーンのローカル時間に変換する
  chrono::zoned_time zt2{"Asia/Tokyo", local_jst_now};
  chrono::local_time lt2 = zt2.get_local_time();
  assert(lt2 == local_jst_now);

  std::cout << "system now (UTC) : " << now << std::endl;
  std::cout << "local now (UTC) : " << local_now << std::endl;
  std::cout << "local now (JST) : " << local_jst_now << std::endl;
  std::cout << "local now (JST) converted from system now (UTC) : " << lt1 << std::endl;
  std::cout << "local now (JST) converted from local now (JST) : " << lt2 << std::endl;
}
```
* get_local_time()[color ff0000]
* chrono::local_time[link /reference/chrono/local_time.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]

### 出力例
```
system now (UTC) : 2020-01-21 05:10:15
local now (UTC) : 2020-01-21 05:10:15
local now (JST) : 2020-01-21 14:10:15
local now (JST) converted from system now (UTC) : 2020-01-21 14:10:15
local now (JST) converted from local now (JST) : 2020-01-21 14:10:15
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
