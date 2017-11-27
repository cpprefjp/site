# fpclassify
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int fpclassify(float x);

  int fpclassify(double x);

  int fpclassify(long double x);

  int fpclassify(Integral x);
}
```
* Integral[italic]


## 概要
指定された値の数値分類を返す。


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
本関数は、C 言語の `fpclassify` マクロと同等の機能を持つ。


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
