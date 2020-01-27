# atanh
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float atanh(float x);
  double atanh(double x);
  long double atanh(long double x);

  double atanh(Integral x);          // C++17 から

  float atanhf(float x);             // C++17 から
  long double atanhl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
算術型の逆双曲線�接（エリアハイパボリックタンジェント、area hyperbolic tangent）を求める。


## 戻り値
引数 `x` の逆双曲線�接を返す。

`x` が `[-1, +1]` の範囲外だった場合は定義域エラーとなり、戻り値は処理系定義である。また、`x` が `-1` か `+1` と�しい場合には処理系によっては極エラーが起きる可能性がある。（備考参照）


## 備考
- $$ f(x) = \mathrm{artanh}~x $$
- 定義域エラー、あるいは、極エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）
	- `x = ±0` の場合、戻り値は `±0` となる。
	- `x = ±1` の場合、戻り値は `±∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼ�除算浮動小数点例外）が発生する。
	- `|x| > 1` の場合、戻り値は NaN となり、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。


## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "atanh(-1.0) = " << std::atanh(-1.0) << std::endl;
  std::cout << "atanh(-0.5) = " << std::atanh(-0.5) << std::endl;
  std::cout << "atanh(0.0)  = " << std::atanh(0.0) << std::endl;
  std::cout << "atanh(0.5)  = " << std::atanh(0.5) << std::endl;
  std::cout << "atanh(1.0)  = " << std::atanh(1.0) << std::endl;
}
```
* std::atanh[color ff0000]
* std::fixed[link ../ios/fixed.md]

### 出力例
```
atanh(-1.0) = -inf
atanh(-0.5) = -0.549306
atanh(0.0)  = 0.000000
atanh(0.5)  = 0.549306
atanh(1.0)  = inf
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 2.9, 3.1
- [GCC](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0

#### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


## 実装例
以下のマク�ーリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ \mathrm{artanh}~x = \sum_{n = 0}^{\infty} \frac{1}{2n + 1} x^{2n + 1} \quad \mathrm{for} \; |x| < 1 $$


または対数に変換して求めることができる。

$$ \mathrm{artanh}~x = \frac{1}{2} \log_e \frac{1 + x}{1 - x} \quad \mathrm{for} \; |x| < 1 $$
