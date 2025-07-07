# synth-three-way-result
* exposition-only[meta header]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto synth-three-way =                           // (1) C++20
  []<class T, class U>(const T& t, const U& u)
    requires requires {
      { t < u } -> boolean-testable ;
      { u < t } -> boolean-testable ;
    }
  {
    if constexpr (three_way_comparable_with<T, U>) {
      return t <=> u;
    } else {
      if (t < u) return weak_ordering::less;
      if (u < t) return weak_ordering::greater;
      return weak_ordering::equivalent;
   }
};

template <class T, class U=T>
using synth-three-way-result =
  decltype(synth-three-way(declval<T&>(), declval<U&>())); // (2) C++20
```
* synth-three-way-result[italic]
* synth-three-way[italic]
* boolean-testable[link /reference/concepts/boolean-testable.md]
* weak_ordering[link /reference/compare/weak_ordering.md]

## 概要
- (1) : 型`T`と型`U`が三方比較可能であればそれを行い、そうでなければ[`weak_ordering`](/reference/compare/weak_ordering.md)として三方比較を実装して関数オブジェクト
- (2) : `synth-three-way-result`での比較結果の型


## バージョン
### 言語
- C++20

## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
