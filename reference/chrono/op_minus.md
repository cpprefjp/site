#operator-
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  // duration - duration = duration
  template <class Rep1, class Period1, class Rep2, class Period2>
  constexpr typename common_type<duration<Rep1, Period1>, duration<Rep2, Period2>>::type
    operator-(const duration<Rep1, Period1>& lhs,
              const duration<Rep2, Period2>& rhs);      // (1)

  // time_point - duration = time_point
  template <class Clock, class Duration1, class Rep2, class Period2>
  time_point<Clock, typename common_type<Duration1, duration<Rep2, Period2>>::type>
    operator-(const time_point<Clock, Duration1>& lhs,
              const duration<Rep2, Period2>& rhs);      // (2) C++11

  // time_point - duration = time_point
  template <class Clock, class Duration1, class Rep2, class Period2>
  constexpr time_point<Clock, typename common_type<Duration1, duration<Rep2, Period2>>::type>
    operator-(const time_point<Clock, Duration1>& lhs,
              const duration<Rep2, Period2>& rhs);      // (2) C++14

  // time_point - time_point - duration
  template <class Clock, class Duration1, class Duration2>
  typename common_type<Duration1, Duration2>::type
    operator-(const time_point<Clock, Duration1>& lhs,
              const time_point<Clock, Duration2>& rhs); // (3) C++11

  // time_point - time_point - duration
  template <class Clock, class Duration1, class Duration2>
  constexpr typename common_type<Duration1, Duration2>::type
    operator-(const time_point<Clock, Duration1>& lhs,
              const time_point<Clock, Duration2>& rhs); // (3) C++14
}}
```
* duration[link /reference/chrono/duration.md]
* time_point[link /reference/chrono/time_point.md]
* common_type[link /reference/type_traits/common_type.md]

##概要
`duration`, `time_point`の減算を行う


##戻り値
- (1)

```cpp
typedef common_type<decltype(lhs), decltype(rhs)> cd;
return cd(cd(lhs).count() - cd(rhs).count());
```
* count()[link /reference/chrono/duration/count.md]

- (2)

```cpp
return lhs + (-rhs);
```

- (3)

```cpp
return lhs.time_since_epoch() - rhs.time_since_epoch();
```
* time_since_epoch[link /reference/chrono/time_point/time_since_epoch.md]


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

###出力例
```
1
2998

1314584313008925
3
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1


##参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)

