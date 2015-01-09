#operator/ (C++11)
```cpp
namespace std {
namespace chrono {
  // duration / N = duration
  template <class Rep1, class Period, class Rep2>
  constexpr duration<typename common_type<Rep1, Rep2>::type, Period>
    operator/(const duration<Rep1, Period>& d, const Rep2& s);

  // duration / duration = N
  template <class Rep1, class Period1, class Rep2, class Period2>
  constexpr typename common_type<Rep1, Rep2>::type
    operator/(const duration<Rep1, Period1>& lhs, const duration<Rep2, Period2>& rhs);
}}
```
* duration[link ./duration.md]
* common_type[link /reference/type_traits/common_type.md]

##概要
`duration`の除算を行う


##要件
- operator/(const duration<Rep1, Period>& d, const Rep2& s);<br/>右辺の`Rep2`型は、`Rep1`に変換可能でなければならない。変換できない型の場合は、この関数はオーバーロードから除外される。


##戻り値
- `operator/(const duration<Rep1, Period>& d, const Rep2& s);`<br/>`typedef `[`duration`](/reference/chrono/duration.md)`<typename common_type<Rep1, Rep2>::type, Period> cd;`<br/>`cd(cd(d).`[`count`](/reference/chrono/duration/count.md)`() / s)`
- `operator/(const duration<Rep1, Period1>& lhs, const duration<Rep2, Period2>& rhs);`<br/>`typedef typename common_type<Rep1, Rep2>::type cd;`<br/>`cd(lhs).`[`count`](/reference/chrono/duration/count.md)`() / cd(rhs).`[`count`](/reference/chrono/duration/count.md)`()`

##例
```cpp
#include <iostream>
#include <chrono>

using namespace std::chrono;

int main()
{
  // duration / rep
  {
    seconds s = seconds(8) / 2;
    std::cout << s.count() << std::endl;

    milliseconds ms = milliseconds(8) / 2;
    std::cout << ms.count() << std::endl;
  }

  // duration / duration
  {
    seconds::rep s = seconds(8) / seconds(2);
    std::cout << s << std::endl;

    milliseconds::rep ms = milliseconds(8) / milliseconds(2);
    std::cout << ms << std::endl;
  }
}
```

###出力
```
4
4
4
4
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1<h4></h4>

