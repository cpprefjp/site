# hermitian_matrix_rank_1_update


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
  void hermitian_matrix_rank_1_update(
    InVec x,
    InOutMat A,
    Triangle t); // (1)

  template<class ExecutionPolicy,
           in-vector InVec,
           possibly-packed-inout-matrix InOutMat,
           class Triangle>
  void hermitian_matrix_rank_1_update(
    ExecutionPolicy&& exec,
    InVec x,
    InOutMat A,
    Triangle t); // (2)

  template<class Scalar,
           in-vector InVec,
           possibly-packed-inout-matrix InOutMat,
           class Triangle>
  void hermitian_matrix_rank_1_update(
    Scalar alpha,
    InVec x,
    InOutMat A,
    Triangle t); // (3)

  template<class ExecutionPolicy,
           class Scalar,
           in-vector InVec,
           possibly-packed-inout-matrix InOutMat,
           class Triangle>
  void hermitian_matrix_rank_1_update(
    ExecutionPolicy&& exec,
    Scalar alpha,
    InVec x,
    InOutMat A,
    Triangle t); // (4)
}
```


## 概要
エルミートな(対称かつ共役を取る)rank-1 updateをエルミート行列に行う。
引数`t`は対称行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。

- (1): $A \leftarrow A + xx^*$
- (2): (1)を指定された実行ポリシーで実行する。
- (3): $A \leftarrow A + \alpha xx^*$
- (4): (3)を指定された実行ポリシーで実行する。


## 適格要件
- `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
- `InMat`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
- [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(A)>(0, 1)`が`true` (つまり`A`が正方行列であること)
- [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(x)>(0, 0)`が`true` (つまり`A`の次元と`x`の次元が同じであること)


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
    v[i] = std::complex<double>(0, i);
  }
}

template <class Matrix>
void init_mat(Matrix& A) {
  for(int i = 0; i < A.extent(0); ++i) {
    A[i,j] = std::complex<double>(i, 0);
    for(int j = i + 1; j < A.extent(1); ++j) {
      A[i,j] = std::complex<double>(i, j);
    }
  }
}

int main()
{
  constexpr size_t N = 4;

  std::vector<std::complex<double>> A_vec(N * N);
  std::vector<std::complex<double>> x_vec(N);

  std::mdspan<
    std::complex<double>,
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
  std::linalg::hermitian_matrix_rank_1_update(
    x,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  // (2)
  init_mat(A);
  std::cout << "(2)\n";
  std::linalg::hermitian_matrix_rank_1_update(
    std::execution::par,
    x,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  // (3)
  init_mat(A);
  std::cout << "(3)\n";
  std::linalg::hermitian_matrix_rank_1_update(
    -1.0,
    x,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  // (4)
  init_mat(A);
  std::cout << "(4)\n";
  std::linalg::hermitian_matrix_rank_1_update(
    std::execution::par,
    -1.0,
    x,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  return 0;
}
```


### 出力
```
(1)
(0,0) (1,0) (2,0) (3,0)
(1,0) (2,0) (3,2) (4,3)
(2,0) (3,-2) (6,0) (8,3)
(3,0) (4,-3) (8,-3) (12,0)
(2)
(0,0) (1,0) (2,0) (3,0)
(1,0) (2,0) (3,2) (4,3)
(2,0) (3,-2) (6,0) (8,3)
(3,0) (4,-3) (8,-3) (12,0)
(3)
(0,0) (1,0) (2,0) (3,0)
(1,0) (0,0) (-1,2) (-2,3)
(2,0) (-1,-2) (-2,0) (-4,3)
(3,0) (-2,-3) (-4,-3) (-6,0)
(4)
(0,0) (1,0) (2,0) (3,0)
(1,0) (0,0) (-1,2) (-2,3)
(2,0) (-1,-2) (-2,0) (-4,3)
(3,0) (-2,-3) (-4,-3) (-6,0)
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

