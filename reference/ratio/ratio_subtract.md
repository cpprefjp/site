#ratio_subtract
* ratio[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class R1, class R2>
  using ratio_subtract = …;
}
```

##概要
`ratio_subtract`は、左辺の[`ratio`](ratio.md)から右辺の[`ratio`](ratio.md)を減算した[`ratio`](ratio.md)型を作るエイリアステンプレートである。


##効果
減算結果は、[`ratio`](ratio.md)`<R1::num * R2::den - R2::num * R1::den, R1::den * R2::den>`という型になる。


##例
```cpp
#include <ratio>

int main()
{
  using r1 = std::ratio<3, 5>;
  using r2 = std::ratio<2, 5>;

  using result = std::ratio_subtract<r1, r2>;

  static_assert(result::num == 1, "result num is 1");
  static_assert(result::den == 5, "result den is 5");
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
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.4
- [Visual C++](/implementation.md#visual_cpp): ??


