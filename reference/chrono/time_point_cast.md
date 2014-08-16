#time_point_cast (C++11)
```cpp
namespace std {
namespace chrono {
  template <class ToDuration, class Clock, class Duration>
  time_point<Clock, ToDuration> time_point_cast(const time_point<Clock, Duration>& t);
}}
```
* time_point[link /reference/chrono/time_point.md]

##概要
分解能の低い[`duration`](/reference/chrono/duration.md)型を内部表現として持つ[`time_point`](/reference/chrono/time_point.md)への変換


##戻り値
[`time_point`](/reference/chrono/time_point.md)`<Clock, ToDuration>(`[`duration_cast`](/reference/chrono/duration_cast.md)`<ToDuration>(t.`[`time_since_epoch`](/reference/chrono/time_point/time_since_epoch.md)`()))`

##例
```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  typedef time_point<system_clock, milliseconds> MTimePoint;
  typedef time_point<system_clock, seconds>      STimePoint;

  MTimePoint mp(milliseconds(1100));

//STimePoint sp = mp; // error! 変換できない
  STimePoint sp = time_point_cast<seconds>(mp); // OK

  std::cout << sp.time_since_epoch().count() << std::endl;
}
```
* time_point_cast[color ff0000]

###出力
```
1
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1

