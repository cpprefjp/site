# isunordered
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  bool isunordered(double x, double y);

  bool isunordered(float x, float y);

  bool isunordered(long double x, long double y);

  bool isunordered(Integral x, Integral y);
}
```
* Integral[italic]

## 概要
浮動小数点数について、左辺が右辺が順序付けされていないかを判定する。

NaNに対する順序付けはされないため、`x`と`y`のいずれかがNaNである場合、この関数は`true`を返す。



## 戻り値
引数が順序付けされていなければ`true`を返し、そうでなければ`false`を返す。


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
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
