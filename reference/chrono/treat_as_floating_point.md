# treat_as_floating_point
* chrono[meta header]
* std::chrono[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  template <class Rep>
  struct treat_as_floating_point
    : is_floating_point<Rep> { };

  template <class Rep>
  constexpr bool treat_as_floating_point_v
    = treat_as_floating_point<Rep>::value; // C++17
}}
```
* is_floating_point[link /reference/type_traits/is_floating_point.md]

## 概要
`treat_as_floating_point`は、テンプレートパラメータ`Rep`が浮動小数点型かを判定するトレイトである。

[`duration`](/reference/chrono/duration.md)クラスにおいて、他の[`duration`](/reference/chrono/duration.md)の型から変換可能な型かどうかを判定するために使用される。`treat_as_floating_point<Rep>::value == true`の場合に、変換可能である。


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  // floating point Rep
  static_assert(
    treat_as_floating_point<duration<double, std::ratio<1, 30>>::rep>::value,
    "duration<double, ratio<1, 30>> > can't become floating point"
  );

  // integer Rep
  static_assert(
    !treat_as_floating_point<milliseconds::rep>::value,
    "seconds can't become floating point"
  );
}
```
* treat_as_floating_point[color ff0000]
* duration[link duration.md]
* std::ratio[link /reference/ratio/ratio.md]
* milliseconds[link milliseconds.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
