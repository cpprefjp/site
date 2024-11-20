# asin
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float asin(float x);             // (1) C++03からC++20まで
  double asin(double x);           // (2) C++03からC++20まで
  long double asin(long double x); // (3) C++03からC++20まで

  floating-point-type
    asin(floating-point-type x);   // (4) C++23
  constexpr floating-point-type
    asin(floating-point-type x);   // (4) C++26

  double
    asin(Integral x);              // (5) C++11
  constexpr double
    asin(Integral x);              // (5) C++26

  float
    asinf(float x);                // (6) C++17
  constexpr float
    asinf(float x);                // (6) C++26

  long double
    asinl(long double x);          // (7) C++17
  constexpr long double
    asinl(long double x);          // (7) C++26
}
```
* Integral[italic]

## 概要
算術型の逆正弦（アークサイン、arc sine）を求める。

`asin()`は、正弦を表す[`sin()`](sin.md)の逆関数である。$\sin(\mathrm{Arcsin}~x) = x$、$\mathrm{Arcsin}~(\sin x) = x ~ (x \in [-\pi/2, \pi/2])$である。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` の逆正弦を主値 `[-π/2, π/2]` の範囲で返す。（単位はラジアン）

`x` が `[-1.0, 1.0]` の範囲外だった場合は定義域エラーとなり、戻り値は処理系定義である。（備考参照）


## 備考
- $$ f(x) = \mathrm{Arcsin}~x $$
- 定義域エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - `x = ±0` の場合、戻り値は `±0` となる。（複号同順）
    - `x > |1|` の場合、戻り値は quiet NaN となり、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "asin(0.0)   = " << std::asin(0.0) << std::endl;
  std::cout << "asin(0.5)   = " << std::asin(0.5) << std::endl;
  std::cout << "asin(1/√2) = " << std::asin(1.0 / std::sqrt(2.0)) << std::endl;
  std::cout << "asin(√3/2) = " << std::asin(std::sqrt(3.0) / 2.0) << std::endl;
  std::cout << "asin(1.0)   = " << std::asin(1.0) << std::endl;
}
```
* std::asin[color ff0000]
* std::sqrt[link sqrt.md]
* std::fixed[link ../ios/fixed.md]

### 出力例
```
asin(0.0)   = 0.000000
asin(0.5)   = 0.523599
asin(1/√2) = 0.785398
asin(√3/2) = 1.047198
asin(1.0)   = 1.570796
```

## バージョン
### 言語
- C++03

### 処理系
- [Clang](/implementation.md#clang): 1.9 [mark verified], 2.9 [mark verified], 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 3.4.6 [mark verified], 4.2.4 [mark verified], 4.3.5 [mark verified], 4.4.5 [mark verified], 4.5.1 [mark verified], 4.5.2 [mark verified], 4.6.1 [mark verified], 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): 10.1 [mark verified], 11.0 [mark verified], 11.1 [mark verified], 12.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2003 [mark verified], 2005 [mark verified], 2008 [mark verified], 2010 [mark verified]

#### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## 実装例
以下のマクローリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ \mathrm{Arcsin}~x = \sum_{n = 0}^{\infty} \frac{(2n)!}{4^n (n!)^2 (2n+1)} x^{2n + 1} \quad \mathrm{for} \; |x| < 1 $$


$|x| = 1$ 近傍の精度低下する領域（特に $1 / \sqrt{2} < |x| \le 1$）においては、以下の公式による変換で精度向上を図れる。

$$ \mathrm{Arcsin}~x = \frac{\pi}{2} - \mathrm{Arccos}~x = \frac{\pi}{2} - \mathrm{Arcsin}~\sqrt{1 - x^2} \quad \mathrm{for} \; 0 \le x \le 1 $$


## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
