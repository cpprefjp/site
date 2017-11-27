# signbit
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  int signbit(float x);
  int signbit(double x);
  int signbit(long double x);

  int signbit(Integral x);
}
```
* Integral[italic]

## 概要
数値の符号が負であるか判定する。


## 戻り値
パラメータ`x`が負数である場合、非ゼロを返す。そうでない場合、ゼロを返す。


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
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
