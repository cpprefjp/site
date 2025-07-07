# ceil
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  float ceil(float x);              // (1) C++03からC++20まで
  double ceil(double x);            // (2) C++03からC++20まで
  long double ceil(long double x);  // (3) C++03からC++20まで

  constexpr floating-point-type
   ceil(floating-point-type x);     // (4) C++23

  double
    ceil(Integral x);               // (5) C++11
  constexpr double
    ceil(Integral x);               // (5) C++23

  float
    ceilf(float x);                 // (6) C++17
  constexpr float
    ceilf(float x);                 // (6) C++23

  long double
    ceill(long double x);           // (7) C++17
  constexpr long double
    ceill(long double x);           // (7) C++23
}
```
* Integral[italic]

## 概要
引数 `x` 以上で最小の整数値を得る。（天井関数）

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` 以上で最小の整数値


## 備考
- 本関数は、C99 の規格にある `ceil`（より正確には `math.h` ヘッダの `ceil`、`ceilf`、`ceill` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と等価である。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。

	- `x = ±0` の場合、`±0` を返す。
	- `x = ±∞` の場合、`±∞` を返す。

	また、本関数の挙動は、丸めモードが [`FE_UPWARD`](/reference/cfenv/fe_upward.md) に設定されている時の [`rint`](rint.md)、あるいは [`nearbyint`](nearbyint.md) のいずれかと等価である。  
	したがって、本関数において戻り値が引数 `x` と異なる場合に例外 [`FE_INEXACT`](/reference/cfenv/fe_inexact.md) が発生するか否かは実装依存である。  
	なお、本関数の挙動は、現在の丸めモードには依存しない。
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
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
* std::ceil[color ff0000]
* FE_INEXACT[link ../cfenv/fe_inexact.md]
* FE_ALL_EXCEPT[link ../cfenv/fe_all_except.md]
* std::feclearexcept[link ../cfenv/feclearexcept.md]
* std::fetestexcept[link ../cfenv/fetestexcept.md]

### 出力例
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

## 関連項目
- 床関数 (負の無限への丸め) [`floor`](floor.md)
- 切り捨て (ゼロ方向への丸め) [`trunc`](trunc.md)

## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
