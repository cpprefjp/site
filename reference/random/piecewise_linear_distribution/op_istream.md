#operator>>
* random[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class CharT, class Traits, class RealType>
  basic_istream<CharT, Traits>& operator>>(
    basic_istream<CharT, Traits>& os
    piecewise_linear_distribution<RealType>& x);
}
```
* basic_istream[link /reference/istream/basic_istream.md]

##概要
ストリームからの入力を行う。


##効果
分布オブジェクトのパラメータを読み取り、オブジェクト`x`に格納する。  
不正な入力だった場合、`is.setstate(ios::failbit)`を呼び出し、ストリームを失敗状態にする。


##事後条件
`is`のフォーマットフラグが、この関数を呼び出す前の状態に戻ること。


##戻り値
`is`


##例
```cpp
#include <iostream>
#include <sstream>
#include <cassert>
#include <random>
#include <array>

int main()
{
  std::stringstream ss;

  // ストリームへ出力
  {
    std::array<double, 3> intervals = {0.0, 5.0, 10.0};
    std::array<double, 3> densities = {0.0, 0.5,  0.1};

    std::piecewise_linear_distribution<> dist(
      intervals.begin(),
      intervals.end(),
      densities.begin()
    );

    ss << dist;
  }

  // 出力結果を確認
  std::cout << ss.str() << std::endl;

  // 出力したストリームから読み込む
  {
    std::piecewise_linear_distribution<> dist;
    ss >> dist;

    assert(ss);
  }
}
```
* assert[link /reference/cassert/assert.md]

###出力例
```
2 0.00000000000000000e+00 5.00000000000000000e+00 1.00000000000000000e+01 0.00000000000000000e+00 1.81818181818181823e-01 3.63636363636363688e-02
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


