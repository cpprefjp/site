# legendre
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float legendref(unsigned l, float x);
double legendre(unsigned l, double x);
long double legendrel(unsigned l, long double x);
}
```

## 概要
ルジャンドル多項式 (Legendre polynomials) を求める。


## 戻り値
引数 `l`, `x` のルジャンドル多項式
$$ P_l(x) = \frac{1}{2^l l!} \frac{\mathrm{d}^l}{\mathrm{d}x^l} (x^2 - 1)^l \text{ for } |x| \le 1 $$
を返す。


## 備考
`l >= 128` の場合、この関数の呼び出しの効果は実装定義である。


## 例
```cpp
#include <cmath>
#include <iostream>

int main() {
  std::cout << "legendre(0, 0.5) = " << std::legendre(0, 0.5) << std::endl; // P0 = 1
  std::cout << "legendre(1, 0.5) = " << std::legendre(1, 0.5) << std::endl; // P1 = x
  std::cout << "legendre(2, 0.5) = " << std::legendre(2, 0.5) << std::endl; // P2 = (3/2) x^2 - 1/2
}
```
* std::legendre[color ff0000]

### 出力例
```
legendre(0, 0.5) = 1
legendre(1, 0.5) = 0.5
legendre(2, 0.5) = -0.125
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
7.1.0–8.0.0 では定義域エラーが発生したときに [`std::domain_error`](/reference/stdexcept.md) を送出する。


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)


## 実装例
$$ P_l(x) = \frac{1}{2^l} \sum_{j=0}^l ( {}_l\mathrm{C}_j )^2 (x - 1)^{l - j} (x + 1)^j $$

あるいは漸化式
$$ P_l(x) = \frac{2l-1}{l}xP_{l-1}(x) - \frac{l-1}{l}P_{l-2}(x); P_0(x) = 1, P_1(x) = x $$
を用いる。
