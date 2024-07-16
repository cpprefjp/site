# fdim
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float fdim(float x, float y);                   // (1) C++11からC++20まで
  double fdim(double x, double y);                // (2) C++11からC++20まで
  long double fdim(long double x, long double y); // (3) C++11からC++20まで

  constexpr floating-point-type
    fdim(floating-point-type x,
         floating-point-type y);                  // (4) C++23

  Promoted
    fdim(Arithmetic1 x,
         Arithmetic2 y);                          // (5) C++11
  constexpr Promoted
    fdim(Arithmetic1 x,
         Arithmetic2 y);                          // (5) C++23

  float
    fdimf(float x, float y);                      // (6) C++17
  constexpr float
    fdimf(float x, float y);                      // (6) C++23

  long double
    fdiml(long double x, long double y);          // (7) C++17
  constexpr long double
    fdiml(long double x, long double y);          // (7) C++23
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

## 概要
算術型の正の差を求める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 算術型に対するオーバーロード (大きい精度にキャストして計算される。整数は`double`で計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数の正の差を返す。

`x - y > 0` の場合は `x - y` を、それ以外の場合は `+0` を返す。


## 備考
- C++23では、(1)、(2)、(3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
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
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

#### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

- GCC 4.6.1 以上


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
