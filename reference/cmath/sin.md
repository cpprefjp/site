#sin
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  float sin(float x);

  double sin(double x);

  long double sin(long double x);

  double sin(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の正弦（サイン）を求める。


##戻り値
引数 `x` の正弦を返す(`x`の単位はラジアン)。`x` が `±∞` だった場合 `NaN` を返す。


##備考
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/sin/sin.png)


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  static const double pi = 3.14159265358979265358979;
  std::cout << std::fixed;
  std::cout << "sin(0.0)  = " << std::sin(0.0) << std::endl;
  std::cout << "sin(pi/6) = " << std::sin(pi/6) << std::endl;
  std::cout << "sin(pi/4) = " << std::sin(pi/4) << std::endl;
  std::cout << "sin(pi/3) = " << std::sin(pi/3) << std::endl;
  std::cout << "sin(pi/2) = " << std::sin(pi/2) << std::endl;
  std::cout << "sin(pi)   = " << std::sin(pi) << std::endl;
}
```

###出力
```
sin(0.0)  = 0.000000
sin(pi/6) = 0.500000
sin(pi/4) = 0.707107
sin(pi/3) = 0.866025
sin(pi/2) = 1.000000
sin(pi)   = 0.000000
```

##バージョン
###言語
- C++03
- C++11

###処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp) 7.1, 8.0, 9.0, 10.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）
- GCC 4.6.1 以上


##実装例
マクローリン展開によって近似的に求めることができる。

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/sin/sin_mac.png)

