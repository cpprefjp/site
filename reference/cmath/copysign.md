# copysign
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  double copysign(double x, double y);
  float copysign(float x, float y);
  long double copysign(long double x, long double y);

  Integral copysign(Integral x, Integral y);

  float copysignf(float x, float y);                   // C++17 から
  long double copysignl(long double x, long double y); // C++17 から
}
```
* Integral[italic]

## 概要
`x`の絶対値に`y`の符号が付いた値を生成する。


## 戻り値
`x`の絶対値に`y`の符号が付いた値を返す。

`x`の値がNaNである場合、`y`の符号が付いたNaNを返す。


## 備考
符号付きゼ�を表現するが負のゼ�を取り扱わない実装では、この関数はゼ�を�と見なす。


## 例
```cpp example
#include <iostream>
#include <cmath>

int main()
{
  float result1 = std::copysign(1.0f, 2.0f);
  float result2 = std::copysign(1.0f, -2.0f);

  std::cout << result1 << std::endl;
  std::cout << result2 << std::endl;
}
```
* std::copysign[color ff0000]

### 出力
```
1
-1
```

### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


## 実装例
```cpp
namespace std {
  float copysign(float x, float y)
  {
    float absolute_value = std::isnan(x) ?
                           std::numeric_limits<float>::quiet_NaN() :
                           std::abs(x);
    return y >= 0 ? absolute_value : -absolute_value;
  }

  double copysign(double x, double y)
  {
    double absolute_value = std::isnan(x) ?
                            std::numeric_limits<double>::quiet_NaN() :
                            std::abs(x);
    return y >= 0 ? absolute_value : -absolute_value;
  }

  long double copysign(long double x, long double y)
  {
    long double absolute_value = std::isnan(x) ?
                                 std::numeric_limits<long double>::quiet_NaN() :
                                 std::abs(x);
    return y >= 0 ? absolute_value : -absolute_value;
  }
}
```
* std::abs[link abs.md]
* std::isnan[link isnan.md]
* std::numeric_limits[link /reference/limits/numeric_limits.md]
* quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
