# ellint_3
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float ellint_3f(float k, float nu, float phi);
double ellint_3(double k, double nu, double phi);
long double ellint_3l(long double k, long double nu, long double phi);
}
```

## 概要
第三種不完全楕円積分 (incomplete elliptic integral of the third kind) を計算する。


## 戻り値
引数 `k`, `nu`, `phi` の第三種不完全楕円積分
$$
\Pi(\nu, k, \phi)
= \int_0^\phi \frac{\mathrm d\theta}{(1 - \nu sin^2 \theta) \sqrt{1 - k^2 \sin^2 \theta}} \text{ for } |k| \le 1
$$
を返す。


## 備考
$ Pi(\nu, k, \pi/2) = \Pi(\nu, k) $ (第三種完全楕円積分 [`comp_ellint_3`](comp_ellint_3.md))。

$ Pi(0, k, \phi) = \F(k, \phi) $ (第一種不完全楕円積分 [`ellint_1`](ellint_1.md))。


## 例
```cpp example
#include <cmath>
#include <iostream>

constexpr double pi = 3.141592653589793;

void p(double k, double nu) {
  for (double q : {0., 0.25, 0.5}) {
    std::cout << "ellint_3(" << k << ", " << nu << ", " << q << " pi) = ";
    try {
      std::cout << std::ellint_3(k, nu, q * pi) << "\n";
    } catch(const std::domain_error& e) {
      std::cout << "(domain_error)\n";
    }
  }
  std::cout << "\n";
}

int main() {
  p(0, -1);   // ellint_3(0, -1, phi) = atan(sqrt(2) * tan(phi)) / sqrt(2)
  p(0.5, -1);
  p(0, 0);    // ellint_3(0,  0, phi) = phi
  p(0.5, 0);
  p(0, 1);    // ellint_3(0,  1, phi) = tan(phi)
  p(0.5, 1);
}
```
* std::ellint_3[color ff0000]

### 出力例
```
ellint_3(0, -1, 0 pi) = 0
ellint_3(0, -1, 0.25 pi) = 0.675511
ellint_3(0, -1, 0.5 pi) = 1.11072

ellint_3(0.5, -1, 0 pi) = 0
ellint_3(0.5, -1, 0.25 pi) = 0.690078
ellint_3(0.5, -1, 0.5 pi) = 1.17745

ellint_3(0, 0, 0 pi) = 0
ellint_3(0, 0, 0.25 pi) = 0.785398
ellint_3(0, 0, 0.5 pi) = 1.5708

ellint_3(0.5, 0, 0 pi) = 0
ellint_3(0.5, 0, 0.25 pi) = 0.804366
ellint_3(0.5, 0, 0.5 pi) = 1.68575

ellint_3(0, 1, 0 pi) = 0
ellint_3(0, 1, 0.25 pi) = 1
ellint_3(0, 1, 0.5 pi) = (domain_error)

ellint_3(0.5, 1, 0 pi) = 0
ellint_3(0.5, 1, 0.25 pi) = 1.02866
ellint_3(0.5, 1, 0.5 pi) = (domain_error)

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
GCC 7.1.0–8.0.0 では

* `|k| > 1` のときに [`std::domain_error`](/reference/stdexcept.md) を送出する。
* `1 - nu * sin^2(phi) < 0` のときに [`std::domain_error`](/reference/stdexcept.md) を送出する。


## 関連項目
* [`comp_ellint_3`](comp_ellint_3.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
