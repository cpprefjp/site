# assoc_laguerre
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
  double
    assoc_laguerre(unsigned int n,
                   unsigned int m,
                   double x);              // (1) C++17
  floating-point-type
    assoc_laguerre(unsigned int n,
                   unsigned int m,
                   floating-point-type x); // (1) C++23

  Promoted
    assoc_laguerre(unsigned int n,
                   unsigned int m,
                   Arithmetic x);          // (2) C++17

  float
    assoc_laguerref(unsigned int n,
                    unsigned int m,
                    float x);              // (3) C++17

  long double
    assoc_laguerrel(unsigned int n,
                    unsigned int m,
                    long double x);        // (4) C++17
}
```
* Promoted[italic]
* Arithmetic[italic]

## 概要
ラゲール陪多項式 (associated Laguerre polynomials) を計算する。

- (1) :
    - C++17 : `double`に対するオーバーロード
    - C++23 : 浮動小数点数型に対するオーバーロード
- (2) : 算術型に対するオーバーロード (対応する精度の浮動小数点数型にキャストして計算される)
- (3) : `float`型規定
- (4) : `long double`型規定


## 戻り値
引数 `n`, `m`, `x` のラゲール陪多項式
$$
L_n^m(x) = (-1)^m \frac{\mathrm d^m}{\mathrm dx^m} L_{m+n}(x)
\quad \text{for } x \ge 0
$$
を返す。
右辺の $L$ はラゲール多項式 ([`laguerre`](laguerre.md))。


## 備考
- `n >= 128 || m >= 128` の場合、この関数の呼び出しの効果は実装定義である
- (1) : C++23では、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>

void p(unsigned n, unsigned m) {
  for (double x : {0., 1., 2.})
    std::cout << "assoc_laguerre(" << n << ", " << m << ", " << x << ") = " << std::assoc_laguerre(n, m, x) << "\n";
  std::cout << "\n";
}

int main() {
  p(0, 0); // L_0^0(x) = 1
  p(0, 1); // L_0^1(x) = 1
  p(1, 0); // L_1^0(x) = - x + 1
  p(1, 1); // L_1^1(x) = - x + 2
  p(2, 0); // L_2^0(x) = (x^2 - 4x + 2) / 2
  p(2, 1); // L_2^1(x) = (x^2 - 6x + 6) / 2
}
```
* std::assoc_laguerre[color ff0000]

### 出力例
```
assoc_laguerre(0, 0, 0) = 1
assoc_laguerre(0, 0, 1) = 1
assoc_laguerre(0, 0, 2) = 1

assoc_laguerre(0, 1, 0) = 1
assoc_laguerre(0, 1, 1) = 1
assoc_laguerre(0, 1, 2) = 1

assoc_laguerre(1, 0, 0) = 1
assoc_laguerre(1, 0, 1) = 0
assoc_laguerre(1, 0, 2) = -1

assoc_laguerre(1, 1, 0) = 2
assoc_laguerre(1, 1, 1) = 1
assoc_laguerre(1, 1, 2) = 0

assoc_laguerre(2, 0, 0) = 1
assoc_laguerre(2, 0, 1) = -0.5
assoc_laguerre(2, 0, 2) = -1

assoc_laguerre(2, 1, 0) = 3
assoc_laguerre(2, 1, 1) = 0.5
assoc_laguerre(2, 1, 2) = -1

```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 7.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 実装例
### 閉形式
$$
L_n^m(x) = \sum_{j=0}^n \frac{(m+n)!}{(m+j)! (n-j)!} \frac{(-x)^j}{j!}
$$

### 漸化式
$$
L_n^m(x) = \frac{(2n + m - 1 - x)L_{n-1}^m(x) - (n + m - 1) L_{n-2}^m(x)}{n};
L_0^m(x) = 1, L_1^m(x) = -x + m + 1
$$


## 関連項目
- ラゲール多項式 [`laguerre`](laguerre.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
