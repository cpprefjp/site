#log
```cpp
namespace std {
  float log(float x);

  double log(double x);

  long double log(long double x);

  template<class Integral>
  double log(Integral x);   // C++11
}
```

##概要
`e` (ネイピア数) を底とする自然対数を求める。


##戻り値
引数 `x` の `e` (ネイピア数) を底とする自然対数を返す。

`x` が 0 だった場合 `-∞` を返す。

`x < 0` だった場合 `NaN` を返す。

`x` が `+∞` だった場合 `+∞` を返す。


##備考
![](https://github.com/cpprefjp/image/raw/master/reference/cmath/log/log.png)


##例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  static const double e = 2.718281828459045;
  std::cout << std::fixed;
  std::cout << "log(0.0)  = " << std::log(0.0) << std::endl;
  std::cout << "log(e)    = " << std::log(e) << std::endl;
  std::cout << "log(+∞)  = " << std::log(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "log(-1.0) = " << std::log(-1.0) << std::endl;
}
```

###出力
```
log(0.0)  = -inf
log(e)    = 1.000000
log(+∞)  = inf
log(-1.0) = nan
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
- [Visual C++](/implementation#visual_cpp.md) 7.1, 8.0, 9.0, 10.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）
- GCC 4.6.1 以上


##実装例
マクローリン展開によって近似的に求めることができる。

![](https://github.com/cpprefjp/image/raw/master/reference/cmath/log/log_mac.png)

