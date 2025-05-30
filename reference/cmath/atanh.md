# atanh
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float atanh(float x);             // (1) C++11からC++20まで
  double atanh(double x);           // (2) C++11からC++20まで
  long double atanh(long double x); // (3) C++11からC++20まで

  floating-point-type
    atanh(floating-point-type x);   // (4) C++23
  constexpr floating-point-type
    atanh(floating-point-type x);   // (4) C++26

  double
    atanh(Integral x);              // (5) C++11
  constexpr double
    atanh(Integral x);              // (5) C++26

  float
    atanhf(float x);                // (6) C++17
  constexpr float
    atanhf(float x);                // (6) C++26

  long double
    atanhl(long double x);          // (7) C++17
  constexpr long double
    atanhl(long double x);          // (7) C++26
}
```
* Integral[italic]

## 概要
算術型の逆双曲線正接（エリアハイパボリックタンジェント、area hyperbolic tangent）を求める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` の逆双曲線正接を返す。

`x` が `[-1, +1]` の範囲外だった場合は定義域エラーとなり、戻り値は処理系定義である。また、`x` が `-1` か `+1` と等しい場合には処理系によっては極エラーが起きる可能性がある。（備考参照）


## 備考
- $$ f(x) = \mathrm{artanh}~x $$
- 定義域エラー、あるいは、極エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）
    - `x = ±0` の場合、戻り値は `±0` となる。
    - `x = ±1` の場合、戻り値は `±∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する。
    - `|x| > 1` の場合、戻り値は NaN となり、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "atanh(-1.0) = " << std::atanh(-1.0) << std::endl;
  std::cout << "atanh(-0.5) = " << std::atanh(-0.5) << std::endl;
  std::cout << "atanh(0.0)  = " << std::atanh(0.0) << std::endl;
  std::cout << "atanh(0.5)  = " << std::atanh(0.5) << std::endl;
  std::cout << "atanh(1.0)  = " << std::atanh(1.0) << std::endl;
}
```
* std::atanh[color ff0000]
* std::fixed[link ../ios/fixed.md]

### 出力例
```
atanh(-1.0) = -inf
atanh(-0.5) = -0.549306
atanh(0.0)  = 0.000000
atanh(0.5)  = 0.549306
atanh(1.0)  = inf
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 2.9 [mark verified], 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.4 [mark verified], 4.4.5 [mark verified], 4.5.2 [mark verified], 4.6.1 [mark verified], 4.7.0 [mark verified]

#### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## 実装例
以下のマクローリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ \mathrm{artanh}~x = \sum_{n = 0}^{\infty} \frac{1}{2n + 1} x^{2n + 1} \quad \mathrm{for} \; |x| < 1 $$


または対数に変換して求めることができる。

$$ \mathrm{artanh}~x = \frac{1}{2} \log_e \frac{1 + x}{1 - x} \quad \mathrm{for} \; |x| < 1 $$


## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
