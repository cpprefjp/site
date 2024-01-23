# exp2
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float exp2(float x);             // (1) C++11からC++20まで
  double exp2(double x);           // (2) C++11からC++20まで
  long double exp2(long double x); // (3) C++11からC++20まで

  floating-point-type
    exp2(floating-point-type x);   // (4) C++23
  constexpr floating-point-type
    exp2(floating-point-type x);   // (4) C++26

  double
    exp2(Integral x);              // (5) C++11
  constexpr double
    exp2(Integral x);              // (5) C++26

  float
    exp2f(float x);                // (6) C++17
  float
    exp2f(float x);                // (6) C++26

  long double
    exp2l(long double x);          // (7) C++17
  constexpr long double
    exp2l(long double x);          // (7) C++26
}
```
* Integral[italic]

## 概要
2 を底とする指数関数を求める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
2 の `x` 乗を返す。

`x` の絶対値が大きすぎる場合には、オーバーフローエラー、あるいはアンダーフローエラーとなり、戻り値は処理系定義である。（備考参照）


## 備考
- $$ f(x) = 2^x $$
- オーバーフローエラー、アンダーフローエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - `x = ±0` の場合、戻り値は `1` となる。
    - `x = -∞` の場合、戻り値は `+0` となる。
    - `x = +∞` の場合、戻り値は `+∞` となる。
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "exp2(0.0) = " << std::exp2(0.0) << std::endl;
  std::cout << "exp2(1.0) = " << std::exp2(1.0) << std::endl;
  std::cout << "exp2(3.0) = " << std::exp2(3.0) << std::endl;
  std::cout << "exp2(4.0) = " << std::exp2(4.0) << std::endl;
  std::cout << "exp2(+∞) = " << std::exp2(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "exp2(-∞) = " << std::exp2(-std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::exp2[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity[link ../limits/numeric_limits/infinity.md]

### 出力例
```
exp2(0.0) = 1.000000
exp2(1.0) = 2.000000
exp2(3.0) = 8.000000
exp2(4.0) = 16.000000
exp2(+∞) = inf
exp2(-∞) = 0.000000
```

## 実装例
```cpp
namespace std {
  double exp2(double x) {
    return std::pow(2.0, x);
  }

  float exp2(float x) {
    return std::pow(2.0f, x);
  }

  long double exp2(long double x) {
    return std::pow(2.0L, x);
  }
}
```
* std::pow[link pow.md]

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 2.9, 3.1
- [GCC](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0

#### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## 実装例
`exp` があれば、以下のように変換することで求められる。

$$ 2^x = e^{x \log_e 2} \quad \mathrm{for~all} \; x $$


## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
