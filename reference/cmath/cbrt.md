# cbrt
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float cbrt(float x);

  double cbrt(double x);

  long double cbrt(long double x);

  double cbrt(Integral x);
}
```
* Integral[italic]

## 概要
算術型の実数の立方根を求める。


## 戻り値
引数 `x` の実数の立方根を返す。


## 備考
- $$ f(x) = \sqrt[3] x $$
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）
	- `x = ±0` の場合、戻り値は `±0` となる。
	- `x = ±∞` の場合、戻り値は `±∞` となる。


## 例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "cbrt(0.0)  = " << std::cbrt(0.0) << std::endl;
  std::cout << "cbrt(1.0)  = " << std::cbrt(1.0) << std::endl;
  std::cout << "cbrt(2.0)  = " << std::cbrt(2.0) << std::endl;
  std::cout << "cbrt(8.0)  = " << std::cbrt(8.0) << std::endl;
  std::cout << "cbrt(+∞)   = " << std::cbrt(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "cbrt(-1.0) = " << std::cbrt(-1.0) << std::endl;
}
```
* std::cbrt[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity[link ../limits/numeric_limits/infinity.md]

### 出力例
```
cbrt(0.0)  = 0.000000
cbrt(1.0)  = 1.000000
cbrt(2.0)  = 1.259921
cbrt(8.0)  = 2.000000
cbrt(+∞)   = inf
cbrt(-1.0) = -1.000000
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang):  2.9, 3.1
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0

#### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


