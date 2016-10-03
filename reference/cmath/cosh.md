#cosh
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float cosh(float x);

  double cosh(double x);

  long double cosh(long double x);

  double cosh(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の双曲線余弦（ハイパボリックコサイン）を求める。


##戻り値
引数 `x` の双曲線余弦を返す。


##備考
$$ f(x) = \cosh x $$


##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "cosh(-1.0) = " << std::cosh(-1.0) << std::endl;
  std::cout << "cosh(0.0)  = " << std::cosh(0.0) << std::endl;
  std::cout << "cosh(1.0)  = " << std::cosh(1.0) << std::endl;
}
```

###出力
```
cosh(-1.0) = 1.543081
cosh(0.0)  = 1.000000
cosh(1.0)  = 1.543081
```

##バージョン
###言語
- C++03
- C++11

###処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp) 7.1, 8.0, 9.0, 10.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##実装例
以下のマクローリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ \cosh x = \sum_{n = 0}^{\infty} \frac{1}{(2n)!} x^{2n} \quad \mathrm{for~all} \; x $$
