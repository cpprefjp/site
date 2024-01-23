# sqrt
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float sqrt(float x);             // (1) C++03からC++20まで
  double sqrt(double x);           // (2) C++03からC++20まで
  long double sqrt(long double x); // (3) C++03からC++20まで

  floating-point-type
    sqrt(floating-point-type x);   // (4) C++23
  constexpr floating-point-type
    sqrt(floating-point-type x);   // (4) C++26

  double
    sqrt(Integral x);              // (5) C++11
  constexpr double
    sqrt(Integral x);              // (5) C++26

  float
    sqrtf(float x);                // (6) C++17
  constexpr float
    sqrtf(float x);                // (6) C++26

  long double
    sqrtl(long double x);          // (7) C++17
  constexpr long double
    sqrtl(long double x);          // (7) C++26
}
```
* Integral[italic]

## 概要
算術型の非負の平方根を求める。sqrtは square root (平方根) の略。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` の非負の平方根を返す。

`x` が `0` 未満だった場合は定義域エラーとなり、戻り値は処理系定義である。（備考参照）

負の数の平方根は結果が複素数となるので複素数の平方根（[sqrt](/reference/complex/complex/sqrt.md)）を利用するか、$ f(x) = \sqrt{-x}i $として複素数として扱う必要がある。

## 備考
- $$ f(x) = \sqrt{x} $$
- 定義域エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）
    - `x = ±0` の場合、戻り値は `±0` となる。
- `-0.0`は`0.0`と等しいため、定義域エラーにはならず、`-0.0`が返る
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "sqrt(0.0)  = " << std::sqrt(0.0) << std::endl;
  std::cout << "sqrt(0.5)  = " << std::sqrt(0.5) << std::endl;
  std::cout << "sqrt(1.0)  = " << std::sqrt(1.0) << std::endl;
  std::cout << "sqrt(2.0)  = " << std::sqrt(2.0) << std::endl;
  std::cout << "sqrt(4.0)  = " << std::sqrt(4.0) << std::endl;
  std::cout << "sqrt(+∞)   = "
            << std::sqrt(std::numeric_limits<double>::infinity())
            << std::endl;
  std::cout << "sqrt(-0.0) = " << std::sqrt(-0.0) << std::endl;
  std::cout << "sqrt(-1.0) = " << std::sqrt(-1.0) << std::endl;
}
```
* std::fixed[link ../ios/fixed.md]
* std::sqrt[color ff0000]
* infinity()[link ../limits/numeric_limits/infinity.md]

### 出力例
```
sqrt(0.0)  = 0.000000
sqrt(0.5)  = 0.707107
sqrt(1.0)  = 1.000000
sqrt(2.0)  = 1.414214
sqrt(4.0)  = 2.000000
sqrt(+∞)   = inf
sqrt(-0.0) = -0.000000
sqrt(-1.0) = -nan
```

## バージョン
### 言語
- C++03

### 処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp): 2003, 2005, 2008, 2010

#### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## 実装例
ニュートン法によって漸化式の反復から近似的に求めることができる。

$$ a_{n + 1} = \frac{\frac{x}{a_n} + a_n}{2} \quad \mathrm{for} \; x \geq 0 $$

ただし `x` は引数、`a` の初期値は適当な値を選ぶものとする。


## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
