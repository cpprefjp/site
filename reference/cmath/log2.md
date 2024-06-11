# log2
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float log2(float x);             // (1) C++11からC++20まで
  double log2(double x);           // (2) C++11からC++20まで
  long double log2(long double x); // (3) C++11からC++20まで

  floating-point-type
    log2(floating-point-type x);   // (4) C++23
  constexpr floating-point-type
    log2(floating-point-type x);   // (4) C++26

  double
    log2(Integral x);              // (5) C++11
  constexpr double
    log2(Integral x);              // (5) C++26

  float
    log2f(float x);                // (6) C++17
  constexpr float
    log2f(float x);                // (6) C++26

  long double
    log2l(long double x);          // (7) C++17
  constexpr long double
    log2l(long double x);          // (7) C++26
}
```
* Integral[italic]

## 概要
2 を底とする二進対数を求める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` の 2 を底とする二進対数を返す。

`x` が負の場合には、定義域エラーとなり、戻り値は処理系定義である。`x` がゼロの場合には、処理系によっては極エラーとなり、戻り値は処理系定義である。（備考参照）


## 備考
- $$ f(x) = \log_2 x $$
- 定義域エラー、極エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - `x = ±0` の場合、戻り値は `-∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する。
    - `x = 1` の場合、戻り値は `+0` となる。
    - `x < 0` の場合、戻り値は quiet NaN となり、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
    - `x = +∞` の場合、戻り値は `+∞` となる。
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
## 基本的な使い方
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "log2(0.0)  = " << std::log2(0.0) << std::endl;
  std::cout << "log2(2)    = " << std::log2(2) << std::endl;
  std::cout << "log2(+∞)  = " << std::log2(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "log2(-1.0) = " << std::log2(-1.0) << std::endl;
}
```
* std::log2[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity[link ../limits/numeric_limits/infinity.md]

#### 出力例
```
log2(0.0)  = -inf
log2(2)    = 1.000000
log2(+∞)  = inf
log2(-1.0) = nan
```

### Nが2の何乗か調べる
```cpp example
#include <iostream>
#include <cmath>

int main()
{
  for (int i = 1; i <= 32; i++) {
    double result = std::log2(i);

    // 小数部が0だったら、iは2の乗数
    double integral_part = 0.0;
    double fractional_part = std::modf(result, &integral_part);
    bool is_pow_of_2 = fractional_part == 0.0;

    std::cout << "log2(" << i << ") : "
              << result
              << (is_pow_of_2 ? ", power of 2" : "")
              << std::endl;
  }
}
```
* std::log2[color ff0000]
* std::modf[link modf.md]

#### 出力
```
log2(1) : 0, power of 2
log2(2) : 1, power of 2
log2(3) : 1.58496
log2(4) : 2, power of 2
log2(5) : 2.32193
log2(6) : 2.58496
log2(7) : 2.80735
log2(8) : 3, power of 2
log2(9) : 3.16993
log2(10) : 3.32193
log2(11) : 3.45943
log2(12) : 3.58496
log2(13) : 3.70044
log2(14) : 3.80735
log2(15) : 3.90689
log2(16) : 4, power of 2
log2(17) : 4.08746
log2(18) : 4.16993
log2(19) : 4.24793
log2(20) : 4.32193
log2(21) : 4.39232
log2(22) : 4.45943
log2(23) : 4.52356
log2(24) : 4.58496
log2(25) : 4.64386
log2(26) : 4.70044
log2(27) : 4.75489
log2(28) : 4.80735
log2(29) : 4.85798
log2(30) : 4.90689
log2(31) : 4.9542
log2(32) : 5, power of 2
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
[`log`](log.md) があれば、以下のように変換することで求められる。

$$ \log_2 x = \frac{\log_e x}{\log_e 2}$$


## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
