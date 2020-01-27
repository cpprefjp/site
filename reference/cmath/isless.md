# isless
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  bool isless(double x, double y);

  bool isless(float x, float y);

  bool isless(long double x, long double y);

  bool isless(Integral x, Integral y);
}
```
* Integral[italic]

## 概要
浮動小数点数について、左辺が右辺より小さいかを判定する。



## 戻り値
`x < y`と�価の演算によって、`x`が`y`より小さければ`true`、そうでなければ`false`を返す。

`x < y`と違って、この関数は`x`と`y`が順序付けされていない場合に、[`FE_INVALID`](/reference/cfenv/fe_invalid.md)（無効演算浮動小数点例外）は発生しない。


## 備考
- C標準ライブラリでは本関数は関数マク�として定義されるが、C++標準ライブラリでは関数として定義される。
- C標準ライブラリでは本関数は`int`型を戻り値とするが、C++標準ライブラリでは`bool`型を戻り値とする。


## 例
```cpp example
#include <iostream>
#include <cmath>
#include <limits>

void test(double x, double y)
{
  std::cout << std::boolalpha;
  std::cout << "isless(" << x << ", " << y << ") = " << std::isless(x, y) << std::endl;
}

int main()
{
  test(1.0, 2.0);
  test(2.0, 1.0);
  test(2.0, 2.0);

  test(-0.0, 0.0);

  const double inf = std::numeric_limits<double>::infinity();
  const double nan = std::numeric_limits<double>::quiet_NaN();

  test(1.0, inf);
  test(inf, 1.0);
  test(inf, inf);

  test(1.0, nan);
  test(nan, 1.0);
  test(nan, nan);
}
```
* std::isless[color ff0000]
* infinity()[link /reference/limits/numeric_limits/infinity.md]
* quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]

### 出力例
```
isless(1, 2) = true
isless(2, 1) = false
isless(2, 2) = false
isless(-0, 0) = false
isless(1, inf) = true
isless(inf, 1) = false
isless(inf, inf) = false
isless(1, nan) = false
isless(nan, 1) = false
isless(nan, nan) = false
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
