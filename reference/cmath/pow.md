# pow
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float
    pow(float x,
        float y);               // (1) C++03からC++20まで
  double
    pow(double x,
        double y);              // (2) C++03からC++20まで
  long double
    pow(long double x,
        long double y);         // (3) C++03からC++20まで

  float
    pow(float x,
        int y);                 // (4) C++03まで
  double
    pow(double x,
        int y);                 // (5) C++03まで
  long double
    pow(long double x,
        int y);                 // (6) C++03まで

  floating-point-type
    pow(floating-point-type x,
        floating-point-type y); // (7) C++23
  constexpr floating-point-type
    pow(floating-point-type x,
        floating-point-type y); // (7) C++26

  Promoted
    pow(Arithmetic1 x,
        Arithmetic2 y);         // (8) C++11
  constexpr Promoted
    pow(Arithmetic1 x,
        Arithmetic2 y);         // (8) C++26

  float
    powf(float x,
         float y);              // (9) C++17
  constexpr float
    powf(float x,
         float y);              // (9) C++26

  long double
    powl(long double x,
         long double y);        // (10) C++17
  constexpr long double
    powl(long double x,
         long double y);        // (10) C++26
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

## 概要
`x` の `y` 乗を求める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : `float`に対するオーバーロードで、`int`型の`y`をとる
- (5) : `double`に対するオーバーロードで、`int`型の`y`をとる
- (6) : `long double`に対するオーバーロードで、`int`型の`y`をとる
- (7) : 浮動小数点数型に対するオーバーロード
- (8) : 算術型に対するオーバーロード (大きい精度にキャストして計算される。整数は`double`で計算される)
- (9) : `float`型規定
- (10) : `long double`型規定


## 戻り値
`x` を `y` 乗した値を返す。

`x` が負の有限値で `y` が有限値でかつ整数ではない場合には、定義域エラーが発生する。オーバーフローエラー、アンダーフローエラーが発生する可能性がある。`x` と `y` が両方ともゼロの場合には、定義域エラーが発生する可能性がある。`x` がゼロで `y` がゼロ未満の場合には、定義域エラーか極エラーが発生する可能性がある。


## 備考
- $$ f(x, y) = x^y $$
- 定義域エラー、極エラー、オーバーフローエラー、アンダーフローエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）
    - `x = ±0` で `y` が負の奇数の場合、戻り値は `±∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する。
    - `x = ±0` で `y` が有限でかつ負の奇数ではない場合、戻り値は `+∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する。
    - `x = ±0` で `y = -∞` の場合、戻り値は `+∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する可能性がある。
    - `x = ±0` で `y` が正の奇数の場合、戻り値は `±0` となる。
    - `x = ±0` で `y` が正でかつ奇数ではない場合、戻り値は `+0` となる。
    - `x = -1` で `y = ±∞` の場合、戻り値は `1` となる。
    - `x = 1` の場合、`y` にかかわらず戻り値は `1` となる（`y` が quiet NaN の場合を含む）。
    - `y = ±0` の場合、`x` にかかわらず戻り値は `1` となる（`x` が quiet NaN の場合を含む）。
    - `|x| < 1` で `y = -∞` の場合、戻り値は `+∞` となる。
    - `|x| > 1` で `y = -∞` の場合、戻り値は `+0` となる。
    - `|x| < 1` で `y = +∞` の場合、戻り値は `+0` となる。
    - `|x| > 1` で `y = +∞` の場合、戻り値は `+∞` となる。
    - `x = -∞` で `y` が負の奇数の場合、戻り値は `-0` となる。
    - `x = -∞` で `y` が負でかつ奇数ではない場合、戻り値は `+0` となる。
    - `x = -∞` で `y` が正の奇数の場合、戻り値は `-∞` となる。
    - `x = -∞` で `y` が正でかつ奇数ではない場合、戻り値は `+∞` となる。
    - `x = +∞` で `y < 0` の場合、戻り値は `+0` となる。
    - `x = +∞` で `y > 0` の場合、戻り値は `+∞` となる。
- C++23では、(1), (2), (3)が(7)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "pow(2.0, +∞)   = "
            << std::pow(2.0, std::numeric_limits<double>::infinity())
            << std::endl;
  std::cout << "pow(2.0, 2.0)  = " << std::pow(2.0, 2.0) << std::endl;
  std::cout << "pow(2.0, 1.0)  = " << std::pow(2.0, 1.0) << std::endl;
  std::cout << "pow(2.0, 0.5)  = " << std::pow(2.0, 0.5) << std::endl;
  std::cout << "pow(2.0, 0.0)  = " << std::pow(2.0, 0.0) << std::endl;
  std::cout << "pow(2.0, -0.5) = " << std::pow(2.0, -0.5) << std::endl;
  std::cout << "pow(2.0, -1.0) = " << std::pow(2.0, -1.0) << std::endl;
  std::cout << "pow(2.0, -2.0) = " << std::pow(2.0, -2.0) << std::endl;
  std::cout << "pow(2.0, -∞)   = "
            << std::pow(2.0, -std::numeric_limits<double>::infinity())
            << std::endl;
}
```
* std::pow[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity()[link ../limits/numeric_limits/infinity.md]

### 出力例
```
pow(2.0, +∞)   = inf
pow(2.0, 2.0)  = 4.000000
pow(2.0, 1.0)  = 2.000000
pow(2.0, 0.5)  = 1.414214
pow(2.0, 0.0)  = 1.000000
pow(2.0, -0.5) = 0.707107
pow(2.0, -1.0) = 0.500000
pow(2.0, -2.0) = 0.250000
pow(2.0, -∞)   = 0.000000
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
`exp` および `log` があれば、以下のように変換することで求められる。

$$ x^y = e^{y \log_e x} $$

ただし `x` が負数かつ `y` が整数に等しい場合などについては、別に計算する必要がある。

## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
