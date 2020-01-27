# tanh
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float tanh(float x);
  double tanh(double x);
  long double tanh(long double x);

  double tanh(Integral x);          // C++11 から

  float tanhf(float x);             // C++17 から
  long double tanhl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
算術型の双曲線�接（ハイパボリックタンジェント）を求める。


## 戻り値
引数 `x` の双曲線�接を返す。


## 備考
- $$ f(x) = \tanh x $$
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）
	- `x = ±0` の場合、戻り値は `±0` となる。
	- `x = ±∞` の場合、戻り値は `±1` となる。


## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "tanh(-1.0) = " << std::tanh(-1.0) << std::endl;
  std::cout << "tanh(0.0)  = " << std::tanh(0.0) << std::endl;
  std::cout << "tanh(1.0)  = " << std::tanh(1.0) << std::endl;
}
```
* std::tanh[color ff0000]
* std::fixed[link ../ios/fixed.md]

### 出力
```
tanh(-1.0) = -0.761594
tanh(0.0)  = 0.000000
tanh(1.0)  = 0.761594
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
`tanh` のマク�ーリン展開はベルヌーイ数が登場するため計算には向かない。

$$ \tanh x = \sum_{n = 1}^{\infty} \frac{B_{2n}4^n(4^n - 1)}{(2n)!} x^{2n - 1} \quad \mathrm{for} \; |x| < \frac{\pi}{2} $$

以下の公式から求めることができる。

$$ \tanh x = \frac{\sinh x}{\cosh x} $$
