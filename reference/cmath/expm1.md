# expm1
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float expm1(float x);
  double expm1(double x);
  long double expm1(long double x);

  double expm1(Integral x);          // C++11 から

  float expm1f(float x);             // C++17 から
  long double expm1l(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
`e` (ネイピア数) を底とする指数関数から 1 を引いた値を求める。

引数が 0 近傍において `exp(x)-1` より高精度な計算になる。


## 戻り値
`e` (ネイピア数) の `x` 乗から 1 を引いた値を返す。

`x` の絶対値が大きすぎる場合には、オーバーフ�ーエラー、あるいはアンダーフ�ーエラーとなり、戻り値は処理系定義である。（備考参照）


## 備考
- $$ f(x) = e^x - 1 $$
- オーバーフ�ーエラー、アンダーフ�ーエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = ±0` の場合、戻り値は `±0` となる。（複号同順）
	- `x = -∞` の場合、戻り値は `-1` となる。
	- `x = +∞` の場合、戻り値は `+∞` となる。


## 例
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "expm1(0.0)  = " << std::expm1(0.0) << std::endl;
  std::cout << "expm1(0.01) = " << std::expm1(0.01) << std::endl;
  std::cout << "expm1(1.0)  = " << std::expm1(1.0) << std::endl;
  std::cout << "expm1(+∞)  = " << std::expm1(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "expm1(-∞)  = " << std::expm1(-std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::expm1[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity[link ../limits/numeric_limits/infinity.md]

### 出力例
```
expm1(0.0)  = 0.000000
expm1(0.01) = 0.010050
expm1(1.0)  = 1.718282
expm1(+∞)  = inf
expm1(-∞)  = -1.000000
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

