# erfc
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]
* [mathjax enable]

```cpp
namespace std {
  float erfc(float x);
  double erfc(double x);
  long double erfc(long double x);

  double erfc(Integral x);

  float erfcf(float x);             // C++17 から
  long double erfcl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
算術型の相補誤差関数 (complementary error function) を求める。


## 戻り値
引数 `x` の相補誤差関数を返す。

`x` が大き過ぎる場合はアンダーフ�ーエラーとなる。

## 備考
- $$ f(x) = \mathrm{erfc}~x \equiv 1 - \mathrm{erf}~x \equiv \frac{2}{\sqrt{\pi}} \int_x^\infty e^{-t^2} dt $$
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - `x = -∞` の場合、戻り値は `2` となる。
    - `x = +∞` の場合、戻り値は `+0` となる。


## 例
```cpp example
#include <cmath>
#include <iostream>
#include <limits>

int main() {
  std::cout << std::fixed;
  std::cout << "erfc(-∞) = " << std::erfc(-std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "erfc(0)  = " << std::erfc(0.0) << std::endl;
  std::cout << "erfc(1)  = " << std::erfc(1.0) << std::endl;
  std::cout << "erfc(+∞) = " << std::erfc(std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::erfc[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity()[link ../limits/numeric_limits/infinity.md]

### 出力例
```
erfc(-∞) = 2.000000
erfc(0)  = 1.000000
erfc(1)  = 0.157299
erfc(+∞) = 0.000000
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
