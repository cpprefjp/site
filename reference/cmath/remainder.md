#remainder
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
}
```
* Integral[italic]

##概要
浮動小数点数の剰余を求める。

整数に対する剰余は`%`演算子で求められるが、浮動小数点数に対しては本関数を使用する必要がある。


##戻り値
IEC 60559で要求された`x REM y`を計算して返す。

`y`がゼロである場合、定義域エラーを発生させるかゼロを返すかは、実装定義となる。定義域エラーが発生した際の挙動については、[`<cmath>`](../cmath.md) を参照。


##備考
- 本関数は、C99 の規格にある `fmod`（より正確には `math.h` ヘッダの `fmod`、`fmodf`、`fmodl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と同等である。
- IEC 60559で要求された`x REM y`の計算とは以下のようなものであり、全ての実装に適用できる。
    - 「y≠0である場合、剰余r = x REM yは、丸めモードに関係なく数学的な関係r = x - nyによって定義される。ここで、nはx/yの正確な値に最も近い整数である。| n - x/y | = 1/2ならば、nは常に偶数である。したがって、剰余は常に正確である。r = 0の場合、その符号はxの符号とする」


##例
```cpp
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
* remainder[color ff0000]

###出力例
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

##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
