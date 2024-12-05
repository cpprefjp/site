# symmetric_matrix_rank_1_update
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-vector InVec,
           possibly-packed-inout-matrix InOutMat,
           class Triangle>
  void symmetric_matrix_rank_1_update(
    InVec x,
    InOutMat A,
    Triangle t); // (1)

  template<class ExecutionPolicy,
           in-vector InVec,
           possibly-packed-inout-matrix InOutMat,
           class Triangle>
  void symmetric_matrix_rank_1_update(
    ExecutionPolicy&& exec,
    InVec x,
    InOutMat A,
    Triangle t); // (2)

  template<class Scalar,
           in-vector InVec,
           possibly-packed-inout-matrix InOutMat,
           class Triangle>
  void symmetric_matrix_rank_1_update(
    Scalar alpha,
    InVec x,
    InOutMat A,
    Triangle t); // (3)

  template<class ExecutionPolicy,
           class Scalar,
           in-vector InVec,
           possibly-packed-inout-matrix InOutMat,
           class Triangle>
  void symmetric_matrix_rank_1_update(
    ExecutionPolicy&& exec,
    Scalar alpha,
    InVec x,
    InOutMat A,
    Triangle t); // (4)
}
```
* in-vector[link inout-vector.md]
* possibly-packed-inout-matrix[link possibly-packed-inout-matrix.md]

## 概要
対称かつ共役を取らないrank-1 updateを対称行列に行う。
引数`t`は対称行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。

- (1): $A \leftarrow A + xx^T$
- (2): (1)を指定された実行ポリシーで実行する。
- (3): $A \leftarrow A + \alpha xx^T$
- (4): (3)を指定された実行ポリシーで実行する。


## 適格要件
- 共通:
    + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
    + `InMat`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(A)>(0, 1)`が`true` (つまり`A`が正方行列であること)
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(x)>(0, 0)`が`true` (つまり`A`の次元と`x`の次元が同じであること)
- (2), (4): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
- `A.extent(0) == A.extent(1)`
- `A.extent(0) == x.extent(0)`


## 効果
- (1), (2): $A \leftarrow A + xx^T$
- (3), (4): $A \leftarrow A + \alpha xx^T$


## 戻り値
なし


## 計算量
$O((\verb|x.extent(0)|)^2)$


## 備考
(3), (4)は$A \leftarrow A - xx^T$を行うために用意された。


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
    for(int j = 0; j < i; ++j) {
      std::cout << A[j, i] << ' ';
    }
    for(int j = i; j < A.extent(1) - 1; ++j) {
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
    for(int j = i; j < A.extent(1); ++j) {
      A[i,j] = A.extent(1) * i + j;
    }
  }
}

int main()
{
  constexpr size_t N = 4;

  std::vector<double> A_vec(N * N);
  std::vector<double> x_vec(N);

  std::mdspan<
    double,
    std::extents<size_t, N, N>,
    std::linalg::layout_blas_packed<
      std::linalg::upper_triangle_t,
      std::linalg::row_major_t>
  > A(A_vec.data());
  std::mdspan x(x_vec.data(), N);

  init_mat(A);
  init_vec(x);

  // (1)
  std::cout << "(1)\n";
  std::linalg::symmetric_matrix_rank_1_update(
    x,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  // (2)
  init_mat(A);
  std::cout << "(2)\n";
  std::linalg::symmetric_matrix_rank_1_update(
    std::execution::par,
    x,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  // (3)
  init_mat(A);
  std::cout << "(3)\n";
  std::linalg::symmetric_matrix_rank_1_update(
    -1.0,
    x,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  // (4)
  init_mat(A);
  std::cout << "(4)\n";
  std::linalg::symmetric_matrix_rank_1_update(
    std::execution::par,
    -1.0,
    x,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  return 0;
}
```
* A.extent[link /reference/mdspan/extents/extent.md]
* v.extent[link /reference/mdspan/extents/extent.md]
* std::mdspan[link /reference/mdspan/mdspan.md]
* std::extents[link /reference/mdspan/extents.md]
* std::linalg::layout_blas_packed[link /reference/linalg/layout_blas_packed.md]
* std::linalg::upper_triangle_t[link /reference/linalg/upper_triangle_t.md]
* std::linalg::row_major_t[link /reference/linalg/row_major_t.md]
* std::linalg::upper_triangle[link /reference/linalg/upper_triangle_t.md]
* std::execution::par[link /reference/execution/execution/execution_policy.md]
* std::linalg::symmetric_matrix_rank_1_update[color ff0000]


### 出力
```
(1)
0 1 2 3
1 6 8 10
2 8 14 17
3 14 17 24
(2)
0 1 2 3
1 6 8 10
2 8 14 17
3 14 17 24
(3)
0 1 2 3
1 4 4 4
2 4 6 5
3 4 5 6
(4)
0 1 2 3
1 4 4 4
2 4 6 5
3 4 5 6
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
- [LAPACK: {he,sy}r: Hermitian/symmetric rank-1 update](https://netlib.org/lapack/explore-html/dc/d82/group__her.html)

