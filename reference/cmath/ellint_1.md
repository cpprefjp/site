# ellint_1
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float ellint_1f(float k, float phi);
double ellint_1(double k, double phi);
long double ellint_1l(long double k, long double phi);
}
```

## 概要
第一種不完全楕円積分 (incomplete elliptic integral of the first kind) を計算する。


## 戻り値
引数 `k`, `phi` の第一種不完全楕円積分
$$
F(k, \phi) = \int_0^\phi \frac{\mathrm d\theta}{\sqrt{1 - k^2 \sin^2 \theta}} \text{ for } |k| \le 1
$$
を返す。


## 備考
$ F(k, \pi/2) = K(k)$ (第一種完全楕円積分 [`comp_ellint_1`](comp_ellint_1.md))。


## 例
```cpp example
#include <cmath>
#include <iostream>

constexpr double pi = 3.14159265358979323846;

void p(double k) {
  for (double q : {0., 0.25, 0.5}) {
    std::cout << "ellint_1(" << k << ", " << q << "pi) = " << std::ellint_1(k, q * pi) << "\n";
  }
  std::cout << "\n";
}

int main() {
  p(0);
  p(0.5);
  p(1);
}
```
* std::ellint_1[color ff0000]

### 出力例
```
ellint_1(0, 0pi) = 0
ellint_1(0, 0.25pi) = 0.785398
ellint_1(0, 0.5pi) = 1.5708

ellint_1(0.5, 0pi) = 0
ellint_1(0.5, 0.25pi) = 0.804366
ellint_1(0.5, 0.5pi) = 1.68575

ellint_1(1, 0pi) = 0
ellint_1(1, 0.25pi) = 0.881374
ellint_1(1, 0.5pi) = nan

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
* [`comp_ellint_1`](comp_ellint_1.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
