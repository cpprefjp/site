#sin
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float sin(float x);

  double sin(double x);

  long double sin(long double x);

  double sin(Integral x);   // C++11
}
```
* Integral[italic]

##概要
算術型の正弦（サイン）を求める。


##戻り値
引数 `x` の正弦を返す(`x`の単位はラジアン)。


##備考
- $$ f(x) = \sin x $$
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。

	- `x = ±0` の場合、`±0` が返る。（複号同順）
	- `x = ±∞` の場合、quiet NaN（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`quiet_NaN`](../limits/numeric_limits/quiet_nan.md)`()`）が返り、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。

##例
```cpp
#include <cmath>
#include <iostream>

int main() {
  static const double pi = 3.141592653589793;
  std::cout << std::fixed;
  std::cout << "sin(0.0)  = " << std::sin(0.0) << std::endl;
  std::cout << "sin(pi/6) = " << std::sin(pi/6) << std::endl;
  std::cout << "sin(pi/4) = " << std::sin(pi/4) << std::endl;
  std::cout << "sin(pi/3) = " << std::sin(pi/3) << std::endl;
  std::cout << "sin(pi/2) = " << std::sin(pi/2) << std::endl;
  std::cout << "sin(pi)   = " << std::sin(pi) << std::endl;
}
```
* <cmath>[link ../cmath.md]
* std::sin[color ff0000]
* std::fixed[link ../ios/fixed.md]

###出力
```
sin(0.0)  = 0.000000
sin(pi/6) = 0.500000
sin(pi/4) = 0.707107
sin(pi/3) = 0.866025
sin(pi/2) = 1.000000
sin(pi)   = 0.000000
```

##バージョン
###言語
- C++03
- C++11

###処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp) 7.1, 8.0, 9.0, 10.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##実装例
以下のマクローリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ \sin x = \sum_{n = 0}^{\infty} \frac{(-1)^n}{(2n + 1)!} x^{2n + 1} \quad \mathrm{for~all} \; x $$
