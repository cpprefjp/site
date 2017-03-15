# log1p
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float log1p(float x);

  double log1p(double x);

  long double log1p(long double x);

  double log1p(Integral x);
}
```
* Integral[italic]

## 概要
引数に 1 を足した値の、`e` (ネイピア数) を底とする自然対数を求める。

引数が 0 近傍において [`log`](log.md)`(1 + x)` より高精度な計算になる。


## 戻り値
引数 `x` に対して `1 + x` の `e` (ネイピア数) を底とする自然対数を返す。

`x < -1` の場合には、定義域エラーとなり、戻り値は処理系定義である。`x = -1` の場合には、処理系によっては極エラーとなり、戻り値は処理系定義である。（備考参照）


## 備考
- $$ f(x) = \log_e (1 + x) $$
- 定義域エラー、極エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = ±0` の場合、戻り値は `±0` となる。
	- `x = -1` の場合、戻り値は `-∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する。
	- `x < -1` の場合、戻り値は quiet NaN となり、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
	- `x = +∞` の場合、戻り値は `+∞` となる。


## 例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  static const double e = 2.718281828459045;
  std::cout << std::fixed;
  std::cout << "log1p(0.0)  = " << std::log1p(0.0) << std::endl;
  std::cout << "log1p(0.01) = " << std::log1p(0.01) << std::endl;
  std::cout << "log1p(-1.0) = " << std::log1p(-1.0) << std::endl;
  std::cout << "log1p(e-1)  = " << std::log1p(e-1) << std::endl;
  std::cout << "log1p(+∞)  = " << std::log1p(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "log1p(-2.0) = " << std::log1p(-2.0) << std::endl;
}
```
* std::log1p[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity()[link ../limits/numeric_limits/infinity.md]

### 出力例
```
log1p(0.0)  = 0.000000
log1p(0.01) = 0.009950
log1p(-1.0) = -inf
log1p(e-1)  = 1.000000
log1p(+∞)  = inf
log1p(-2.0) = -nan
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
