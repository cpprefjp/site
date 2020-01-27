# remainder
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  double remainder(double x, double y);
  float remainder(float x, float y);
  long double remainder(long double x, long double y);

  Integral remainder(Integral x, Integral y);

  float remainderf(float x, float y);                   // C++17 から
  long double remainderl(long double x, long double y); // C++17 から
}
```
* Integral[italic]

## 概要
浮動小数点数の剰余を求める。

整数に対する剰余は`%`演算�で求められるが、浮動小数点数に対しては本関数を使用する必要がある。


## 戻り値
IEC 60559で要求された`x REM y`を計算して返す。

`y`がゼ�である場合、定義域エラーを発生させるかゼ�を返すかは、実装定義となる。定義域エラーが発生した際の挙動については、[`<cmath>`](../cmath.md) を参照。


## 備考
- 本関数は、C99 の規格にある `remainder`（より�確には `math.h` ヘッダの `remainder`、`remainderf`、`remainderl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と�価である。
- IEC 60559で要求された`x REM y`の計算とは以下のようなものであり、全ての実装に適用できる。
    - 「y≠0である場合、剰余r = x REM yは、丸めモードに関係なく数�的な関係r = x - nyによって定義される。ここで、nはx/yの�確な値に最も近い整数である。| n - x/y | = 1/2ならば、nは常に偶数である。したがって、剰余は常に�確である。r = 0の場合、その符号はxの符号とする」


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
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
