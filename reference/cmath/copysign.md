# copysign
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float
    copysign(float x,
             float y);               // (1) C++11からC++20まで
  double
    copysign(double x,
             double y);              // (2) C++11からC++20まで
  long double
    copysign(long double x,
             long double y);         // (3) C++11からC++20まで

  constexpr floating-point-type
    copysign(floating-point-type x,
             floating-point-type y); // (4) C++23

  Integral
    copysign(Integral x
             Integral y);            // (5) C++11
  constexpr Integral
    copysign(Integral x
             Integral y);            // (5) C++23

  float
    copysignf(float x,
              float y);              // (6) C++17
  constexpr float
    copysignf(float x,
              float y);              // (6) C++23

  long double
    copysignl(long double x,
              long double y);        // (7) C++17
  constexpr long double
    copysignl(long double x,
              long double y);        // (7) C++23
}
```
* Integral[italic]

## 概要
`x`の絶対値に`y`の符号が付いた値を生成する。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)
- (6) : `float`型規定
- (7) : `long double`型規定


## 戻り値
`x`の絶対値に`y`の符号が付いた値を返す。

`x`の値がNaNである場合、`y`の符号が付いたNaNを返す。


## 備考
- 符号付きゼロを表現するが負のゼロを取り扱わない実装では、この関数はゼロを正と見なす。
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


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
特定の環境では、早期に `constexpr` 対応されている場合がある：

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
* quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
