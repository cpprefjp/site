# cyl_bessel_j
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float cyl_bessel_jf(float nu, float x);
double cyl_bessel_j(double nu, double x);
long double cyl_bessel_jl(long double nu, long double x);
}
```

## 概要
第一種ベッセル関数 (Bessel functions of the first kind) を求める。


## 戻り値
引数 `nu`, `x` の第一種ベッセル関数
$$
J_\nu(x) = \sum_{k=0}^\infty \frac{(-1)^k}{k! \Gamma(\nu + k + 1)} \left( \frac{x}{2} \right)^{\nu + 2k}
\quad \text{for } x \ge 0
$$
を返す。


## 備考
`nu >= 128` の場合、この関数の呼び出しの効果は実装定義である。


## 例
```cpp example
#include <cmath>
#include <iostream>

void p(double nu) {
  for (double x : {0, 1, 2})
    std::cout << "cyl_bessel_j(" << nu << ", " << x << ") = " << std::cyl_bessel_j(nu, x) << "\n";
  std::cout << "\n";
}

int main() {
  p(0);
  p(1);
  p(2);
}
```
* std::cyl_bessel_j[color ff0000]

### 出力例
```
cyl_bessel_j(0, 0) = 1
cyl_bessel_j(0, 1) = 0.765198
cyl_bessel_j(0, 2) = 0.223891

cyl_bessel_j(1, 0) = 0
cyl_bessel_j(1, 1) = 0.440051
cyl_bessel_j(1, 2) = 0.576725

cyl_bessel_j(2, 0) = 0
cyl_bessel_j(2, 1) = 0.114903
cyl_bessel_j(2, 2) = 0.352834

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
GCC 7.1.0–8.0.0 では `nu < 0` のときに [`std::domain_error`](/reference/stdexcept.md) を送出する


## 関連項目
* 第一種変形ベッセル関数 [`cyl_bessel_i`](cyl_bessel_i.md)
* 第二種変形ベッセル関数 [`cyl_bessel_k`](cyl_bessel_k.md)
* 第二種ベッセル関数 [`cyl_neumann`](cyl_neumann.md)
* 第一種球ベッセル関数 [`sph_bessel`](sph_bessel.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
