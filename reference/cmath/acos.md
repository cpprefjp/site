# acos
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float acos(float x);             // (1) C++03からC++20まで
  double acos(double x);           // (2) C++03からC++20まで
  long double acos(long double x); // (3) C++03からC++20まで

  floating-point-type
    acos(floating-point-type x);   // (4) C++23
  constexpr floating-point-type
    acos(floating-point-type x);   // (4) C++26

  double
    acos(Integral x);              // (5) C++11
  constexpr double
    acos(Integral x);              // (5) C++26

  float
    acosf(float x);                // (6) C++17
  constexpr float
    acosf(float x);                // (6) C++26

  long double
    acosl(long double x);          // (7) C++17
  constexpr long double
    acosl(long double x);          // (7) C++26
}
```
* Integral[italic]

## 概要
算術型の逆余弦（アークコサイン、arc cosine）を求める。

`acos()`は、余弦を表す[`cos()`](cos.md)の逆関数である。$\cos(\mathrm{Arccos}~x) = x$、$\mathrm{Arccos}~(\cos x) = x ~ (x \in [0, \pi])$である。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` の逆余弦を主値 `[0, π]` の範囲で返す。（単位はラジアン）

`x` が `[-1.0, 1.0]` の範囲外だった場合は定義域エラーとなり、戻り値は処理系定義である。（備考参照）


## 備考
- $$ f(x) = \mathrm{Arccos}~ x $$
- 定義域エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - `x = 1` の場合、戻り値は `+0` となる。
    - `x > |1|` の場合、戻り値は quiet NaN となり、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "acos(0.0)   = " << std::acos(0.0) << std::endl;
  std::cout << "acos(0.5)   = " << std::acos(0.5) << std::endl;
  std::cout << "acos(1/√2) = " << std::acos(1.0 / std::sqrt(2.0)) << std::endl;
  std::cout << "acos(√3/2) = " << std::acos(std::sqrt(3.0) / 2.0) << std::endl;
  std::cout << "acos(1.0)   = " << std::acos(1.0) << std::endl;
  std::cout << "acos(-1.0) = " << std::acos(-1.0) << std::endl; // 円周率
}
```
* std::acos[color ff0000]
* std::sqrt[link sqrt.md]
* std::fixed[link ../ios/fixed.md]

### 出力例
```
acos(0.0)   = 1.570796
acos(0.5)   = 1.047198
acos(1/√2) = 0.785398
acos(√3/2) = 0.523599
acos(1.0)   = 0.000000
acos(-1.0) = 3.141593
```

## バージョン


### 言語
- C++03

### 処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp): 2003, 2005, 2008, 2010

#### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## 実装例
以下のマクローリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ \mathrm{Arccos}~x = \frac{\pi}{2} - \sum_{n = 0}^{\infty}\frac{\left(2n\right)!}{4^n\left(n!\right)^2\left(2n + 1\right)}x^{2n+1} \quad \mathrm{for} \; |x| &lt; 1 $$


また、逆正接関数と逆余接関数の和は π / 2 なので [`asin`](asin.md) から求めることができる。

$$ \mathrm{Arccos}~x = \frac{\pi}{2} - \mathrm{Arcsin}~x \quad \mathrm{for} \; |x| &lt; 1 $$


## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
