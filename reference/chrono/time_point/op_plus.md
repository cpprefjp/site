# operator+
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  template <class Clock, class Duration1, class Rep2, class Period2>
  time_point<Clock, typename common_type<Duration1, duration<Rep2, Period2>>::type>
    operator+(const time_point<Clock, Duration1>& lhs,
              const duration<Rep2, Period2>& rhs);      // (1) C++11

  template <class Clock, class Duration1, class Rep2, class Period2>
  constexpr time_point<Clock, typename common_type<Duration1, duration<Rep2, Period2>>::type>
    operator+(const time_point<Clock, Duration1>& lhs,
              const duration<Rep2, Period2>& rhs);      // (1) C++14

  template <class Rep1, class Period1, class Clock, class Duration2>
  time_point<Clock, typename common_type<duration<Rep1, Period1>, Duration2>::type>
    operator+(const duration<Rep1, Period1>& lhs,
              const time_point<Clock, Duration2>& rhs); // (2) C++11

  template <class Rep1, class Period1, class Clock, class Duration2>
  constexpr time_point<Clock, typename common_type<duration<Rep1, Period1>, Duration2>::type>
    operator+(const duration<Rep1, Period1>& lhs,
              const time_point<Clock, Duration2>& rhs); // (2) C++14
}}
```
* common_type[link /reference/chrono/common_type.md]

## 概要
`time_point`に時間間隔の加算を行う。


## 戻り値
- (1)

```cpp
using ct = time_point<Clock, common_type<decltype(lhs), decltype(rhs)>>;
return ct(lhs) += rhs;
```
* common_type[link /reference/chrono/common_type.md]

- (2)

```cpp
return rhs + lhs;
```


## 例
```cpp example
#include <iostream>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  using time_point = chrono::system_clock::time_point;

  time_point tp1 = time_point{} + chrono::seconds{3}; // エポックに3秒を加算
  auto sec1 = chrono::duration_cast<chrono::seconds>(tp1.time_since_epoch());
  std::cout << sec1.count() << std::endl;

  time_point tp2 = chrono::seconds{3} + time_point{};
  auto sec2 = chrono::duration_cast<chrono::seconds>(tp2.time_since_epoch());
  std::cout << sec2.count() << std::endl;
}
```
* count()[link /reference/chrono/duration/count.md]
* chrono::system_clock[link /reference/chrono/system_clock.md]
* time_since_epoch()[link time_since_epoch.md]

### 出力
```
3
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified]
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]

## 参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)

