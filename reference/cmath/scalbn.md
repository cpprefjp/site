#scalbn
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float scalbn(float x, int n);
  double scalbn(double x, int n);
  long double scalbn(long double x, int n);

  float scalbnf(float x, int n);
  long double scalbnl(long double x, int n);

  Integral scalbn(Integral x, int n);

  // 乗数としてlong int型を受け取るバージョン
  float scalbln(float x, long int n);
  double scalbln(double x, long int n);
  long double scalbln(long double x, long int n);

  float scalblnf(float x, long int n);
  long double scalblnl(long double x, long int n);

  Integral scalbln(Integral x, long int n);
}
```
* Integral[italic]

##概要
`x`に内部表現の基数の`n`乗を掛けた値を計算する。scalbは「scale binary」を意味する。

この関数は、浮動小数点数の内部表現として使用される基数[`FLT_RADIX`](/reference/cfloat/flt_radix.md)が`2`であるシステム上では、[`ldexp()`](ldexp.md)関数と同等である。

この関数は、`x * FLT_RADIX`<sup>n</sup>をより効率的に計算する。


##戻り値
`x *` [`FLT_RADIX`](/reference/cfloat/flt_radix.md)<sup>n</sup>

- 結果値が大きすぎる場合、値域エラーが発生する。その場合、プログラムは以下の状態になる:

- [`math_errhandling`](math_errhandling.md) `&` [`MATH_ERRNO`](math_errno.md.nolink)が非ゼロとなり、
- [`errno`](/reference/cerrno/errno.md)の値は[`ERANGE`](/reference/cerrno.md)となり、
- [`math_errhandling`](math_errhandling.md) `&` [`MATH_ERREXCEPT`](math_errexcept.md.nolink)が非ゼロとなり、
- 浮動小数点例外として[overflow](/reference/cfenv/fe_overflow.md)が送出される
- 戻り値として、
    - パラメータ`x`の型が`double`であれば[`HUGE_VAL`](huge_val.md)
    - パラメータ`x`の型が`float`であれば[`HUGE_VALF`](huge_valf.md)
    - パラメータ`x`の型が`long double`であれば[`HUGE_VALL`](huge_vall.md)が返る


##備考
この関数は元々`scalb()`という名前で提案されていたが、非標準の同名関数が広く実装されていた。そのため、`new`の意味を持つ`n`を関数名の末尾に付けて`scalbn()`関数として標準ライブラリに定義された。

`scalbln()`関数は、パラメータ`n`の型が`long int`であることを除いて、`scalbn()`関数と同等である。


##例
```cpp
#include <iostream>
#include <cmath>

int main()
{
  // 3.0 * (FLT_RADIX^4)
  double result = std::scalbn(3.0, 4);
  std::cout << result << std::endl;
}
```
* std::scalbn[color ff0000]

###出力例
```
48
```

###備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##実装例
```cpp
namespace std {
  double scalbn(double x, int n)
  {
    return x * std::pow(static_cast<double>(FLT_RADIX), n);
  }

  float scalbn(float x, int n)
  {
    return x * std::pow(static_cast<float>(FLT_RADIX), n);
  }

  long double scalbn(long double x, int n)
  {
    return x * std::pow(static_cast<long double>(FLT_RADIX), n);
  }
}
```
* std::pow[link pow.md]


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


##参照
- [WG14 N657 Floating-Point and Complex Arithmetic Enhancements](http://www7.open-std.org/JTC1/SC22/WG14/www/docs/n657.ps)

