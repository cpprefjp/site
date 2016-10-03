#acosh
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float acosh(float x);

  double acosh(double x);

  long double acosh(long double x);

  double acosh(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の逆双曲線余弦（エリアハイパボリックコサイン、area hyperbolic cosine）を求める。


##戻り値
引数 `x` の逆双曲線余弦を `[0, +∞]` の範囲で返す。

`x < 1` だった場合 `NaN` を返す。

`x` が `+∞` だった場合 `+∞` を返す。


##備考
$$ f(x) = \cosh^{-1} x $$


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "acosh(1.0) = " << std::acosh(1.0) << std::endl;
  std::cout << "acosh(2.0) = " << std::acosh(2.0) << std::endl;
  std::cout << "acosh(∞)  = " << std::acosh(INFINITY) << std::endl;
}
```

###出力
```
acosh(1.0) = 0.000000
acosh(2.0) = 1.316958
acosh(∞)  = inf
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 2.9, 3.1
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上

##実装例
対数に変換して求めることができる。

$$ \cosh^{-1} x = \log_e \left(x + \sqrt{x^2-1}\right) \quad \mathrm{for} \; 1 < x $$
