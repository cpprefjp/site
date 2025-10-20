# clock_cast
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class DestClock, class SourceClock, class Duration>
  auto clock_cast(const time_point<SourceClock, Duration>& t);
}
```
* time_point[link time_point.md]

## 概要
ほかの時計時間の`time_point`に変換する。

この関数は、ある時計型の時間点を、他の時計型の時間点に変換する。

例として、以下のような変換ができる：

- [`system_clock`](system_clock.md)の[`time_point`](time_point.md)から、[`utc_clock`](utc_clock.md)の[`time_point`](time_point.md)へ変換、およびその逆の変換
- [`tai_clock`](tai_clock.md)または[`gps_clock`](gps_clock.md)の[`time_point`](time_point.md)から、[`utc_clock`](utc_clock.md)の[`time_point`](time_point.md)へ変換、およびその逆の変換
- [`system_clock`](system_clock.md)の[`time_point`](time_point.md)から、[`tai_clock`](tai_clock.md)または[`gps_clock`](gps_clock.md)の[`time_point`](time_point.md)への変換、およびその逆の変換
    - この組み合わせは[`clock_time_conversion`](clock_time_conversion.md)の特殊化では定義されないが、この関数では、[`utc_clock`](utc_clock.md)を介した、[`system_clock`](system_clock.md)と、[`tai_clock`](tai_clock.md)または[`gps_clock`](gps_clock.md)の変換がサポートされる


## テンプレートパラメータ制約
以下の式のうち、少なくともひとつが妥当であること：

```cpp
// (1)
// 任意のSourceClockから任意のDestClockへの直接の変換。
clock_time_conversion<DestClock, SourceClock>{}(t);

// (2)
// system_clockと任意のDestClockへの直接の変換、およびその逆の変換
clock_time_conversion<DestClock, system_clock>{}(
  clock_time_conversion<system_clock, SourceClock>{}(t)
);

// (3)
// utc_clockと任意のDestClockへの直接の変換、およびその逆の変換
clock_time_conversion<DestClock, utc_clock>{}(
  clock_time_conversion<utc_clock, SourceClock>{}(t)
);

// (4)
// utc_clockを介したsystem_clockから任意のDestClockへの変換。
// (SourceClock ->) system_clock -> utc_clock -> DestClock
clock_time_conversion<DestClock, utc_clock>{}(
  clock_time_conversion<utc_clock, system_clock>{}(
    clock_time_conversion<system_clock, SourceClock>{}(t)
  )
)

// (5)
// utc_clockを介した任意のSourceClockからsystem_clockへの変換。
// SourceClock -> utc_clock -> system_clock (-> DestClock)
clock_time_conversion<DestClock, system_clock>{}(
  clock_time_conversion<system_clock, utc_clock>{}(
    clock_time_conversion<utc_clock, SourceClock>{}(t)
  )
);
```
* clock_time_conversion[link clock_time_conversion.md]
* system_clock[link system_clock.md]
* utc_clock[link utc_clock.md]

これらのうち、関数呼び出し演算子の呼び出し回数が少ない式が優先して選択される。選択が一意に定まらずあいまいになる場合、プログラムは不適格となる。


## 戻り値
上記変換式のうち、最も優先して選択された式によって時間点を変換して返す。


## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  // system_clockからutc_clockへの変換
  {
    utc_time ut = clock_cast<utc_clock>(system_clock::now());
    std::cout << ut << std::endl;
  }

  // utc_clockからsystem_clockへの変換
  {
    sys_time st = clock_cast<system_clock>(utc_clock::now());
    std::cout << st << std::endl;
  }

  // system_clockから (utc_clockを介して) tai_clockへ変換
  {
    tai_time tt = clock_cast<tai_clock>(system_clock::now());
    std::cout << tt << std::endl;
  }

  // tai_clockから (utc_clockを介して) system_clockへ変換
  {
    sys_time st = clock_cast<system_clock>(tai_clock::now());
    std::cout << st << std::endl;
  }
}
```
* clock_cast[color ff0000]
* system_clock[link system_clock.md]
* utc_clock[link utc_clock.md]
* tai_clock[link tai_clock.md]
* utc_time[link utc_time.md]
* sys_time[link sys_time.md]
* tai_time[link tai_time.md]

### 出力例
```
2019-10-24 11:15:10
2019-10-24 11:15:10
2019-10-24 11:15:37
2019-10-24 11:15:10
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl], 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
