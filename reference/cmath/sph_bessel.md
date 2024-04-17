# sph_bessel
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
  double
    sph_bessel(unsigned int n,
               double x);              // (1) C++17
  floating-point-type
    sph_bessel(unsigned int n,
               floating-point-type x); // (1) C++23

  Promoted
    sph_bessel(unsigned int n,
               Arithmetic x);          // (2) C++17

  float
    sph_besself(unsigned int n,
                float x);              // (3) C++17

  long double
    sph_bessell(unsigned int n,
                long double x);        // (4) C++17
}
```
* Promoted[italic]
* Arithmetic[italic]

## 概要
第1種球ベッセル関数 (spherical Bessel functions of the first kind) を求める。

- (1) :
    - C++17 : `double`に対するオーバーロード
    - C++23 : 浮動小数点数型に対するオーバーロード
- (2) : 算術型に対するオーバーロード (対応する精度の浮動小数点数型にキャストして計算される)
- (3) : `float`型規定
- (4) : `long double`型規定


## 戻り値
引数 `n`, `x` の第1種球ベッセル関数
$$
j_n(x) = \sqrt{\frac{\pi}{2x}} J_{n + 1/2}(x)
\quad \text{for } x \ge 0
$$
を返す。
$J$ は第1種ベッセル関数 ([`cyl_bessel_j`](cyl_bessel_j.md))。


## 備考
- `n >= 128` の場合、この関数の呼び出しの効果は実装定義である
- (1) : C++23では、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>

constexpr double pi = 3.141592653589793;

void p(unsigned n) {
  for (double r : {0., 0.25, 0.5})
    std::cout << "sph_bessel(" << n << ", " << r << " pi) = " << std::sph_bessel(n, r * pi) << "\n";
  std::cout << "\n";
}

int main() {
  p(0); // sph_bessel(0, x) = sin(x) / x
  p(1); // sph_bessel(1, x) = sin(x) / x^2 - cos(x) / x
  p(2); // sph_bessel(2, x) = (3 / x^3 - 1 / x) * sin(x) - (3 / x^2) * cos(x)
}
```
* std::sph_bessel[color ff0000]

### 出力例
```
sph_bessel(0, 0 pi) = 1
sph_bessel(0, 0.25 pi) = 0.900316
sph_bessel(0, 0.5 pi) = 0.63662

sph_bessel(1, 0 pi) = 0
sph_bessel(1, 0.25 pi) = 0.246002
sph_bessel(1, 0.5 pi) = 0.405285

sph_bessel(2, 0 pi) = 0
sph_bessel(2, 0.25 pi) = 0.0393422
sph_bessel(2, 0.5 pi) = 0.137417

```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 7.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 実装例
### 漸化式
$$
j_n(x) = \frac{2n-1}{x} j_{n-1}(x) - j_{n-2}(x);
j_0(x) = \frac{\sin x}{x}, j_1(x) = \frac{\sin x}{x^2} - \frac{\cos x}{x}
$$


## 関連項目
- 第2種球ベッセル関数 [`sph_neumann`](sph_neumann.md)
- 第1種ベッセル関数 [`cyl_bessel_j`](cyl_bessel_j.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
