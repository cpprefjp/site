# sph_legendre
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float sph_legendref(unsigned l, unsigned m, float theta);
double sph_legendre(unsigned l, unsigned m, double theta);
long double sph_legendrel(unsigned l, unsigned m, long double theta);
}
```

## 概要
球面調和関数 (spherical harmonic function) の *θ* 成分を求める。


## 戻り値
引数 `l`, `m`, `theta` について $Y_l^m(\theta, 0)$ を返す。
$Y_l^m(\theta, \phi)$ は球面調和関数
$$
Y_l^m(\theta, \phi) = (-1)^m \sqrt{\frac{2l + 1}{4\pi} \frac{(l - m)!}{(l + m)!}} P_l^m(\cos \theta) \exp(i m \phi)
\quad \text{for } |m| \le l
$$
である。
$P_l^m$ はルジャンドル陪関数 ([`assoc_legendre`](assoc_legendre.md)) である。


## 備考
`l >= 128` の場合、この関数の呼び出しの効果は実装定義である。


## 例
```cpp example
#include <cmath>
#include <complex>
#include <iostream>

constexpr double pi = 3.14159;

// 球面調和関数
std::complex<double> sph_harmonics(unsigned l, unsigned m, double theta, double phi) {
  return std::sph_legendre(l, m, theta) * std::polar(1.0, m * phi);
}

int main() {
  unsigned l = 1;
  unsigned m = 1;
  // Y_1^1 = - sqrt(3 / 8π) |sin θ| exp(iφ)

  std::cout << "#theta / pi\tphi / pi\tY_" << l << "^" << m << "\n";
  for (double t : {0., 0.25, 0.5, 0.75, 1.}) {
    double theta = t * pi;
    for (double p : {0., 0.25, 0.5, 0.75, 1., 1.25, 1.5, 1.75, 2.}) {
      double phi = p * pi / 4;
      std::cout << t << "\t" << p << "\t" << sph_harmonics(l, m, theta, phi) << "\n";
      if (t == 0 || t == 1) break;
    }
  }
}
```
* std::sph_legendre[color ff0000]
* std::polar[link /reference/complex/polar.md]

### 出力例
```
#theta / pi	phi / pi	Y_1^1
0	0	(0,0)
0.25	0	(-0.244301,-0)
0.25	0.25	(-0.239607,-0.0476607)
0.25	0.5	(-0.225705,-0.0934899)
0.25	0.75	(-0.203129,-0.135726)
0.25	1	(-0.172747,-0.172747)
0.25	1.25	(-0.135727,-0.203129)
0.25	1.5	(-0.0934902,-0.225705)
0.25	1.75	(-0.0476611,-0.239607)
0.25	2	(-3.24137e-07,-0.244301)
0.5	0	(-0.345494,-0)
0.5	0.25	(-0.338856,-0.0674025)
0.5	0.5	(-0.319195,-0.132215)
0.5	0.75	(-0.287268,-0.191946)
0.5	1	(-0.244301,-0.244301)
0.5	1.25	(-0.191947,-0.287268)
0.5	1.5	(-0.132215,-0.319195)
0.5	1.75	(-0.067403,-0.338855)
0.5	2	(-4.584e-07,-0.345494)
0.75	0	(-0.244302,-0)
0.75	0.25	(-0.239608,-0.0476609)
0.75	0.5	(-0.225705,-0.0934902)
0.75	0.75	(-0.20313,-0.135727)
0.75	1	(-0.172748,-0.172747)
0.75	1.25	(-0.135727,-0.203129)
0.75	1.5	(-0.0934905,-0.225705)
0.75	1.75	(-0.0476612,-0.239607)
0.75	2	(-3.24138e-07,-0.244302)
1	0	(-9.16796e-07,-0)
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
GCC 7.1.0–8.0.0 では `l < m` の場合、[`std::domain_error`](/reference/stdexcept.md) を送出する。


## 関連項目
* [`assoc_legendre`](assoc_legendre.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
