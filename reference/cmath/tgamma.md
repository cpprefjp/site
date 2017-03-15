# tgamma
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]
* [mathjax enable]

```cpp
namespace std {
  float tgamma(float x);

  double tgamma(double x);

  long double tgamma(long double x);

  double tgamma(Integral x);
}
```
* Integral[italic]

## 概要
ガンマ関数を求める。


## 戻り値
引数 `x` のガンマ関数を返す。


## 備考
- $$ f(x) = \Gamma (x) $$
- ガンマ関数は階乗の一般化である。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - `x = ±0` の場合、戻り値は `±∞` となり、
    [`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する。
    - `x` が負の整数の場合、戻り値は NaN となり、
    [`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
    - `x = -∞` の場合、戻り値は NaN となり、
    [`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
    - `x = +∞` の場合、戻り値は `+∞` となる。
- `gamma` という関数は既にあったが処理系によって定義が違ったため、本当の (true) ガンマ関数 `tgamma` と名付けられた。


## 例
```cpp
#include <cmath>
#include <iostream>
#include <limits>

int main() {
  std::cout << std::fixed;
  std::cout << "tgamma(-∞)  = " << std::tgamma(-std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "tgamma(-1)  = " << std::tgamma(-1.0) << std::endl;
  std::cout << "tgamma(0)   = " << std::tgamma(0.0) << std::endl;
  std::cout << "tgamma(0.5) = " << std::tgamma(0.5) << std::endl; // sqrt(pi)
  std::cout << "tgamma(1)   = " << std::tgamma(1.0) << std::endl; // 0!
  std::cout << "tgamma(+∞)  = " << std::tgamma(std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::tgamma[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity()[link ../limits/numeric_limits/infinity.md]

### 出力例
```
tgamma(-∞)  = nan
tgamma(-1)  = nan
tgamma(0)   = inf
tgamma(0.5) = 1.772454
tgamma(2)   = 1.000000
tgamma(+∞)  = inf
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

#### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上
