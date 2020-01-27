# log
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float log(float x);
  double log(double x);
  long double log(long double x);

  double log(Integral x);          // C++11 から

  float logf(float x);             // C++17 から
  long double logl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
`e` (ネイピア数) を底とする自然対数を求める。logは「logarithm (対数)」の略である。


## 戻り値
引数 `x` の `e` (ネイピア数) を底とする自然対数を返す。

`x` が負の場合には、定義域エラーとなり、戻り値は処理系定義である。`x` がゼ�の場合には、処理系によっては極エラーとなり、戻り値は処理系定義である。（備考参照）


## 備考
- $$ f(x) = \log_e x $$
- 定義域エラー、極エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = ±0` の場合、戻り値は `-∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼ�除算浮動小数点例外）が発生する。
	- `x = 1` の場合、戻り値は `+0` となる。
	- `x < 0` の場合、戻り値は quiet NaN となり、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
	- `x = +∞` の場合、戻り値は `+∞` となる。


## 例
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  static const double e = 2.718281828459045;
  std::cout << std::fixed;
  std::cout << "log(0.0)  = " << std::log(0.0) << std::endl;
  std::cout << "log(e)    = " << std::log(e) << std::endl;
  std::cout << "log(+∞)  = " << std::log(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "log(-1.0) = " << std::log(-1.0) << std::endl;
}
```
* std::log[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity[link ../limits/numeric_limits/infinity.md]

### 出力例
```
log(0.0)  = -inf
log(e)    = 1.000000
log(+∞)  = inf
log(-1.0) = nan
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

$$ \log_e (1 + x) = \sum_{n = 1}^{\infty} \frac{(-1)^{n + 1}}{n} x^n \quad \mathrm{for} \; -1 < x \le 1 $$
