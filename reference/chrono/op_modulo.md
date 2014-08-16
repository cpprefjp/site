#operator% (C++11)
```cpp
namespace std {
  // duration % N = duration
  template <class Rep1, class Period, class Rep2>
  duration<typename common_type<Rep1, Rep2>::type, Period>
    constexpr operator%(const duration<Rep1, Period>& d, const Rep2& s);

  // duration % duration = duration
  template <class Rep1, class Period1, class Rep2, class Period2>
  typename common_type<duration<Rep1, Period1>, duration<Rep2, Period2>>::type
    constexpr operator%(const duration<Rep1, Period1>& lhs, const duration<Rep2, Period2>& rhs);
}
```
* duration[link /reference/chrono/duration.md]

##概要
durationの剰余演算を行う


##要件
- `operator%(const duration<Rep1, Period>& d, const Rep2& s)`<br/>右辺の`Rep2`型は、`Rep1`に変換可能でなければならない。変換できない型の場合は、この関数はオーバーロードから除外される。


##戻り値
- `operator%(const duration<Rep1, Period>& d, const Rep2& s)`<br/>`typedef `[`duration`](/reference/chrono/duration.md)`<typename common_type<Rep1, Rep2>::type, Period> cd;`<br/>`cd(cd(d).`[`count`](/reference/chrono/duration/count.md)`() % s)`
- `operator%(const duration<Rep1, Period1>& lhs, const duration<Rep2, Period2>& rhs)`<br/>`typedef `[`duration`](/reference/chrono/duration.md)`<typename common_type<Rep1, Rep2>::type, Period> cd;`<br/>`cd(cd(lhs).`[`count`](/reference/chrono/duration/count.md)`() % cd(rhs).`[`count`](/reference/chrono/duration/count.md)`())`


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

