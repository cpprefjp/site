# remquo
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float
    remquo(float x,
           float y,
           int* quo);             // (1) C++11からC++20まで
  double
    remquo(double x,
           double y,
           int* quo);             // (2) C++11からC++20まで
  long double
    remquo(long double x,
           long double y,
           int* quo);             // (3) C++11からC++20まで

  constexpr floating-point-type
    remquo(floating-point-type x,
           floating-point-type y,
           int* quo);             // (4) C++23

  Integral
    remquo(Integral x,
           Integral y,
           int* quo);             // (5) C++11
  constexpr Integral
    remquo(Integral x,
           Integral y,
           int* quo);             // (5) C++23

  float
    remquof(float x,
            float y,
            int* quo);            // (6) C++17
  constexpr float
    remquof(float x,
            float y,
            int* quo);            // (6) C++23

  long double
    remquol(long double x,
            long double y,
            int* quo);            // (7) C++17
  constexpr long double
    remquol(long double x,
            long double y,
            int* quo);            // (7) C++23
}
```
* Integral[italic]

## 概要
浮動小数点数の剰余と、商の一部を求める。remquoは、「remainder (剰余)」と「quotient (商)」と意味する。

この関数は、浮動小数点数に対して除算を行い、除算の結果(商)の一部と、その余り(剰余)を同時に求める。戻り値として剰余が返され、ポインタ引数`quo`に商の値の一部が書き込まれる。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
- [`remainder()`](remainder.md)関数と同じ方法で剰余を求めて、戻り値として返す。
- `quo`が指す値は、`x/y`で得られる商と下位数ビットが等しく、`x/y`で得られた符号と同じ符号を持つ。
    - 商と等しくなる有効なビット数nは、少なくとも3以上の処理系定義の値とされる。

`y`がゼロである場合、`quo`が指す値は未規定となる。またその際、定義域エラーを発生させるかゼロを返すかは、実装定義となる。定義域エラーが発生した際の挙動については、[`<cmath>`](../cmath.md) を参照。


## 備考
`remquo`関数では`x/y`の厳密な商を求めることはできない。
三角関数のような周期性をもつ数学関数の内部実装において、商の低次ビットを利用した引数の還元(argument reduction)操作で利用する。

- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <iostream>
#include <cmath>

void test(double x, double y)
{
  int quo = 0;
  double rem = std::remquo(x, y, &quo);
  std::cout << "remquo(" << x << ", " << y << ") = "
            << "quotient:" << quo
            << " remainder:" << rem << std::endl;
}

int main()
{
  test(5.0, 2.0);
  test(6.0, 4.0);
  test(6.3, 3.0);
  test(6.3, -3.0);
  test(-6.3, 3.0);
  test(-6.3, -3.0);
  test(6.3, 3.15);
  test(6.0, 2.0);
}
```
* std::remquo[color ff0000]

### 出力例
```
remquo(5, 2) = quotient:2 remainder:1
remquo(6, 4) = quotient:2 remainder:-2
remquo(6.3, 3) = quotient:2 remainder:0.3
remquo(6.3, -3) = quotient:-2 remainder:0.3
remquo(-6.3, 3) = quotient:-2 remainder:-0.3
remquo(-6.3, -3) = quotient:2 remainder:-0.3
remquo(6.3, 3.15) = quotient:2 remainder:0
remquo(6, 2) = quotient:3 remainder:0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [std::remquo purpose and usage? - Stack Overflow](https://stackoverflow.com/questions/11074865/stdremquo-purpose-and-usage)
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
