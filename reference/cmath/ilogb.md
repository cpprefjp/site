# ilogb
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int ilogb(float);
  int ilogb(double);
  int ilogb(long double);

  int ilogb(Integral);

  int ilogbf(float x);          // C++17 から
  int ilogbl(long double x);    // C++17 から
}
```
* Integral[italic]

## 概要
`ilogb`関数(integer log binary)は、浮動小数点数 `x` の指数部を `int` として返す。


## 戻り値
`x` がゼロの場合は [`FP_ILOGB0`](fp_ilogb0.md) を、無限大の場合は [`INT_MAX`](/reference/climits/int_max.md) を、`NaN` の場合は [`FP_ILOGBNAN`](fp_ilogbnan.md) を返す。
それ以外の場合は、[`logb`](logb.md)`(x)` の戻り値を `int` にキャストして返すことと同等。

`x` がゼロ、無限大、あるいは `NaN` の場合には、処理系によっては定義域エラーか極エラーが発生する。（備考参照）

## 備考
- 定義域エラー、極エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- 正しい結果が戻り値の型（`int`）の範囲で表現可能な場合は、戻り値は正確で、現在の丸め方式に依存しない。
	- 正しい結果が戻り値の型（`int`）の範囲外の場合は、戻り値は未規定で、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
	- `x` がゼロ、無限大、あるいは NaN の場合には、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。


## 例
```cpp
#include <cmath>
#include <limits>
#include <iostream>

int main()
{
  std::cout << "ilogb(48.0)   = " << std::ilogb(48.0) << std::endl;
  std::cout << "ilogb(-48.0)  = " << std::ilogb(-48.0) << std::endl;
  std::cout << "ilogb(+∞)     = " << std::ilogb(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "ilogb(-∞)     = " << std::ilogb(-std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "ilogb(0.0)    = " << std::ilogb(0.0) << std::endl;
  std::cout << "ilogb(1e-309) = " << std::ilogb(1e-309) << std::endl;
}
```
* std::ilogb[color ff0000]
* infinity()[link /reference/limits/numeric_limits/infinity.md]

### 出力例
```
ilogb(48.0)   = 5
ilogb(-48.0)  = 5
ilogb(+∞)     = 2147483647
ilogb(-∞)     = 2147483647
ilogb(0.0)    = -2147483648
ilogb(1e-309) = -1027
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
