# fmax
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float fmax(float x, float y);          // (1) C++11からC++20まで
  double fmax(double x, double y);       // (2) C++11からC++20まで
  long double
    fmax(long double x, long double y);  // (3) C++11からC++20まで

  constexpr floating-point-type
    fmax(floating-point-type x,
         floating-point-type y);         // (4) C++23

  Promoted
    fmax(Arithmetic1 x,
         Arithmetic2 y);                 // (5) C++11
  constexpr Promoted
    fmax(Arithmetic1 x,
         Arithmetic2 y);                 // (5) C++23

  float
    fmaxf(float x, float y);             // (6) C++17
  constexpr float
    fmaxf(float x, float y);             // (6) C++23

  long double
    fmaxl(long double x, long double y); // (7) C++17
  constexpr long double
    fmaxl(long double x, long double y); // (7) C++23
}
```
* Promoted[italic]
* Arithmetic1[italic]
* Arithmetic2[italic]

## 概要
算術型の最大値を求める。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 算術型に対するオーバーロード (大きい精度にキャストして計算される。整数は`double`で計算される)
- (6) : `float`型規定
- (7) : `long double`型規定

同じ目的のほかの関数との比較は以下。

| 関数名 | -0.0 と +0.0 の比較 | NaN を含む場合の挙動 |
|---|---|---|
| [`fmax`](fmax.md)                 | 未規定      | NaN でない方を返す |
| [`fmaximum`](fmaximum.md)         | +0.0 を返す | NaN を返す |
| [`fmaximum_num`](fmaximum_num.md) | +0.0 を返す | NaN でない方を返す |

## 戻り値
引数の最大値を返す。

## 備考
- 戻り値は正確で、現在の丸めモードに依存しない。
- 処理系が IEC 60559 に準拠している場合（[`std::numeric_limits`](../limits/numeric_limits.md)`<T>::`[`is_iec559`](../limits/numeric_limits/is_iec559.md)`() != false`）、以下の規定が追加される。
    - 引数の1つが NaN の場合 NaN でない方を返す。
    - 引数が2つとも NaN の場合 NaN を返す。
- `-0.0`と`+0.0`の比較としてどちらが返されるかは未規定
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


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


## 関連項目
- [`fmaximum`](fmaximum.md)
- [`fmaximum_num`](fmaximum_num.md)


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
