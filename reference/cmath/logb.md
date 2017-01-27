#logb
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float logb(float x);
  double logb(double x);
  long double logb(long double x);

  double logb(Integral);

  float logbf(float x);             // C++17 から
  long double logbl(long double x); // C++17 から
}
```
* Integral[italic]

##概要
`logb`関数(log binary)は、浮動小数点数 `x` の指数部である符号あり整数を、浮動小数点形式で返す。

`log` が名前に入っているが、通常の対数関数と異なり、引数の符号は無視されることに注意。


##戻り値
`|x| *` [`FLT_RADIX`](/reference/cfloat/flt_radix.md)<code><sup>-logb(x)</sup></code> が範囲 `[1,` [`FLT_RADIX`](/reference/cfloat/flt_radix.md)`)` に収まるように指数を求めて返す。（非正規化数の場合でも正しい値が返る）

`x`がゼロの場合には、処理系によっては定義域エラーか極エラーが発生する。（備考参照）


##備考
- 定義域エラー、極エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = ±0` の場合、戻り値は `-∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する。
	- `x = ±∞` の場合、戻り値は `+∞` となる。
	- 戻り値は正確で、現在の丸め方式に依存しない。


##例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main()
{
  std::cout << "logb(48.0)   = " << std::logb(48.0) << std::endl;
  std::cout << "logb(-48.0)  = " << std::logb(-48.0) << std::endl;
  std::cout << "logb(+∞)     = " << std::logb(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "logb(-∞)     = " << std::logb(-std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "logb(0.0)    = " << std::logb(0.0) << std::endl;
  std::cout << "logb(1e-309) = " << std::logb(1e-309) << std::endl;
}
```
* std::logb[color ff0000]
* infinity()[link ../limits/numeric_limits/infinity.md]

###出力例
```
logb(48.0)   = 5
logb(-48.0)  = 5
logb(+∞)     = inf
logb(-∞)     = inf
logb(0.0)    = -inf
logb(1e-309) = -1027
```

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
