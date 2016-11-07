#isfinite
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int isfinite(float x);
  int isfinite(double x);
  int isfinite(long double x);

  int isfinite(Integral x);
}
```
* Integral[italic]

##概要
数値が有限(finite value)であるか判定する。


##戻り値
パラメータ`x`がゼロ、非正規化数、正規化数のいずれかであり、無限大とNaNのいずれでもない場合に有限値であると見なし、非ゼロを返す。そうでない場合、ゼロを返す。


##備考
C標準ライブラリでは`isfinite`は関数マクロとして定義されるが、C++標準ライブラリでは関数として定義される。


##例
```cpp
#include <iostream>
#include <cassert>
#include <cmath>
#include <limits>

int main()
{
  // 正規化数は有限値
  bool result_normal = std::isfinite(3.0f);
  assert(result_normal);

  // ゼロは有限値
  bool result_zero = std::isfinite(0.0f);
  assert(result_zero);

  if (std::numeric_limits<float>::has_denorm) {
    // 非正規化数は有限値
    bool result_denorm = std::isfinite(std::numeric_limits<float>::denorm_min());
    assert(result_denorm);
  }
  else {
    std::cout << "非正規化数を持たない環境です" << std::endl;
  }

  // 無限大は有限値ではない
  bool result_infinity = std::isfinite(std::numeric_limits<float>::infinity());
  assert(!result_infinity);

  // NaNは有限値ではない
  bool result_nan = std::isfinite(std::numeric_limits<float>::quiet_NaN());
  assert(!result_nan);
}
```
* std::isfinite[color ff0000]
* assert[link /reference/cassert/assert.md]
* std::numeric_limits[link /reference/limits/numeric_limits.md]
* infinity()[link /reference/limits/numeric_limits/infinity.md]
* quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]
* has_denorm()[link /reference/limits/numeric_limits/has_denorm.md]
* denorm_min()[link /reference/limits/numeric_limits/denorm_min.md]

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
