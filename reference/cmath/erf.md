# erf
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]
* [mathjax enable]

```cpp
namespace std {
  float erf(float x);
  double erf(double x);
  long double erf(long double x);

  double erf(Integral x);

  float erff(float x);             // C++17 から
  long double erfl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
算術型の誤差関数 (error function) を求める。


## 戻り値
引数 `x` の誤差関数を返す。


## 備考
- $$ f(x) = \mathrm{erf}~x \equiv \frac{2}{\sqrt{\pi}} \int_0^x e^{-t^2} dt $$
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - `x = ±0` の場合、戻り値は `±0` となる。
    - `x = ±∞` の場合、戻り値は `±1` となる。
- 平均μ, 標準偏差σの�規分布の累積分布関数は $$\frac{1}{2} \left( 1 + \mathrm{erf} ~ \frac{x - \mu}{\sqrt{2} \sigma} \right)$$ で与えられる。


## 例
```cpp example
#include <cmath>
#include <iostream>
#include <limits>

int main() {
  std::cout << std::fixed;
  std::cout << "erf(-∞) = " << std::erf(-std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "erf(0)  = " << std::erf(0.0) << std::endl;
  std::cout << "erf(1)  = " << std::erf(1.0) << std::endl;
  std::cout << "erf(+∞) = " << std::erf(std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::erf[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity()[link ../limits/numeric_limits/infinity.md]

### 出力例
```
erf(-∞) = -1.000000
erf(0)  = 0.000000
erf(1)  = 0.842701
erf(+∞) = 1.000000
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
