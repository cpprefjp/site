#ratio_less (C++11)
* ratio[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class R1, class R2>
  struct ratio_less;
}
```

##概要
`ratio_less`は、2つの[`ratio`](./ratio.md)において、左辺が右辺より小さいかを判定するクラステンプレートである。


##効果
`ratio_less`は、`R1::num * R2::den < R2::num * R1::den`であれば[`true_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生する。

実装によっては、演算アルゴリズムによってオーバーフローが起こる可能性がある。オーバーフローが起こった場合、プログラムは不適格となる。


##例
```cpp
#include <ratio>

int main()
{
  using r1 = std::ratio<2, 5>;
  using r2 = std::ratio<3, 5>;

  static_assert(std::ratio_less<r1, r2>::value == true, "r1 < r2");
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7
- [Visual C++](/implementation.md#visual_cpp): ??


