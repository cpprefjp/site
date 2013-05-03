#sin
```cpp
namespace std {  float sin(float x);  double sin(double x);  long double sin(long double x);  template<class Integral>  double sin(Integral x);   // C++11}
```

##概要

<b>算術型の正弦（サイン）を求める。</b>


##戻り値

引数 x の正弦を返す(xの単位はラジアン)。x が ±∞ だった場合 NaN を返す。


##備考

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/sin/sin.png)



##例

```cpp
#include <cmath>#include <iostream>int main() {  static const double pi = 3.14159265358979265358979;  std::cout << std::fixed;  std::cout << "sin(0.0)  = " << std::sin(0.0) << std::endl;  std::cout << "sin(pi/6) = " << std::sin(pi/6) << std::endl;  std::cout << "sin(pi/4) = " << std::sin(pi/4) << std::endl;  std::cout << "sin(pi/3) = " << std::sin(pi/3) << std::endl;  std::cout << "sin(pi/2) = " << std::sin(pi/2) << std::endl;  std::cout << "sin(pi)   = " << std::sin(pi) << std::endl;}
```

###出力

```cpp
sin(0.0)  = 0.000000sin(pi/6) = 0.500000sin(pi/4) = 0.707107sin(pi/3) = 0.866025sin(pi/2) = 1.000000sin(pi)   = 0.000000
```

##バージョン


###言語


- C++03
- C++11



###処理系

- [Clang](/implementation#clang.md): 1.9, 2.9, 3.1
- [GCC](/implementation#gcc.md): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation#icc.md): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation#visual_cpp.md) 7.1, 8.0, 9.0, 10.0<h4>備考</h4>
特定の環境で constexpr 指定されている場合がある。（独自拡張）
- GCC 4.6.1 以上



##実装例

マクローリン展開によって近似的に求めることができる。
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/sin/sin_mac.png)

