# cosh
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float cosh(float x);
  double cosh(double x);
  long double cosh(long double x);

  double cosh(Integral x);          // C++11 から

  float coshf(float x);             // C++17 から
  long double coshl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
算術型の双曲線余弦（ハイパボリックコサイン）を求める。


## 戻り値
引数 `x` の双曲線余弦を返す。

`x` の絶対値が大きすぎる場合にはオーバーフ�ーエラーが発生する。


## 備考
- $$ f(x) = \cosh x $$
- オーバーフ�ーエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = ±0` の場合、戻り値は `1` となる。
	- `x = ±∞` の場合、戻り値は `+∞` となる。


## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "cosh(-1.0) = " << std::cosh(-1.0) << std::endl;
  std::cout << "cosh(0.0)  = " << std::cosh(0.0) << std::endl;
  std::cout << "cosh(1.0)  = " << std::cosh(1.0) << std::endl;
}
```
* std::cosh[color ff0000]
* std::fixed[link ../ios/fixed.md]

### 出力
```
cosh(-1.0) = 1.543081
cosh(0.0)  = 1.000000
cosh(1.0)  = 1.543081
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

$$ \cosh x = \sum_{n = 0}^{\infty} \frac{1}{(2n)!} x^{2n} \quad \mathrm{for~all} \; x $$
