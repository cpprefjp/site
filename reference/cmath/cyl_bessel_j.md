# cyl_bessel_j
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
  double
    cyl_bessel_j(double nu,
                 double x);              // (1) C++17
  floating-point-type
    cyl_bessel_j(floating-point-type nu,
                 floating-point-type x); // (1) C++23

  Promoted
    cyl_bessel_j(Arithmetic1 nu,
                 Arithmetic2 x);         // (2) C++17

  float
    cyl_bessel_jf(float nu,
                  float x);              // (3) C++17

  long double
    cyl_bessel_jl(long double nu,
                  long double x);        // (4) C++17
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

## 概要
第1種ベッセル関数 (Bessel functions of the first kind) を求める。

- (1) :
    - C++17 : `double`に対するオーバーロード
    - C++23 : 浮動小数点数型に対するオーバーロード
- (2) : 算術型に対するオーバーロード (対応する大きい方の精度の浮動小数点数型にキャストして計算される)
- (3) : `float`型規定
- (4) : `long double`型規定


## 戻り値
引数 `nu`, `x` の第1種ベッセル関数
$$
J_\nu(x) = \sum_{k=0}^\infty \frac{(-1)^k}{k! \Gamma(\nu + k + 1)} \left( \frac{x}{2} \right)^{\nu + 2k}
\quad \text{for } x \ge 0
$$
を返す。


## 備考
- `nu >= 128` の場合、この関数の呼び出しの効果は実装定義である
- (1) : C++23では、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>

constexpr double pi = 3.141592653589793;

void p(double nu) {
  for (double r : {0., 1./3., 2./3.})
    std::cout << "cyl_bessel_j(" << nu << ", " << r << " pi) = " << std::cyl_bessel_j(nu, r * pi) << "\n";
  std::cout << "\n";
}

int main() {
  p(0.0);
  p(0.5); // cyl_bessel_j(1/2, x) = sqrt(2 / πx) * sin(x)
  p(1.0);
}
```
* std::cyl_bessel_j[color ff0000]

### 出力例
```
cyl_bessel_j(0, 0 pi) = 1
cyl_bessel_j(0, 0.333333 pi) = 0.744072
cyl_bessel_j(0, 0.666667 pi) = 0.169794

cyl_bessel_j(0.5, 0 pi) = 0
cyl_bessel_j(0.5, 0.333333 pi) = 0.675237
cyl_bessel_j(0.5, 0.666667 pi) = 0.477465

cyl_bessel_j(1, 0 pi) = 0
cyl_bessel_j(1, 0.333333 pi) = 0.455031
cyl_bessel_j(1, 0.666667 pi) = 0.568869

```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 7.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


### 備考
#### GCC (libstdc++)
GCC 7.1.0–8.0.0 では `nu < 0` のときに [`std::domain_error`](/reference/stdexcept.md) を送出する


## 関連項目
- 第2種ベッセル関数 [`cyl_neumann`](cyl_neumann.md)
- 第1種変形ベッセル関数 [`cyl_bessel_i`](cyl_bessel_i.md)
- 第2種変形ベッセル関数 [`cyl_bessel_k`](cyl_bessel_k.md)
- 第1種球ベッセル関数 [`sph_bessel`](sph_bessel.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
