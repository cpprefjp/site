# round
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float round(float x);             // (1) C++11からC++20まで
  double round(double x);           // (2) C++11からC++20まで
  long double round(long double x); // (3) C++11からC++20まで

  constexpr floating-point-type
    round(floating-point-type x);   // (4) C++23

  double
    round(Integral x);              // (5) C++11
  constexpr double
    round(Integral x);              // (5) C++23

  float
    roundf(float x);                // (6) C++17
  constexpr float
    roundf(float x);                // (6) C++23

  long double
    roundl(long double x);          // (7) C++17
  constexpr long double
    roundl(long double x);          // (7) C++23
}
```
* Integral[italic]

## 概要
引数 `x` を四捨五入により丸めた整数値を得る。  
ここで引数 `x` の四捨五入とは、`x` を最も近い整数に丸めるが、`x` の小数部分が `0.5` の場合には、`x` の符号が正負のいずれであってもゼロから遠い方向に丸めることを指す。  
具体例は下記の出力例を参照。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` を四捨五入により丸めた整数値


## 備考
- 本関数は、C99 の規格にある `round`（より正確には `math.h` ヘッダの `round`、`roundf`、`roundl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と等価である。
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

	ただし、本関数において戻り値が引数 `x` と異なる場合に、上記の実装のように例外 [`FE_INEXACT`](/reference/cfenv/fe_inexact.md) が発生するか否かは実装依存である。  
	なお、本関数の挙動は、現在の丸めモードには依存しない。
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


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


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
