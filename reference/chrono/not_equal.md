#operator!=
```cpp
namespace std {
namespace chrono {
  template <class Rep1, class Period1, class Rep2, class Period2>
  constexpr bool operator!=(const duration<Rep1, Period1>& lhs,
                            const duration<Rep2, Period2>& rhs);
```
* duration[link /reference/chrono/duration.md]

  template <class Clock, class Duration1, class Duration2>
  bool operator!=(const [time_point](/reference/chrono/time_point.md)<Clock, Duration1>& lhs,
                  const [time_point](/reference/chrono/time_point.md)<Clock, Duration2>& rhs);
}}





##概要

<b>非等値の判定を行う</b>


##戻り値

`!(lhs == rhs)`

##例

```cpp
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  // duration同士の比較
  {
    const bool result = seconds(3) != seconds(3);
    assert(!result);
  }

  // time_point同士の比較
  {
    seconds s(3);

    time_point<system_clock> p1(s);
    time_point<system_clock> p2(s);

    const bool result = p1 != p2;
    assert(!result);
  }
}
```
* !=[color ff0000]
* !=[color ff0000]

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1<h4></h4>

