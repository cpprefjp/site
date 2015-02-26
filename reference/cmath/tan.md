#tan
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  float tan(float x);

  double tan(double x);

  long double tan(long double x);

  double tan(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の正接（タンジェント）を求める。


##戻り値
引数 `x` の正接を返す(`x`の単位はラジアン)。`x` が `±∞` だった場合 `NaN` を返す。


##備考
![](https://raw.github.com/cpprefjp/image/master/reference/cmath/tan/tan.png)


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  static const double pi = 3.14159265358979265358979;
  std::cout << std::fixed;
  std::cout << "tan(0.0)  = " << std::tan(0.0) << std::endl;
  std::cout << "tan(pi/6) = " << std::tan(pi/6) << std::endl;
  std::cout << "tan(pi/4) = " << std::tan(pi/4) << std::endl;
  std::cout << "tan(pi/3) = " << std::tan(pi/3) << std::endl;
  std::cout << "tan(pi/2) = " << std::tan(pi/2) << std::endl;
}
```

###出力
```
tan(0.0)  = 0.000000
tan(pi/6) = 0.577350
tan(pi/4) = 1.000000
tan(pi/3) = 1.732051
tan(pi/2) = 3530114321217157.500000
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
`tan` のマクローリン展開はベルヌーイ数が登場するため計算には向かない。

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/tan/tan_mac.png)

以下の公式から求めることができる。

![](https://raw.github.com/cpprefjp/image/master/reference/cmath/tan/tan_formula.png)


