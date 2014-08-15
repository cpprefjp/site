#ratio_add (C++11)
```cpp
namespace std {
  template <class R1, class R2>
  using ratio_add = …;
}
```

##概要
`ratio_add`は、2つの[`ratio`](./ratio.md)を加算した[`ratio`](./ratio.md)型を作るエイリアステンプレートである。


##効果
加算結果は、[`ratio`](./ratio.md)`<R1::num * R2::den + R2::num * R1::den, R1::den * R2::den>`という型になる。


##例
```cpp
#include <ratio>

int main()
{
  using r1 = std::ratio<1, 5>;
  using r2 = std::ratio<2, 5>;

  using result = std::ratio_add<r1, r2>;

  static_assert(result::num == 3, "result num is 3");
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


