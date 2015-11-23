#round
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float round(float x);

  double round(double x);

  long double round(long double x);

  double round(Integral x);			// C++11 から
}
```
* Integral[italic]

##概要
引数 `x` を四捨五入により丸めた整数値を得る。  
ここで引数 `x` の四捨五入とは、`x` を最も近い整数に丸めるが、`x` の小数部分が `0.5` の場合には、`x` の符号が正負のいずれであってもゼロから遠い方向に丸めることを指す。  
具体例は下記の出力例を参照。


##戻り値
引数 `x` を四捨五入により丸めた整数値


##備考
- 本関数は、C99 の規格にある `round`（より正確には `math.h` ヘッダの `round`、`roundf`、`roundl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と同等である。
- C99 では、処理系が ISO IEC 60559（IEEE 754 と同一)に準拠している場合、以下のように規定されている。  

	- `x = ±0` の場合、`±0` を返す。
	- `x = ±∞` の場合、`±∞` を返す。

	また、`double` バージョンの本関数は、以下の実装のように振る舞う。

	```c
#include <math.h>
#include <fenv.h>
#pragma STDC FENV_ACCESS ON
double round(double x)
{
  double result;
  fenv_t save_env;
  feholdexcept(&save_env);
  result = rint(x);
  if (fetestexcept(FE_INEXACT)) {
    fesetround(FE_TOWARDZERO);
    result = rint(copysign(0.5 + fabs(x), x));
  }
  feupdateenv(&save_env);
  return result;
}
```
* feholdexcept[link ../cfenv/feholdexcept.md.nolink]
* rint[link rint.md]
* fetestexcept[link ../cfenv/fetestexcept.md.nolink]
* FE_INEXACT[link ../cfenv/fe_inexact.md.nolink]
* copysign[link copysign.md.nolink]
* fabs[link fabs.md]
* feupdateenv[link ../cfenv/feupdateenv.md.nolink]

	ただし、本関数において戻り値が引数 `x` と異なる場合に、上記の実装のように例外 `FE_INEXACT` が発生するか否かは実装依存である。  
	なお、本関数の挙動は、現在の丸めモードには依存しない。

- 処理系が ISO IEC 60559 に準拠しているかどうかは、C99 の場合はマクロ `__STDC_IEC_559__` が `1` に定義されている事で判別可能であるが、C++ 規格書には該当する記載を見つけることができなかった。


##例
```cpp
#include <cfenv>
#include <cmath>
#include <iostream>

void test(double x)
{
  std::feclearexcept(FE_ALL_EXCEPT);
  std::cout << "round(" << x << ") = " << std::round(x) << '\n';
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
* iostream[link ../iostream.md]
* cmath[link ../cmath.md]
* cfenv[link ../cfenv.md.nolink]
* round[color ff0000]
* cout[link ../iostream/cout.md]
* boolalpha[link ../ios/boolalpha.md]
* FE_INEXACT[link ../cfenv/FE_INEXACT.md.nolink]
* FE_ALL_EXCEPT[link ../cfenv/FE_ALL_EXCEPT.md.nolink]
* feclearexcept[link ../cfenv/feclearexcept.md.nolink]
* fetestexcept[link ../cfenv/fetestexcept.md.nolink]

###出力例
```
round(2) = 2
FE_INEXACT = false

round(2.1) = 2
FE_INEXACT = false

round(2.5) = 3
FE_INEXACT = false

round(2.9) = 3
FE_INEXACT = false

round(-2) = -2
FE_INEXACT = false

round(-2.1) = -2
FE_INEXACT = false

round(-2.5) = -3
FE_INEXACT = false

round(-2.9) = -3
FE_INEXACT = false

```

引数と結果が異なる場合に例外 `FE_INEXACT` が発生するか否かは実装によって異なる。
