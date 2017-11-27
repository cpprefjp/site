# rint
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float rint(float x);
  double rint(double x);
  long double rint(long double x);

  double rint(Integral x);

  float rintf(float x);             // C++17 から
  long double rintl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
引数 `x` を現在の丸めモードで整数値に丸めた値を得る。


## 戻り値
引数 `x` を現在の丸めモードで整数値に丸めた値


## 備考
- 本関数と [`nearbyint`](nearbyint.md) は戻り値は同一であるが、本関数は引数 `x` が戻り値と異なってる場合 [`FE_INEXACT`](../cfenv/fe_inexact.md) が発生する可能性があるが、[`nearbyint`](nearbyint.md) は発生しない点のみ動作が異なる。
- 本関数は、C99 の規格にある `rint`（より正確には `math.h` ヘッダの `rint`、`rintf`、`rintl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と同等である。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
	- `x = ±0` の場合、`±0` を返す。
	- `x = ±∞` の場合、`±∞` を返す。
	- 引数 `x` が戻り値と異なってる場合、[`FE_INEXACT`](../cfenv/fe_inexact.md) が発生する。
- C99 では、丸めモードの設定時には `#pragma STDC FENV_ACCESS ON` でなければなければならないと記載されているが、C++ には該当する記載を見つけることができなかった。  
	なお、C99 でも `FENV_ACCESS` のデフォルトは処理系定義である。
- 丸めモード [`FE_TONEAREST`](../cfenv/fe_tonearest.md) は単なる四捨五入ではないことに注意。


## 例
```cpp example
#include <cfenv>
#include <cmath>
#include <iostream>

void test(const char* title, int round_mode)
{
  std::feclearexcept(FE_ALL_EXCEPT);
  std::fesetround(round_mode);
  std::cout << title << std::endl;
  std::cout << "rint(2.5) = " << std::rint(2.5) << std::endl;
  std::cout << "rint(-2.5) = " << std::rint(-2.5) << std::endl;
  std::cout << "FE_INEXACT = " << std::boolalpha << (std::fetestexcept(FE_INEXACT) != 0) << std::endl << std::endl;
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
* std::rint[color ff0000]
* FE_INEXACT[link ../cfenv/fe_inexact.md]
* FE_ALL_EXCEPT[link ../cfenv/fe_all_except.md]
* std::feclearexcept[link ../cfenv/feclearexcept.md]
* std::fetestexcept[link ../cfenv/fetestexcept.md]
* std::fesetround[link ../cfenv/fesetround.md]
* FE_DOWNWARD[link ../cfenv/fe_downward.md]
* FE_TONEAREST[link ../cfenv/fe_tonearest.md]
* FE_TOWARDZERO[link ../cfenv/fe_towardzero.md]
* FE_UPWARD[link ../cfenv/fe_upward.md]

### 出力例
```
FE_DOWNWARD
rint(2.5) = 2
rint(-2.5) = -3
FE_INEXACT = true

FE_TONEAREST
rint(2.5) = 2
rint(-2.5) = -2
FE_INEXACT = true

FE_TOWARDZERO
rint(2.5) = 2
rint(-2.5) = -2
FE_INEXACT = true

FE_UPWARD
rint(2.5) = 3
rint(-2.5) = -2
FE_INEXACT = true

```

処理系が ISO IEC 60559 に準拠していない場合、全ての丸めモードが利用可能とは限らない。  
また、処理系が IEC60559 に準拠していない場合、`FE_INEXACT` は `false` の可能性がある。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6, 4.4.7, 4.5.4, 4.6.4, 4.7.3, 4.8.1, 4.8.2, 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 12.0, 14.0

### 備考
本関数は C++11 で追加されたが、Clang(libc++) では C++11 モードでなくても使用可能である。
