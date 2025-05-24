# erf
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]
* [mathjax enable]

```cpp
namespace std {
  float erf(float x);             // (1) C++11からC++20まで
  double erf(double x);           // (2) C++11からC++20まで
  long double erf(long double x); // (3) C++11からC++20まで

  floating-point-type
    erf(floating-point-type x);   // (4) C++23
  constexpr floating-point-type
    erf(floating-point-type x);   // (4) C++26

  double
    erf(Integral x);              // (5) C++11
  constexpr double
    erf(Integral x);              // (5) C++26

  float
    erff(float x);                // (6) C++17
  constexpr float
    erff(float x);                // (6) C++26

  long double
    erfl(long double x);          // (7) C++17
  constexpr long double
    erfl(long double x);          // (7) C++26
}
```
* Integral[italic]

## 概要
算術型の誤差関数 (error function) を求める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` の誤差関数を返す。


## 備考
- $$ f(x) = \mathrm{erf}~x \equiv \frac{2}{\sqrt{\pi}} \int_0^x e^{-t^2} dt $$
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - `x = ±0` の場合、戻り値は `±0` となる。
    - `x = ±∞` の場合、戻り値は `±1` となる。
- 平均μ, 標準偏差σの正規分布の累積分布関数は $$\frac{1}{2} \left( 1 + \mathrm{erf} ~ \frac{x - \mu}{\sqrt{2} \sigma} \right)$$ で与えられる。
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>
#include <limits>

int main() {
  std::cout << std::fixed;
  std::cout << "erf(-∞) = " << std::erf(-std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "erf(0)  = " << std::erf(0.0) << std::endl;
  std::cout << "erf(1)  = " << std::erf(1.0) << std::endl;
  std::cout << "erf(+∞) = " << std::erf(std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::erf[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity()[link ../limits/numeric_limits/infinity.md]

### 出力例
```
erf(-∞) = -1.000000
erf(0)  = 0.000000
erf(1)  = 0.842701
erf(+∞) = 1.000000
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


## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
