#sqrt
```cpp
namespace std {
  float sqrt(float x);

  double sqrt(double x);

  long double sqrt(long double x);

  double sqrt(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の平方根を求める。


##戻り値
引数 `x` の正の平方根を返す。
`x < 0` だった場合 `NaN` を返す。
`x` が `+∞` だった場合 `+∞` を返す。


##備考
![](https://github.com/cpprefjp/image/raw/master/reference/cmath/sqrt/sqrt.png)


##例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "sqrt(0.0)  = " << std::sqrt(0.0) << std::endl;
  std::cout << "sqrt(0.5)  = " << std::sqrt(0.5) << std::endl;
  std::cout << "sqrt(1.0)  = " << std::sqrt(1.0) << std::endl;
  std::cout << "sqrt(2.0)  = " << std::sqrt(2.0) << std::endl;
  std::cout << "sqrt(4.0)  = " << std::sqrt(4.0) << std::endl;
  std::cout << "sqrt(+∞)  = "
            << std::sqrt(std::numeric_limits<double>::infinity())
            << std::endl;
  std::cout << "sqrt(-1.0) = " << std::sqrt(-1.0) << std::endl;
}
```

###出力
```
sqrt(0.0)  = 0.000000
sqrt(0.5)  = 0.707107
sqrt(1.0)  = 1.000000
sqrt(2.0)  = 1.414214
sqrt(4.0)  = 2.000000
sqrt(+∞)  = inf
sqrt(-1.0) = -nan
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
ニュートン法によって漸化式の反復から近似的に求めることができる。

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/sqrt/sqrt_formula.png)

ただし `x` は引数、`a` の初期値は適当な値を選ぶものとする。

