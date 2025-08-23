# nearbyint
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float nearbyint(float x);              // (1) C++11からC++20まで
  double nearbyint(double x);            // (2) C++11からC++20まで
  long double nearbyint(long double x);  // (3) C++11からC++20まで

  floating-point-type
    nearbyint(floating-point-type x);    // (4) C++23

  double nearbyint(Integral x);          // (5) C++11

  float nearbyintf(float x);             // (6) C++17
  long double nearbyintl(long double x); // (7) C++17
}
```
* Integral[italic]

## 概要
引数 `x` を現在の丸めモードで整数値に丸めた値を得る。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数 `x` を現在の丸めモードで整数値に丸めた値


## 備考
- 本関数と [`rint`](rint.md) は戻り値は同一であるが、本関数は引数 `x` が戻り値と異なっていても [`FE_INEXACT`](../cfenv/fe_invalid.md) は発生しないが、[`rint`](rint.md) は発生する可能性がある点のみ動作が異なる。
- 本関数は、C99 の規格にある `nearbyint`（より正確には `math.h` ヘッダの `nearbyint`、`nearbyintf`、`nearbyintl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と等価である。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - `x = ±0` の場合、`±0` を返す。
    - `x = ±∞` の場合、`±∞` を返す。
- C99 では、丸めモードの設定時には `#pragma STDC FENV_ACCESS ON` でなければならないと記載されているが、C++ には該当する記載を見つけることができなかった。  
    なお、C99 でも `FENV_ACCESS` のデフォルトは処理系定義である。
- 丸めモード [`FE_TONEAREST`](../cfenv/fe_tonearest.md) は単なる四捨五入ではないことに注意。
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


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
  std::cout << "nearbyint(2.5) = " << std::nearbyint(2.5) << std::endl;
  std::cout << "nearbyint(-2.5) = " << std::nearbyint(-2.5) << std::endl;
  std::cout << "FE_INEXACT = " << std::boolalpha << (std::fetestexcept(FE_INEXACT) != 0) << std::endl << std::endl;
}

#define test(mode) test(#mode, mode)

int main()
{
#ifdef FE_DOWNWARD
  test(FE_DOWNWARD);
#endif
#ifdef FE_TONEAREST
  test(FE_TONEAREST);
#endif
#ifdef FE_TOWARDZERO
  test(FE_TOWARDZERO);
#endif
#ifdef FE_UPWARD
  test(FE_UPWARD);
#endif
}
```
* std::nearbyint[color ff0000]
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
nearbyint(2.5) = 2
nearbyint(-2.5) = -3
FE_INEXACT = false

FE_TONEAREST
nearbyint(2.5) = 2
nearbyint(-2.5) = -2
FE_INEXACT = false

FE_TOWARDZERO
nearbyint(2.5) = 2
nearbyint(-2.5) = -2
FE_INEXACT = false

FE_UPWARD
nearbyint(2.5) = 3
nearbyint(-2.5) = -2
FE_INEXACT = false

```

処理系が ISO IEC 60559 に準拠していない場合、全ての丸めモードが利用可能とは限らない。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified], 3.7 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0 [mark verified], 4.9.1 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2013 [mark verified], 2015 [mark verified]

### 備考
- 本関数は C++11 で追加されたが、Clang(libc++) では C++11 モードでなくても使用可能である。

## 関連項目
- [`FE_INEXACT`](../cfenv/fe_inexact.md) チェックを行う版: [`round`](round.md)、[`lround`](lround.md) (戻り値 `long`)、[`llround`](llround.md) (戻り値 `long long`)
- 常に四捨五入: [`round`](round.md)、[`lround`](lround.md) (戻り値 `long`)、[`llround`](llround.md) (戻り値 `long long`)
- 丸めモード: [`fesetround`](../cfenv/fesetround.md) (設定)、[`fegetround`](../cfenv/fegetround.md) (取得)、[`FLT_ROUNDS`](../cfloat/flt_rounds.md) (マクロ)

## 参照
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
