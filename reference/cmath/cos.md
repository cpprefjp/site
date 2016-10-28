#cos
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float cos(float x);

  double cos(double x);

  long double cos(long double x);

  double cos(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の余弦（コサイン）を求める。


##戻り値
引数 `x` の余弦を返す(`x`の単位はラジアン)。`x` が `±∞` だった場合 `NaN` を返す。


##備考
$$ f(x) = \cos x $$


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  static const double pi = 3.141592653589793;
  std::cout << std::fixed;
  std::cout << "cos(0.0)  = " << std::cos(0.0) << std::endl;
  std::cout << "cos(pi/6) = " << std::cos(pi/6) << std::endl;
  std::cout << "cos(pi/4) = " << std::cos(pi/4) << std::endl;
  std::cout << "cos(pi/3) = " << std::cos(pi/3) << std::endl;
  std::cout << "cos(pi/2) = " << std::cos(pi/2) << std::endl;
  std::cout << "cos(pi)   = " << std::cos(pi) << std::endl;
}
```

###出力
```
cos(0.0)  = 1.000000
cos(pi/6) = 0.866025
cos(pi/4) = 0.707107
cos(pi/3) = 0.500000
cos(pi/2) = 0.000000
cos(pi)   = -1.000000
```

##バージョン
###言語
- C++03
- C++11

###処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp) 7.1, 8.0, 9.0, 10.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##実装例
以下のマクローリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ \cos x = \sum_{n = 0}^{\infty} \frac{(-1)^n}{(2n)!} x^{2n} \quad \mathrm{for~all} \; x $$
