# isinf
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  bool isinf(float x);
  bool isinf(double x);
  bool isinf(long double x);

  bool isinf(Integral x);
}
```
* Integral[italic]

## 概要
数値が無限大(infinity)であるか判定する。


## 戻り値
パラメータ`x`が(�もしくは負の)無限大である場合、`true`を返す。そうでない場合、`false`を返す。


## 備考
C標準ライブラリでは`isinf`は関数マク�として定義されるが、C++標準ライブラリでは関数として定義される。


## 例
```cpp example
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
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
