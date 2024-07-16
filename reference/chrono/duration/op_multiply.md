# operator*
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  // duration * N = duration
  template <class Rep1, class Period, class Rep2>
  duration<typename common_type<Rep1, Rep2>::type, Period>
    constexpr operator*(const duration<Rep1, Period>& d, const Rep2& s); // (1)

  // N * duration = duration
  template <class Rep1, class Rep2, class Period>
  duration<typename common_type<Rep1, Rep2>::type, Period>
    constexpr operator*(const Rep1& s, const duration<Rep2, Period>& d); // (2)
}}
```
* common_type[link /reference/type_traits/common_type.md]

## 概要
durationの乗算を行う


## テンプレートパラメータ制約
- (1) : [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const Rep2&,` [`common_type_t`](/reference/type_traits/common_type.md)`<Rep1, Rep2>>`が`true`であること
- (2) : [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const Rep1&,` [`common_type_t`](/reference/type_traits/common_type.md)`<Rep1, Rep2>>`が`true`であること


## 戻り値
```cpp
using cd = duration<typename common_type<Rep1, Rep2>::type, Period>;
return cd(cd(d).count() * s);
```
* common_type[link /reference/type_traits/common_type.md]
* count[link /reference/chrono/duration/count.md]

## 例
```cpp example
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
* count()[link count.md]

### 出力
```
6
6
6
6
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [P2117R0 C++ Standard Library Issues Resolved Directly In Prague](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2117r0.html)
