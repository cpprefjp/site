# trunc
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float trunc(float x);
  double trunc(double x);
  long double trunc(long double x);

  double trunc(Integral x);

  float truncf(float x);             // C++17 から
  long double truncl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
引数 `x` をゼ�方向に丸めた整数値を得る。  
ゼ�方向への丸めた整数値とは、絶対値が引数 `x` の絶対値以下で、かつ、引数 `x` に最も近い整数値である。


## 戻り値
引数 `x` をゼ�方向に丸めた整数値


## 備考
- 本関数は、C99 の規格にある `trunc`（より�確には `math.h` ヘッダの `trunc`、`truncf`、`truncl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と�価である。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。

	- `x = ±0` の場合、`±0` を返す。
	- `x = ±∞` の場合、`±∞` を返す。

	また、本関数の挙動は、丸めモードが [`FE_TOWARDZERO`](/reference/cfenv/fe_towardzero.md) に�定されている時の [`rint`](rint.md)、あるいは [`nearbyint`](nearbyint.md) のいずれかと�価である。  
	したがって、本関数において戻り値が引数 `x` と異なる場合に例外 [`FE_INEXACT`](/reference/cfenv/fe_inexact.md) が発生するか否かは実装依�である。  
	なお、本関数の挙動は、現在の丸めモードには依�しない。


## 例
```cpp example
#include <cfenv>
#include <cmath>
#include <iostream>

void test(double x)
{
  std::feclearexcept(FE_ALL_EXCEPT);
  std::cout << "trunc(" << x << ") = " << std::trunc(x) << '\n';
  std::cout << "FE_INEXACT = " << std::boolalpha << (std::fetestexcept(FE_INEXACT) != 0) << "\n\n";
}

int main()
{
  test(2.0);
  test(2.1);
  test(2.5);
  test(2.9);
  test(-2.0);
  test(-2.1);
  test(-2.5);
  test(-2.9);
}
```
* std::trunc[color ff0000]
* FE_INEXACT[link ../cfenv/fe_inexact.md]
* FE_ALL_EXCEPT[link ../cfenv/fe_all_except.md]
* std::feclearexcept[link ../cfenv/feclearexcept.md]
* std::fetestexcept[link ../cfenv/fetestexcept.md]

### 出力例
```
trunc(2) = 2
FE_INEXACT = false

trunc(2.1) = 2
FE_INEXACT = false

trunc(2.5) = 2
FE_INEXACT = false

trunc(2.9) = 2
FE_INEXACT = false

trunc(-2) = -2
FE_INEXACT = false

trunc(-2.1) = -2
FE_INEXACT = false

trunc(-2.5) = -2
FE_INEXACT = false

trunc(-2.9) = -2
FE_INEXACT = false

```

引数と結果が異なる場合に例外 `FE_INEXACT` が発生するか否かは実装によって異なる。
