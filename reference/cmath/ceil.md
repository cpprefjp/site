#ceil
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  float ceil(float x);

  double ceil(double x);

  long double ceil(long double x);

  double ceil(Integral x);			// C++11 から
}
```
* Integral[italic]

##概要
引数 `x` 以上で最小の整数値を得る。（天井関数）


##戻り値
引数 `x` 以上で最小の整数値


##備考
- 本関数は、C99 の規格にある `ceil`（より正確には `math.h` ヘッダの `ceil`、`ceilf`、`ceill` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と同等である。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。

	- `x = ±0` の場合、`±0` を返す。
	- `x = ±∞` の場合、`±∞` を返す。

	また、本関数の挙動は、丸めモードが [`FE_UPWARD`](/reference/cfenv/fe_upward.md) に設定されている時の [`rint`](rint.md)、あるいは [`nearbyint`](nearbyint.md) のいずれかと同等である。  
	したがって、本関数において戻り値が引数 `x` と異なる場合に例外 [`FE_INEXACT`](/reference/cfenv/fe_inexact.md) が発生するか否かは実装依存である。  
	なお、本関数の挙動は、現在の丸めモードには依存しない。


##例
```cpp
#include <cfenv>
#include <cmath>
#include <iostream>

void test(double x)
{
  std::feclearexcept(FE_ALL_EXCEPT);
  std::cout << "ceil(" << x << ") = " << std::ceil(x) << '\n';
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
* cfenv[link ../cfenv.md]
* ceil[color ff0000]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]
* boolalpha[link ../ios/boolalpha.md]
* FE_INEXACT[link ../cfenv/fe_inexact.md]
* FE_ALL_EXCEPT[link ../cfenv/fe_all_except.md]
* feclearexcept[link ../cfenv/feclearexcept.md]
* fetestexcept[link ../cfenv/fetestexcept.md]

###出力例
```
ceil(2) = 2
FE_INEXACT = false

ceil(2.1) = 3
FE_INEXACT = true

ceil(2.5) = 3
FE_INEXACT = true

ceil(2.9) = 3
FE_INEXACT = true

ceil(-2) = -2
FE_INEXACT = false

ceil(-2.1) = -2
FE_INEXACT = true

ceil(-2.5) = -2
FE_INEXACT = true

ceil(-2.9) = -2
FE_INEXACT = true

```

引数と結果が異なる場合に例外 `FE_INEXACT` が発生するか否かは実装によって異なる。
