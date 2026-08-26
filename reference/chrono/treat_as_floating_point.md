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
  inline constexpr bool treat_as_floating_point_v
    = treat_as_floating_point<Rep>::value;        // C++17
}}
```
* is_floating_point[link /reference/type_traits/is_floating_point.md]

## 概要
`treat_as_floating_point`は、テンプレートパラメータ`Rep`が浮動小数点型かを判定する型特性である。

[`duration`](/reference/chrono/duration.md)クラスにおいて、他の[`duration`](/reference/chrono/duration.md)の型から変換可能な型かどうかを判定するために使用される。`treat_as_floating_point<Rep>::value == true`の場合に、`duration`間の暗黙変換が許可される。そうでない場合、暗黙変換できるかは各`duration`の周期に依存する。

この型特性は、型が浮動小数点数型のように振る舞うか、すなわち値同士の除算において許容できる精度の損失で済むかを示すことを意図している。


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
    "duration<double, ratio<1, 30>> > must be floating point"
  );

  // integer Rep
  static_assert(
    !treat_as_floating_point<milliseconds::rep>::value,
    "milliseconds can't become floating point"
  );
}
```
* treat_as_floating_point[color ff0000]
* std::ratio[link /reference/ratio/ratio.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
- [LWG Issue 951. Various threading bugs #1](https://cplusplus.github.io/LWG/issue951)
    - C++11で、`value`が`true`であることが「`Rep`が浮動小数点数型である」ことを意味するのではなく、`duration`間の暗黙変換を許可することを意味すると明確化された。あわせて、この型特性の意図を述べる注記が追加された
