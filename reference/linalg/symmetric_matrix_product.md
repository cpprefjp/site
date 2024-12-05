# symmetric_matrix_product
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-matrix InMat1,
           class Triangle,
           in-matrix InMat2,
           out-matrix OutMat>
  void symmetric_matrix_product(
    InMat1 A,
    Triangle t,
    InMat2 B,
    OutMat C); // (1)

  template<class ExecutionPolicy,
           in-matrix InMat1,
           class Triangle,
           in-matrix InMat2,
           out-matrix OutMat>
  void symmetric_matrix_product(
    ExecutionPolicy&& exec,
    InMat1 A,
    Triangle t,
    InMat2 B,
    OutMat C); // (2)

  template<in-matrix InMat1,
           in-matrix InMat2,
           class Triangle,
           out-matrix OutMat>
  void symmetric_matrix_product(
    InMat1 A,
    InMat2 B,
    Triangle t,
    OutMat C); // (3)

  template<class ExecutionPolicy,
           in-matrix InMat1,
           in-matrix InMat2,
           class Triangle,
           out-matrix OutMat>
  void symmetric_matrix_product(
    ExecutionPolicy&& exec,
    InMat1 A,
    InMat2 B,
    Triangle t,
    OutMat C); // (4)

  template<in-matrix InMat1,
           class Triangle,
           in-matrix InMat2,
           in-matrix InMat3,
           out-matrix OutMat>
  void symmetric_matrix_product(
    InMat1 A,
    Triangle t,
    InMat2 B,
    InMat3 E,
    OutMat C); // (5)

  template<class ExecutionPolicy,
           in-matrix InMat1,
           class Triangle,
           in-matrix InMat2,
           in-matrix InMat3,
           out-matrix OutMat>
  void symmetric_matrix_product(
    ExecutionPolicy&& exec,
    InMat1 A,
    Triangle t,
    InMat2 B,
    InMat3 E,
    OutMat C); // (6)

  template<in-matrix InMat1,
           in-matrix InMat2,
           class Triangle,
           in-matrix InMat3,
           out-matrix OutMat>
  void symmetric_matrix_product(
    InMat1 A,
    InMat2 B,
    Triangle t,
    InMat3 E,
    OutMat C); // (7)

  template<class ExecutionPolicy,
           in-matrix InMat1,
           in-matrix InMat2,
           class Triangle,
           in-matrix InMat3,
           out-matrix OutMat>
  void symmetric_matrix_product(
    ExecutionPolicy&& exec,
    InMat1 A,
    InMat2 B,
    Triangle t,
    InMat3 E,
    OutMat C); // (8)
}
```
* in-matrix[link inout-matrix.md]
* out-matrix[link inout-matrix.md]

## 概要
対称行列と行列の積を計算する。

- (1): 対称行列`A`と行列`B`に対し、$C \leftarrow AB$
- (2): (1)を指定された実行ポリシーで実行する。
- (3): 行列`A`と対称行列`B`に対し、$C \leftarrow AB$
- (4): (3)を指定された実行ポリシーで実行する。
- (5): 対称行列`A`と行列`B`に対し、$C \leftarrow E + AB$
- (6): (5)を指定された実行ポリシーで実行する。
- (7): 行列`A`と対称行列`B`に対し、$C \leftarrow E + AB$
- (8): (7)を指定された実行ポリシーで実行する。


## 適格要件
- 共通
    + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
    + [`possibly-multipliable`](possibly-multipliable.md)`<decltype(A), decltype(B), decltype(C)>()`が`true`
- (1), (2), (5), (6):
    + `InMat1`(`A`の型)が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(A)>(0, 1)`が`true` (つまり`A`が正方行列であること)
- (3), (4), (7), (8):
    + `InMat2`(`B`の型)が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(B), decltype(B)>(0, 1)`が`true` (つまり`B`が正方行列であること)
- (5), (6), (7), (8): [`possibly-addable`](possibly-addable.md)`<decltype(E),decltype(E),decltype(C)>()`が`true`
- (2), (4), (6), (8): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
- 共通
    + [`multipliable`](multipliable.md)`(A, B, C) == true`
- (1), (2), (5), (6): `A.extent(0) == A.extent(1)`
- (3), (4), (7), (8): `B.extent(0) == B.extent(1)`
- (5), (6), (7), (8): [`addable`](addable.md)`(E, E, C) == true`


## 効果
- (1), (2): 対称行列`A`と行列`B`に対し、$C \leftarrow AB$
- (3), (4): 行列`A`と対称行列`B`に対し、$C \leftarrow AB$
- (5), (6): 対称行列`A`と行列`B`に対し、$C \leftarrow E + AB$
- (7), (8): 行列`A`と対称行列`B`に対し、$C \leftarrow E + AB$


## 戻り値
なし


## 計算量
$O(\verb|A.extent(0)| \times \verb|A.extent(1)| \times \verb|B.extent(1)|)$


## 備考
- (5), (6), (7), (8): `C`に`E`を入れても良い。


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

template <class Matrix>
void init_mat(Matrix& A, typename Matrix::value_type geta = 1) {
  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = 0; j < A.extent(1); ++j) {
      A[i, j] = i * A.extent(1) + j + geta;
    }
  }
}

template <class Matrix>
void init_symm_mat(Matrix& A) {
  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = i; j < A.extent(1); ++j) {
      A[i, j] = i * A.extent(1) + j;
    }
  }
}

int main()
{
  constexpr size_t N = 2;

  using Scalar = double;
  using Vector = std::vector<Scalar>;
  using SymmetricMatrix = std::mdspan<
      Scalar,
      std::extents<size_t, N, N>,
      std::linalg::layout_blas_packed<
        std::linalg::upper_triangle_t,
        std::linalg::row_major_t>
    >;

  Vector A_vec(N * N);
  Vector B_vec(N * N);
  Vector C_vec(N * N);
  Vector E_vec(N * N);

  std::mdspan C(C_vec.data(), N, N);
  std::mdspan E(E_vec.data(), N, N);

  init_mat(E, N * N);

  {
    SymmetricMatrix A(A_vec.data());
    std::mdspan     B(B_vec.data(), N, N);

    init_symm_mat(A);
    init_mat(B);

    // (1)
    std::cout << "(1)\n";
    std::linalg::symmetric_matrix_product(A, std::linalg::upper_triangle, B, C);
    print_mat(C);

    // (2)
    std::cout << "(2)\n";
    std::linalg::symmetric_matrix_product(std::execution::par, A, std::linalg::upper_triangle, B, C);
    print_mat(C);
  }

  {
    std::mdspan     A(A_vec.data(), N, N);
    SymmetricMatrix B(B_vec.data());

    init_mat(A);
    init_symm_mat(B);

    // (3)
    std::cout << "(3)\n";
    std::linalg::symmetric_matrix_product(A, B, std::linalg::upper_triangle, C);
    print_mat(C);

    // (4)
    std::cout << "(4)\n";
    std::linalg::symmetric_matrix_product(std::execution::par, A, B, std::linalg::upper_triangle, C);
    print_mat(C);
  }

  {
    SymmetricMatrix A(A_vec.data());
    std::mdspan     B(B_vec.data(), N, N);

    init_symm_mat(A);
    init_mat(B);

    // (5)
    std::cout << "(5)\n";
    std::linalg::symmetric_matrix_product(A, std::linalg::upper_triangle, B, E, C);
    print_mat(C);

    // (6)
    std::cout << "(6)\n";
    std::linalg::symmetric_matrix_product(std::execution::par, A, std::linalg::upper_triangle, B, E, C);
    print_mat(C);
  }

  {
    std::mdspan     A(A_vec.data(), N, N);
    SymmetricMatrix B(B_vec.data());

    init_mat(A);
    init_symm_mat(B);

    // (7)
    std::cout << "(7)\n";
    std::linalg::symmetric_matrix_product(A, B, std::linalg::upper_triangle, E, C);
    print_mat(C);

    // (8)
    std::cout << "(8)\n";
    std::linalg::symmetric_matrix_product(std::execution::par, A, B, std::linalg::upper_triangle, E, C);
    print_mat(C);
  }

  return 0;
}
```
* A.extent[link /reference/mdspan/extents/extent.md]
* std::mdspan[link /reference/mdspan/mdspan.md]
* std::extents[link /reference/mdspan/extents.md]
* std::linalg::layout_blas_packed[link /reference/linalg/layout_blas_packed.md]
* std::linalg::upper_triangle_t[link /reference/linalg/upper_triangle_t.md]
* std::linalg::row_major_t[link /reference/linalg/row_major_t.md]
* std::linalg::upper_triangle[link /reference/linalg/upper_triangle_t.md]
* std::execution::par[link /reference/execution/execution/execution_policy.md]
* std::linalg::symmetric_matrix_product[color ff0000]


### 出力
```
(1)
7 8
11 16
(2)
7 8
11 16
(3)
5 8
11 18
(4)
5 8
11 18
(5)
11 13
17 23
(6)
11 13
17 23
(7)
9 13
17 25
(8)
9 13
17 25
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
- [`upper_triangle_t`](upper_triangle_t.md)
- [`lower_triangle_t`](lower_triangle_t.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [LAPACK: {he,sy}mm: Hermitian/symmetric matrix-matrix multiply](https://netlib.org/lapack/explore-html/d0/d16/group__hemm.html)
