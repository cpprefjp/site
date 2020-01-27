# remquo
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  double remquo(double x, double y, int* quo);
  float remquo(float x, float y, int* quo);
  long double remquo(long double x, long double y, int* quo);

  Integral remquo(Integral x, Integral y, int* quo);

  float remquof(float x, float y, int* quo);                   // C++17 から
  long double remquol(long double x, long double y, int* quo); // C++17 から
}
```
* Integral[italic]

## 概要
浮動小数点数の剰余と商を求める。remquoは、「remainder (剰余)」と「quotient (商)」と意味する。

この関数は、浮動小数点数に対して除算を行い、除算の結果(商)と、その余り(剰余)を同時に求める。戻り値として剰余が返され、ポインタ引数`quo`に商の値が書き込まれる。


## 戻り値
- [`remainder()`](remainder.md)関数と同じ方法で剰余を求めて、戻り値として返す。
- `quo`が指す値は、`x/y`で得られた商と同じ大きさを持ち、`x/y`で得られた符号と同じ符号を持つ

`y`がゼ�である場合、`quo`が指す値は未規定となる。またその際、定義域エラーを発生させるかゼ�を返すかは、実装定義となる。定義域エラーが発生した際の挙動については、[`<cmath>`](../cmath.md) を参照。


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
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
