# exp
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float exp(float x);

  double exp(double x);

  long double exp(long double x);

  double exp(Integral x);   // C++11
}
```
* Integral[italic]

## 概要
`e` (ネイピア数) を底とする指数関数を求める。


## 戻り値
`e` (ネイピア数) の `x` 乗を返す。

`x` の絶対値が大きすぎる場合には、オーバーフローエラー、あるいはアンダーフローエラーとなり、戻り値は処理系定義である。（備考参照）


## 備考
- $$ f(x) = e^x $$
- オーバーフローエラー、アンダーフローエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = ±0` の場合、戻り値は `1` となる。
	- `x = -∞` の場合、戻り値は `+0` となる。
	- `x = +∞` の場合、戻り値は `+∞` となる。


## 例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "exp(0.0) = " << std::exp(0.0) << std::endl;
  std::cout << "exp(1.0) = " << std::exp(1.0) << std::endl;
  std::cout << "exp(+∞) = " << std::exp(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "exp(-∞) = " << std::exp(-std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::exp[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity[link ../limits/numeric_limits/infinity.md]

### 出力例
```
exp(0.0) = 1.000000
exp(1.0) = 2.718282
exp(+∞) = inf
exp(-∞) = 0.000000
```

## バージョン
### 言語
- C++03
- C++11

### 処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp) 7.1, 8.0, 9.0, 10.0

#### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


## 実装例
以下のマクローリン級数を適当な次数で打ち切ることで近似的に求めることができる。

$$ e^x = \sum_{n = 0}^{\infty} \frac{x^n}{n!} \quad \mathrm{for~all} \; x $$
