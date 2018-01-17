# sph_neumann
* cmath[meta header]
* function[meta id-type]
* std[meta namespace]
* [mathjax enable]
* cpp17[meta cpp]

```cpp
namespace std {
float sph_neumannf(unsigned n, float x);
double sph_neumann(unsigned n, double x);
long double sph_neumannl(unsigned n, long double x);
}
```

## 概要
第二種球ベッセル関数 (spherical Bessel functions of the second kind)、球ノイマン関数 (spherical Neumann functions) を求める。


## 戻り値
引数 `n`, `x` の第二種球ベッセル関数
$$
n_n(x) = \sqrt{\frac{\pi}{2x}} N_{n + 1/2}(x)
\text{ for } x \ge 0
$$
を返す。
$N$ は第二種ベッセル関数 ([`cyl_neumann`](cyl_neumann.md)) である。


## 備考
`n >= 128` の場合、この関数の呼び出しの効果は実装定義である。


## 例
```cpp example
#include <cmath>
#include <iostream>

void p(unsigned n) {
  for (double x : {0, 1, 2}) {
    std::cout << "sph_neumann(" << n << ", " << x << ") = " << std::sph_neumann(n, x) << "\n";
  }
  std::cout << "\n";
}

int main() {
  p(0);
  p(1);
  p(2);
}
```
* std::sph_neumann[color ff0000]

### 出力例
```
sph_neumann(0, 0) = -inf
sph_neumann(0, 1) = -0.540302
sph_neumann(0, 2) = 0.208073

sph_neumann(1, 0) = -inf
sph_neumann(1, 1) = -1.38177
sph_neumann(1, 2) = -0.350612

sph_neumann(2, 0) = -inf
sph_neumann(2, 1) = -3.60502
sph_neumann(2, 2) = -0.733991

```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 7.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
* 第二種ベッセル関数 [`cyl_neumann`](cyl_neumann.md)


## 参照
- [N3060 JTC1.22.29124 Programming Language C++ — Special Math Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3060.pdf)
- [WG21 P0226R1 Mathematical Special Functions for C++17, v5](https://isocpp.org/files/papers/P0226R1.pdf)
- [ISO/IEC 29124:2010 Information technology -- Programming languages, their environments and system software interfaces -- Extensions to the C++ Library to support mathematical special functions](https://www.iso.org/standard/50511.html)
