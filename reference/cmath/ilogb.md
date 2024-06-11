# ilogb
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int ilogb(float x);             // (1) C++11からC++20まで
  int ilogb(double x);            // (2) C++11からC++20まで
  int ilogb(long double x);       // (3) C++11からC++20まで

  constexpr int
    ilogb(floating-point-type x); // (3) C++23

  int
    ilogb(Integral);              // (4) C++11
  constexpr int
    ilogb(Integral);              // (4) C++23

  int
    ilogbf(float x);              // (5) C++17
  constexpr int
    ilogbf(float x);              // (5) C++23

  int
    ilogbl(long double x);        // (6) C++17
  constexpr int
    ilogbl(long double x);        // (6) C++23
}
```
* Integral[italic]

## 概要
`ilogb`関数(integer log binary)は、浮動小数点数 `x` の指数部を `int` として返す。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
`x` がゼロの場合は [`FP_ILOGB0`](fp_ilogb0.md) を、無限大の場合は [`INT_MAX`](/reference/climits/int_max.md) を、`NaN` の場合は [`FP_ILOGBNAN`](fp_ilogbnan.md) を返す。
それ以外の場合は、[`logb`](logb.md)`(x)` の戻り値を `int` にキャストして返すことと等価。

`x` がゼロ、無限大、あるいは `NaN` の場合には、処理系によっては定義域エラーか極エラーが発生する。（備考参照）

## 備考
- 定義域エラー、極エラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- 正しい結果が戻り値の型（`int`）の範囲で表現可能な場合は、戻り値は正確で、現在の丸め方式に依存しない。
	- 正しい結果が戻り値の型（`int`）の範囲外の場合は、戻り値は未規定で、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
	- `x` がゼロ、無限大、あるいは NaN の場合には、[`FE_INVALID`](../cfenv/fe_invalid.md)（無効演算浮動小数点例外）が発生する。
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
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
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
