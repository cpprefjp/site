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
- [`compatible-static-extents`](/reference/linalg/compatible-static-extents.md)`<InOutVec1, InOutVec2>(0,0) == true`


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


### 出力


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


## 参照
- [P0788R3 Standard Library Specification in a Concepts and Contracts World](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0788r3.pdf)
- [`LAPACK: crot`](https://netlib.org/lapack/explore-html/d1/d45/group__rot_ga25544801d45dcabdec7b24d863ebea9c.html#ga25544801d45dcabdec7b24d863ebea9c)
