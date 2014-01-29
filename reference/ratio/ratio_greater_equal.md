#ratio_greater_equal(C++11)
```cpp
namespace std {
  template <class R1, class R2>
  struct ratio_greater_equal;
}
```

##概要
`ratio_greater_equal`は、2つの[`ratio`](./ratio.md)において、左辺が右辺以上かを判定するクラステンプレートである。


##効果
`ratio_greater_equal`は、[`ratio_less`](./ratio_less)`<R1, R2>::value == false`であれば[`true_type`](./integral_constant-true_type-false_type.md)から派生し、そうでなければ[`false_type`](./integral_constant-true_type-false_type.md)から派生する。


##例
```cpp
#include <ratio>

int main()
{
  using r1 = std::ratio<3, 5>;
  using r2 = std::ratio<2, 5>;

  static_assert(std::ratio_greater_equal<r1, r2>::value == true, "r1 > r2");
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation#clang.md): 3.0
- [GCC, C++11 mode](/implementation#gcc.md): 4.4.7
- [Visual C++](/implementation#visual_cpp.md): ??


