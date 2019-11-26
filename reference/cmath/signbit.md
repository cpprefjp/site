# signbit
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  bool signbit(float x);
  bool signbit(double x);
  bool signbit(long double x);

  bool signbit(Integral x);
}
```
* Integral[italic]

## 概要
数値の符号が負であるか判定する。


## 戻り値
パラメータ`x`が負数である場合、`true`を返す。そうでない場合、`false`を返す。

この関数はその名前の通り、浮動小数点数の符号ビットを検出する。そのため、`NaN`の符号を検出することができる。  
他には[`std::copysign`](/reference/cmath/copysign.md)でも検出でき、この2つのみが`NaN`の符号を検出できる移植性のある方法となる。


## 備考
C標準ライブラリでは`signbit`は関数マクロとして定義されるが、C++標準ライブラリでは関数として定義される。


## 例
```cpp example
#include <cassert>
#include <cmath>

int main()
{
  assert(std::signbit(-1.0f));
  assert(std::signbit(-0.0f));

  assert(!std::signbit(1.0f));
  assert(!std::signbit(0.0f));
  
  constexpr float nan = std::numeric_limits<float>::quiet_NaN();
  assert(!std::signbit(nan));
  assert(std::signbit(-nan));
}
```
* std::signbit[color ff0000]

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
