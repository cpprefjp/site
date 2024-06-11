# get_sys_time
* chrono[meta header]
* std::chrono[meta namespace]
* zoned_time[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
sys_time<duration> get_sys_time() const; // (1) C++20
```
* sys_time[link /reference/chrono/sys_time.md]

## 概要
システム時間を取得する。


## 戻り値
コンストラクタで設定されて保持しているシステム時間の時間点オブジェクトを返す。

このシステム時間は、指定されたタイムゾーンの時間には変換されていない、UTCタイムゾーンの時間である。

指定されたタイムゾーンに変換された時間は、[`get_local_time()`](get_local_time.md)関数で取得できる。


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
  assert(zt1.get_sys_time() == now);

  chrono::zoned_time zt2{"Asia/Tokyo", local_now};
  assert(zt2.get_sys_time() == now);
}
```
* get_sys_time()[color ff0000]
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
