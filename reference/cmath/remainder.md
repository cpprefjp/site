# remainder
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float remainder(float x, float y);    // (1) C++11からC++20まで
  double remainder(double x, double y); // (2) C++11からC++20まで
  long double remainder(long double x,
                        long double y); // (3) C++11からC++20まで

  constexpr floating-point-type
    remainder(floating-point-type x,
              floating-point-type y);   // (4) C++23

  Integral
    remainder(Integral x, Integral y);  // (5) C++11
  constexpr Integral
    remainder(Integral x, Integral y);  // (5) C++23

  float
    remainderf(float x, float y);       // (6) C++17
  constexpr float
    remainderf(float x, float y);       // (6) C++23

  long double
    remainderl(long double x,
               long double y);          // (7) C++17
  constexpr long double
    remainderl(long double x,
               long double y);          // (7) C++23
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
IEC 60559で要求された`x REM y`を計算して返す。

`y`がゼロである場合、定義域エラーを発生させるかゼロを返すかは、実装定義となる。定義域エラーが発生した際の挙動については、[`<cmath>`](../cmath.md) を参照。


## 備考
- 本関数は、C99 の規格にある `remainder`（より正確には `math.h` ヘッダの `remainder`、`remainderf`、`remainderl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と等価である。
- IEC 60559で要求された`x REM y`の計算とは以下のようなものであり、全ての実装に適用できる。
    - 「y≠0である場合、剰余r = x REM yは、丸めモードに関係なく数学的な関係r = x - nyによって定義される。ここで、nはx/yの正確な値に最も近い整数である。| n - x/y | = 1/2ならば、nは常に偶数である。したがって、剰余は常に正確である。r = 0の場合、その符号はxの符号とする」
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <iostream>
#include <cmath>

void test(double x, double y)
{
  std::cout << "remainder(" << x << ", " << y << ") = " << std::remainder(x, y) << std::endl;
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
* std::remainder[color ff0000]

### 出力例
```
remainder(5, 2) = 1
remainder(6, 4) = -2
remainder(6.3, 3) = 0.3
remainder(6.3, -3) = 0.3
remainder(-6.3, 3) = -0.3
remainder(-6.3, -3) = -0.3
remainder(6.3, 3.15) = 0
remainder(6, 2) = 0
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
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
