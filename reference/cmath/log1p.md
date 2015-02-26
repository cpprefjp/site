#log1p (C++11)
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  float log1p(float x);

  double log1p(double x);

  long double log1p(long double x);

  double log1p(Integral x);   // C++11
}
```
* Integral[italic]

##概要
引数に 1 を足した値の、`e` (ネイピア数) を底とする自然対数を求める。

引数が 0 近傍において `log(1+x)` より高精度な計算になる。


##戻り値
引数 `x` に対して `1+x` の `e` (ネイピア数) を底とする自然対数を返す。

`x` が -1 だった場合 `-∞` を返す。

`x < -1` だった場合 `NaN` を返す。

`x` が `+∞` だった場合 `+∞` を返す。


##備考
![](https://github.com/cpprefjp/image/raw/master/reference/cmath/log1p/log1p.png)


##例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  static const double e = 2.718281828459045;
  std::cout << std::fixed;
  std::cout << "log1p(0.0)  = " << std::log1p(0.0) << std::endl;
  std::cout << "log1p(0.01) = " << std::log1p(0.01) << std::endl;
  std::cout << "log1p(-1.0) = " << std::log1p(-1.0) << std::endl;
  std::cout << "log1p(e-1)  = " << std::log1p(e-1) << std::endl;
  std::cout << "log1p(+∞)  = " << std::log1p(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "log1p(-2.0) = " << std::log1p(-2.0) << std::endl;
}
```

###出力
```
log1p(0.0)  = 0.000000
log1p(0.01) = 0.009950
log1p(-1.0) = -inf
log1p(e-1)  = 1.000000
log1p(+∞)  = inf
log1p(-2.0) = -nan
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


