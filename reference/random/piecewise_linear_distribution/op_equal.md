#operator== (C++11)
* random[meta header]

```cpp
namespace std {
  template <class RealType>
  bool operator==(
    const piecewise_linear_distribution<RealType>& a,
    const piecewise_linear_distribution<RealType>& b);
}
```

##概要
等値比較を行う。


##戻り値
`a.`[`param()`](./param.md)` == b.`[`param()`](./param.md)であり、かつ`a(g)`によって生成される値の無限シーケンス`S1`、`b(g)`によって生成される値の無限シーケンス`S2`が等しい場合`true`を返し、そうでなければ`false`を返す。


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <random>
#include <array>

int main()
{
  std::array<double, 3> intervals1 = {0.0, 5.0, 10.0};
  std::array<double, 3> intervals2 = {0.0, 5.0, 10.0};
  std::array<double, 3> densities = {0.0, 0.5,  0.1};

  std::piecewise_linear_distribution<> a(
    intervals1.begin(),
    intervals1.end(),
    densities.begin()
  );

  std::piecewise_linear_distribution<> b(
    intervals2.begin(),
    intervals2.end(),
    densities.begin()
  );

  if (a == b) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```

###出力
```
equal
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


