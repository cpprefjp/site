# operator==
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  template <class Clock, class Duration1, class Duration2>
  bool operator==(const time_point<Clock, Duration1>& lhs,
                  const time_point<Clock, Duration2>& rhs);           // C++11

  template <class Clock, class Duration1, class Duration2>
  constexpr bool operator==(const time_point<Clock, Duration1>& lhs,
                            const time_point<Clock, Duration2>& rhs); // C++14
}}
```
* time_point[link /reference/chrono/time_point.md]

## 概要
�値比較を行う


## 戻り値
```cpp
return lhs.time_since_epoch() == rhs.time_since_poch();
```
* time_since_epoch[link /reference/chrono/time_point/time_since_epoch.md]


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  seconds s(3);

  time_point<system_clock> p1(s);
  time_point<system_clock> p2(s);

  const bool result = p1 == p2;
  assert(result);
}
```
* p1 == p2[color ff0000]
* system_clock[link /reference/chrono/system_clock.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015

## 参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)

