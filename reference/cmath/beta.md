# beta
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float betaf(float x, float y);
double beta(double x, double y);
long double betal(long double x, long double y);
}
```

## 概要
ベータ関数 (beta function) を求める。


## 戻り値
引数 `x`, `y` のベータ関数
$$
\mathrm{B}(x, y) = \int_0^1 \mathrm{d}t ~ t^{x-1} (1-t)^{y-1} = \frac{\Gamma(x) \Gamma(y)}{\Gamma(x + y)}
\quad \text{for } x > 0, y > 0
$$
を返す。$\Gamma$ はガンマ関数 ([`tgamma`](tgamma.md))。


## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << "beta(0, 0)      = " << std::beta(0, 0) << std::endl;      // 定義域エラー; 特異点
  std::cout << "beta(-0.5, 1.5) = " << std::beta(-0.5, 1.5) << std::endl; // 定義域エラー; 解析接続すれば -π
  std::cout << "beta(1, 1)      = " << std::beta(1, 1) << std::endl;      // 1
  std::cout << "beta(2, 4)      = " << std::beta(2, 4) << std::endl;      // 1 / 20
}
```
* std::beta[color ff0000]

### 出力例
```
beta(0, 0)      = -nan
beta(-0.5, 1.5) = 3.14159
beta(1, 1)      = 1
beta(2, 4)      = 0.05
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 7.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
#### GCC (libstdc++)
GCC 7.1.0–8.0.0 では `beta` は [`exp`](exp.md) と [`lgamma`](lgamma.md) を用いて
$ |\mathrm{B}(x, y)| = \exp(\ln |\Gamma(x) \Gamma(y) / \Gamma(x + y)|)) $
を計算する。
`x < 0 || y < 0` でも定義域エラーを報告せずに値を返すが、返り値は必ず�になる。


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
