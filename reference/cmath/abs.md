# abs
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float abs(float x);             // (1)
  double abs(double x);           // (2)
  long double abs(long double x); // (3)

  double abs(Integral x);     // (4) C++11 から C++14 まで

  int abs(int x);             // (5) C++17 から
  long abs(long int x);       // (6) C++17 から
  long long abs(long long x); // (7) C++17 から
}
```
* Integral[italic]

## 概要
浮動小数点数型の絶対値を求める。abs は absolute value（絶対値）の略。


## 戻り値
引数 `x` の絶対値を返す。

- (1),(2),(3) : `x` が `±∞` だった場合 `+∞` を返す。


## 備考
- $$ f(x) = | x | $$
- 任意の整数型に対するオーバーロード(4)は C++11 で追加されたが、[一部の符号なし整数型に対して問題を引き起こす](http://wg21.cmeerw.net/lwg/issue2192)ことから C++17 で削除され、符号付き整数型に対するオーバーロード(5),(6),(7)が追加された。


## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << std::fixed;
  std::cout << "abs(1.5)  = " << std::abs(1.5) << std::endl;
  std::cout << "abs(-1.5) = " << std::abs(-1.5) << std::endl;
}
```
* std::abs[color ff0000]
* std::fixed[link /reference/ios/fixed.md]

### 出力
```
abs(1.5)  = 1.500000
abs(-1.5) = 1.500000
```

### 備考
特定の環境で `constexpr` 指定されている場合がある。（独自拡張）

- GCC 4.6.1 以上


## 実装例
```cpp
namespace std {
  constexpr float abs(float x) {
    return x < 0 ? -x : x;
  }

  constexpr double abs(double x) {
    return x < 0 ? -x : x;
  }

  constexpr long double abs(long double x) {
    return x < 0 ? -x : x;
  }
}
```
