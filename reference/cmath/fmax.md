# fmax
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float fmax(float x, float y);
  double fmax(double x, double y);
  long double fmax(long double x, long double y);

  Promoted fmax(Arithmetic1 x, Arithmetic2 y);

  float fmaxf(float x, float y);                   // C++17 から
  long double fmaxl(long double x, long double y); // C++17 から
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

## 概要
算術型の最大値を求める。

## 戻り値
引数の最大値を返す。

## 備考
- 戻り値は正確で、現在の丸めモードに依存しない。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - 引数の1つが NaN の場合 NaN でない方を返す。
    - 引数が2つとも NaN の場合 NaN を返す。
- 理想的には `fmax(-0.0, +0.0)` は `+0` を返す。

## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::showpos;
  std::cout << "fmax( 0.0, -1.0) = " << std::fmax(0.0, -1.0) << std::endl;
  std::cout << "fmax(-0.0, +0.0) = " << std::fmax(-0.0, +0.0) << std::endl;
  std::cout << "fmax( 0.0, +1.0) = " << std::fmax(0.0, +1.0) << std::endl;
  std::cout << "fmax( 0.0, nan)  = " << std::fmax(0.0, std::nan("")) << std::endl;
  std::cout << "fmax( nan, nan)  = " << std::fmax(std::nan(""), std::nan("")) << std::endl;
}
```
* std::fmax[color ff0000]
* std::showpos[link ../ios/showpos.md]
* std::nan[link ../cmath/nanf.md]

### 出力例
```
fmax( 0.0, -1.0) = +0
fmax(-0.0, +0.0) = +0
fmax( 0.0, +1.0) = +1
fmax( 0.0, nan)  = +0
fmax( nan, nan)  = +nan
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

#### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上

## 実装例
```cpp
namespace std {
  float fmax(float x, float y) {
    return (std::isgreaterequal(x, y) || std::isnan(y)) ? x : y;
  }

  double fmax(double x, double y) {
    return (std::isgreaterequal(x, y) || std::isnan(y)) ? x : y;
  }

  long double fmax(long double x, long double y) {
    return (std::isgreaterequal(x, y) || std::isnan(y)) ? x : y;
  }

  template <typename T, typename U>
  auto fmax(T x, U y) -> typename std::enable_if<
    std::is_arithmetic<T>::value && std::is_arithmetic<U>::value,
    typename std::common_type<T, U, double>::type
  >::type {
    return (std::isgreaterequal(x, y) || std::isnan(y)) ? x : y;
  }
}
```
* fmax[color ff0000]
* std::isgreaterequal[link ../cmath/isgreaterequal.md]
* std::isnan[link ../cmath/isnan.md]
* std::enable_if[link ../type_traits/enable_if.md]
* std::is_arithmetic[link ../type_traits/is_arithmetic.md]
* std::common_type[link ../type_traits/common_type.md]
