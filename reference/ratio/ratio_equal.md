#ratio_equal (C++11)
* ratio[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class R1, class R2>
  struct ratio_equal;
}
```

##概要
`ratio_equal`は、2つの[`ratio`](./ratio.md)が等値かを判定するクラステンプレートである。


##効果
`ratio_equal`は、`R1::num == R2::num`かつ`R1::den == R2::den`であれば[`true_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](/reference/type_traits/integral_constant-true_type-false_type.md)から派生する。


##例
```cpp
#include <ratio>

int main()
{
  using r1 = std::ratio<2, 5>;
  using r2 = std::ratio<2, 5>;

  static_assert(std::ratio_equal<r1, r2>::value == true, "r1 == r2");
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


