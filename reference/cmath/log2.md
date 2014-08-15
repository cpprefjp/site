#log2 (C++11)
```cpp
namespace std {
  float log2(float x);

  double log2(double x);

  long double log2(long double x);

  double log2(Integral x);   // C++11
}
```
* Integral[italic]

##概要
2 を底とする二進対数を求める。


##戻り値
引数 `x` の 2 を底とする二進対数を返す。

`x` が 0 だった場合 `-∞` を返す。

`x < 0` だった場合 `NaN` を返す。

`x` が `+∞` だった場合 `+∞` を返す。


##備考
![](https://github.com/cpprefjp/image/raw/master/reference/cmath/log2/log2.png)


##例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "log2(0.0)  = " << std::log2(0.0) << std::endl;
  std::cout << "log2(2)    = " << std::log2(2) << std::endl;
  std::cout << "log2(+∞)  = " << std::log2(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "log2(-1.0) = " << std::log2(-1.0) << std::endl;
}
```

###出力
```
log2(0.0)  = -inf
log2(2)    = 1.000000
log2(+∞)  = inf
log2(-1.0) = nan
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
[`log`](./log.md) があれば、以下のように変換することで求められる。

![](https://github.com/cpprefjp/image/raw/master/reference/cmath/log2/log2_formula.png)

