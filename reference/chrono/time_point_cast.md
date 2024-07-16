# time_point_cast
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  template <class ToDuration, class Clock, class Duration>
  time_point<Clock, ToDuration>
    time_point_cast(const time_point<Clock, Duration>& t); // C++11

  template <class ToDuration, class Clock, class Duration>
  constexpr time_point<Clock, ToDuration>
    time_point_cast(const time_point<Clock, Duration>& t); // C++14
}}
```
* time_point[link /reference/chrono/time_point.md]

## 概要
分解能の低い[`duration`](/reference/chrono/duration.md)型を内部表現として持つ[`time_point`](/reference/chrono/time_point.md)へ変換する。

その際の丸めは、ゼロ方向への丸め (切り捨て、truncate) が行われる。


## 戻り値
```cpp
time_point<Clock, ToDuration>(duration_cast<ToDuration>(t.time_since_epoch()));
```
* time_point[link /reference/chrono/time_point.md]
* time_since_epoch[link /reference/chrono/time_point/time_since_epoch.md]

## 例
```cpp example
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  using MTimePoint = time_point<system_clock, milliseconds>;
  using STimePoint = time_point<system_clock, seconds>;

  MTimePoint mp(milliseconds(1100));

//STimePoint sp = mp; // error! 変換できない
  STimePoint sp = time_point_cast<seconds>(mp); // OK

  std::cout << sp.time_since_epoch().count() << std::endl;
}
```
* time_point[link time_point.md]
* system_clock[link system_clock.md]
* time_point_cast[color ff0000]
* time_since_epoch()[link time_point/time_since_epoch.md]
* count()[link duration/count.md]

### 出力
```
1
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 関連項目

| 名前 | 説明 |
|------|------|
| [`floor`](time_point/floor.md) | 負の無限大方向への丸め |
| [`ceil`](time_point/ceil.md)   | 正の無限大方向への丸め |
| [`round`](time_point/round.md) | 偶数方向への丸め |


## 参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)

