#operator*
* chrono[meta header]
* std::chrono[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  // duration * N = duration
  template <class Rep1, class Period, class Rep2>
  duration<typename common_type<Rep1, Rep2>::type, Period>
    constexpr operator*(const duration<Rep1, Period>& d, const Rep2& s);

  // N * duration = duration
  template <class Rep1, class Rep2, class Period>
  duration<typename common_type<Rep1, Rep2>::type, Period>
    constexpr operator*(const Rep1& s, const duration<Rep2, Period>& d);
}}
```
* duration[link /reference/chrono/duration.md]
* common_type[link /reference/type_traits/common_type.md]

##概要
durationの乗算を行う


##要件
右辺の`Rep2`型は、`Rep1`に変換可能でなければならない。

変換できない型の場合は、この関数はオーバーロードから除外される。


##戻り値
```cpp
typedef duration<typename common_type<Rep1, Rep2>::type, Period> cd;
return cd(cd(d).count() * s);
```
* duration[link /reference/chrono/duration.md]
* common_type[link /reference/type_traits/common_type.md]
* count[link /reference/chrono/duration/count.md]

##例
```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  // duration * rep
  {
    seconds s = seconds(3) * 2;
    std::cout << s.count() << std::endl;

    milliseconds ms = milliseconds(2) * 3;
    std::cout << ms.count() << std::endl;
  }

  // rep * duration
  {
    seconds s = 2 * seconds(3);
    std::cout << s.count() << std::endl;

    milliseconds ms = 3 * milliseconds(2);
    std::cout << ms.count() << std::endl;
  }
}
```

###出力
```
6
6
6
6
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1

