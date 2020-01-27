# lgamma
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]
* [mathjax enable]

```cpp
namespace std {
  float lgamma(float x);
  double lgamma(double x);
  long double lgamma(long double x);

  double lgamma(Integral x);

  float lgammaf(float x);             // C++17 から
  long double lgammal(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
ガンマ関数の絶対値の自然対数を求める。


## 戻り値
引数 `x` のガンマ関数の絶対値の自然対数を返す。


## 備考
- $$ f(x) = \ln | \Gamma (x) | $$
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - `x = 1` の場合、戻り値は `+0` となる。
    - `x = 2` の場合、戻り値は `+0` となる。
    - `x` が非�整数の場合、戻り値は `±∞` となり、
    [`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼ�除算浮動小数点例外）が発生する。
    - `x = -∞` の場合、戻り値は `+∞` となる。
    - `x = +∞` の場合、戻り値は `+∞` となる。


## 例
```cpp example
#include <cmath>
#include <iostream>
#include <limits>

int main() {
  std::cout << std::fixed;
  std::cout << "lgamma(-∞)  = " << std::lgamma(-std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "lgamma(-1)  = " << std::lgamma(-1.0) << std::endl;
  std::cout << "lgamma(0)   = " << std::lgamma(0.0) << std::endl;
  std::cout << "lgamma(0.5) = " << std::lgamma(0.5) << std::endl;
  std::cout << "lgamma(1)   = " << std::lgamma(1.0) << std::endl;
  std::cout << "lgamma(+∞)  = " << std::lgamma(std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::lgamma[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity()[link ../limits/numeric_limits/infinity.md]

### 出力例
```
lgamma(-∞)  = inf
lgamma(-1)  = inf
lgamma(0)   = inf
lgamma(0.5) = 0.572365
lgamma(1)   = 0.000000
lgamma(+∞)  = inf
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

#### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上
