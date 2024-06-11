# comp_ellint_2
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
  double
    comp_ellint_2(double k);              // (1) C++17
  floating-point-type
    comp_ellint_2(floating-point-type k); // (1) C++23

  Promoted
    comp_ellint_2(Arithmetic k);          // (2) C++17

  float
    comp_ellint_2f(float k);              // (3) C++17

  long double
    comp_ellint_2l(long double k);        // (4) C++17
}
```
* Promoted[italic]
* Arithmetic[italic]

## 概要
第2種完全楕円積分 (complete elliptic integral of the second kind) を計算する。

- (1) :
    - C++17 : `double`に対するオーバーロード
    - C++23 : 浮動小数点数型に対するオーバーロード
- (2) : 算術型に対するオーバーロード (対応する精度の浮動小数点数型にキャストして計算される)
- (3) : `float`型規定
- (4) : `long double`型規定


## 戻り値
引数 `k` の第2種完全楕円積分
$$
E(k) = E(k, \pi/2) = \int_0^{\pi/2} \mathrm d\theta ~ \sqrt{1 - k^2 \sin^2 \theta}
\quad \text{for } |k| \le 1
$$
を返す。
$ E(k, \phi) $ は第2種不完全楕円積分 ([`ellint_2`](ellint_2.md))。


## 備考
- (1) : C++23では、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << "comp_ellint_2(0)   = " << std::comp_ellint_2(0) << "\n";    // π / 2
  std::cout << "comp_ellint_2(0.5) = " << std::comp_ellint_2(0.5) << "\n";  // 1.46746
  std::cout << "comp_ellint_2(1)   = " << std::comp_ellint_2(1) << "\n";    // 1
}
```
* std::comp_ellint_2[color ff0000]

### 出力例
```
comp_ellint_2(0)   = 1.5708
comp_ellint_2(0.5) = 1.46746
comp_ellint_2(1)   = 1
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
### 級数
$$
E(k) = - \frac{\pi}{2} \sum_{n=0}^\infty \frac{1}{2n-1} \left[ \frac{(2n-1)!!}{(2n)!!} \right]^2 k^{2n}
$$


## 関連項目
- 第1種完全楕円積分 [`comp_ellint_1`](comp_ellint_1.md)
- 第3種完全楕円積分 [`comp_ellint_3`](comp_ellint_3.md)
- 第2種不完全楕円積分 [`ellint_2`](ellint_2.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
