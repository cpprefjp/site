#log10
* cmath[meta header]

```cpp
namespace std {
  float log10(float x);

  double log10(double x);

  long double log10(long double x);

  double log10(Integral x);   // C++11
}
```
* Integral[italic]

##概要
10 を底とする常用対数を求める。


##戻り値
引数 `x` の 10 を底とする常用対数を返す。

`x` が 0 だった場合 `-∞` を返す。

`x < 0` だった場合 `NaN` を返す。

`x` が `+∞` だった場合 `+∞` を返す。



##備考
![](https://github.com/cpprefjp/image/raw/master/reference/cmath/log10/log10.png)


##例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "log10(0.0)  = " << std::log10(0.0) << std::endl;
  std::cout << "log10(10)   = " << std::log10(10) << std::endl;
  std::cout << "log10(+∞)  = " << std::log10(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "log10(-1.0) = " << std::log10(-1.0) << std::endl;
}
```

###出力
```
log10(0.0)  = -inf
log10(10)   = 1.000000
log10(+∞)  = inf
log10(-1.0) = nan
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
[`log`](./log.md) があれば、以下のように変換することで求められる。

![](https://github.com/cpprefjp/image/raw/master/reference/cmath/log10/log10_formula.png)

