#operator== (C++11)
```cpp
namespace std {
namespace chrono {
  template <class Rep1, class Period1, class Rep2, class Period2>
  constexpr bool operator==(const duration<Rep1, Period1>& lhs,
                            const duration<Rep2, Period2>& rhs);      // (1)

  template <class Clock, class Duration1, class Duration2>
  bool operator==(const time_point<Clock, Duration1>& lhs,
                  const time_point<Clock, Duration2>& rhs);           // (2) C++11

  template <class Clock, class Duration1, class Duration2>
  constexpr bool operator==(const time_point<Clock, Duration1>& lhs,
                            const time_point<Clock, Duration2>& rhs); // (2) C++14
}}
```
* duration[link /reference/chrono/duration.md]
* time_point[link /reference/chrono/time_point.md]

##概要
等値比較を行う


##戻り値
- (1) : `duration`の比較2つの[`duration`](/reference/chrono/duration.md)の単位を合わせた上で[`count()`](/reference/chrono/duration/count.md)の等値比較を行う。

```cpp
typedef common_type<decltype(lhs), decltype(rhs)>::type ct;
return ct(lhs).count() == ct(rhs).count();
```
* common_type[link /reference/type_traits/common_type.md]
* count()[link /reference/chrono/duration/count.md]

- (2) : `time_point`の比較

```cpp
return lhs.time_since_epoch() == rhs.time_since_poch();
```
* time_since_epoch[link /reference/chrono/time_point/time_since_epoch.md]


##例
```cpp
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  // duration同士の比較
  {
    const bool result = seconds(3) == seconds(3);
    assert(result);
  }

  // time_point同士の比較
  {
    seconds s(3);

    time_point<system_clock> p1(s);
    time_point<system_clock> p2(s);

    const bool result = p1 == p2;
    assert(result);
  }
}
```
* ==[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1


##参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)

