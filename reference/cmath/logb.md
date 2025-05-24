# logb
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float logb(float x);              // (1) C++11からC++20まで
  double logb(double x);            // (2) C++11からC++20まで
  long double logb(long double x);  // (3) C++11からC++20まで

  constexpr floating-point-type
    logb(floating-point-type x);    // (4) C++23

  double
    logb(Integral);                 // (5) C++11
  constexpr double
    logb(Integral);                 // (5) C++23

  float
    logbf(float x);                 // (6) C++17
  constexpr float
    logbf(float x);                 // (6) C++23

  long double
    logbl(long double x);           // (7) C++17
  constexpr long double
    logbl(long double x);           // (7) C++23
}
```
* Integral[italic]

## 概要
`logb`関数(log binary)は、浮動小数点数 `x` の指数部である符号付き整数を、浮動小数点形式で返す。

`log` が名前に入っているが、通常の対数関数と異なり、引数の符号は無視されることに注意。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
`|x| *` [`FLT_RADIX`](/reference/cfloat/flt_radix.md)<code><sup>-logb(x)</sup></code> が範囲 `[1,` [`FLT_RADIX`](/reference/cfloat/flt_radix.md)`)` に収まるように指数を求めて返す。（非正規化数の場合でも正しい値が返る）

`x`がゼロの場合には、処理系によっては定義域エラーか極エラーが発生する。（備考参照）


## 備考
- 定義域エラー、極エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = ±0` の場合、戻り値は `-∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する。
	- `x = ±∞` の場合、戻り値は `+∞` となる。
	- 戻り値は正確で、現在の丸め方式に依存しない。
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main()
{
  std::cout << "logb(48.0)   = " << std::logb(48.0) << std::endl;
  std::cout << "logb(-48.0)  = " << std::logb(-48.0) << std::endl;
  std::cout << "logb(+∞)     = " << std::logb(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "logb(-∞)     = " << std::logb(-std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "logb(0.0)    = " << std::logb(0.0) << std::endl;
  std::cout << "logb(1e-309) = " << std::logb(1e-309) << std::endl;
}
```
* std::logb[color ff0000]
* infinity()[link ../limits/numeric_limits/infinity.md]

### 出力例
```
logb(48.0)   = 5
logb(-48.0)  = 5
logb(+∞)     = inf
logb(-∞)     = inf
logb(0.0)    = -inf
logb(1e-309) = -1027
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
