# 推論補助
* chrono[meta header]
* std::chrono[meta namespace]
* zoned_time[meta class]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  zoned_time() -> zoned_time<seconds>;                            // (1) C++20

  template <class Duration>
  zoned_time(sys_time<Duration>)
    -> zoned_time<common_type_t<Duration, seconds>>;              // (2) C++20

  template <class TimeZonePtr, class Duration>
  zoned_time(TimeZonePtr, sys_time<Duration>)
    -> zoned_time<common_type_t<Duration, seconds>, TimeZonePtr>; // (3) C++20

  template <class TimeZonePtr, class Duration>
  zoned_time(TimeZonePtr, local_time<Duration>, choose = choose::earliest)
    -> zoned_time<common_type_t<Duration, seconds>, TimeZonePtr>; // (4) C++20

  template <class TimeZonePtr, class Duration>
  zoned_time(TimeZonePtr, zoned_time<Duration>, choose = choose::earliest)
    -> zoned_time<common_type_t<Duration, seconds>, TimeZonePtr>; // (5) C++20

  zoned_time(string_view) -> zoned_time<seconds>;                 // (6) C++20

  template <class Duration>
  zoned_time(string_view, sys_time<Duration>)
    -> zoned_time<common_type_t<Duration, seconds>>;              // (7) C++20

  template <class Duration>
  zoned_time(string_view, local_time<Duration>, choose = choose::earliest)
    -> zoned_time<common_type_t<Duration, seconds>>;              // (8) C++20

  template <class Duration, class TimeZonePtr, class TimeZonePtr2>
  zoned_time(TimeZonePtr, zoned_time<Duration, TimeZonePtr2>, choose = choose::earliest)
    -> zoned_time<Duration, TimeZonePtr>;                         // (9) C++20
}
```
* sys_time[link /reference/chrono/sys_time.md]
* common_type_t[link /reference/chrono/common_type.md]
- local_time[link /reference/chrono/local_time.md]
* choose[link /reference/chrono/choose.md]
* string_view[link /reference/string_view/basic_string_view.md]

## 概要
`std::chrono::zoned_time`クラステンプレートの型推論補助。

- (1) : デフォルトコンストラクタ。秒単位の時間間隔を使用する
- (2) : [`sys_time`](/reference/chrono/sys_time.md)`<Duration>`からの推論。`Duration`と[`seconds`](/reference/chrono/duration_aliases.md)の共通の時間間隔を使用する
- (3) : 任意のタイムゾーンオブジェクトへのポインタ型と[`sys_time`](/reference/chrono/sys_time.md)`<Duration>`からの推論。`Duration`と[`seconds`](/reference/chrono/duration_aliases.md)の共通の時間間隔と、受け取ったタイムゾーンオブジェクトへのポインタ型を使用する
- (4) : 任意のタイムゾーンオブジェクトへのポインタ型、[`local_time`](/reference/chrono/local_time.md)`<Duration>`、[`choose`](/reference/chrono/choose.md)型からの推論。`Duration`と[`seconds`](/reference/chrono/duration_aliases.md)の共通の時間間隔と、受け取ったタイムゾーンオブジェクトへのポインタ型を使用する
- (5) : 任意のタイムゾーンオブジェクトへのポインタ型、`zoned_time<Duration>`、[`choose`](/reference/chrono/choose.md)型からの推論。`Duration`と[`seconds`](/reference/chrono/duration_aliases.md)の共通の時間間隔と、受け取ったタイムゾーンオブジェクトへのポインタ型を使用する
- (6) : タイムゾーン名の[`string_view`](/reference/string_view/basic_string_view.md)型からの推論。秒単位の時間間隔を使用する
- (7) : タイムゾーン名の[`string_view`](/reference/string_view/basic_string_view.md)型と、[`sys_time`](/reference/chrono/sys_time.md)`<Duration>`からの推論。`Duration`と[`seconds`](/reference/chrono/duration_aliases.md)の共通の時間間隔を使用する
- (8) : タイムゾーン名の[`string_view`](/reference/string_view/basic_string_view.md)型、[`local_time`](/reference/chrono/local_time.md)`<Duration>`、[`choose`](/reference/chrono/choose.md)型からの推論。`Duration`と[`seconds`](/reference/chrono/duration_aliases.md)の共通の時間間隔と、受け取ったタイムゾーンオブジェクトへのポインタ型を使用する
- (9) : タイムゾーン名の[`string_view`](/reference/string_view/basic_string_view.md)型、`zoned_time<Duration>`、[`choose`](/reference/chrono/choose.md)型からの推論。`Duration`と[`seconds`](/reference/chrono/duration_aliases.md)の共通の時間間隔と、受け取ったタイムゾーンオブジェクトへのポインタ型を使用する


## 備考
- [`common_type_t`](/reference/chrono/common_type.md)`<Duration,` [`seconds`](/reference/chrono/duration_aliases.md)`>`では、`Duration`が[`milliseconds`](/reference/chrono/duration_aliases.md)のような[`seconds`](/reference/chrono/duration_aliases.md)より小さい時間単位では第1テンプレート引数の型が選択され、[`days`](/reference/chrono/duration_aliases.md)のような[`seconds`](/reference/chrono/duration_aliases.md)より大きい時間間隔では[`seconds`](/reference/chrono/duration_aliases.md)が選択される

## 例
```cpp example
#include <cassert>
#include <chrono>
#include <type_traits>

namespace chrono = std::chrono;

int main()
{
  chrono::sys_time now = chrono::system_clock::now();
  chrono::sys_time<chrono::seconds> now_sec = chrono::floor<chrono::seconds>(now);

  // デフォルトコンストラクタ
  chrono::zoned_time z1;
  static_assert(std::is_same_v<
    decltype(z1),
    chrono::zoned_time<chrono::seconds>
  >);

  // システム時間からの推論。
  // システム時間がもっている時間間隔を使用する。
  // (システム時間の時間間隔がマイクロ秒なら、zoned_timeもマイクロ秒)
  chrono::zoned_time z2{now};
  static_assert(std::is_same_v<
    decltype(z2),
    chrono::zoned_time<decltype(now)::duration>
  >);

  // 秒単位のシステム時間からは、秒単位のzoned_timeに推論される
  chrono::zoned_time z3{now_sec};
  static_assert(std::is_same_v<
    decltype(z3),
    chrono::zoned_time<chrono::seconds>
  >);

  // タイムゾーンを与える場合も同様
  chrono::zoned_time z4{chrono::locate_zone("Asia/Tokyo"), now};
  chrono::zoned_time z5{"Asia/Tokyo", now};

  static_assert(std::is_same_v<
    decltype(z4),
    chrono::zoned_time<decltype(now)::duration, chrono::time_zone*>
  >);
  static_assert(std::is_same_v<
    decltype(z5),
    chrono::zoned_time<decltype(now)::duration, chrono::time_zone*>
  >);
}
```
* chrono::locate_zone[link /reference/chrono/locate_zone.md]
* chrono::floor[link /reference/chrono/time_point/floor.md]
* time_since_epoch()[link /reference/chrono/time_point/time_since_epoch.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* now()[link /reference/chrono/system_clock/now.md]
* chrono::time_zone[link /reference/chrono/time_zone.md]

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
