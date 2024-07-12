# triangular_matrix_left_product


* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]


```cpp
namespace std::linalg {
  template<in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           inout-matrix InOutMat>
  void triangular_matrix_left_product(
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InOutMat C); // (1)

  template<class ExecutionPolicy,
           in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           inout-matrix InOutMat>
  void triangular_matrix_left_product(
    ExecutionPolicy&& exec,
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InOutMat C); // (2)
}
```


## 概要
三角行列の上下と対角成分のアクセス方法を考慮した、三角行列と行列の積をin-placeに計算する。

- (1): 三角行列`A`と行列`C`に対し、$C \leftarrow AC$
- (2): (1)を指定された実行ポリシーで実行する。


## 適格要件
- 共通
  + `DiagonalStorage`が[`implicit_unit_diagonal_t`](implicit_unit_diagonal_t.md)または[`explicit_diagonal_t`](explicit_diagonal_t.md)
  + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
  + [`possibly-multipliable`](possibly-multipliable.md)`<decltype(A), decltype(C), decltype(C)>()`が`true`
  + `InMat`(`A`の型)が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
  + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(A)>(0, 1)`が`true` (つまり`A`が正方行列であること)
- (2): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
- [`multipliable`](multipliable.md)`(A, C, C)`が`true`
- `A.extent(0) == A.extent(1)`


## 効果
- 三角行列`A`と行列`C`に対し、$C \leftarrow AC$


## 戻り値
なし


## 計算量
$O(\verb|A.extent(0)| \times \verb|A.extent(1)| \times \verb|C.extent(0)|)$


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
void init_tria_mat(Matrix& A) {
  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = i + 1; j < A.extent(1); ++j) {
      A[i, j] = i * A.extent(1) + j;
    }
  }
}

int main()
{
  constexpr size_t N = 2;

  using Scalar = double;
  using Vector = std::vector<Scalar>;
  using TriangularMatrix = std::mdspan<
      Scalar,
      std::extents<size_t, N, N>,
      std::linalg::layout_blas_packed<
        std::linalg::upper_triangle_t,
        std::linalg::row_major_t>
    >;

  Vector A_vec(N * N);
  Vector C_vec(N * N);

  TriangularMatrix A(A_vec.data());
  std::mdspan C(C_vec.data(), N, N);

  init_tria_mat(A);
  init_mat(C);

  // (1)
  std::cout << "(1)\n";
  std::linalg::triangular_matrix_left_product(
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    C);
  print_mat(C);

  // (2)
  init_mat(C);
  std::cout << "(2)\n";
  std::linalg::triangular_matrix_left_product(
    std::execution::par,
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    C);
  print_mat(C);

  return 0;
}
```
* .extent[link /reference/mdspan/extents/extent.md]
* std::mdspan[link /reference/mdspan/mdspan.md]
* std::extents[link /reference/mdspan/extents.md]
* std::linalg::layout_blas_packed[link /reference/linalg/layout_blas_packed.md]
* std::linalg::upper_triangle_t[link /reference/linalg/upper_triangle_t.md]
* std::linalg::row_major_t[link /reference/linalg/row_major_t.md]
* std::linalg::upper_triangle[link /reference/linalg/upper_triangle_t.md]
* std::linalg::implicit_unit_diagonal[link /reference/linalg/implicit_unit_diagonal_t.md]
* std::execution::par[link /reference/execution/execution/execution_policy.md]


### 出力
```
(1)
4 6
3 4
(2)
4 6
3 4
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
- [`implicit_unit_diagonal_t`](implicit_unit_diagonal_t.md)
- [`explicit_diagonal_t`](explicit_diagonal_t.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [LAPACK: trmm: triangular matrix-matrix multiply](https://netlib.org/lapack/explore-html/dd/dab/group__trmm.html)
