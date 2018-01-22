# cyl_neumann
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float cyl_neumannf(float nu, float x);
double cyl_neumann(double nu, double x);
long double cyl_neumannl(long double nu, long double x);
}
```

## 概要
第二種ベッセル関数 (Bessel functions of the second kind)、ノイマン関数 (Neumann functions) を求める。


## 戻り値
引数 `x` の第二種ベッセル関数
$$
N_\nu(x) = \frac{J_{\nu}(x) \cos \nu \pi - J_{-\nu}(x)}{\sin \nu \pi}
\quad \text{for } x \ge 0
$$
を返す。
$J$ は第一種ベッセル関数 ([`cyl_bessel_j`](cyl_bessel_j.md)) である。


## 備考
`nu >= 128` の場合、この関数の呼び出しの効果は実装定義である。


## 例
```cpp example
#include <cmath>
#include <iostream>

constexpr double pi = 3.141592653589793;

void p(double nu) {
  for (double r : {0., 1./3., 2./3.})
    std::cout << "cyl_neumann(" << nu << ", " << r << " pi) = " << std::cyl_neumann(nu, r * pi) << "\n";
  std::cout << "\n";
}

int main() {
  p(0.0);
  p(0.5); // cyl_neumann(1/2, x) = -sqrt(2 / πx) * cos(x)
  p(1.0);
}
```
* std::cyl_neumann[color ff0000]

### 出力例
```
cyl_neumann(0, 0 pi) = -inf
cyl_neumann(0, 0.333333 pi) = 0.124174
cyl_neumann(0, 0.666667 pi) = 0.517996

cyl_neumann(0.5, 0 pi) = -inf
cyl_neumann(0.5, 0.333333 pi) = -0.389848
cyl_neumann(0.5, 0.666667 pi) = 0.275664

cyl_neumann(1, 0 pi) = -inf
cyl_neumann(1, 0.333333 pi) = -0.741089
cyl_neumann(1, 0.666667 pi) = -0.054725

```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 7.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


### 備考
#### GCC (libstdc++)
GCC 7.1.0–8.0.0 では `nu < 0` のときに [`std::domain_error`](/reference/stdexcept.md) を送出する。


## 関連項目
* 第一種ベッセル関数 [`cyl_bessel_j`](cyl_bessel_j.md)
* 第二種変形ベッセル関数 [`cyl_bessel_k`](cyl_bessel_k.md)
* 第二種球ベッセル関数 [`sph_neumann`](sph_neumann.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
