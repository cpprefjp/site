#exp2 (C++11)
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float exp2(float x);

  double exp2(double x);

  long double exp2(long double x);

  double exp2(Integral x);   // C++11
}
```
* Integral[italic]

##概要
2 を底とする指数関数を求める。


##戻り値
2 の `x` 乗を返す。

`x` が `+∞` だった場合 `+∞` を返す。

`x` が `-∞` だった場合 0 を返す。


##備考
$$ f(x) = 2^x $$


##例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "exp2(0.0) = " << std::exp2(0.0) << std::endl;
  std::cout << "exp2(1.0) = " << std::exp2(1.0) << std::endl;
  std::cout << "exp2(+∞) = " << std::exp2(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "exp2(-∞) = " << std::exp2(-std::numeric_limits<double>::infinity()) << std::endl;
}
```

###出力
```
exp2(0.0) = 1.000000
exp2(1.0) = 2.000000
exp2(+∞) = inf
exp2(-∞) = 0.000000
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
`exp` があれば、以下のように変換することで求められる。

$$ 2^x = e^{x \log_e 2} \quad \mathrm{for~all} \; x $$
