# abs
* cmath[meta header]
* std[meta namespace]
* function[meta id-type]
* [mathjax enable]

```cpp
namespace std {
  float abs(float x);
  double abs(double x);
  long double abs(long double x);

  double abs(Integral x);     // C++11 から C++14 まで

  int abs(int x);             // C++17 から
  long abs(long int x);       // C++17 から
  long long abs(long long x); // C++17 から
}
```
* Integral[italic]

## 概要
浮動小数点数型の絶対値を求める。abs は absolute value（絶対値）の略。


## 戻り値
引数 `x` の絶対値を返す。

`x` が `±∞` だった場合 `+∞` を返す。


## 備考
- $$ f(x) = | x | $$
- 任意の整数型に対するオーバー�ードが C++11 で追加されたが、ある種の問題を引き起こすことから、今後削除される可能性がある。[Validity and return type of std::abs(0u) is unclear](http://wg21.cmeerw.net/lwg/issue2192) 参照。


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
