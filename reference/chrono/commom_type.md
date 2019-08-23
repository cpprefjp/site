# common_type
* chrono[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Rep1, class Period1, class Rep2, class Period2>
  struct common_type<chrono::duration<Rep1, Period1>, chrono::duration<Rep2, Period2>> {
    using type = chrono::duration<common_type_t<Rep1, Rep2>, Period/*下記参照*/>;                       
  }

  template <class Clock, class Duration1, class Duration2>
  struct common_type<chrono::time_point<Clock, Duration1>, chrono::time_point<Clock, Duration2>> {
    using type = chrono::time_point<Clock, common_type_t<Duration1, Duration2>>;
  }
}
```
* common_type[link /reference/type_traits/common_type.md]

## 概要
- (1) : 2つの[`duration`](duration.md)間の変換可能な共通の型を取得する。
- (2) : 2つの[`time_point`](time_point.md)間の変換可能な共通の型を取得する。

## 効果
- (1) : 数値型`Rep`を`Rep1`と`Rep2`の共通型（`Rep = common_type_t<Rep1, Rep2>`）から  
  周期を表す型`Period`を`Period1`と`Period2`の最大公約数から、それぞれ求めて  
  それらに対する`duration<Rep, Period>`特殊化をメンバ型`type`として定義する。

- (2) : 同じ時計型`Clock`を持ち、時間間隔型`Duration`を`Duration1`と`Duration2`の共通型（`Duration = common_type_t<Duration1, Duration2>`、すなわち(1)で計算）から求めた  
`timepoint<Clock, Duration>`特殊化をメンバ型`type`として定義する。

(1)において新しい周期型[`Period`](/reference/ratio/ratio.md)は、`Period::num`を`Period1​::​num`と`Period2​::​num`の最大公約数から、`Period::den`を`Period1​::​den`と`Period2​::den`の最小公倍数から、それぞれ求めることで構成できる。

## 備考
`common_type`を`duration`および`time_point`について1引数（`common_type_t<duration>`のような形）で呼び出したとき、1つ目の引数を2つ目の引数として(1)および(2)の特殊化が呼び出される（`common_type_t<duration, duration>`の呼び出しになる）。

特に、`common_type_t<duration<Rep, Period>, duration<Rep, Period>>`の呼び出しは、`Rep`の型に変化はないが、新しい`Period`は元の`Period`を約分した形の型になる（例えば、`std::ratio<10, 10> -> std::ratio<1, 1>`のように変換される）。

## 例
```cpp example
#include <iostream>
#include <chrono>

template<class Rep1, class Period1, class Rep2, class Period2>
constexpr auto duraion_plus(const std::chrono::duratio<Rep1, Period1>& d1, const std::chrono::duratio<Rep2, Period2>& d2)
  -> std::common_type_t<std::chrono::duratio<Rep1, Period1>, std::chrono::duratio<Rep2, Period2>>
{
  using common_duration = std::common_type_t<std::chrono::duratio<Rep1, Period1>, std::chrono::duratio<Rep2, Period2>>;
  
  return common_duration(d1) + common_duration(d2);
}

int main()
{
  using namespace std::literals;
  std::cout << duraion_plus(1ms, 10s);
}
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [Visual C++](/implementation.md#visual_cpp): 2012

## 参照
- [P0548R1 common_type and duration](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0548r1.pdf)

## 関連項目
- [common_type](/reference/type_traits/common_type.md)