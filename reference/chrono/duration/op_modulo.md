#operator% (C++11)
```cpp
namespace std {
  // duration % N = duration
  template <class Rep1, class Period, class Rep2>
  duration<typename common_type<Rep1, Rep2>::type, Period>
    constexpr operator%(const duration<Rep1, Period>& d,
                        const Rep2& s);                      // (1)

  // duration % duration = duration
  template <class Rep1, class Period1, class Rep2, class Period2>
  typename common_type<duration<Rep1, Period1>, duration<Rep2, Period2>>::type
    constexpr operator%(const duration<Rep1, Period1>& lhs,
                        const duration<Rep2, Period2>& rhs); // (2)
}
```
* duration[link /reference/chrono/duration.md]
* common_type[link /reference/type_traits/common_type.md]

##概要
durationの剰余演算を行う


##要件
- (1) : 右辺の`Rep2`型は、`Rep1`に変換可能でなければならない。変換できない型の場合は、この関数はオーバーロードから除外される。


##戻り値
- (1)

```cpp
typedef duration<typename common_type<Rep1, Rep2>::type, Period> cd;
return cd(cd(d).count() % s);
```
* duration[link /reference/chrono/duration.md]
* common_type[link /reference/type_traits/common_type.md]
* count[link /reference/chrono/duration/count.md]

- (2)

```cpp
typedef duration<typename common_type<Rep1, Rep2>::type, Period> cd;
return cd(cd(lhs).count() % cd(rhs).count());
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
  // duration % rep
  {
    seconds s = seconds(8) % 3;
    std::cout << s.count() << std::endl;

    milliseconds ms = milliseconds(8) % 3;
    std::cout << ms.count() << std::endl;
  }

  // duration / duration
  {
    seconds s = seconds(8) % seconds(3);
    std::cout << s.count() << std::endl;

    milliseconds ms = milliseconds(8) % milliseconds(3);
    std::cout << ms.count() << std::endl;
  }
}
```
* %[color ff0000]

###出力
```
2
2
2
2
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1

