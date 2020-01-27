# get_time_zone
* chrono[meta header]
* std::chrono[meta namespace]
* zoned_time[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
TimeZonePtr get_time_zone() const; // (1) C++20
```

## 概要
タイムゾーンを取得する。


## 戻り値
コンストラクタで�定されて保持しているタイムゾーンオブジェクトへのポインタを返す。


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  auto now = chrono::system_clock::now();

  chrono::zoned_time zt1{"Asia/Tokyo", now};
  chrono::time_zone* tz = zt1.get_time_zone();
  assert(tz == chrono::locate_zone("Asia/Tokyo"));

  chrono::zoned_time zt2{"UTC", now};
  assert(zt2.get_time_zone() == chrono::locate_zone("UTC"));
}
```
* get_time_zone()[color ff0000]
* chrono::time_zone[link /reference/chrono/time_zone.md.nolink]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* chrono::locate_zone[link /reference/chrono/locate_zone.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): (9.0時点で実装なし)
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
