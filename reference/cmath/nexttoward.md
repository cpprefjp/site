# nexttoward
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  float nexttoward(float x, long double y);
  double nexttoward(double x, long double y);
  long double nexttoward(long double x, long double y);

  Promoted nexttoward(Integral x, long double y);

  float nexttowardf(float x, long double y);             // C++17 から
  long double nexttowardl(long double x, long double y); // C++17 から
}
```
* Integral[italic]
* Promoted[italic]

## 概要
指定方向への次の表現可能な値を取得する。

この関数は、パラメータ`x`の値をパラメータ`y`の値の方向に対して、その環境で表現可能な最小の値だけ進める。

この関数はパラメータ`y`の型が`long double`固定であることを除いて、[`std::nextafter()`](nextafter.md)関数と同等である。


## 戻り値
パラメータ`x`の値をパラメータ`x`の方向に、表現可能な最小の値だけ進めた値を返す。

`x`と`y`が等値である場合、`y`を返す。

進めた結果が無限大、もしくは表現できない場合、値域エラーとなる。


## 例
```cpp example
#include <iostream>
#include <cmath>

int main()
{
  float result1 = std::nexttoward(0.0f, 1.0L);
  std::cout << result1 << std::endl;

  float result2 = std::nexttoward(0.0f, -1.0L);
  std::cout << result2 << std::endl;
}
```
* std::nexttoward[color ff0000]

### 出力例
```
1.4013e-45
-1.4013e-45
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
