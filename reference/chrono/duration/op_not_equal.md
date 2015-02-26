#operator!= (C++11)
* chrono[meta header]
* std::chrono[meta namespace]
* duration[meta class]
* function[meta id-type]

```cpp
namespace std {
namespace chrono {
  template <class Rep1, class Period1, class Rep2, class Period2>
  constexpr bool operator!=(const duration<Rep1, Period1>& lhs,
                            const duration<Rep2, Period2>& rhs);
}}
```
* duration[link /reference/chrono/duration.md]

##概要
非等値の判定を行う


##戻り値
`!(lhs == rhs)`


##例
```cpp
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  const bool result = seconds(3) != seconds(2);
  assert(result);
}
```
* seconds(3) != seconds(2)[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1


##参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)

