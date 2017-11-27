# ratio_not_equal
* ratio[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class R1, class R2>
  struct ratio_not_equal;

  template <class R1, class R2>
  constexpr bool ratio_not_equal_v
    = ratio_not_equal<R1, R2>::value; // C++17
}
```

## 概要
`ratio_not_equal`は、2つの[`ratio`](ratio.md)が等値でないかを判定するクラステンプレートである。


## 効果
`ratio_not_equal`は、[`ratio_equal`](ratio_equal.md)`<R1, R2>::value == false`であれば[`true_type`](/reference/type_traits/true_type.md)から派生し、そうでなければ[`false_type`](/reference/type_traits/false_type.md)から派生する。


## 例
```cpp example
#include <ratio>

int main()
{
  using r1 = std::ratio<2, 5>;
  using r2 = std::ratio<3, 5>;

  static_assert(std::ratio_not_equal<r1, r2>::value == true, "r1 != r2");
}
```
* std::ratio_not_equal[color ff0000]
* std::ratio[link ratio.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
