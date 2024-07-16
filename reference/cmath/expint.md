# expint
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
  double
    expint(double x);              // (1) C++17
  floating-point-type
    expint(floating-point-type x); // (1) C++23

  Promoted
    expint(Arithmetic x);          // (2) C++17

  float
    expintf(float x);              // (3) C++17

  long double
    expintl(long double x);        // (4) C++17
}
```
* Promoted[italic]
* Arithmetic[italic]

## 概要
指数積分 (exponential integral) を求める。

- (1) :
    - C++17 : `double`に対するオーバーロード
    - C++23 : 浮動小数点数型に対するオーバーロード
- (2) : 算術型に対するオーバーロード (対応する精度の浮動小数点数型にキャストして計算される)
- (3) : `float`型規定
- (4) : `long double`型規定


## 戻り値
引数 `x` の指数積分
$$ \mathrm{Ei}(x) = - \int_{-x}^\infty \mathrm{d}t \frac{e^{-t}}{t} = - \int_{-\infty}^x \mathrm{d}t \frac{e^t}{t} $$
を返す。


## 備考
- (1) : C++23では、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>
#include <limits>

int main() {
  auto inf = std::numeric_limits<double>::infinity();
  std::cout << "expint(-∞) = " << std::expint(-inf) << std::endl; // 0
  std::cout << "expint(-1) = " << std::expint(-1) << std::endl;
  std::cout << "expint(0)  = " << std::expint(0) << std::endl;    // 特異点 (-∞)
  std::cout << "expint(1)  = " << std::expint(1) << std::endl;
  std::cout << "expint(∞)  = " << std::expint(inf) << std::endl;  // +∞
}
```
* std::expint[color ff0000]
* infinity[link /reference/limits/numeric_limits/infinity.md]

### 出力例
```
expint(-∞) = -0
expint(-1) = -0.219384
expint(0)  = -inf
expint(1)  = 1.89512
expint(∞)  = -nan
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 7.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
