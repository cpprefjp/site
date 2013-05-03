#atan
```cpp
namespace std {  float atan(float x);  double atan(double x);  long double atan(long double x);  template<class Integral>  double atan(Integral x);   // C++11}
```

##概要

<b>算術型の逆正接（アークタンジェント）を求める。</b>


##戻り値

引数 x の逆正接を [-π/2; π/2] の範囲で返す。


##備考

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/atan/atan.png)



##例

```cpp
#include <cmath>#include <iostream>int main() {  static const double pi = 3.14159265358979265358979;  std::cout << std::fixed;  std::cout << "atan(0.0)   = " << std::atan(0.0) << std::endl;  std::cout << "atan(0.5)   = " << std::atan(0.5) << std::endl;  std::cout << "atan(1/√2) = " << std::atan(1/std::sqrt(2)) << std::endl;  std::cout << "atan(√3/2) = " << std::atan(std::sqrt(3)/2) << std::endl;  std::cout << "atan(1.0)   = " << std::atan(1.0) << std::endl;  std::cout << "atan(∞)    = " << std::atan(INFINITY) << std::endl;}
```

###出力

```cpp
atan(0.0)   = 0.000000atan(0.5)   = 0.463648atan(1/√2) = 0.615480atan(√3/2) = 0.713724atan(1.0)   = 0.785398atan(∞)    = 1.570796
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
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/atan/atan_mac.png)

|x| >= 1 の範囲、および |x| → 1 近傍の精度低下する領域においては、以下の公式による変換で求めることができる。

（特に √2+1 < |x| の場合）

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/atan/atan_formula_1.png)

（特に √2-1 < |x| <= √2+1 の場合）
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/atan/atan_formula_2.png)

