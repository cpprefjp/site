# apply_givens_rotation

* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]


```cpp
namespace std::linalg {
  template<inout-vector InOutVec1,
          inout-vector InOutVec2,
          class Real>
  void apply_givens_rotation(
    InOutVec1 x,
    InOutVec2 y,
    Real c,
    Real s);          // (1)

  template<class ExecutionPolicy,
          inout-vector InOutVec1,
          inout-vector InOutVec2,
          class Real>
  void apply_givens_rotation(
    ExecutionPolicy&& exec,
    InOutVec1 x,
    InOutVec2 y,
    Real c,
    Real s);          // (2)

  template<inout-vector InOutVec1,
          inout-vector InOutVec2,
          class Real>
  void apply_givens_rotation(
    InOutVec1 x,
    InOutVec2 y,
    Real c,
    complex<Real> s); // (3)

  template<class ExecutionPolicy,
          inout-vector InOutVec1,
          inout-vector InOutVec2,
          class Real>
  void apply_givens_rotation(
    ExecutionPolicy&& exec,
    InOutVec1 x,
    InOutVec2 y,
    Real c,
    complex<Real> s); // (4)
}
```
* complex[link /reference/complex/complex.md]


## 概要
`c`と`s`で指定された回転行列を2つの**行**ベクトル`x`と`y`に対して、次のように掛けて代入する。
$$
\begin{pmatrix}
\mathbf{x} \\
\mathbf{y}
\end{pmatrix}
\leftarrow
\begin{pmatrix}
c & s\\
-\overline{s} & c
\end{pmatrix}
\begin{pmatrix}
\mathbf{x} \\
\mathbf{y}
\end{pmatrix}
$$


## 適格要件
- 共通:
    + `Real`が[`complex`](/reference/complex/complex.md)`<Real>`を規定できる型であること
    + [`compatible-static-extents`](/reference/linalg/compatible-static-extents.md)`<InOutVec1, InOutVec2>(0,0) == true`
- (2), (4): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
- `x.extent(0) == y.extent(0)`
- $c^2 + |s|^2 = 1$


## 効果
`c`と`s`で指定された回転を行ベクトル`x`と`y`がこの順に隣り合うとして行う。

- (1): 実回転行列に対して逐次実行する。
- (2): 実回転行列に対して、指定された実行ポリシーに応じて実行する。
- (3): `s`が複素数の回転行列に対して逐次実行する。
- (4): `s`が複素数の回転行列に対して、指定された実行ポリシーに応じて実行する。


## 戻り値
なし


## 例
**[注意] 処理系にあるコンパイラで確認していないため、間違っているかもしれません。**

```cpp example
#include <cmath>
#include <complex>
#include <initializer_list>
#include <execution>
#include <iostream>
#include <linalg>
#include <mdspan>
#include <vector>

template <class Vector>
void print(Vector v) {
  for (int i = 0; i < v.extent(0) - 1; ++i) {
    std::cout << v[i] << ", ";
  }
  std::cout << v[v.extent(0) - 1] << std::endl;
}

int main()
{
  constexpr size_t N = 2;

  using Complex = std::complex<double>;

  {
    std::initializer_list<double> a_coeff = {1, std::sqrt(3.0)};
    std::initializer_list<double> b_coeff = {std::sqrt(3.0), -0.5};

    std::vector<double> a_vec(a_coeff);
    std::mdspan a(a_vec.data(), N);

    std::vector<double> b_vec(b_coeff);
    std::mdspan b(b_vec.data(), N);

    double c = 0.5;
    double s = -std::sqrt(3.0) / 2;

    // (1)
    std::linalg::apply_givens_rotation(a, b, c, s);
    print(a);
    print(b);

    // (2)
    // aとbを初期化
    a_vec = a_coeff;
    b_vec = b_coeff;
    std::linalg::apply_givens_rotation(std::execution::par, a, b, c, s);
    print(a);
    print(b);
  }

  {
    std::initializer_list<Complex> a_coeff = {Complex{1, 0}, Complex{std::sqrt(3.0), 0}};
    std::initializer_list<Complex> b_coeff = {Complex{0, std::sqrt(3.0)}, Complex{0, -0.5}};

    std::vector<Complex> a_vec(a_coeff);
    std::mdspan a(a_vec.data(), N);

    std::vector<Complex> b_vec(b_coeff);
    std::mdspan b(b_vec.data(), N);

    double  c = 0.5;
    Complex s = Complex{0, -std::sqrt(3.0) / 2};

    // (3)
    std::linalg::apply_givens_rotation(a, b, c, s);
    print(a);
    print(b);

    // (4)
    // aとbを初期化
    a_vec = a_coeff;
    b_vec = b_coeff;
    std::linalg::apply_givens_rotation(std::execution::par, a, b, c, s);
    print(a);
    print(b);
  }

  return 0;
}
```
* std::linalg::apply_givens_rotation[color ff0000]


### 出力
```
(1)
1, 0
0, -1
(2)
1, 0
0, -1
(3)
(1,0), (0,0)
(0,0), (0,-1)
(4)
(1,0), (0,0)
(0,0), (0,-1)
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution`](/reference/execution.md)
- [`mdspan`](/reference/mdspan.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [`LAPACK: crot`](https://netlib.org/lapack/explore-html/d1/d45/group__rot_ga25544801d45dcabdec7b24d863ebea9c.html#ga25544801d45dcabdec7b24d863ebea9c)
