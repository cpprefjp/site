# fabs
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float fabs(float x);
  double fabs(double x);
  long double fabs(long double x);

  double fabs(Integral x);          // C++11 から

  float fabsf(float x);             // C++17 から
  long double fabsl(long double x); // C++17 から
}
```
* Integral[italic]

## 概要
算術型の絶対値を求める。


## 戻り値
引数 `x` の絶対値を返す。

`x` が `±∞` だった場合 `+∞` を返す。


## 備考
- $$ f(x) = | x | $$
- C++11 以降では、処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
- `value = ±0` の場合、戻り値は `+0` となる。
- `value = ±∞` の場合、戻り値は `+∞` となる。
- 戻り値は正確で、現在の丸め方式には依存しない。


## 例
```cpp example
#include <cmath>
#include <limits>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "fabs(1.5)  = " << std::fabs(1.5) << std::endl;
  std::cout << "fabs(-1.5) = " << std::fabs(-1.5) << std::endl;
  std::cout << "fabs(0.0)  = " << std::fabs(0.0) << std::endl;
  std::cout << "fabs(-0.0) = " << std::fabs(-0.0) << std::endl;
  std::cout << "fabs(+∞)   = " << std::fabs(std::numeric_limits<double>::infinity()) << std::endl;
  std::cout << "fabs(-∞)   = " << std::fabs(-std::numeric_limits<double>::infinity()) << std::endl;
}
```
* std::fixed[link ../ios/fixed.md]
* std::fabs[color ff0000]
* infinity[link ../limits/numeric_limits/infinity.md]

### 出力例
```
fabs(1.5)  = 1.500000
fabs(-1.5) = 1.500000
fabs(0.0)  = 0.000000
fabs(-0.0) = 0.000000
fabs(+∞)   = inf
fabs(-∞)   = inf
```

## バージョン
### 言語
- C++03
- C++11

### 処理系
- [Clang](/implementation.md#clang): 1.9, 2.9, 3.1
- [GCC](/implementation.md#gcc): 3.4.6, 4.2.4, 4.3.5, 4.4.5, 4.5.1, 4.5.2, 4.6.1, 4.7.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.4, 4.4.5, 4.5.2, 4.6.1, 4.7.0
- [ICC](/implementation.md#icc): 10.1, 11.0, 11.1, 12.0
- [Visual C++](/implementation.md#visual_cpp): 2003, 2005, 2008, 2010

#### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


## 実装例
```cpp
namespace std {
  float fabs(float x) {
    return signbit(x) ? -x : x;
  }

  double fabs(double x) {
    return signbit(x) ? -x : x;
  }

  long double fabs(long double x) {
    return signbit(x) ? -x : x;
  }

  template<class Integral>
  typename enable_if<is_integral<Integral>::value, double>::type
  fabs(Integral x) {
    return fabs(static_cast<double>(x));
  }
}
```
* fabs[color ff0000]
* signbit[link signbit.md]
* is_integral[link ../type_traits/is_integral.md]
* enable_if[link ../type_traits/enable_if.md]
