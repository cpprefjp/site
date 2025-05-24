# fmin
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float fmin(float x, float y);          // (1) C++11からC++20まで
  double fmin(double x, double y);       // (2) C++11からC++20まで
  long double
    fmin(long double x, long double y);  // (3) C++11からC++20まで

  constexpr floating-point-type
    fmin(floating-point-type x,
         floating-point-type y);         // (4) C++23

  Promoted
    fmin(Arithmetic1 x,
         Arithmetic2 y);                 // (5) C++11
  constexpr Promoted
    fmin(Arithmetic1 x,
         Arithmetic2 y);                 // (5) C++23

  float
    fminf(float x, float y);             // (6) C++17
  constexpr float
    fminf(float x, float y);             // (6) C++23

  long double
    fminl(long double x, long double y); // (7) C++17
  constexpr long double
    fminl(long double x, long double y); // (7) C++23
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

## 概要
算術型の最小値を求める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 算術型に対するオーバーロード (大きい精度にキャストして計算される。整数は`double`で計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
引数の最小値を返す。


## 備考
- 戻り値は正確で、現在の丸めモードに依存しない。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - 引数の1つが NaN の場合 NaN でない方を返す。
    - 引数が2つとも NaN の場合 NaN を返す。
- 理想的には `fmin(-0.0, +0.0)` は `-0` を返す。
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


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
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

#### 備考
特定の環境では、早期に `constexpr` 対応されている場合がある：

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


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
