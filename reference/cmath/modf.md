#modf
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  double modf(double value, double* iptr);
  float modf(float value, float* iptr);
  long double modf(long double value, long double* iptr);

  Integral modf(Integral value, Integral* iptr);
}
```
* Integral[italic]

##概要
浮動小数点数を、整数部と小数部に分解する。


##戻り値
パラメータ`value`の小数部を符号付きとして返す。また、パラメータ`value`の整数部を`iptr`に書き込む。

この関数によって返される整数部と小数部は、どちらも元の値`x`と同じ符号を持つ。


##例
```cpp
#include <iostream>
#include <cmath>

int main()
{
  // 正の浮動小数点数を、整数部と小数部に分解する
  {
    float x = 1.23f;
    float integral_part = 0;
    float fractional_part = std::modf(x, &integral_part);

    std::cout << integral_part << std::endl;
    std::cout << fractional_part << std::endl;
  }
  std::cout << std::endl;

  // 負の浮動小数点数を、整数部と小数部に分解する
  {
    float x = -1.23f;
    float integral_part = 0;
    float fractional_part = std::modf(x, &integral_part);

    std::cout << integral_part << std::endl;
    std::cout << fractional_part << std::endl;
  }
}
```
* std::modf[color ff0000]

###出力
```
1
0.23

-1
-0.23
```

###備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##実装例
```cpp
namespace std {
  float modf(float x, float* iptr)
  {
    float integral_part = std::trunc(x);
    *iptr = integral_part;
    return std::copysign(x - integral_part, x);
  }

  double modf(double x, double* iptr)
  {
    double integral_part = std::trunc(x);
    *iptr = integral_part;
    return std::copysign(x - integral_part, x);
  }

  long double modf(long double x, long double* iptr)
  {
    long double integral_part = std::trunc(x);
    *iptr = integral_part;
    return std::copysign(x - integral_part, x);
  }
}
```
* std::trunc[link trunc.md]
* std::copysign[link copysign.md.nolink]
