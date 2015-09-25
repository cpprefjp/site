#ratio_divide
* ratio[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class R1, class R2>
  using ratio_divide = …;
}
```

##概要
`ratio_divide`は、左辺の[`ratio`](./ratio.md)を右辺の[`ratio`](./ratio.md)で除算した[`ratio`](./ratio.md)型を作るエイリアステンプレートである。


##効果
除算結果は、[`ratio`](./ratio.md)`<R1::num * R2::den, R1::den * R2::num>`という型になる。


##例
```cpp
#include <ratio>

int main()
{
  using r1 = std::ratio<2, 5>;
  using r2 = std::ratio<5, 3>;

  using result = std::ratio_divide<r1, r2>;

  static_assert(result::num == 6, "result num is 6");
  static_assert(result::den == 25, "result den is 25");
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


