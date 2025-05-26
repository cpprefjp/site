# isunordered
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  bool isunordered(float x, float y);             // (1) C++11からC++20まで
  bool isunordered(double x, double y);           // (2) C++11からC++20まで
  bool isunordered(long double x, long double y); // (3) C++11からC++20まで

  constexpr bool
    isunordered(floating-point-type x,
              floating-point-type y);           // (4) C++23

  bool
    isunordered(Integral x, Integral y);          // (5) C++11
  constexpr bool
    isunordered(Integral x, Integral y);          // (5) C++23
}
```
* Integral[italic]

## 概要
浮動小数点数について、引数が順序付けされていないかを判定する。

NaNに対する順序付けはされないため、`x`と`y`のいずれかがNaNである場合、この関数は`true`を返す。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)


## 戻り値
引数が順序付けされていなければ`true`を返し、そうでなければ`false`を返す。


## 備考
- C標準ライブラリでは本関数は関数マクロとして定義されるが、C++標準ライブラリでは関数として定義される
- C標準ライブラリでは本関数は`int`型を戻り値とするが、C++標準ライブラリでは`bool`型を戻り値とする
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <iostream>
#include <cmath>
#include <limits>

void test(double x, double y)
{
  std::cout << std::boolalpha;
  std::cout << "isunordered(" << x << ", " << y << ") = " << std::isunordered(x, y) << std::endl;
}

int main()
{
  const double inf = std::numeric_limits<double>::infinity();
  const double nan = std::numeric_limits<double>::quiet_NaN();

  test(1.0, nan);
  test(1.0, 2.0);
  test(1.0, inf);
}
```
* std::isunordered[color ff0000]
* infinity()[link /reference/limits/numeric_limits/infinity.md]
* quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]

### 出力例
```
isunordered(1, nan) = true
isunordered(1, 2) = false
isunordered(1, inf) = false
```

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
