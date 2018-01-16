# ellint_2
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float ellint_2f(float x, float phi);
double ellint_2(double x, double phi);
long double ellint_2l(long double x, long double phi);
}
```

## 概要
第二種不完全楕円積分 (incomplete elliptic integral of the second kind) を計算する。


## 戻り値
引数 `k`, `phi` の第二種不完全楕円積分
$$
E(k, \phi) = \int_0^\phi \mathrm d\theta ~ \sqrt{1 - k^2 \sin^2 \theta} \text{ for } |k| \le 1
$$
を返す。


## 備考
$ E(k, \pi/2) = E(k) $ (第二種完全楕円積分 [`comp_ellint_2`](comp_ellint_2.md))。


## 例
```cpp example
#include <cmath>
#include <iostream>

constexpr double pi = 3.141592653589793;

void p(double k) {
  for (double q : {0., 0.25, 0.5}) {
    std::cout << "ellint_2(" << k << ", " << q << " pi) = " << std::ellint_2(k, q * pi) << "\n";
  }
  std::cout << "\n";
}

int main() {
  p(0);   // ellint_2(0, phi) = phi
  p(0.5);
  p(1);   // ellint_2(1, phi) = sin(phi) for phi ∈ (-π/2, π/2)
}
```
* std::ellint_2[color ff0000]

### 出力例
```
ellint_2(0, 0 pi) = 0
ellint_2(0, 0.25 pi) = 0.785398
ellint_2(0, 0.5 pi) = 1.5708

ellint_2(0.5, 0 pi) = 0
ellint_2(0.5, 0.25 pi) = 0.767196
ellint_2(0.5, 0.5 pi) = 1.46746

ellint_2(1, 0 pi) = 0
ellint_2(1, 0.25 pi) = 0.707107
ellint_2(1, 0.5 pi) = 1

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
* [`comp_ellint_2`](comp_ellint_2.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
