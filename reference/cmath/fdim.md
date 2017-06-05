# fdim
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float fdim(float x, float y);
  double fdim(double x, double y);
  long double fdim(long double x, long double y);

  Promoted fdim(Arithmetic1 x, Arithmetic2 y);

  float fdimf(float x, float y);                   // C++17 から
  long double fdiml(long double x, long double y); // C++17 から
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

## 概要
算術型の正の差を求める。

## 戻り値
引数の正の差を返す。

`x - y > 0` の場合は `x - y` を、それ以外の場合は `+0` を返す。

## 例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::showpos;
  std::cout << "fdim(-1.0, 0.0) = " << std::fdim(-1.0, 0.0) << std::endl;
  std::cout << "fdim( 0.0, 0.0) = " << std::fdim( 0.0, 0.0) << std::endl;
  std::cout << "fdim(+1.0, 0.0) = " << std::fdim(+1.0, 0.0) << std::endl;
}
```
* std::fdim[color ff0000]
* std::showpos[link ../ios/showpos.md]

### 出力例
```
fdim(-1.0, 0.0) = +0
fdim( 0.0, 0.0) = +0
fdim(+1.0, 0.0) = +1
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
