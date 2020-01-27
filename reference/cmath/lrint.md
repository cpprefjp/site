# lrint
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  long lrint(float x);
  long lrint(double x);
  long lrint(long double x);

  long lrint(Integral x);

  long int lrintf(float x);       // C++17 から
  long int lrintl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
引数 `x` を現在の丸めモードで `long` に丸めた値を得る。


## 戻り値
引数 `x` を現在の丸めモードで `long` に丸めた値


## 備考
- 本関数は、C99 の規格にある `lrint`（より�確には `math.h` ヘッダの `lrint`、`lrintf`、`lrintl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と�価である。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- 丸めの結果が `long` で表現不可能な場合、無効演算の浮動小数点例外（[`FE_INVALID`](../cfenv/fe_invalid.md)）が発生する。
	- 他の例外が発生しておらず、引数 `x` が戻り値と異なってる場合、不�確結果の浮動小数点例外（[`FE_INEXACT`](../cfenv/fe_inexact.md)）が発生する。
- C99 では、丸めモードや浮動小数点例外へのアクセスには `#pragma STDC FENV_ACCESS ON` でなければなければならないと記載されているが、C++ には該当する記載を見つけることができなかった。  
	なお、C99 でも `FENV_ACCESS` のデフォルトは処理系定義である。
- 丸めモード [`FE_TONEAREST`](../cfenv/fe_tonearest.md) は単なる四捨五入ではないことに注意。  
	四捨五入が必要であれば、[`lround`](lround.md) を使用すること。（ただし、[`lround`](lround.md) は本関数と異なり、ISO IEC 60559 に準拠していても [`FE_INEXACT`](../cfenv/fe_inexact.md) が発生するか否かは処理系定義である）  


## 例
```cpp example
#include <cfenv>
#include <climits>
#include <cmath>
#include <iostream>

void test(long double d)
{
  std::feclearexcept(FE_ALL_EXCEPT);
  long l = std::lrint(d);
  bool inexact = std::fetestexcept(FE_INEXACT) != 0;
  bool invalid = std::fetestexcept(FE_INVALID) != 0;
  std::cout << "lrint(" << d << ") = " << l << ", FE_INEXACT = " << std::boolalpha << inexact << ", FE_INVALID = " << invalid << '\n';
}

void test(const char* title, int round_mode)
{
  std::fesetround(round_mode);
  std::cout << title << '\n';
  test(4.0L);
  test(3.5L);
  test(2.5L);
  test(-2.5L);
  test(-3.5L);
  test(LONG_MAX + 0.5L);
  std::cout << '\n';
}

# define test(mode) test(#mode, mode)

int main()
{
# ifdef FE_DOWNWARD
  test(FE_DOWNWARD);
# endif
# ifdef FE_TONEAREST
  test(FE_TONEAREST);
# endif
# ifdef FE_TOWARDZERO
  test(FE_TOWARDZERO);
# endif
# ifdef FE_UPWARD
  test(FE_UPWARD);
# endif
}
```
* std::lrint[color ff0000]
* FE_INEXACT[link ../cfenv/fe_inexact.md]
* FE_INVALID[link ../cfenv/fe_invalid.md]
* FE_ALL_EXCEPT[link ../cfenv/fe_all_except.md]
* std::feclearexcept[link ../cfenv/feclearexcept.md]
* std::fetestexcept[link ../cfenv/fetestexcept.md]
* std::fesetround[link ../cfenv/fesetround.md]
* FE_DOWNWARD[link ../cfenv/fe_downward.md]
* FE_UPWARD[link ../cfenv/fe_upward.md]
* FE_TOWARDZERO[link ../cfenv/fe_towardzero.md]
* FE_TONEAREST[link ../cfenv/fe_tonearest.md]
* LONG_MAX[link ../climits/long_max.md]

### 出力例
```
FE_DOWNWARD
lrint(4) = 4, FE_INEXACT = false, FE_INVALID = false
lrint(3.5) = 3, FE_INEXACT = true, FE_INVALID = false
lrint(2.5) = 2, FE_INEXACT = true, FE_INVALID = false
lrint(-2.5) = -3, FE_INEXACT = true, FE_INVALID = false
lrint(-3.5) = -4, FE_INEXACT = true, FE_INVALID = false
lrint(9.22337e+18) = 9223372036854775807, FE_INEXACT = true, FE_INVALID = false

FE_TONEAREST
lrint(4) = 4, FE_INEXACT = false, FE_INVALID = false
lrint(3.5) = 4, FE_INEXACT = true, FE_INVALID = false
lrint(2.5) = 2, FE_INEXACT = true, FE_INVALID = false
lrint(-2.5) = -2, FE_INEXACT = true, FE_INVALID = false
lrint(-3.5) = -4, FE_INEXACT = true, FE_INVALID = false
lrint(9.22337e+18) = -9223372036854775808, FE_INEXACT = false, FE_INVALID = true

FE_TOWARDZERO
lrint(4) = 4, FE_INEXACT = false, FE_INVALID = false
lrint(3.5) = 3, FE_INEXACT = true, FE_INVALID = false
lrint(2.5) = 2, FE_INEXACT = true, FE_INVALID = false
lrint(-2.5) = -2, FE_INEXACT = true, FE_INVALID = false
lrint(-3.5) = -3, FE_INEXACT = true, FE_INVALID = false
lrint(9.22337e+18) = 9223372036854775807, FE_INEXACT = true, FE_INVALID = false

FE_UPWARD
lrint(4) = 4, FE_INEXACT = false, FE_INVALID = false
lrint(3.5) = 4, FE_INEXACT = true, FE_INVALID = false
lrint(2.5) = 3, FE_INEXACT = true, FE_INVALID = false
lrint(-2.5) = -2, FE_INEXACT = true, FE_INVALID = false
lrint(-3.5) = -3, FE_INEXACT = true, FE_INVALID = false
lrint(9.22337e+18) = -9223372036854775808, FE_INEXACT = false, FE_INVALID = true

```

上記出力例では、引数が整数値でないものは、[`FE_INEXACT`](../cfenv/fe_inexact.md) が発生している。  
また、引数が [`LONG_MAX`](../climits/long_max.md) `+ 0.5L` のものは、丸めモードが [`FE_TONEAREST`](../cfenv/fe_tonearest.md) と [`FE_UPWARD`](../cfenv/fe_upward.md) の場合に [`FE_INVALID`](../cfenv/fe_invalid.md) が発生している。（結果が `long` の範囲に収まらない）  
丸めモードが [`FE_TONEAREST`](../cfenv/fe_tonearest.md) の場合、引数が `3.5` の時は `4` に切り上げられているのに対して、引数が `2.5` の時には `2` に切り捨てられていることに注意。  
なお、処理系が ISO IEC 60559 に準拠していない場合、全ての丸めモードが利用可能とは限らない。  
また、処理系が ISO IEC 60559 に準拠していない場合、[`FE_INEXACT`](../cfenv/fe_inexact.md) や [`FE_INVALID`](../cfenv/fe_invalid.md) は発生しない可能性がある。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8
- [GCC](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 4.9.2, 5.1.0, 5.2.0, 6.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2013, 2015

### 備考
本関数は C++11 で追加されたが、Clang(libc++) では C++11 モードでなくても使用可能である。
