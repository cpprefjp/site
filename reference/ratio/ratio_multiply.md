#ratio_multiply (C++11)
```cpp
namespace std {
  template <class R1, class R2>
  using ratio_multiply = …;
}
```

##概要
`ratio_multiply`は、左辺の[`ratio`](./ratio.md)と右辺の[`ratio`](./ratio.md)を乗算した[`ratio`](./ratio.md)型を作るエイリアステンプレートである。


##効果
乗算結果は、[`ratio`](./ratio.md)`<R1::num * R2::num, R1::den * R2::den>`という型になる。


##例
```cpp
#include <ratio>

int main()
{
  using r1 = std::ratio<2, 5>;
  using r2 = std::ratio<3, 5>;

  using result = std::ratio_multiply<r1, r2>;

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


