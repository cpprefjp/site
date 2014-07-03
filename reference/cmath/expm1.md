#expm1 (C++11)
```cpp
namespace std {
  float expm1(float x);

  double expm1(double x);

  long double expm1(long double x);

  double expm1(Integral x);
}
```
* Integral[italic]

##概要
`e` (ネイピア数) を底とする指数関数から 1 を引いた値を求める。

引数が 0 近傍において `exp(x)-1` より高精度な計算になる。


##戻り値
- `e` (ネイピア数) の `x` 乗から 1 を引いた値を返す。
- `x` が `+∞` だった場合 `+∞` を返す。
- `x` が `-∞` だった場合 -1 を返す。


##備考
![](https://github.com/cpprefjp/image/raw/master/reference/cmath/expm1/expm1.png)


##例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "expm1(0.0)  = " << std::expm1(0.0) << std::endl;
  std::cout << "expm1(0.01) = " << std::expm1(0.01) << std::endl;
  std::cout << "expm1(1.0)  = " << std::expm1(1.0) << std::endl;
  std::cout << "expm1(+∞)  = " << std::expm1(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "expm1(-∞)  = " << std::expm1(-std::numeric_limits<double>::infinity()) << std::endl;
}
```

###出力
```
expm1(0.0)  = 0.000000
expm1(0.01) = 0.010050
expm1(1.0)  = 1.718282
expm1(+∞)  = inf
expm1(-∞)  = -1.000000
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 2.9, 3.1
- [GCC, C++0x mode](/implementation#gcc.md): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）
- GCC 4.6.1 以上


