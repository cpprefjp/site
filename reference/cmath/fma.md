# fma
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float fma(float x, float y, float z);

  double fma(double x, double y, double z);

  long double fma(long double x, long double y, long double z);

  Promoted fma(Arithmetic1 x, Arithmetic2 y, Arithmetic3 z);
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]
* Arithmetic3[italic]


## 概要
`x * y + z` を計算する。

丸めは乗算と加算のあとに1回だけ行われる。

`fma` は fused multiply-add の略。


## 戻り値
`x * y + z` を無限精度で計算した後、現在の丸めモードで丸めた結果


## 備考
- 本関数は、C99 の規格にある `fma`（より正確には `math.h` ヘッダの `fma`、`fmaf`、`fmal` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と同等である。
- C99 では、処理系が ISO IEC 60559（IEEE 754 と同一）に準拠している場合、以下のように規定されている。

	- `x`、または `y` のいずれか一方が無限でもう一方がゼロで、かつ、`z` が NaN の場合、NaN を返す。この際、[`FE_INVALID`](../cfenv/fe_invalid.md) が発生するか否かは処理系定義である。
	- `x`、または `y` のいずれか一方が無限でもう一方がゼロで、かつ、`z` が NaN 以外の場合、NaN を返す。この際、[`FE_INVALID`](../cfenv/fe_invalid.md) が発生する。
	- `x * y` と `z` がいずれも無限で、かつ、それらの符号が異なる場合、NaN を返す。この際、[`FE_INVALID`](../cfenv/fe_invalid.md) が発生する。

- 処理系が ISO IEC 60559 に準拠しているかどうかは、[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md) によって型毎に判別可能である。

- 本関数が単純に `x * y + z` を計算するのと同等か、より速い場合には、引数の型に応じて [`FP_FAST_FMA`](fp_fast_fma.md)（`double` の場合）、[`FP_FAST_FMAF`](fp_fast_fmaf.md)（`float` の場合）、[`FP_FAST_FMAL`](fp_fast_fmal.md)（`long double` の場合）と言ったマクロが定義される。  
	これらのマクロは、一般的に本関数がハードウェアによる積和演算命令を使用している場合にのみ定義される。


## 例
```cpp
#include <iostream>
#include <iomanip>
#include <cerrno>
#include <cstring>
#include <cfenv>
#include <cmath>

// エラー状態のクリア
void clearerr()
{
  if (math_errhandling & MATH_ERREXCEPT) {
    std::feclearexcept(FE_ALL_EXCEPT);
  } else {
    errno = 0;
  }
}

// エラー状態の出力
void printerr()
{
  if (math_errhandling & MATH_ERREXCEPT) {
    int excepts = std::fetestexcept(FE_ALL_EXCEPT);
    if (excepts & FE_INVALID) {
      std::cout << "FE_INVALID\n";
    }
    if (excepts & FE_DIVBYZERO) {
      std::cout << "FE_DIVBYZERO\n";
    }
    if (excepts & FE_OVERFLOW) {
      std::cout << "FE_OVERFLOW\n";
    }
    if (excepts & FE_UNDERFLOW) {
      std::cout << "FE_UNDERFLOW\n";
    }
    if (excepts & FE_INEXACT) {
      std::cout << "FE_INEXACT\n";
    }
  } else {
    int err = errno;
    if (err != 0) {
      std::cout << std::strerror(err) << '\n';
    }
  }
}

void test(float x, float y, float z)
{
  clearerr();
  float result1 = std::fma(x, y, z);
  printerr();
  std::cout << "fma(" << x << ", " << y << ", " << z << ") = " << result1 << "\n\n";

  clearerr();
  float result2 = x * y + z;
  printerr();
  std::cout << x << " * " << y << " + " << z << " = " << result2 << "\n\n\n";
}

int main()
{
  std::cout << std::fixed << std::setprecision(1);
  test(1.5F, 8388609.0F, -0.5F);
  test(INFINITY, 0.0F, NAN);
  test(INFINITY, 0.0F, 1.0F);
  test(INFINITY, 1.0F, -INFINITY);
}
```
* std::fma[color ff0000]
* math_errhandling[link math_errhandling.md]
* MATH_ERREXCEPT[link math_errexcept.md]
* std::feclearexcept[link /reference/cfenv/feclearexcept.md]
* FE_ALL_EXCEPT[link /reference/cfenv/fe_all_except.md]
* FE_INVALID[link /reference/cfenv/fe_invalid.md]
* FE_DIVBYZERO[link /reference/cfenv/fe_divbyzero.md]
* FE_OVERFLOW[link /reference/cfenv/fe_overflow.md]
* FE_UNDERFLOW[link /reference/cfenv/fe_underflow.md]
* FE_INEXACT[link /reference/cfenv/fe_inexact.md]
* errno[link /reference/cerrno/errno.md]
* std::fixed[link /reference/ios/fixed.md]
* std::setprecision[link /reference/iomanip/setprecision.md]
* INFINITY[link infinity.md]
* NAN[link nan.md]

### 出力例
```
fma(1.5, 8388609.0, -0.5) = 12582913.0

FE_INEXACT
1.5 * 8388609.0 + -0.5 = 12582914.0


FE_INVALID
fma(inf, 0.0, nan) = nan

FE_INVALID
inf * 0.0 + nan = -nan


FE_INVALID
fma(inf, 0.0, 1.0) = -nan

FE_INVALID
inf * 0.0 + 1.0 = -nan


FE_INVALID
fma(inf, 1.0, -inf) = -nan

FE_INVALID
inf * 1.0 + -inf = -nan

```
