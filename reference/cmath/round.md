# round
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float round(float x);
  double round(double x);
  long double round(long double x);

  double round(Integral x);

  float roundf(float x);             // C++17 から
  long double roundl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
引数 `x` を四捨五入により丸めた整数値を得る。  
ここで引数 `x` の四捨五入とは、`x` を最も近い整数に丸めるが、`x` の小数部分が `0.5` の場合には、`x` の符号が�負のいずれであってもゼ�から遠い方向に丸めることを指す。  
具体例は下記の出力例を参照。


## 戻り値
引数 `x` を四捨五入により丸めた整数値


## 備考
- 本関数は、C99 の規格にある `round`（より�確には `math.h` ヘッダの `round`、`roundf`、`roundl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と�価である。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
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
    * feholdexcept[link ../cfenv.md]
    * rint[link rint.md]
    * fetestexcept[link ../cfenv/fetestexcept.md]
    * FE_INEXACT[link ../cfenv/fe_inexact.md]
    * copysign[link copysign.md]
    * fabs[link fabs.md]
    * feupdateenv[link ../cfenv/feupdateenv.md.nolink]

	ただし、本関数において戻り値が引数 `x` と異なる場合に、上記の実装のように例外 [`FE_INEXACT`](/reference/cfenv/fe_inexact.md) が発生するか否かは実装依�である。  
	なお、本関数の挙動は、現在の丸めモードには依�しない。


## 例
```cpp example
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
* std::round[color ff0000]
* FE_INEXACT[link ../cfenv/fe_inexact.md]
* FE_ALL_EXCEPT[link ../cfenv/fe_all_except.md]
* std::feclearexcept[link ../cfenv/feclearexcept.md]
* std::fetestexcept[link ../cfenv/fetestexcept.md]

### 出力例
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
