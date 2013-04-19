#operator-
```cpp
namespace std {
namespace chrono {
  // duration - duration = duration
  template <class Rep1, class Period1, class Rep2, class Period2>
  typename common_type<duration<Rep1, Period1>, duration<Rep2, Period2>>::type
    constexpr operator-(const duration<Rep1, Period1>& lhs, const duration<Rep2, Period2>& rhs);

  // time_point - duration = time_point
  template <class Clock, class Duration1, class Rep2, class Period2>
  time_point<Clock, typename common_type<Duration1, duration<Rep2, Period2>>::type>
    operator-(const time_point<Clock, Duration1>& lhs, const duration<Rep2, Period2>& rhs);

  // time_point - time_point - duration
  template <class Clock, class Duration1, class Duration2>
  typename common_type<Duration1, Duration2>::type
    operator-(const time_point<Clock, Duration1>& lhs, const time_point<Clock, Duration2>& rhs);
}}
```
* duration[link /reference/chrono/duration.md]
* time_point[link /reference/chrono/time_point.md]

##概要

<b>duration, time_pointの減算を行う</b>
<b></b>


##戻り値

- `operator-(const duration<Rep1, Period1>& lhs, const duration<Rep2, Period2>& rhs)``typedef common_type<decltype(lhs), decltype(rhs)> cd;cd(cd(lhs).[count](/reference/chrono/duration/count.md)() - cd(rhs).[count](/reference/chrono/duration/count.md)())`
- `operator-(const time_point<Clock, Duration1>& lhs, const duration<Rep2, Period2>& rhs)``lhs + (-rhs)`
- `operator-(const time_point<Clock, Duration1>& lhs, const time_point<Clock, Duration2>& rhs)``lhs.[time_since_epoch](/reference/chrono/time_point/time_since_epoch.md)() - rhs.[time_since_epoch](/reference/chrono/time_point/time_since_epoch.md)()`


##例

```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  // durationの減算
  {
    seconds s = seconds(3) - seconds(2);
    std::cout << s.count() << std::endl;

    milliseconds ms = seconds(3) - milliseconds(2);
    std::cout << ms.count() << std::endl;
  }
  std::cout << std::endl;

  // time_pointの減算
  {
    time_point<system_clock> now = system_clock::now();

    time_point<system_clock> p1 = now - seconds(3);
    std::cout << p1.time_since_epoch().count() << std::endl;

    seconds s = duration_cast<seconds>(now - p1);
    std::cout << s.count() << std::endl;
  }
}
```
* -[color ff0000]
* -[color ff0000]
* -[color ff0000]
* -[color ff0000]

###出力例

```cpp
1
2998

1314584313008925
3
```

##バージョン


###言語


- C++11



###処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1

