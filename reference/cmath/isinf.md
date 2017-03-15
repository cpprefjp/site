# isinf
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int isinf(float x);
  int isinf(double x);
  int isinf(long double x);

  int isinf(Integral x);
}
```
* Integral[italic]

## 概要
数値が無限大(infinity)であるか判定する。


## 戻り値
パラメータ`x`が(正もしくは負の)無限大である場合、非ゼロを返す。そうでない場合、ゼロを返す。


## 備考
C標準ライブラリでは`isinf`は関数マクロとして定義されるが、C++標準ライブラリでは関数として定義される。


## 例
```cpp
#include <cassert>
#include <cmath>
#include <limits>

int main()
{
  bool result = std::isinf(std::numeric_limits<float>::infinity());
  assert(result);
}
```
* std::isinf[color ff0000]
* infinity()[link /reference/limits/numeric_limits/infinity.md]

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
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
