#tan
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float tan(float x);

  double tan(double x);

  long double tan(long double x);

  double tan(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の正接（タンジェント）を求める。


##戻り値
引数 `x` の正接を返す(`x`の単位はラジアン)。`x` が `±∞` だった場合 `NaN` を返す。


##備考
$$ f(x) = \tan x $$


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  static const double pi = 3.141592653589793;
  std::cout << std::fixed;
  std::cout << "tan(0.0)  = " << std::tan(0.0) << std::endl;
  std::cout << "tan(pi/6) = " << std::tan(pi/6) << std::endl;
  std::cout << "tan(pi/4) = " << std::tan(pi/4) << std::endl;
  std::cout << "tan(pi/3) = " << std::tan(pi/3) << std::endl;
  std::cout << "tan(pi/2) = " << std::tan(pi/2) << std::endl;
}
```

###出力
```
tan(0.0)  = 0.000000
tan(pi/6) = 0.577350
tan(pi/4) = 1.000000
tan(pi/3) = 1.732051
tan(pi/2) = 16331239353195370.000000
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
`tan` のマクローリン展開はベルヌーイ数が登場するため計算には向かない。

$$ \tan x = \sum_{n = 1}^{\infty} \frac{B_{2n}(-4)^n(1-4^n)}{(2n)!} x^{2n - 1} \quad \mathrm{for} \; |x| < \frac{\pi}{2} $$

以下の公式から求めることができる。

$$ \tan x = \frac{\sin x}{\cos x} $$
