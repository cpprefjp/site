# tgamma
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]
* [mathjax enable]

```cpp
namespace std {
  float tgamma(float x);              // (1) C++11からC++20まで
  double tgamma(double x);            // (2) C++11からC++20まで
  long double tgamma(long double x);  // (3) C++11からC++20まで

  floating-point-type
    tgamma(floating-point-type x);    // (4) C++23
  constexpr floating-point-type
    tgamma(floating-point-type x);    // (4) C++26

  double
    tgamma(Integral x);               // (5) C++11
  constexpr double
    tgamma(Integral x);               // (5) C++11

  float
    tgammaf(float x);                 // (6) C++17
  constexpr float
    tgammaf(float x);                 // (6) C++26

  long double
    tgammal(long double x);           // (7) C++17
  constexpr long double
    tgammal(long double x);           // (7) C++26
}
```
* Integral[italic]

## 概要
ガンマ関数を求める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` のガンマ関数 $\Gamma(x)$ を返す。

$$ \Gamma (x) = \int_0^\infty t^{x-1} e^{-t} dt $$

## 備考
- ガンマ関数は階乗の一般化である。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - `x = ±0` の場合、戻り値は `±∞` となり、
    [`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する。
    - `x` が負の整数の場合、戻り値は NaN となり、
    [`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
    - `x = -∞` の場合、戻り値は NaN となり、
    [`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
    - `x = +∞` の場合、戻り値は `+∞` となる。
- `gamma` という関数は既にあったが処理系によって定義が違ったため、本当の (true) ガンマ関数 `tgamma` と名付けられた。
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>
#include <limits>

int main() {
  std::cout << std::fixed;
  std::cout << "tgamma(-∞)  = " << std::tgamma(-std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "tgamma(-1)  = " << std::tgamma(-1.0) << std::endl;
  std::cout << "tgamma(0)   = " << std::tgamma(0.0) << std::endl;
  std::cout << "tgamma(0.5) = " << std::tgamma(0.5) << std::endl; // sqrt(pi)
  std::cout << "tgamma(1)   = " << std::tgamma(1.0) << std::endl; // 0!
  std::cout << "tgamma(+∞)  = " << std::tgamma(std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::tgamma[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity()[link ../limits/numeric_limits/infinity.md]

### 出力例
```
tgamma(-∞)  = nan
tgamma(-1)  = nan
tgamma(0)   = inf
tgamma(0.5) = 1.772454
tgamma(2)   = 1.000000
tgamma(+∞)  = inf
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

#### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上

## 関連項目
- ガンマ関数の絶対値の自然対数 [`lgamma`](lgamma.md)

## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
