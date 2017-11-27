# hermite
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float hermitef(unsigned n, float x);
double hermite(unsigned n, double x);
long double hermitel(unsigned n, long double x);
}
```

## 概要
エルミート多項式 (Hermite polynomials) を求める。


## 戻り値
引数 `n`, `x` のエルミート多項式
$$ H_n(x) = (-1)^n \exp(x^2) \frac{\mathrm{d}^n}{\mathrm{d}x^n} \exp(-x^2) $$
を返す。


## 備考
`n >= 128` の場合、この関数の呼び出しの効果は実装定義である。


## 例
```cpp example
#include <cmath>
#include <iostream>

void p(unsigned n) {
  for (double x : {-1, 0, 1})
    std::cout << "hermite(" << n << ", " << x << ") = " << std::hermite(n, x) << "\n";
  std::cout << "\n";
}

int main() {
  p(0); // H0 = 1
  p(1); // H1 = 2x
  p(2); // H2 = 4x^2 - 2
  p(3); // H3 = 8x^3 - 12x
}
```
* std::hermite[color ff0000]

### 出力例
```
hermite(0, -1) = 1
hermite(0, 0) = 1
hermite(0, 1) = 1

hermite(1, -1) = -2
hermite(1, 0) = 0
hermite(1, 1) = 2

hermite(2, -1) = 2
hermite(2, 0) = -2
hermite(2, 1) = 2

hermite(3, -1) = 4
hermite(3, 0) = -0
hermite(3, 1) = -4

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


## 実装例
### 閉形式
$$ H_n(x) = n! \sum_{j=0}^{\lfloor n / 2 \rfloor} \frac{(-1)^j}{j! (n - 2j)!} (2x)^{n - 2j} $$

### 漸化式
$$ H_n(x) = 2 x H_{n-1}(x) - 2 (n-1) H_{n-2}(x); H_0(x) = 1, H_1(x) = 2x $$
