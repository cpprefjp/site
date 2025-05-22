# fpclassify
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int fpclassify(float x);             // (1) C++11からC++20まで
  int fpclassify(double x);            // (2) C++11からC++20まで
  int fpclassify(long double x);       // (3) C++11からC++20まで

  constexpr int
    fpclassify(floating-point-type x); // (4) C++23

  int
    fpclassify(Integral x);            // (5) C++11
  constexpr int
    fpclassify(Integral x);            // (5) C++23
}
```
* Integral[italic]


## 概要
指定された値の数値分類を返す。

- (1) : `float`に対するオーバーロード
- (2) : `double`に対するオーバーロード
- (3) : `long double`に対するオーバーロード
- (4) : 浮動小数点数型に対するオーバーロード
- (5) : 整数型に対するオーバーロード (`double`にキャストして計算される)


## 戻り値
引数 `x` で指定された値の数値分類を表すマクロの整数値を返す。

| 引数 `x` で指定された値の数値分類 | 戻り値                            |
|-----------------------------------|-----------------------------------|
| 正、あるいは、負の無限大の場合    | [`FP_INFINITE`](fp_infinite.md)   |
| NaN（Not a Number、非数）の場合   | [`FP_NAN`](fp_nan.md)             |
| 正規化数の場合                    | [`FP_NORMAL`](fp_normal.md)       |
| 非正規化数の場合                  | [`FP_SUBNORMAL`](fp_subnormal.md) |
| 正、あるいは、負のゼロの場合      | [`FP_ZERO`](fp_zero.md)           |

なお、上記のいずれにも属さない処理系定義の数値分類がある場合、その数値分類に対応するマクロの整数値が返る。


## 備考
- C標準ライブラリでは`fpclassify`は関数マクロとして定義されるが、C++標準ライブラリでは関数として定義される
- C++23では、(1), (2), (3)が(4)に統合され、拡張浮動小数点数型を含む浮動小数点数型へのオーバーロードとして定義された


## 例
```cpp example
#include <iostream>
#include <limits>
#include <cmath>

int main()
{
  std::cout << std::boolalpha;
  std::cout << (std::fpclassify(std::numeric_limits<double>::infinity()  ) == FP_INFINITE ) << std::endl;
  std::cout << (std::fpclassify(std::numeric_limits<double>::quiet_NaN() ) == FP_NAN      ) << std::endl;
  std::cout << (std::fpclassify(1.0                                      ) == FP_NORMAL   ) << std::endl;
  std::cout << (std::fpclassify(std::numeric_limits<double>::denorm_min()) == FP_SUBNORMAL) << std::endl;
  std::cout << (std::fpclassify(0.0                                      ) == FP_ZERO     ) << std::endl;
}
```
* std::fpclassify[color ff0000]
* infinity()[link ../limits/numeric_limits/infinity.md]
* quiet_NaN()[link ../limits/numeric_limits/quiet_nan.md]
* denorm_min()[link ../limits/numeric_limits/denorm_min.md]
* FP_INFINITE[link fp_infinite.md]
* FP_NAN[link fp_nan.md]
* FP_NORMAL[link fp_normal.md]
* FP_SUBNORMAL[link fp_subnormal.md]
* FP_ZERO[link fp_zero.md]

### 出力例
```
true
true
true
true
true
```


## 参照
- [P0533R9 constexpr for `<cmath>` and `<cstdlib>`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0533r9.pdf)
    - C++23での、一部関数の`constexpr`対応
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で導入された拡張浮動小数点数型への対応として、`float`、`double`、`long double`のオーバーロードを`floating-point-type`のオーバーロードに統合し、拡張浮動小数点数型も扱えるようにした
