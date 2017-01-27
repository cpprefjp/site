#isnan
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int isnan(float x);
  int isnan(double x);
  int isnan(long double x);

  int isnan(Integral x);
}
```
* Integral[italic]

##概要
数値が NaN であるか判定する。


##戻り値
パラメータ`x`がNaNである場合、非ゼロを返す。そうでない場合、ゼロを返す。


##備考
C標準ライブラリでは`isnan`は関数マクロとして定義されるが、C++標準ライブラリでは関数として定義される。


##例
```cpp
#include <cassert>
#include <cmath>
#include <limits>

int main()
{
  bool result1 = std::isnan(std::numeric_limits<float>::quiet_NaN());
  bool result2 = std::isnan(std::numeric_limits<float>::signaling_NaN());

  assert(result1);
  assert(result2);
}
```
* std::isnan[color ff0000]
* quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]
* signaling_NaN()[link /reference/limits/numeric_limits/signaling_nan.md]

###出力
```
```

###備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
