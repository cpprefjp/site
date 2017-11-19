# assoc_laguerre
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float assoc_laguerref(unsigned n, unsigned m, float x);
double assoc_laguerre(unsigned n, unsigned m, double x);
long double assoc_laguerrel(unsigned n, unsigned m, long double x);
}
```

## 概要
ラゲール陪多項式 (associated Laguerre polynomials) を計算する。


## 戻り値
引数 `n`, `m`, `x` のラゲール陪多項式
$$
L_n^m(x) = (-1)^m \frac{\mathrm d^m}{\mathrm dx^m} L_{m+n}(x) \quad \text{for } x \ge 0
$$
を返す。


## 備考
`n >= 128 || m >= 128` の場合、この関数の呼び出しの効果は実装定義である。


## 例
```cpp
#include <cmath>
#include <iostream>

void p(unsigned n, unsigned m) {
  for (double x : {0, 1, 2})
    std::cout << "assoc_laguerre(" << n << ", " << m << ", " << x << ") = "
      << std::assoc_laguerre(n, m, x) << "\n";
  std::cout << "\n";
}

int main() {
  p(0, 0); // L_0^0 = 1
  p(0, 1); // L_0^1 = 1
  p(1, 0); // L_1^0 = - x + 1
  p(1, 1); // L_1^1 = - x + 2
  p(2, 0); // L_2^0 = (x^2 - 4x + 2) / 2
  p(2, 1); // L_2^1 = (x^2 - 6x + 6) / 2
}
```
* std::assoc_laguerre[color ff0000]

### 出力例
```
assoc_laguerre(0, 0, 0) = 1
assoc_laguerre(0, 0, 1) = 1
assoc_laguerre(0, 0, 2) = 1

assoc_laguerre(0, 1, 0) = 1
assoc_laguerre(0, 1, 1) = 1
assoc_laguerre(0, 1, 2) = 1

assoc_laguerre(1, 0, 0) = 1
assoc_laguerre(1, 0, 1) = 0
assoc_laguerre(1, 0, 2) = -1

assoc_laguerre(1, 1, 0) = 2
assoc_laguerre(1, 1, 1) = 1
assoc_laguerre(1, 1, 2) = 0

assoc_laguerre(2, 0, 0) = 1
assoc_laguerre(2, 0, 1) = -0.5
assoc_laguerre(2, 0, 2) = -1

assoc_laguerre(2, 1, 0) = 3
assoc_laguerre(2, 1, 1) = 0.5
assoc_laguerre(2, 1, 2) = -1

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
GCC 7.1.0–8.0.0 では定義域エラーが発生したときに [`std::domain_error`](/reference/stdexcept.md) を送出する。


## 関連項目
* [`laguerre`](laguerre.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)


## 実装例
### 閉形式
$$
L_n^m(x) = \sum_{j=0}^n \frac{(m+n)!}{(m+j)! (n-j)!} \frac{(-x)^j}{j!}
$$

### 漸化式
$$
L_n^m(x) = \frac{(2n + m - 1 - x)L_{n-1}^m(x) - (n + m - 1) L_{n-2}^m(x)}{n};
L_0^m(x) = 1, L_1^m(x) = -x + m + 1
$$
