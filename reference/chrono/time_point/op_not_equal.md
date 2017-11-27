# operator!=
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  template <class Clock, class Duration1, class Duration2>
  bool operator!=(const time_point<Clock, Duration1>& lhs,
                  const time_point<Clock, Duration2>& rhs);           // C++11

  template <class Clock, class Duration1, class Duration2>
  constexpr bool operator!=(const time_point<Clock, Duration1>& lhs,
                            const time_point<Clock, Duration2>& rhs); // C++14
}}
```
* time_point[link /reference/chrono/time_point.md]


## 概要
非等値の判定を行う


## 戻り値
```cpp
!(lhs == rhs)
```


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  time_point<system_clock> p1(seconds(2));
  time_point<system_clock> p2(seconds(3));

  const bool result = p1 != p2;
  assert(result);
}
```
* p1 != p2[color ff0000]
* system_clock[link /reference/chrono/system_clock.md]
* seconds[link /reference/chrono/seconds.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0, 14.0

## 参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)

