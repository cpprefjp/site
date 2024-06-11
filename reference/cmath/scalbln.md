# scalbln
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float scalbln(float x, long int n);             // (1) C++11からC++20まで
  double scalbln(double x, long int n);           // (2) C++11からC++20まで
  long double scalbln(long double x, long int n); // (3) C++11からC++20まで

  constexpr floating-point-type
    scalbln(floating-point-type x, long int n);   // (4) C++23

  double
    scalbln(Integral x, long int n);              // (5) C++11
  constexpr double
    scalbln(Integral x, long int n);              // (5) C++23

  float
    scalblnf(float x, long int n);                // (6) C++17
  constexpr float
    scalblnf(float x, long int n);                // (6) C++23

  long double
    scalblnl(long double x, long int n);          // (7) C++17
  constexpr long double
    scalblnl(long double x, long int n);          // (7) C++23
}
```
* Integral[italic]

## 概要
[`scalbn()`](scalbn.md)の、乗数として`int`の代わりに`long int`をとるバージョン。

`x` に、浮動小数点数の内部表現の基数 [`FLT_RADIX`](/reference/cfloat/flt_radix.md) の `n` 乗を掛けた値を効率的に（通常は [`FLT_RADIX`](/reference/cfloat/flt_radix.md)<sup>n</sup> を明示的には計算せずに）計算する。scalbは「scale binary」を意味する。

この関数は、[`FLT_RADIX`](/reference/cfloat/flt_radix.md) が `2` であるシステム上では、[`ldexp()`](ldexp.md) 関数と等価である。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
<code>x * [FLT_RADIX](/reference/cfloat/flt_radix.md)<sup>n</sup></code>

オーバーフローエラー、アンダーフローエラーが発生する可能性がある。


## 備考
- この関数は元々 `scalb()` という名前で提案されていたが、非標準の同名関数が広く実装されていた。そのため、`new` の意味を持つ `n` を関数名の末尾に付けて `scalbn()` 関数として標準ライブラリに定義された。
- オーバーフローエラー、アンダーフローエラーが発生した場合の挙動については、[`<cmath>`](../cmath.md) を参照。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。（複号同順）
	- `x = ±0` の場合、戻り値は `±0` となる。
	- `n = 0` の場合、戻り値は `x` となる。
	- `x = ±∞` の場合、戻り値は `±∞` となる。
	- もしオーバーフローエラーやアンダーフローエラーを起こさなければ、結果は正確で現在の丸め方式には依存しない。

- `scalbln()` 関数は、パラメータ `n` の型が `long int` であることを除いて、`scalbn()` 関数と等価である。
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <iostream>
#include <cmath>

int main()
{
  // 3.0 * (FLT_RADIX^4)
  double result = std::scalbln(3.0, 4);
  std::cout << result << std::endl;
}
```
* std::scalbln[color ff0000]

### 出力例
```
48
```

### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [WG14 N657 Floating-Point and Complex Arithmetic Enhancements](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n657.ps)
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
