# isgreater
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  bool isgreater(double x, double y);

  bool isgreater(float x, float y);

  bool isgreater(long double x, long double y);

  bool isgreater(Integral x, Integral y);
}
```
* Integral[italic]

## 概要
浮動小数点数について、左辺が右辺より大きいかを判定する。



## 戻り値
`x > y`と同等の演算によって、`x`が`y`より大きければ`true`、そうでなければ`false`を返す。

`x > y`と違って、この関数は`x`と`y`が順序付けされていない場合に、[`FE_INVALID`](/reference/cfenv/fe_invalid.md)（無効演算浮動小数点例外）は発生しない。


## 備考
- C標準ライブラリでは本関数は関数マクロとして定義されるが、C++標準ライブラリでは関数として定義される。
- C標準ライブラリでは本関数は`int`型を戻り値とするが、C++標準ライブラリでは`bool`型を戻り値とする。


## 例
```cpp
#include <iostream>
#include <cmath>
#include <limits>

void test(double x, double y)
{
  std::cout << std::boolalpha;
  std::cout << "isgreater(" << x << ", " << y << ") = " << std::isgreater(x, y) << std::endl;
}

int main()
{
  test(2.0, 1.0);
  test(1.0, 2.0);
  test(2.0, 2.0);

  test(0.0, -0.0);

  const double inf = std::numeric_limits<double>::infinity();
  const double nan = std::numeric_limits<double>::quiet_NaN();

  test(inf, 1.0);
  test(1.0, inf);
  test(inf, inf);

  test(nan, 1.0);
  test(1.0, nan);
  test(nan, nan);
}
```
* std::isgreater[color ff0000]
* infinity()[link /reference/limits/numeric_limits/infinity.md]
* quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]

### 出力例
```
isgreater(2, 1) = true
isgreater(1, 2) = false
isgreater(2, 2) = false
isgreater(0, -0) = false
isgreater(inf, 1) = true
isgreater(1, inf) = false
isgreater(inf, inf) = false
isgreater(nan, 1) = false
isgreater(1, nan) = false
isgreater(nan, nan) = false
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
