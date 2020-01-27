# fmin
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float fmin(float x, float y);
  double fmin(double x, double y);
  long double fmin(long double x, long double y);

  Promoted fmin(Arithmetic1 x, Arithmetic2 y);

  float fminf(float x, float y);                   // C++17 から
  long double fminl(long double x, long double y); // C++17 から
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

## 概要
算術型の最小値を求める。

## 戻り値
引数の最小値を返す。

## 備考
- 戻り値は�確で、現在の丸めモードに依�しない。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - 引数の1つが NaN の場合 NaN でない方を返す。
    - 引数が2つとも NaN の場合 NaN を返す。
- 理想的には `fmin(-0.0, +0.0)` は `-0` を返す。

## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::showpos;
  std::cout << "fmin( 0.0, -1.0) = " << std::fmin(0.0, -1.0) << std::endl;
  std::cout << "fmin(-0.0, +0.0) = " << std::fmin(-0.0, +0.0) << std::endl;
  std::cout << "fmin( 0.0, +1.0) = " << std::fmin(0.0, +1.0) << std::endl;
  std::cout << "fmin( 0.0, nan)  = " << std::fmin(0.0, std::nan("")) << std::endl;
  std::cout << "fmin( nan, nan)  = " << std::fmin(std::nan(""), std::nan("")) << std::endl;
}
```
* std::fmin[color ff0000]
* std::showpos[link ../ios/showpos.md]
* std::nan[link ../cmath/nanf.md]

### 出力例
```
fmin( 0.0, -1.0) = -1
fmin(-0.0, +0.0) = -0
fmin( 0.0, +1.0) = +0
fmin( 0.0, nan)  = +0
fmin( nan, nan)  = +nan
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

#### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上

## 実装例
```cpp
namespace std {
  float fmin(float x, float y) {
    return (std::islessequal(x, y) || std::isnan(y)) ? x : y;
  }

  double fmin(double x, double y) {
    return (std::islessequal(x, y) || std::isnan(y)) ? x : y;
  }

  long double fmin(long double x, long double y) {
    return (std::islessequal(x, y) || std::isnan(y)) ? x : y;
  }

  template <typename T, typename U>
  auto fmin(T x, U y) -> typename std::enable_if<
    std::is_arithmetic<T>::value && std::is_arithmetic<U>::value,
    typename std::common_type<T, U, double>::type
  >::type {
    return (std::islessequal(x, y) || std::isnan(y)) ? x : y;
  }
}
```
* fmin[color ff0000]
* std::islessequal[link ../cmath/islessequal.md]
* std::isnan[link ../cmath/isnan.md]
* std::enable_if[link ../type_traits/enable_if.md]
* std::is_arithmetic[link ../type_traits/is_arithmetic.md]
* std::common_type[link ../type_traits/common_type.md]
