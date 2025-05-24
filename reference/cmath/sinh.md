# sinh
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float sinh(float x);             // (1) C++03からC++20まで
  double sinh(double x);           // (2) C++03からC++20まで
  long double sinh(long double x); // (3) C++03からC++20まで

  floating-point-type
    sinh(floating-point-type x);   // (4) C++23
  constexpr floating-point-type
    sinh(floating-point-type x);   // (4) C++26

  double
    sinh(Integral x);              // (5) C++11
  constexpr double
    sinh(Integral x);              // (5) C++26

  float
    sinhf(float x);                // (6) C++17
  constexpr float
    sinhf(float x);                // (6) C++26

  long double
    sinhl(long double x);          // (7) C++17
  constexpr long double
    sinhl(long double x);          // (7) C++26
}
```
* Integral[italic]

## 概要
算術型の双曲線正弦（ハイパボリックサイン）を求める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` の双曲線正弦を返す。

`x` の絶対値が大きすぎる場合にはオーバーフローエラーが発生する。


## 備考
- $$ f(x) = \sinh x $$
- オーバーフローエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）
    - `x = ±0` の場合、戻り値は `±0` となる。
    - `x = ±∞` の場合、戻り値は `±∞` となる。
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "sinh(-1.0) = " << std::sinh(-1.0) << std::endl;
  std::cout << "sinh(0.0)  = " << std::sinh(0.0) << std::endl;
  std::cout << "sinh(1.0)  = " << std::sinh(1.0) << std::endl;
}
```
* std::sinh[color ff0000]
* std::fixed[link ../ios/fixed.md]

### 出力
```
sinh(-1.0) = -1.175201
sinh(0.0)  = 0.000000
sinh(1.0)  = 1.175201
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
以下のマクローリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ \sinh x = \sum_{n = 0}^{\infty} \frac{1}{(2n + 1)!} x^{2n + 1} \quad \mathrm{for~all} \; x $$


## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
- [P1383R2 More constexpr for `<cmath>` and `<complex>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1383r2.pdf)
    - C++26で`constexpr`対応した
