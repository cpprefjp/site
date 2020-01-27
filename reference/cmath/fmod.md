# fmod
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  double fmod(double x, double y);
  float fmod(float x, float y);
  long double fmod(long double x, long double y);

  Integral fmod(Integral x, Integral y);           // C++11 から

  float fmodf(float x, float y);                   // C++17 から
  long double fmodl(long double x, long double y); // C++17 から
}
```
* Integral[italic]

## 概要
浮動小数点数の剰余を求める。

整数に対する剰余は`%`演算�で求められるが、浮動小数点数に対しては本関数を使用する必要がある。


## 戻り値
`x / y`の余りを返す。

- この関数は、ある整数値を`n`として、`x - ny`を戻り値として返す。
- `y`が非ゼ�である場合、`x`と同じ符号の、`y`より小さい値を返す。
- `y`がゼ�である場合、定義域エラーを発生させるかゼ�を返すかは、実装定義となる。

定義域エラーが発生した際の挙動については、[`<cmath>`](../cmath.md) を参照。


## 備考
- 本関数は、C99 の規格にある `fmod`（より�確には `math.h` ヘッダの `fmod`、`fmodf`、`fmodl` の 3 つ。それぞれ C++ の `double`、`float`、`long double` バージョンに相当）と�価である。
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。

    - 非ゼ�の`y`について、`x`が`±0`の場合、`±0`を返す。
    - `x`が無限大、もしくは`y`がゼ�である場合、NaNを返し、[`FE_INVALID`](../cfenv/fe_invalid.md) が発生する。
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

