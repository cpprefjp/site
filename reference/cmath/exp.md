#exp
```cpp
namespace std {  float exp(float x);  double exp(double x);  long double exp(long double x);  template<class Integral>  double exp(Integral x);   // C++11}
```

##概要

<b>e (ネイピア数) を底とする指数関数を求める。</b>


##戻り値

e (ネイピア数) の x 乗を返す。

x が +∞ だった場合 +∞ を返す。
x が -∞ だった場合 0 を返す。


##備考

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/exp/exp.png)



##例

```cpp
#include <cmath>#include <limits>#include <iostream>int main() {  std::cout << std::fixed;  std::cout << "exp(0.0) = " << std::exp(0.0) << std::endl;  std::cout << "exp(1.0) = " << std::exp(1.0) << std::endl;  std::cout << "exp(+∞) = " << std::exp(std::numeric_limits<double>::infinity()) << std::endl;  std::cout << "exp(-∞) = " << std::exp(-std::numeric_limits<double>::infinity()) << std::endl;}
```

###出力

```cpp
exp(0.0) = 1.000000exp(1.0) = 2.718282exp(+∞) = infexp(-∞) = 0.000000
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
- [Visual C++](/implementation#visual_cpp.md) 7.1, 8.0, 9.0, 10.0<h4>備考</h4>
特定の環境で constexpr 指定されている場合がある。（独自拡張）
- GCC 4.6.1 以上



##実装例

マクローリン展開によって近似的に求めることができる。![](https://raw.github.com/cpprefjp/image/master/reference/cmath/exp/exp_mac.png)

