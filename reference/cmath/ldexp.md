# ldexp
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  float ldexp(float x, int exp);                // (1) C++03からC++20まで
  double ldexp(double x, int exp);              // (2) C++03からC++20まで
  long double ldexp(long double x, int exp);    // (3) C++03からC++20まで

  constexpr floating-point-type
    ldexp(floating-point-type x, int exp);      // (4) C++23

  double
    ldexp(Integral x, int exp);                 // (5) C++11
  constexpr double
    ldexp(Integral x, int exp);                 // (5) C++23

  float
    ldexpf(float x, int exp);                   // (6) C++17
  constexpr float
    ldexpf(float x, int exp);                   // (6) C++23

  long double
    ldexpl(long double x, int exp);             // (7) C++17
  constexpr long double
    ldexpl(long double x, int exp);             // (7) C++23
}
```
* Integral[italic]

## 概要
`ldexp`関数 (load exponent)は、`x`に2の`exp`乗を掛けた値を計算する。

この関数は、ビット操作をすることなく、仮数部と指数部を指定して浮動小数点の値を作り出すために使用できる。第1引数`x`に仮数部、第2引数`exp`に指数部の値をそれぞれ設定することで、それらの要素を持つ浮動小数点数が返される。

この関数と反対に、[`std::frexp()`](frexp.md)関数を使用することで、浮動小数点数を仮数部と指数部に分解できる。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
<code>x * 2<sup>exp</sup></code>

オーバーフローエラー、アンダーフローエラーが発生する可能性がある。


## 備考
- オーバーフローエラー、アンダーフローエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、かつ、基数が 2 の場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`radix`](../limits/numeric_limits/radix.md)`() == 2`）、[`scalbn`](scalbn.md)`(x, exp)` と等価である。
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <iostream>
#include <iomanip>
#include <cmath>

int main()
{
  // 3.0 * (2^4)
  double result = std::ldexp(3.0, 4);
  std::cout << result << std::endl;

  // 円周率
  double pi = std::ldexp(std::acos(0.0), 1);
  std::cout << std::setprecision(8) << pi << std::endl;
}
```
* std::ldexp[color ff0000]
* std::acos[link acos.md]
* std::setprecision[link /reference/iomanip/setprecision.md]

### 出力
```
48
3.1415927
```

### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## 実装例
```cpp
namespace std {
  double ldexp(double x, int exp)
  {
    return x * std::pow(2.0, exp);
  }

  float ldexp(float x, int exp)
  {
    return x * std::pow(2.0f, exp);
  }

  long double ldexp(long double x, int exp)
  {
    return x * std::pow(2.0L, exp);
  }
}
```
* std::pow[link pow.md]

## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
