# assoc_legendre
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float assoc_legendref(unsigned l, unsigned m, float x);
double assoc_legendre(unsigned l, unsigned m, double x);
long double assoc_legendrel(unsigned l, unsigned m, long double x);
}
```

## 概要
ルジャンドル陪関数 (associated Legendre functions) を計算する。


## 戻り値
引数 `l`, `m`, `x` のルジャンドル陪関数
$$
P_l^m(x) = (1 - x^2)^{m/2} \frac{\mathrm d^m}{\mathrm dx^m} P_l(x) \quad \text{for } |x| \le 1
$$
を返す。$P_l$ はルジャンドル多項式 ([`legendre`](legendre.md))。


## 備考
`l >= 128` の場合、この関数の呼び出しの効果は実装定義である。


## 例
```cpp example
#include <cmath>
#include <iostream>

void p(unsigned l, unsigned m) {
  for (double x : {-1, 0, 1})
    std::cout << "assoc_legendre(" << l << ", " << m << ", " << x << ") = " << std::assoc_legendre(l, m, x) << "\n";
  std::cout << "\n";
}

int main() {
  p(0, 0); // P_0^0 = 1
  p(1, 0); // P_1^0 = x
  p(1, 1); // P_1^1 = (1 - x^2)^(1/2)
  p(2, 0); // P_2^0 = (3x^2 - 1) / 2
  p(2, 1); // P_2^1 = 3x (1 - x^2)^(1/2)
  p(2, 2); // P_2^2 = 3 (1 - x^2)
}
```
* std::assoc_legendre[color ff0000]

### 出力例
```
assoc_legendre(0, 0, -1) = 1
assoc_legendre(0, 0, 0) = 1
assoc_legendre(0, 0, 1) = 1

assoc_legendre(1, 0, -1) = -1
assoc_legendre(1, 0, 0) = 0
assoc_legendre(1, 0, 1) = 1

assoc_legendre(1, 1, -1) = -0
assoc_legendre(1, 1, 0) = -1
assoc_legendre(1, 1, 1) = -0

assoc_legendre(2, 0, -1) = 1
assoc_legendre(2, 0, 0) = -0.5
assoc_legendre(2, 0, 1) = 1

assoc_legendre(2, 1, -1) = 0
assoc_legendre(2, 1, 0) = -0
assoc_legendre(2, 1, 1) = -0

assoc_legendre(2, 2, -1) = 0
assoc_legendre(2, 2, 0) = 3
assoc_legendre(2, 2, 1) = 0

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
GCC 7.1.0–8.0.0 では定義域エラーが発生したときや `l < m` の場合 ($P_l^m = 0$)、 [`std::domain_error`](/reference/stdexcept.md) を送出する。

GCC 7.1.0–8.0.0 では $(-1)^m$ 倍された値を返す。


## 関連項目
* [`legendre`](legendre.md)
* [`sph_legendre`](sph_legendre.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)


## 実装例
### 閉形式
$$
P_l^m(x) = \frac{1}{2^l l!} (1-x^2)^{m/2}
\sum_{j=0}^{\lfloor (l-m)/2 \rfloor} (-1)^j \frac{l! (2l-2j)!}{j! (l-j)! (l-m-2j)!} x^{l-m-2j}
$$

### 漸化式
$$
P_l^m(x) = \frac{(2l-1) x P_{l-1}^m(x) - (l+m-1) P_{l-2}^m}{l-m}(x);
P_{m-1}^m(x) = 0, P_m^m(x) = (2m-1)!! (1 - x^2)^{m/2}
$$
