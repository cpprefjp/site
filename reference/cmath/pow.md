# pow
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float pow(float x, float y);
  double pow(double x, double y);
  long double pow(long double x, long double y);

  float pow(float x, int y);                      // C++03 まで
  double pow(double x, int y);                    // C++03 まで
  long double pow(long double x, int y);          // C++03 まで

  Promoted pow(Arithmetic1 x, Arithmetic2 y);     // C++11 から

  float powf(float x, float y);                   // C++17 から
  long double powl(long double x, long double y); // C++17 から
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

## 概要
`x` の `y` 乗を求める。


## 戻り値
`x` を `y` 乗した値を返す。

`x` が負の有限値で `y` が有限値でかつ整数ではない場合には、定義域エラーが発生する。オーバーフローエラー、アンダーフローエラーが発生する可能性がある。`x` と `y` が両方ともゼロの場合には、定義域エラーが発生する可能性がある。`x` がゼロで `y` がゼロ未満の場合には、定義域エラーか極エラーが発生する可能性がある。


## 備考
- $$ f(x, y) = x^y $$
- 定義域エラー、極エラー、オーバーフローエラー、アンダーフローエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）
	- `x = ±0` で `y` が負の奇数の場合、戻り値は `±∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する。
	- `x = ±0` で `y` が有限でかつ負の奇数ではない場合、戻り値は `+∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する。
	- `x = ±0` で `y = -∞` の場合、戻り値は `+∞` となり、[`FE_DIVBYZERO`](../cfenv/fe_divbyzero.md)（ゼロ除算浮動小数点例外）が発生する可能性がある。
	- `x = ±0` で `y` が正の奇数の場合、戻り値は `±0` となる。
	- `x = ±0` で `y` が正でかつ奇数ではない場合、戻り値は `+0` となる。
	- `x = -1` で `y = ±∞` の場合、戻り値は `1` となる。
	- `x = 1` の場合、`y` にかかわらず戻り値は `1` となる（`y` が quiet NaN の場合を含む）。
	- `y = ±0` の場合、`x` にかかわらず戻り値は `1` となる（`x` が quiet NaN の場合を含む）。
	- `|x| < 1` で `y = -∞` の場合、戻り値は `+∞` となる。
	- `|x| > 1` で `y = -∞` の場合、戻り値は `+0` となる。
	- `|x| < 1` で `y = +∞` の場合、戻り値は `+0` となる。
	- `|x| > 1` で `y = +∞` の場合、戻り値は `+∞` となる。
	- `x = -∞` で `y` が負の奇数の場合、戻り値は `-0` となる。
	- `x = -∞` で `y` が負でかつ奇数ではない場合、戻り値は `+0` となる。
	- `x = -∞` で `y` が正の奇数の場合、戻り値は `-∞` となる。
	- `x = -∞` で `y` が正でかつ奇数ではない場合、戻り値は `+∞` となる。
	- `x = +∞` で `y < 0` の場合、戻り値は `+0` となる。
	- `x = +∞` で `y > 0` の場合、戻り値は `+∞` となる。


## 例
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "pow(2.0, +∞)   = "
            << std::pow(2.0, std::numeric_limits<double>::infinity())
            << std::endl;
  std::cout << "pow(2.0, 2.0)  = " << std::pow(2.0, 2.0) << std::endl;
  std::cout << "pow(2.0, 1.0)  = " << std::pow(2.0, 1.0) << std::endl;
  std::cout << "pow(2.0, 0.5)  = " << std::pow(2.0, 0.5) << std::endl;
  std::cout << "pow(2.0, 0.0)  = " << std::pow(2.0, 0.0) << std::endl;
  std::cout << "pow(2.0, -0.5) = " << std::pow(2.0, -0.5) << std::endl;
  std::cout << "pow(2.0, -1.0) = " << std::pow(2.0, -1.0) << std::endl;
  std::cout << "pow(2.0, -2.0) = " << std::pow(2.0, -2.0) << std::endl;
  std::cout << "pow(2.0, -∞)   = "
            << std::pow(2.0, -std::numeric_limits<double>::infinity())
            << std::endl;
}
```
* std::pow[color ff0000]
* std::fixed[link ../ios/fixed.md]
* infinity()[link ../limits/numeric_limits/infinity.md]

### 出力例
```
pow(2.0, +∞)   = inf
pow(2.0, 2.0)  = 4.000000
pow(2.0, 1.0)  = 2.000000
pow(2.0, 0.5)  = 1.414214
pow(2.0, 0.0)  = 1.000000
pow(2.0, -0.5) = 0.707107
pow(2.0, -1.0) = 0.500000
pow(2.0, -2.0) = 0.250000
pow(2.0, -∞)   = 0.000000
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
- [Visual C++](/implementation.md#visual_cpp): 2003, 2005, 2008, 2010

#### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


## 実装例
`exp` および `log` があれば、以下のように変換することで求められる。

$$ x^y = e^{y \log_e x} $$

ただし `x` が負数かつ `y` が整数に等しい場合などについては、別に計算する必要がある。

