#operator<< (C++11)
```cpp
namespace std {
  template <class CharT, class Traits, class RealType>
  basic_ostream<CharT, Traits>& operator<<(
    basic_ostream<CharT, Traits>& os
    const weibull_distribution<RealType>& x);
}
```
* basic_ostream[link /reference/iostream/basic_ostream.md]

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

int main()
{
  std::weibull_distribution<> dist(1.0, 1.0);
  std::cout << dist << std::endl;
}
```

###出力例
```
1.00000000000000000e+00 1.00000000000000000e+00
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


