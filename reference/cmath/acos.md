#acos
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float acos(float x);

  double acos(double x);

  long double acos(long double x);

  double acos(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の逆余弦（アークコサイン、arc cosine）を求める。


##戻り値
引数 `x` の逆余弦を主値 `[0, π]` の範囲で返す。

`x` が `[-1.0, 1.0]` の範囲外だった場合 `NaN` を返す。


##備考
$$ f(x) = \cos^{-1} x $$


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "acos(0.0)   = " << std::acos(0.0) << std::endl;
  std::cout << "acos(0.5)   = " << std::acos(0.5) << std::endl;
  std::cout << "acos(1/√2) = " << std::acos(1/std::sqrt(2)) << std::endl;
  std::cout << "acos(√3/2) = " << std::acos(std::sqrt(3)/2) << std::endl;
  std::cout << "acos(1.0)   = " << std::acos(1.0) << std::endl;
}
```

###出力
```
acos(0.0)   = 1.570796
acos(0.5)   = 1.047198
acos(1/√2) = 0.785398
acos(√3/2) = 0.523599
acos(1.0)   = 0.000000
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

$$ \cos^{-1} x = \frac{\pi}{2} - \sum_{n = 0}^{\infty}\frac{\left(2n\right)!}{4^n\left(n!\right)^2\left(2n + 1\right)}x^{2n+1} \quad \mathrm{for} \; |x| < 1 $$


また、逆正接関数と逆余接関数の和は π / 2 なので `asin` から求めることができる。

$$ \cos^{-1} x = \frac{\pi}{2} - \sin^{-1} x \quad \mathrm{for} \; |x| < 1 $$
