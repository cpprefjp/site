# acosh
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float acosh(float x);
  double acosh(double x);
  long double acosh(long double x);

  double acosh(Integral x);          // C++11 から

  float acoshf(float x);             // C++17 から
  long double acoshl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
算術型の逆双曲線余弦（エリアハイパボリックコサイン、area hyperbolic cosine）を求める。


## 戻り値
引数 `x` の逆双曲線余弦を `[0, +∞]` の範囲で返す。

`x < 1` だった場合は定義域エラーとなり、戻り値は処理系定義である。（備考参照）


## 備考
- $$ f(x) = \mathrm{arcosh}~x $$
- 定義域エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = 1` の場合、戻り値は `+0` となる。
	- `x < 1` の場合、戻り値は quiet NaN となり、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
	- `x = +∞` の場合、戻り値は `+∞` となる。


## 例
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "acosh(1.0) = " << std::acosh(1.0) << std::endl;
  std::cout << "acosh(2.0) = " << std::acosh(2.0) << std::endl;
  std::cout << "acosh(∞)  = " << std::acosh(std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::acosh[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity[link ../limits/numeric_limits/infinity.md]

### 出力例
```
acosh(1.0) = 0.000000
acosh(2.0) = 1.316958
acosh(∞)  = inf
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 2.9, 3.1
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0

#### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上

## 実装例
対数に変換して求めることができる。

$$ \mathrm{arcosh}~x = \log_e \left(x + \sqrt{x^2-1}\right) \quad \mathrm{for} \; 1 < x $$
