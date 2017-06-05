# asinh
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float asinh(float x);
  double asinh(double x);
  long double asinh(long double x);

  double asinh(Integral x);          // C++11 から

  float asinhf(float x);             // C++17 から
  long double asinhl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
算術型の逆双曲線正弦（エリアハイパボリックサイン、area hyperbolic sine）を求める。


## 戻り値
引数 `x` の逆双曲線正弦を返す。


## 備考
- $$ f(x) = \mathrm{arsinh}~x $$
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）
	- `x = ±0` の場合、戻り値は `±0` となる。
	- `x = ±∞` の場合、戻り値は `±∞` となる。


## 例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "asinh(-1.0) = " << std::asinh(-1.0) << std::endl;
  std::cout << "asinh(0.0)  = " << std::asinh(0.0) << std::endl;
  std::cout << "asinh(1.0)  = " << std::asinh(1.0) << std::endl;
}
```
* std::asinh[color ff0000]
* std::fixed[link ../ios/fixed.md]

### 出力
```
asinh(-1.0) = -0.881374
asinh(0.0)  = 0.000000
asinh(1.0)  = 0.881374
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
以下のマクローリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ \mathrm{arsinh}~x = \sum_{n = 0}^{\infty} \frac{(-1)^n (2n)!}{4^n (n!)^2 (2n + 1)} x^{2n + 1} \quad \mathrm{for} \; |x| < 1 $$


または対数に変換して求めることができる。

$$ \mathrm{arsinh}~x = \log_e \left(x + \sqrt{x^2+1}\right) \quad \mathrm{for~all} \; x $$
