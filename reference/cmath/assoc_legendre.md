# assoc_legendre
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
  double
    assoc_legendre(unsigned int l,
                   unsigned int m,
                   double x);              // (1) C++17
  floating-point-type
    assoc_legendre(unsigned int l,
                   unsigned int m,
                   floating-point-type x); // (1) C++23

  Promoted
    assoc_legendre(unsigned int l,
                   unsigned int m,
                   Arithmetic x);          // (2) C++17

  float
    assoc_legendref(unsigned int l,
                    unsigned int m,
                    float x);              // (3) C++17

  long double
    assoc_legendrel(unsigned int l,
                    unsigned int m,
                    long double x);        // (4) C++17
}
```
* Promoted[italic]
* Arithmetic[italic]

## 概要
ルジャンドル陪関数 (associated Legendre functions) を計算する。

- (1) :
    - C++17 : `double`に対するオーバーロード
    - C++23 : 浮動小数点数型に対するオーバーロード
- (2) : 算術型に対するオーバーロード (対応する精度の浮動小数点数型にキャストして計算される)
- (3) : `float`型規定
- (4) : `long double`型規定


## 戻り値
引数 `l`, `m`, `x` のルジャンドル陪関数
$$
P_l^m(x) = (1 - x^2)^{m/2} \frac{\mathrm d^m}{\mathrm dx^m} P_l(x)
\quad \text{for } |x| \le 1
$$
を返す。右辺の $P_l(x)$ はルジャンドル多項式 ([`legendre`](legendre.md))。


## 備考
- `l >= 128` の場合、この関数の呼び出しの効果は実装定義である
- (1) : C++23では、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された

### 負の m の対応
この標準関数は $m$ が正の場合にしか対応していない。
一方でルジャンドル陪関数はロドリゲスの公式を用いて負の $m$ に対して自然に拡張され、
このことは球面調和関数を定義する上でも使われる。
負の $m$ に対してもルジャンドル陪関数を計算する必要がある場合は、関係式
$$ P_l^{-m}(x) = (-1)^m \frac{(l-m)!}{(l+m)!} P_l^m(x) $$
を用いる必要がある。

```cpp
#include <cmath>

// 負の m にも対応した実装例
double assoc_legendre(unsigned l, int m, double x) {
  if (m >= 0)
    return std::assoc_legendre(l, (unsigned) m, x);
  else
    return std::pow(-1.0, m) * (std::tgamma(1.0 + l + m) / std::tgamma(1.0 + l - m)) * std::assoc_legendre(l, (unsigned) -m, x);
}
```
* std::assoc_legendre[color ff0000]
* std::tgamma[link tgamma.md]

上記の例では簡単のために階乗をガンマ関数 $n! = \Gamma(n + 1)$ ([`tgamma`](tgamma.md)) で計算しているが、
計算効率やオーバーフローなどを考えると、直接 $(l + |m|)\cdots(l - |m| + 1)$ で割り算したり、係数を事前計算しておくなど工夫すると良い。

## 例
```cpp example
#include <cmath>
#include <iostream>

void p(unsigned l, unsigned m) {
  for (double x : {-1., 0., 1.})
    std::cout << "assoc_legendre(" << l << ", " << m << ", " << x << ") = " << std::assoc_legendre(l, m, x) << "\n";
  std::cout << "\n";
}

int main() {
  p(0, 0); // P_0^0(x) = 1
  p(1, 0); // P_1^0(x) = x
  p(1, 1); // P_1^1(x) = (1 - x^2)^(1/2)
  p(2, 0); // P_2^0(x) = (3x^2 - 1) / 2
  p(2, 1); // P_2^1(x) = 3x (1 - x^2)^(1/2)
  p(2, 2); // P_2^2(x) = 3 (1 - x^2)
}
```
* std::assoc_legendre[color ff0000]

### 出力例
```
assoc_legendre(0, 0, -1) = 1
assoc_legendre(0, 0, 0) = 1
assoc_legendre(0, 0, 1) = 1

assoc_legendre(1, 0, -1) = -1
assoc_legendre(1, 0, 0) = 0
assoc_legendre(1, 0, 1) = 1

assoc_legendre(1, 1, -1) = -0
assoc_legendre(1, 1, 0) = -1
assoc_legendre(1, 1, 1) = -0

assoc_legendre(2, 0, -1) = 1
assoc_legendre(2, 0, 0) = -0.5
assoc_legendre(2, 0, 1) = 1

assoc_legendre(2, 1, -1) = 0
assoc_legendre(2, 1, 0) = -0
assoc_legendre(2, 1, 1) = -0

assoc_legendre(2, 2, -1) = 0
assoc_legendre(2, 2, 0) = 3
assoc_legendre(2, 2, 1) = 0

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
GCC 7.1.0–8.0.0 では `l < m` の場合 ($P_l^m = 0$) [`std::domain_error`](/reference/stdexcept.md) を送出する。

GCC 7.1.0–8.0.0 では $(-1)^m$ 倍された値を返す。


## 実装例
### 閉形式
$$
P_l^m(x) = \frac{1}{2^l l!} (1-x^2)^{m/2}
\sum_{j=0}^{\lfloor (l-m)/2 \rfloor} (-1)^j \frac{l! (2l-2j)!}{j! (l-j)! (l-m-2j)!} x^{l-m-2j}
$$

### 漸化式
$$
P_l^m(x) = \frac{(2l-1) x P_{l-1}^m(x) - (l+m-1) P_{l-2}^m(x)}{l-m};
\quad P_{m-1}^m(x) = 0, \quad P_m^m(x) = (2m-1)!! (1 - x^2)^{m/2}
$$


## 関連項目
- ルジャンドル多項式 [`legendre`](legendre.md)
- 球面調和関数の *θ* 成分 [`sph_legendre`](sph_legendre.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした

