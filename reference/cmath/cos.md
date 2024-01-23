# cos
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float cos(float x);             // (1) C++03からC++20まで
  double cos(double x);           // (2) C++03からC++20まで
  long double cos(long double x); // (3) C++03からC++20まで

  floating-point-type
    cos(floating-point-type x);   // (4) C++23
  constexpr floating-point-type
    cos(floating-point-type x);   // (4) C++26

  double
    cos(Integral x);              // (5) C++11
  constexpr double
    cos(Integral x);              // (5) C++26

  float
    cosf(float x);                // (6) C++17
  constexpr float
    cosf(float x);                // (6) C++26

  long double
    cosl(long double x);          // (7) C++17
  constexpr long double
    cosl(long double x);          // (7) C++26
}
```
* Integral[italic]

## 概要
算術型の余弦（コサイン）を求める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` の余弦を返す(`x`の単位はラジアン)。


## 備考
- $$ f(x) = \cos x $$
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - `x = ±0` の場合、戻り値は `1` となる。
    - `x = ±∞` の場合、戻り値は quiet NaN となり、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
### 基本的な使い方
```cpp example
#include <cmath>
#include <iostream>

int main() {
  static const double pi = 3.141592653589793;
  std::cout << std::fixed;
  std::cout << "cos(0.0)  = " << std::cos(0.0) << std::endl;
  std::cout << "cos(pi/6) = " << std::cos(pi/6) << std::endl;
  std::cout << "cos(pi/4) = " << std::cos(pi/4) << std::endl;
  std::cout << "cos(pi/3) = " << std::cos(pi/3) << std::endl;
  std::cout << "cos(pi/2) = " << std::cos(pi/2) << std::endl;
  std::cout << "cos(pi)   = " << std::cos(pi) << std::endl;
}
```
* std::cos[color ff0000]
* std::fixed[link ../ios/fixed.md]

#### 出力例
```
cos(0.0)  = 1.000000
cos(pi/6) = 0.866025
cos(pi/4) = 0.707107
cos(pi/3) = 0.500000
cos(pi/2) = 0.000000
cos(pi)   = -1.000000
```

### 値の遷移
```cpp example
#include <fstream>
#include <cmath>

int main()
{
  static const double pi = 3.141592653589793;
  std::ofstream file("cos.tsv");
  for (double x = -3.0*pi; x <= 3.0*pi; x += 0.1) {
    file << x << "\t" << std::cos(x) << "\n";
  }
}
```

この例で得られた値の遷移は、以下の図のようになる：

![](https://raw.githubusercontent.com/cpprefjp/image/master/reference/cmath/cos/cos.png)

この値の遷移は、[`sin()`](sin.md)関数の[正弦波, サインカーブ](https://ja.wikipedia.org/wiki/%E6%AD%A3%E5%BC%A6%E6%B3%A2)をπ/2 (90°)だけずらしたものとなっている。引数が0のときに結果が1になるため、値の遷移として使用する場合には、[`sin()`](sin.md)関数よりも`cos()`関数の方が使いやすいことがある。


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
以下のマクローリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ \cos x = \sum_{n = 0}^{\infty} \frac{(-1)^n}{(2n)!} x^{2n} \quad \mathrm{for~all} \; x $$


## 関連項目
- [`std::numbers::pi`](/reference/numbers/pi.md)


## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
