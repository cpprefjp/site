#operator!=
* random[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class RealType>
  bool operator!=(
    const piecewise_linear_distribution<RealType>& a,
    const piecewise_linear_distribution<RealType>& b);
}
```

##概要
非等値比較を行う。


##戻り値
`!(a == b)`


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
  std::array<double, 3> intervals2 = {0.0, 5.0, 11.0};
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

  if (a != b) {
    std::cout << "not equal" << std::endl;
  }
  else {
    std::cout << "equal" << std::endl;
  }
}
```
* intervals1.begin()[link /reference/array/begin.md]
* intervals1.end()[link /reference/array/end.md]
* intervals2.begin()[link /reference/array/begin.md]
* intervals2.end()[link /reference/array/end.md]
* densities.begin()[link /reference/array/begin.md]

###出力
```
not equal
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


