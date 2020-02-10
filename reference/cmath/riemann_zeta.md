# riemann_zeta
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float riemann_zetaf(float x);
double riemann_zeta(double x);
long double riemann_zetal(long double x);
}
```

## 概要
リーマンのゼータ関数 (Riemann zeta function) を求める。


## 戻り値
引数 `x` のリーマンゼータ関数
$$
\zeta (x) = \begin{cases}
  \displaystyle
  \sum_{k=1}^\infty k^{-x} &amp; \text{for } x > 1 \\
  \displaystyle
  \frac{1}{1 - 2^{1-x}} \sum_{k=1}^\infty (-1)^{k-1} k^{-x} &amp; \text{for } 0 \le x \le 1 \\
  \displaystyle
  2^x \pi^{x-1} \sin \frac{\pi x}{2} \Gamma (1 - x) \zeta(1 - x) &amp; \text{for } x &lt; 0
\end{cases}
$$
を返す。


## 例
```cpp example
#include <cmath>
#include <iostream>

int main() {
  std::cout << "riemann_zeta(-2) = " << std::riemann_zeta(-2) << "\n";  // 0
  std::cout << "riemann_zeta(-1) = " << std::riemann_zeta(-1) << "\n";  // -1 / 12
  std::cout << "riemann_zeta(0)  = " << std::riemann_zeta(0) << "\n";   // -1 / 2
  std::cout << "riemann_zeta(1)  = " << std::riemann_zeta(1) << "\n";   // ∞
  std::cout << "riemann_zeta(2)  = " << std::riemann_zeta(2) << "\n";   // π^2 / 6
}
```
* std::riemann_zeta[color ff0000]

### 出力例
```
riemann_zeta(-2) = 0
riemann_zeta(-1) = -0.0833333
riemann_zeta(0)  = -0.5
riemann_zeta(1)  = inf
riemann_zeta(2)  = 1.64493
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 7.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
