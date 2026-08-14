# matrix_rank_1_update
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-vector InVec1,
           in-vector InVec2,
           out-matrix OutMat>
  void matrix_rank_1_update(
    InVec1 x,
    InVec2 y,
    OutMat A); // (1)

  template<class ExecutionPolicy,
           in-vector InVec1,
           in-vector InVec2,
           out-matrix OutMat>
  void matrix_rank_1_update(
    ExecutionPolicy&& exec,
    InVec1 x,
    InVec2 y,
    OutMat A); // (2)

  template<in-vector InVec1,
           in-vector InVec2,
           in-matrix InMat,
           out-matrix OutMat>
  void matrix_rank_1_update(
    InVec1 x,
    InVec2 y,
    InMat E,
    OutMat A); // (3)

  template<class ExecutionPolicy,
           in-vector InVec1,
           in-vector InVec2,
           in-matrix InMat,
           out-matrix OutMat>
  void matrix_rank_1_update(
    ExecutionPolicy&& exec,
    InVec1 x,
    InVec2 y,
    InMat E,
    OutMat A); // (4)
}
```
* in-vector[link inout-vector.md]
* in-matrix[link inout-matrix.md]
* out-matrix[link inout-matrix.md]

## 概要
非対称かつ共役を取らないrank-1 updateを行う。

- (1), (2): 上書き版。$A = xy^T$ を計算して`A`に書き込む。
- (3), (4): 更新版。入力行列`E`に更新項を加えた $A = E + xy^T$ を計算して`A`に書き込む。
- (2), (4): それぞれ(1), (3)を指定された実行ポリシーで実行する。


## 適格要件
- (1), (2), (3), (4): [`possibly-multipliable`](possibly-multipliable.md)`<OutMat, InVec2, InVec1>() == true`
- (3), (4): [`possibly-addable`](possibly-addable.md)`<OutMat, InMat, OutMat>() == true`
- (2), (4): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
- (1), (2), (3), (4): [`multipliable`](multipliable.md)`(A, y, x) == true`
- (3), (4): [`addable`](addable.md)`(A, E, A) == true`


## 効果
- (1), (2): $A = xy^T$
- (3), (4): $A = E + xy^T$
- (2), (4): それぞれ(1), (3)を指定された実行ポリシーで実行する。


## 戻り値
なし


## 計算量
$O(\verb|x.extent(0)|\times \verb|y.extent(0)|)$


## 備考
- 上書き版 (1), (2) は、出力行列`A`の元の値を参照せずに更新項で上書きする。
- 加算更新 $A = A + xy^T$ を行いたい場合は、更新版 (3), (4) に元の行列を`E`として渡す。


## 例
**[注意] 処理系にあるコンパイラで確認していないため、間違っているかもしれません。**

```cpp example
#include <array>
#include <iostream>
#include <linalg>
#include <mdspan>
#include <vector>

template <class Matrix>
void print_mat(const Matrix& A) {
  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = 0; j < A.extent(1) - 1; ++j) {
      std::cout << A[i, j] << ' ';
    }
    std::cout << A[i, A.extent(1) - 1] << '\n';
  }
}

template <class Vector>
void init_vec(Vector& v) {
  for (int i = 0; i < v.extent(0); ++i) {
    v[i] = i;
  }
}

template <class Matrix>
void init_mat(Matrix& A) {
  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = 0; j < A.extent(1); ++j) {
      A[i,j] = A.extent(1) * i + j;
    }
  }
}

int main()
{
  constexpr size_t N = 4;

  std::vector<double> A_vec(N * N);
  std::vector<double> E_vec(N * N);
  std::vector<double> x_vec(N);
  std::array<double, N> y_vec;

  std::mdspan<
    double,
    std::extents<size_t, N, N>> A(A_vec.data());
  std::mdspan<
    double,
    std::extents<size_t, N, N>> E(E_vec.data());
  std::mdspan x(x_vec.data(), N);
  std::mdspan y(y_vec.data(), N);

  init_vec(x);
  init_vec(y);

  // (1) 上書き版 : A = x y^T
  std::cout << "(1)\n";
  std::linalg::matrix_rank_1_update(
    x,
    y,
    A);
  print_mat(A);

  // (3) 更新版 : A = E + x y^T
  init_mat(E);
  std::cout << "(3)\n";
  std::linalg::matrix_rank_1_update(
    x,
    y,
    E,
    A);
  print_mat(A);

  return 0;
}
```
* A.extent[link /reference/mdspan/extents/extent.md]
* v.extent[link /reference/mdspan/extents/extent.md]
* std::linalg::matrix_rank_1_update[color ff0000]


### 出力
```
(1)
0 0 0 0
0 1 2 3
0 2 4 6
0 3 6 9
(3)
0 1 2 3
4 6 8 10
8 11 14 17
12 16 20 24
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
- [`matrix_rank_1_update_c`](matrix_rank_1_update_c.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [LAPACK: ger: general matrix rank-1 update](https://netlib.org/lapack/explore-html/d8/d75/group__ger.html)
- [P3371R5 Fix C++26 BLAS rank updates consistency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3371r5.html)
    - C++26で、上書き(overwriting)版と更新(updating)版のオーバーロードに再構成され、BLASと整合するようになった
