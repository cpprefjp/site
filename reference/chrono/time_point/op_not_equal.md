# operator!=
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
namespace chrono {
  // operator==により、以下の演算子が使用可能になる (C++20)
  template <class Clock, class Duration1, class Duration2>
  bool operator!=(const time_point<Clock, Duration1>& lhs,
                  const time_point<Clock, Duration2>& rhs);           // (1) C++11

  template <class Clock, class Duration1, class Duration2>
  constexpr bool operator!=(const time_point<Clock, Duration1>& lhs,
                            const time_point<Clock, Duration2>& rhs); // (1) C++14
}}
```
* time_point[link /reference/chrono/time_point.md]


## 概要
非等値比較を行う


## 戻り値
```cpp
!(lhs == rhs)
```


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  time_point<system_clock> p1(seconds(2));
  time_point<system_clock> p2(seconds(3));

  const bool result = p1 != p2;
  assert(result);
}
```
* p1 != p2[color ff0000]
* system_clock[link /reference/chrono/system_clock.md]

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
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
