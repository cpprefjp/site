# fabs
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float fabs(float x);              // (1) C++03からC++20まで
  double fabs(double x);            // (2) C++03からC++20まで
  long double fabs(long double x);  // (3) C++03からC++20まで

  constexpr floating-point-type
    fabs(floating-point-type x);    // (4) C++23

  double
    fabs(Integral x);               // (5) C++11
  constexpr double
    fabs(Integral x);               // (5) C++23

  float
    fabsf(float x);                 // (6) C++17
  constexpr float
    fabsf(float x);                 // (6) C++23

  long double
    fabsl(long double x);           // (7) C++17
  constexpr long double
    fabsl(long double x);           // (7) C++23
}
```
* Integral[italic]

## 概要
算術型の絶対値を求める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` の絶対値を返す。

`x` が `±∞` だった場合 `+∞` を返す。


## 備考
- $$ f(x) = | x | $$
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md) `!= false`）、以下の規定が追加される。
- `value = ±0` の場合、戻り値は `+0` となる。
- `value = ±∞` の場合、戻り値は `+∞` となる。
- 戻り値は正確で、現在の丸め方式には依存しない。
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "fabs(1.5)  = " << std::fabs(1.5) << std::endl;
  std::cout << "fabs(-1.5) = " << std::fabs(-1.5) << std::endl;
  std::cout << "fabs(0.0)  = " << std::fabs(0.0) << std::endl;
  std::cout << "fabs(-0.0) = " << std::fabs(-0.0) << std::endl;
  std::cout << "fabs(+∞)   = " << std::fabs(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "fabs(-∞)   = " << std::fabs(-std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::fixed[link ../ios/fixed.md]
* std::fabs[color ff0000]
* infinity[link ../limits/numeric_limits/infinity.md]

### 出力例
```
fabs(1.5)  = 1.500000
fabs(-1.5) = 1.500000
fabs(0.0)  = 0.000000
fabs(-0.0) = 0.000000
fabs(+∞)   = inf
fabs(-∞)   = inf
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
```cpp
namespace std {
  float fabs(float x) {
    return signbit(x) ? -x : x;
  }

  double fabs(double x) {
    return signbit(x) ? -x : x;
  }

  long double fabs(long double x) {
    return signbit(x) ? -x : x;
  }

  template<class Integral>
  typename enable_if<is_integral<Integral>::value, double>::type
  fabs(Integral x) {
    return fabs(static_cast<double>(x));
  }
}
```
* fabs[color ff0000]
* signbit[link signbit.md]
* is_integral[link ../type_traits/is_integral.md]
* enable_if[link ../type_traits/enable_if.md]

## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
