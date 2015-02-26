#operator<< (C++11)
* random[meta header]
* std[meta namespace]
* piecewise_constant_distribution[meta class]

```cpp
namespace std {
  template <class CharT, class Traits, class RealType>
  basic_ostream<CharT, Traits>& operator<<(
    basic_ostream<CharT, Traits>& os
    const piecewise_constant_distribution<RealType>& x);
}
```
* basic_ostream[link /reference/ostream/basic_ostream.md]

##概要
ストリームへの出力を行う。


##効果
`os`に対して、分布オブジェクト`x`の現在状態を出力する。


##事後条件
`os`のフォーマットフラグが、この関数を呼び出す前の状態に戻ること。


##戻り値
`os`


##例
```cpp
#include <iostream>
#include <random>
#include <array>

int main()
{
  std::array<double, 3> intervals = {0.0, 0.5, 1.0};
  std::array<double, 2> densities = {0.3, 0.5};

  std::piecewise_constant_distribution<> dist(
    intervals.begin(),
    intervals.end(),
    densities.begin()
  );

  std::cout << dist << std::endl;
}
```

###出力例
```
2 0.00000000000000000e+00 5.00000000000000000e-01 1.00000000000000000e+00 7.49999999999999889e-01 1.25000000000000000e+00
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


