# lround
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  long lround(float x);            // (1) C++11からC++20まで
  long lround(double x);           // (2) C++11からC++20まで
  long lround(long double x);      // (3) C++11からC++20まで

  constexpr long
    lround(floating-point-type x); // (4) C++23

  long
    lround(Integral x);            // (5) C++11
  constexpr long
    lround(Integral x);            // (5) C++23

  long int
    lroundf(float x);              // (6) C++17
  constexpr long int
    lroundf(float x);              // (6) C++23

  long int
    lroundl(long double x);        // (7) C++17
  constexpr long int
    lroundl(long double x);        // (7) C++23
}
```
* Integral[italic]

## 概要
引数 `x` を四捨五入により丸めた整数値を`long`型として得る。  
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
引数 `x` を四捨五入により丸めた整数値を、`long`型の範囲に収めて返す。


## 備考
- 本関数は、C99 の規格にある `lround`（より正確には `math.h` ヘッダの `lround`、`lroundf`、`lroundl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と等価である。
- [`round`](round.md)関数と違い、本関数において戻り値が非整数型引数 `x` と異なる場合に、例外 [`FE_INEXACT`](/reference/cfenv/fe_inexact.md) を発生させる必要はない。
- 戻り値が`long`型の範囲を超えた場合、定義域エラーが起こる可能性がある。その際の挙動については、[`<cmath>`](../cmath.md) を参照。
- なお、本関数の挙動は、現在の丸めモードには依存しない。
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <iostream>
#include <cmath>

void test(double x)
{
  long result = std::lround(x);
  std::cout << "lround(" << x << ") = " << result << std::endl;
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
* std::lround[color ff0000]

### 出力
```
lround(2) = 2
lround(2.1) = 2
lround(2.5) = 3
lround(2.9) = 3
lround(-2) = -2
lround(-2.1) = -2
lround(-2.5) = -3
lround(-2.9) = -3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
