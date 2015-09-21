#asin
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float asin(float x);

  double asin(double x);

  long double asin(long double x);

  double asin(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の逆正弦（アークサイン、arc sine）を求める。


##戻り値
引数 `x` の逆正弦を `[-π/2; π/2]` の範囲で返す。`x` が `[-1.0; 1.0]` の範囲外だった場合 `NaN` を返す。


##備考
$$ f(x) = \sin^{-1} x $$


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  static const double pi = 3.14159265358979265358979;
  std::cout << std::fixed;
  std::cout << "asin(0.0)   = " << std::asin(0.0) << std::endl;
  std::cout << "asin(0.5)   = " << std::asin(0.5) << std::endl;
  std::cout << "asin(1/√2) = " << std::asin(1/std::sqrt(2)) << std::endl;
  std::cout << "asin(√3/2) = " << std::asin(std::sqrt(3)/2) << std::endl;
  std::cout << "asin(1.0)   = " << std::asin(1.0) << std::endl;
}
```

###出力
```
asin(0.0)   = 0.000000
asin(0.5)   = 0.523599
asin(1/√2) = 0.785398
asin(√3/2) = 1.047198
asin(1.0)   = 1.570796
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

$$ \sin^{-1} x = \sum_{n = 0}^{\infty} \frac{(2n)!}{4^n (n!)^2 (2n+1)} x^{2n + 1} \quad \mathrm{for} \; |x| < 1 $$


$|x| \rightarrow 1$ 近傍の精度低下する領域（特に $1 / \sqrt{2} < |x| < 1$）においては、以下の公式による変換で精度向上を図れる。

$$ \sin^{-1} x = \frac{\pi}{2} - \sin^{-1}\sqrt{1 - x^2} \quad \mathrm{for} \; |x| < 1 $$
