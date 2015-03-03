#operator<< (C++11)
* random[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits>
  basic_ostream<CharT, Traits>& operator<<(
    basic_ostream<CharT, Traits>& os
    const bernoulli_distribution& x);
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

int main()
{
  std::bernoulli_distribution dist(0.3);
  std::cout << dist << std::endl;
}
```

###出力例
```
2.99999999999999989e-01
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


