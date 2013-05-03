#asin
```cpp
namespace std {  float asin(float x);  double asin(double x);  long double asin(long double x);  template<class Integral>  double asin(Integral x);   // C++11}
```

##概要

<b>算術型の逆正弦（アークサイン）を求める。</b>


##戻り値

引数 x の逆正弦を [-π/2; π/2] の範囲で返す。x が [-1.0; 1.0] の範囲外だった場合 NaN を返す。


##備考

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/asin/asin.png)



##例

```cpp
#include <cmath>#include <iostream>int main() {  static const double pi = 3.14159265358979265358979;  std::cout << std::fixed;  std::cout << "asin(0.0)   = " << std::asin(0.0) << std::endl;  std::cout << "asin(0.5)   = " << std::asin(0.5) << std::endl;  std::cout << "asin(1/√2) = " << std::asin(1/std::sqrt(2)) << std::endl;  std::cout << "asin(√3/2) = " << std::asin(std::sqrt(3)/2) << std::endl;  std::cout << "asin(1.0)   = " << std::asin(1.0) << std::endl;}
```

###出力

```cpp
asin(0.0)   = 0.000000asin(0.5)   = 0.523599asin(1/√2) = 0.785398asin(√3/2) = 1.047198asin(1.0)   = 1.570796
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
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/asin/asin_mac.png)

|x| → 1 近傍の精度低下する領域（特に 1/√2 < |x| < 1 ）においては、以下の公式による変換で精度向上を図れる。
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/asin/asin_formula.png)


