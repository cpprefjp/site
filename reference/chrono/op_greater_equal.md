#operator>= (C++11)
```cpp
namespace std {
namespace chrono {
  template <class Rep1, class Period1, class Rep2, class Period2>
  constexpr bool operator>=(const duration<Rep1, Period1>& lhs,
                            const duration<Rep2, Period2>& rhs);

  template <class Clock, class Duration1, class Duration2>
  bool operator>=(const time_point<Clock, Duration1>& lhs,
                  const time_point<Clock, Duration2>& rhs);
}}
```
* duration[link /reference/chrono/duration.md]
* time_point[link /reference/chrono/time_point.md]

##概要
左辺が右辺以上かの比較を行う


##戻り値
- `duration`<br/>2つの[`duration`](/reference/chrono/duration.md)の単位を合わせた上で[`count()`](/reference/chrono/duration/count.md)の比較を行う。<br/>`typedef common_type<decltype(lhs), decltype(rhs)>::type ct;`<br/>`ct(lhs).`[`count`](/reference/chrono/duration/count.md)`() >= ct(rhs).`[`count`](/reference/chrono/duration/count.md)`()`
- `time_point`<br/>`lhs.`[`time_since_epoch`](/reference/chrono/time_point/time_since_epoch.md)`() >= rhs.`[`time_since_poch`](/reference/chrono/time_point/time_since_epoch.md)`()`


##例
```cpp
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  // duration同士の比較
  {
    const bool result = seconds(3) >= seconds(3);
    assert(result);
  }

  // time_point同士の比較
  {
    time_point<system_clock> p1(seconds(3));
    time_point<system_clock> p2(seconds(3));

    const bool result = p1 >= p2;
    assert(result);
  }
}
```
* >=[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1<h4></h4>

