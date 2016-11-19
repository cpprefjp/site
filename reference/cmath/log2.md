#log2
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]
* cpp11[meta cpp]

```cpp
namespace std {
  float log2(float x);

  double log2(double x);

  long double log2(long double x);

  double log2(Integral x);
}
```
* Integral[italic]

##概要
2 を底とする二進対数を求める。


##戻り値
引数 `x` の 2 を底とする二進対数を返す。

`x` が負の場合には、定義域エラーとなり、戻り値は処理系定義である。`x` がゼロの場合には、処理系によっては極エラーとなり、戻り値は処理系定義である。（備考参照）


##備考
- $$ f(x) = \log_2 x $$
- 定義域エラー、極エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = ±0` の場合、戻り値は `-∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する。
	- `x = 1` の場合、戻り値は `+0` となる。
	- `x < 0` の場合、戻り値は quiet NaN となり、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
	- `x = +∞` の場合、戻り値は `+∞` となる。


##例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "log2(0.0)  = " << std::log2(0.0) << std::endl;
  std::cout << "log2(2)    = " << std::log2(2) << std::endl;
  std::cout << "log2(+∞)  = " << std::log2(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "log2(-1.0) = " << std::log2(-1.0) << std::endl;
}
```
* <cmath>[link ../cmath.md]
* <limits>[link ../limits.md]
* std::log2[color ff0000]
* std::fixed[link ../ios/fixed.md]
* std::numeric_limits[link ../limits/numeric_limits.md]
* infinity[link ../limits/numeric_limits/infinity.md]

###出力例
```
log2(0.0)  = -inf
log2(2)    = 1.000000
log2(+∞)  = inf
log2(-1.0) = nan
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 2.9, 3.1
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0

####備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##実装例
[`log`](log.md) があれば、以下のように変換することで求められる。

$$ \log_2 x = \frac{\log_e x}{\log_e 2}$$
