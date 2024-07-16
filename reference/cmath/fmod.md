# fmod
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  float fmod(float x, float y);    // (1) C++03からC++20まで
  double fmod(double x, double y); // (2) C++03からC++20まで
  long double fmod(long double x,
                   long double y); // (3) C++03からC++20まで

  constexpr floating-point-type
    fmod(floating-point-type x,
         floating-point-type y);   // (4) C++23

  Integral
    fmod(Integral x, Integral y);  // (5) C++11
  constexpr Integral
    fmod(Integral x, Integral y);  // (5) C++23

  float
    fmodf(float x, float y);       // (6) C++17
  constexpr float
    fmodf(float x, float y);       // (6) C++23

  long double
    fmodl(long double x,
          long double y);          // (7) C++17
  constexpr long double
    fmodl(long double x,
          long double y);          // (8) C++17
}
```
* Integral[italic]

## 概要
浮動小数点数の剰余を求める。

整数に対する剰余は`%`演算子で求められるが、浮動小数点数に対しては本関数を使用する必要がある。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
`x / y`の余りを返す。

- この関数は、ある整数値を`n`として、`x - ny`を戻り値として返す。
- `y`が非ゼロである場合、`x`と同じ符号の、`y`より小さい値を返す。
- `y`がゼロである場合、定義域エラーを発生させるかゼロを返すかは、実装定義となる。

定義域エラーが発生した際の挙動については、[`<cmath>`](../cmath.md) を参照。


## 備考
- 本関数は、C99 の規格にある `fmod`（より正確には `math.h` ヘッダの `fmod`、`fmodf`、`fmodl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と等価である。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。

    - 非ゼロの`y`について、`x`が`±0`の場合、`±0`を返す。
    - `x`が無限大、もしくは`y`がゼロである場合、NaNを返し、[`FE_INVALID`](../cfenv/fe_invalid.md) が発生する。
    - `x`が非無限大で、`y`が`±∞`の場合、`x`を返す。

    また、`double` バージョンの本関数は、以下の実装のように振る舞う。

    ```c
    #include <math.h>
    #include <fenv.h>
    #pragma STDC FENV_ACCESS ON
    double fmod(double x, double y)
    {
      double result;
      result = remainder(fabs(x), (y = fabs(y)));
      if (signbit(result)) result += y;
      return copysign(result, x);
    }
    ```
    * remainder[link remainder.md]
    * fabs[link fabs.md]
    * signbit[link signbit.md]
    * copysign[link copysign.md]


## 例
```cpp example
#include <iostream>
#include <cmath>

void test(double x, double y)
{
  std::cout << "fmod(" << x << ", " << y << ") = " << std::fmod(x, y) << std::endl;
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
* std::fmod[color ff0000]

### 出力例
```
fmod(5, 2) = 1
fmod(6, 4) = 2
fmod(6.3, 3) = 0.3
fmod(6.3, -3) = 0.3
fmod(-6.3, 3) = -0.3
fmod(-6.3, -3) = -0.3
fmod(6.3, 3.15) = 0
fmod(6, 2) = 0
```

## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
