# operator<=>
* chrono[meta header]
* std::chrono[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::chrono {
  template <class Clock, class Duration1,
    three_way_comparable_with<Duration1> Duration2>
  constexpr auto
    operator<=>(const time_point<Clock, Duration1>& lhs,
                const time_point<Clock, Duration2>& rhs); // (1) C++20
}
```
* time_point[link /reference/chrono/time_point.md]

## 概要
三方比較を行う


## 戻り値
```cpp
return lhs.time_since_epoch() <=> rhs.time_since_poch();
```
* time_since_epoch[link /reference/chrono/time_point/time_since_epoch.md]


## 例
```cpp example
#include <cassert>
#include <chrono>

using namespace std::chrono;

int main()
{
  time_point<system_clock> tp1{ seconds{3} };
  time_point<system_clock> tp2{ seconds{3} };
  time_point<system_clock> tp3{ seconds{4} };

  assert((tp1 <=> tp2) == 0);
  assert((tp1 <=> tp3) != 0);
}
```
* system_clock[link /reference/chrono/system_clock.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
