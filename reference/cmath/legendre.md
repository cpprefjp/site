# legendre
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
  double
    legendre(unsigned int n,
             double x);              // (1) C++17
  floating-point-type
    legendre(unsigned int n,
             floating-point-type x); // (1) C++23

  Promoted
    legendre(unsigned int n,
             Arithmetic x);          // (2) C++17

  float
    legendref(unsigned int n,
              float x);              // (3) C++17

  long double
    legendrel(unsigned int n,
              long double x);        // (4) C++17
}
```
* Promoted[italic]
* Arithmetic[italic]

## 概要
ルジャンドル多項式 (Legendre polynomials) を求める。

- (1) :
    - C++17 : `double`に対するオーバーロード
    - C++23 : 浮動小数点数型に対するオーバーロード
- (2) : 算術型に対するオーバーロード (対応する精度の浮動小数点数型にキャストして計算される)
- (3) : `float`型規定
- (4) : `long double`型規定


## 戻り値
引数 `l`, `x` のルジャンドル多項式
$$ P_l(x) = \frac{1}{2^l l!} \frac{\mathrm{d}^l}{\mathrm{d}x^l} (x^2 - 1)^l \quad \text{for } |x| \le 1 $$
を返す。


## 備考
- `n >= 128` の場合、この関数の呼び出しの効果は実装定義である
- (1) : C++23では、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>

void p(unsigned n) {
  for (double x : {-1., 0., 1.})
    std::cout << "legendre(" << n << ", " << x << ") = " << std::legendre(n, x) << "\n";
  std::cout << "\n";
}

int main() {
  p(0); // P0(x) = 1
  p(1); // P1(x) = x
  p(2); // P2(x) = (3x^2 - 1) / 2
  p(3); // P3(x) = (5x^3 - 3x) / 2
}
```
* std::legendre[color ff0000]

### 出力例
```
legendre(0, -1) = 1
legendre(0, 0) = 1
legendre(0, 1) = 1

legendre(1, -1) = -1
legendre(1, 0) = 0
legendre(1, 1) = 1

legendre(2, -1) = 1
legendre(2, 0) = -0.5
legendre(2, 1) = 1

legendre(3, -1) = -1
legendre(3, 0) = 0
legendre(3, 1) = 1

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
$$ P_l(x) = \frac{1}{2^l l!} \sum_{j=0}^{\lfloor l/2 \rfloor} (-1)^j \frac{l! (2l-2j)!}{j! (l-j)! (l-2j)!} x^{l-2j} $$

### 漸化式
$$ P_l(x) = \frac{(2l-1) xP_{l-1}(x) - (l-1) P_{l-2}(x)}{l}; P_0(x) = 1, P_1(x) = x $$


## 関連項目
- ルジャンドル陪関数 [`assoc_legendre`](assoc_legendre.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
