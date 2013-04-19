#operator+
```cpp
namespace std {
namespace chrono {
  // duration + duration = duration
  template <class Rep1, class Period1, class Rep2, class Period2>
  typename common_type<duration<Rep1, Period1>, duration<Rep2, Period2>>::type
    constexpr operator+(const duration<Rep1, Period1>& lhs, const duration<Rep2, Period2>& rhs);

  // time_point + duration = time_point
  template <class Clock, class Duration1, class Rep2, class Period2>
  time_point<Clock, typename common_type<Duration1, duration<Rep2, Period2>>::type>
    operator+(const time_point<Clock, Duration1>& lhs, const duration<Rep2, Period2>& rhs);

  // duration + time_point = time_point
  template <class Rep1, class Period1, class Clock, class Duration2>
  time_point<Clock, typename common_type<duration<Rep1, Period1>, Duration2>::type>
    operator+(const duration<Rep1, Period1>& lhs, const time_point<Clock, Duration2>& rhs);
}}
```
* duration[link /reference/chrono/duration.md]
* time_point[link /reference/chrono/time_point.md]

##概要

<b>duration, time_pointの加算を行う</b>
<b></b>


##戻り値

- `operator+(const duration<Rep1, Period1>& lhs, const duration<Rep2, Period2>& rhs)``typedef common_type<decltype(lhs), decltype(rhs)> cd;cd(cd(lhs).count() + cd(rhs).count())`
- `operator+(const time_point<Clock, Duration1>& lhs, const duration<Rep2, Period2>& rhs)``typedef time_point<Clock, common_type<decltype(lhs), decltype(rhs)>> ct;ct(lhs) += rhs`
- `operator+(const duration<Rep1, Period1>& lhs, const time_point<Clock, Duration2>& rhs)``rhs + lhs`


##例

```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  // duration同士の演算
  {
    seconds s = seconds(3) + seconds(2);
    std::cout << s.count() << std::endl;

    milliseconds ms = milliseconds(3) + seconds(2);
    std::cout << ms.count() << std::endl;
  }
  std::cout << std::endl;

  // time_pointにdurationを加算
  {
    time_point<system_clock> p1 = time_point<system_clock>() + seconds(3);
    std::cout << p1.time_since_epoch().count() << std::endl;

    time_point<system_clock> p2 = seconds(3) + time_point<system_clock>();
    std::cout << p2.time_since_epoch().count() << std::endl;
  }
}
```
* +[color ff0000]
* +[color ff0000]
* +[color ff0000]
* +[color ff0000]

###出力

```cpp
5
2003

3000000
3000000
```

##バージョン


###言語


- C++11



###処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1

