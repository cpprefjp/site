# isfinite
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  bool isfinite(float x);
  bool isfinite(double x);
  bool isfinite(long double x);

  bool isfinite(Integral x);
}
```
* Integral[italic]

## 概要
数値が有限(finite value)であるか判定する。


## 戻り値
パラメータ`x`がゼ�、非�規化数、�規化数のいずれかであり、無限大とNaNのいずれでもない場合に有限値であると見なし、`true`を返す。そうでない場合、`false`を返す。


## 備考
C標準ライブラリでは`isfinite`は関数マク�として定義されるが、C++標準ライブラリでは関数として定義される。


## 例
```cpp example
#include <iostream>
#include <cassert>
#include <cmath>
#include <limits>

int main()
{
  // �規化数は有限値
  bool result_normal = std::isfinite(3.0f);
  assert(result_normal);

  // ゼ�は有限値
  bool result_zero = std::isfinite(0.0f);
  assert(result_zero);

  if (std::numeric_limits<float>::has_denorm) {
    // 非�規化数は有限値
    bool result_denorm = std::isfinite(std::numeric_limits<float>::denorm_min());
    assert(result_denorm);
  }
  else {
    std::cout << "非�規化数を持たない環境です" << std::endl;
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
* infinity()[link /reference/limits/numeric_limits/infinity.md]
* quiet_NaN()[link /reference/limits/numeric_limits/quiet_nan.md]
* has_denorm[link /reference/limits/numeric_limits/has_denorm.md]
* denorm_min()[link /reference/limits/numeric_limits/denorm_min.md]

### 出力
```
```

### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
