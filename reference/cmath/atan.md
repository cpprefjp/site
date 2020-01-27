# atan
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float atan(float x);
  double atan(double x);
  long double atan(long double x);

  double atan(Integral x);          // C++11 から

  float atanf(float x);             // C++17 から
  long double atanl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
算術型の逆�接（アークタンジェント、arc tangent）を求める。

`atan()`は、�接を表す[`tan()`](tan.md)の逆関数である。$\tan(\mathrm{Arctan}~x) = x$、$\mathrm{Arctan}~(\tan x) = x ~ (x \in [-\pi/2, \pi/2])$である。


## 戻り値
引数 `x` の逆�接を主値 `[-π/2, π/2]` の範囲で返す。（単位はラジアン）


## 備考
- $$ f(x) = \mathrm{Arctan}~x $$
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = ±0` の場合、戻り値は `±0` となる。（複号同順）
	- `x = ±∞` の場合、戻り値は `±π/2` となる。（複号同順）


## 例
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "atan(0.0)   = " << std::atan(0.0) << std::endl;
  std::cout << "atan(0.5)   = " << std::atan(0.5) << std::endl;
  std::cout << "atan(1/√2) = " << std::atan(1.0 / std::sqrt(2.0)) << std::endl;
  std::cout << "atan(√3/2) = " << std::atan(std::sqrt(3.0) / 2.0) << std::endl;
  std::cout << "atan(1.0)   = " << std::atan(1.0) << std::endl;
  std::cout << "atan(∞)    = " << std::atan(std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::atan[color ff0000]
* std::sqrt[link sqrt.md]
* std::fixed[link ../ios/fixed.md]
* infinity[link ../limits/numeric_limits/infinity.md]

### 出力例
```
atan(0.0)   = 0.000000
atan(0.5)   = 0.463648
atan(1/√2) = 0.615480
atan(√3/2) = 0.713724
atan(1.0)   = 0.785398
atan(∞)    = 1.570796
```

## バージョン
### 言語
- C++03

### 処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp): 2003, 2005, 2008, 2010

#### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


## 実装例
以下のマク�ーリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ \mathrm{Arctan}~x = \sum_{n = 0}^{\infty} \frac{(-1)^n}{2n + 1} x^{2n + 1} \quad \mathrm{for} \; |x| < 1 $$


$ |x| \ge 1 $ の範囲、および $ |x| \rightarrow 1 $ 近傍の精度低下する領域においては、以下の公式による変換で求めることができる。

（特に $ \sqrt{2} + 1 < |x| $ の場合）

$$ \mathrm{Arctan}~x = \frac{\pi}{2} - \mathrm{Arctan}~\frac{1}{x} \quad \mathrm{for} \; x > 0 $$


（特に $ \sqrt{2} - 1 < |x| \le \sqrt{2} + 1 $ の場合）

$$ \mathrm{Arctan}~x = \frac{\pi}{4} + \mathrm{Arctan}~\frac{x - 1}{x + 1} \quad \mathrm{for} \; x \ne -1 $$
