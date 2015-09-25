#atanh
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float atanh(float x);

  double atanh(double x);

  long double atanh(long double x);

  double atanh(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の逆双曲線正接（アークハイパボリックタンジェント）を求める。


##戻り値
引数 `x` の逆双曲線正接を返す。

`x` が `±1` だった場合 `±∞` を返す。

`|x| > 1` だった場合 `NaN` を返す。


##備考
$$ f(x) = \tanh^{-1} x $$


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "atanh(-1.0) = " << std::atanh(-1.0) << std::endl;
  std::cout << "atanh(-0.5) = " << std::atanh(-0.5) << std::endl;
  std::cout << "atanh(0.0)  = " << std::atanh(0.0) << std::endl;
  std::cout << "atanh(0.5)  = " << std::atanh(0.5) << std::endl;
  std::cout << "atanh(1.0)  = " << std::atanh(1.0) << std::endl;
}
```

###出力
```
atanh(-1.0) = -inf
atanh(-0.5) = -0.549306
atanh(0.0)  = 0.000000
atanh(0.5)  = 0.549306
atanh(1.0)  = inf
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 2.9, 3.1
- [GCC, C++0x mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##実装例
マクローリン展開によって近似的に求めることができる。

$$ \tanh^{-1} x = \sum_{n = 0}^{\infty} \frac{1}{2n + 1} x^{2n + 1} \quad \mathrm{for} \; |x| < 1 $$


または対数に変換して求めることができる。

$$ \tanh^{-1} x = \frac{1}{2} \log_e \frac{1 + x}{1 - x} \quad \mathrm{for} \; |x| < 1 $$
