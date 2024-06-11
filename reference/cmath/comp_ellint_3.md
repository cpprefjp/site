# comp_ellint_3
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
  double
    comp_ellint_3(double k,
                  double nu);              // (1) C++17
  floating-point-type
    comp_ellint_3(floating-point-type k,
                  floating-point-type nu); // (1) C++23

  Promoted
    comp_ellint_3(Arithmetic1 k,
                  Arithmetic2 nu);         // (2) C++17

  float
    comp_ellint_3f(float k,
                   float nu);              // (3) C++17

  long double
    comp_ellint_3l(long double k,
                   long double nu);        // (4) C++17
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

## 概要
第3種完全楕円積分 (complete elliptic integral of the third kind) を計算する。

- (1) :
    - C++17 : `double`に対するオーバーロード
    - C++23 : 浮動小数点数型に対するオーバーロード
- (2) : 算術型に対するオーバーロード (対応する大きい方の精度の浮動小数点数型にキャストして計算される)
- (3) : `float`型規定
- (4) : `long double`型規定


## 戻り値
引数 `k`, `nu` の第3種完全楕円積分
$$
\Pi(\nu, k) = \Pi(\nu, k, \pi/2)
= \int_0^{\pi/2} \frac{\mathrm d\theta}{(1 - \nu \sin^2 \theta) \sqrt{1 - k^2 \sin^2 \theta}}
\quad \text{for } |k| \le 1
$$
を返す。

$ \Pi(\nu, k) $ は第3種不完全楕円積分 ([`ellint_3`](ellint_3.md))。


## 備考
- $\Pi(0, k) = K(k)$ (第1種完全楕円積分 [`comp_ellint_1`](comp_ellint_1.md))
- (1) : C++23では、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>

void p(double k, double nu) {
  std::cout << "comp_ellint_3(" << k << ", " << nu << ") = ";
  try {
    std::cout << std::comp_ellint_3(k, nu) << "\n";
  } catch(const std::domain_error& e) {
    std::cout << "(domain_error)\n";
  }
}

int main() {
  p(0, -1);   // π / 2 √2
  p(0.5, -1); // 1.17745
  p(1, -1);   // ∞
  p(0, 0);    // π / 2
  p(0.5, 0);  // 1.68575
  p(1, 0);    // ∞
  p(0, 1);    // ∞
  p(0.5, 1);  // ∞
  p(1, 1);    // ∞
}
```
* std::comp_ellint_3[color ff0000]

### 出力例
```
comp_ellint_3(0, -1) = 1.11072
comp_ellint_3(0.5, -1) = 1.17745
comp_ellint_3(1, -1) = (domain_error)
comp_ellint_3(0, 0) = 1.5708
comp_ellint_3(0.5, 0) = 1.68575
comp_ellint_3(1, 0) = (domain_error)
comp_ellint_3(0, 1) = inf
comp_ellint_3(0.5, 1) = inf
comp_ellint_3(1, 1) = inf
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
GCC 7.1.0–8.0.0 では

* `|k| == 1` のときに [`std::domain_error`](/reference/stdexcept.md) を送出する
* `nu > 1` のときに Cauchy の主値を計算せず [`std::domain_error`](/reference/stdexcept.md) を送出する


## 関連項目
- 第1種完全楕円積分 [`comp_ellint_1`](comp_ellint_1.md)
- 第2種完全楕円積分 [`comp_ellint_2`](comp_ellint_2.md)
- 第3種不完全楕円積分 [`ellint_3`](ellint_3.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
