# log10
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float log10(float x);
  double log10(double x);
  long double log10(long double x);

  double log10(Integral x);          // C++11 から

  float log10f(float x);             // C++17 から
  long double log10l(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
10 を底とする常用対数を求める。


## 戻り値
引数 `x` の 10 を底とする常用対数を返す。

`x` が負の場合には、定義域エラーとなり、戻り値は処理系定義である。`x` がゼ�の場合には、処理系によっては極エラーとなり、戻り値は処理系定義である。（備考参照）


## 備考
- $$ f(x) = \log_{10} x $$
- 定義域エラー、極エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = ±0` の場合、戻り値は `-∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼ�除算浮動小数点例外）が発生する。
	- `x = 1` の場合、戻り値は `+0` となる。
	- `x < 0` の場合、戻り値は quiet NaN となり、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
	- `x = +∞` の場合、戻り値は `+∞` となる。


## 例
### 基本的な使い方
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "log10(0.0)  = " << std::log10(0.0) << std::endl;
  std::cout << "log10(10)   = " << std::log10(10) << std::endl;
  std::cout << "log10(+∞)  = " << std::log10(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "log10(-1.0) = " << std::log10(-1.0) << std::endl;
}
```
* std::log10[color ff0000]
* std::fixed[link ../ios/fixed.md]
* std::numeric_limits[link ../limits/numeric_limits.md]
* infinity[link ../limits/numeric_limits/infinity.md]

#### 出力例
```
log10(0.0)  = -inf
log10(10)   = 1.000000
log10(+∞)  = inf
log10(-1.0) = nan
```


### Nが10の何乗か調べる
```cpp example
#include <iostream>
#include <cmath>

int main()
{
  for (int i = 1; i <= 8; i++) {
    double x = std::pow(10, i);
    double result = std::log10(x);

    std::cout << std::fixed << "log10(" << x << ") : " << result << std::endl;
  }
}
```
* std::log10[color ff0000]
* std::pow[link pow.md]
* std::fixed[link ../ios/fixed.md]

#### 出力
```
log10(10.000000) : 1.000000
log10(100.000000) : 2.000000
log10(1000.000000) : 3.000000
log10(10000.000000) : 4.000000
log10(100000.000000) : 5.000000
log10(1000000.000000) : 6.000000
log10(10000000.000000) : 7.000000
log10(100000000.000000) : 8.000000
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
[`log`](log.md) があれば、以下のように変換することで求められる。

$$ \log_{10} x = \frac{\log_e x}{\log_e 10}$$
