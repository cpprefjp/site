# ratio_less
* ratio[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class R1, class R2>
  struct ratio_less;

  template <class R1, class R2>
  inline constexpr bool ratio_less_v
    = ratio_less<R1, R2>::value;     // C++17
}
```

## 概要
`ratio_less`は、2つの[`ratio`](ratio.md)において、左辺が右辺より小さいかを判定するクラステンプレートである。


## 効果
`ratio_less`は、`R1::num * R2::den < R2::num * R1::den`であれば[`true_type`](/reference/type_traits/true_type.md)から派生し、そうでなければ[`false_type`](/reference/type_traits/false_type.md)から派生する。

実装によっては、演算アルゴリズムによってオーバーフ�ーが起こる可能性がある。オーバーフ�ーが起こった場合、プ�グラムは不適格となる。


## 例
```cpp example
#include <ratio>

int main()
{
  using r1 = std::ratio<2, 5>;
  using r2 = std::ratio<3, 5>;

  static_assert(std::ratio_less<r1, r2>::value == true, "r1 < r2");
}
```
* std::ratio_less[color ff0000]
* std::ratio[link ratio.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0006R0 Adopt Type Traits Variable Templates from Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0006r0.html)
