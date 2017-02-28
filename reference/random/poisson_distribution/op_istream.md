#operator>>
* random[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class CharT, class Traits, class IntType>
  basic_istream<CharT, Traits>& operator>>(
    basic_istream<CharT, Traits>& os
    poisson_distribution<IntType>& x);
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

int main()
{
  std::stringstream ss;

  // ストリームへ出力
  {
    std::poisson_distribution<> dist(1.0);
    ss << dist;
  }

  // 出力結果を確認
  std::cout << ss.str() << std::endl;

  // 出力したストリームから読み込む
  {
    std::poisson_distribution<> dist;
    ss >> dist;

    assert(ss);
  }
}
```
* std::stringstream[link /reference/sstream/basic_stringstream.md.nolink]
* ss.str()[link /reference/sstream/basic_stringstream/str.md.nolink]

###出力例
```
1.00000000000000000e+00 0.00000000000000000e+00 1.00000000000000000e+00 0
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


