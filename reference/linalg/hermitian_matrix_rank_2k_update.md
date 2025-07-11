# hermitian_matrix_rank_2k_update
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-matrix InMat1,
           in-matrix InMat2,
           possibly-packed-inout-matrix InOutMat,
           class Triangle>
  void hermitian_matrix_rank_2k_update(
    InMat1 A,
    InMat2 B,
    InOutMat C,
    Triangle t); // (1)

  template<class ExecutionPolicy,
           in-matrix InMat1,
           in-matrix InMat2,
           possibly-packed-inout-matrix InOutMat,
           class Triangle>
  void hermitian_matrix_rank_2k_update(
    ExecutionPolicy&& exec,
    InMat1 A,
    InMat2 B,
    InOutMat C,
    Triangle t); // (2)
}
```
* in-matrix[link inout-matrix.md]
* possibly-packed-inout-matrix[link possibly-packed-inout-matrix.md]

## 概要
エルミートな(対称かつ共役を取る)rank-2k updateを対称行列に行う。
引数`t`は対称行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。

- (1): $C \leftarrow C + AB^* + BA^*$
- (2): (1)を指定された実行ポリシーで実行する。


## 適格要件
- 共通:
    + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
    + `InMat`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`possibly-addable`](possibly-addable.md)`<decltype(A), decltype(B), decltype(C)>()`が`true`
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(A)>(0, 1)`が`true` (つまり`A`が正方行列であること)
- (2): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
- `A.extent(0) == A.extent(1)`
- [`addable`](addable.md)`(A, B, C)`が`true`


## 効果
$C \leftarrow C + AB^* + BA^*$


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
    for(int j = 0; j < i; ++j) {
      std::cout << A[j, i] << ' ';
    }
    for(int j = i; j < A.extent(1) - 1; ++j) {
      std::cout << A[i, j] << ' ';
    }
    std::cout << A[i, A.extent(1) - 1] << '\n';
  }
}

template <class Matrix>
void init_mat(Matrix& A, double geta = 0.0) {
  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = 0; j < A.extent(1); ++j) {
      A[i,j] = std::complex<double>(i + geta, j + geta);
    }
  }
}

template <class Matrix>
void init_herm_mat(Matrix& A) {
  for(int i = 0; i < A.extent(0); ++i) {
    A[i, i] = std::complex<double>(i, 0);
    for(int j = i + 1; j < A.extent(1); ++j) {
      A[i, j] = std::complex<double>(i, j);
    }
  }
}

int main()
{
  constexpr size_t N = 2;

  using Scalar = std::complex<double>;
  using Vector = std::vector<Scalar>;
  using HermitianMatrix = std::mdspan<
      Scalar,
      std::extents<size_t, N, N>,
      std::linalg::layout_blas_packed<
        std::linalg::upper_triangle_t,
        std::linalg::row_major_t>
    >;

  Vector A_vec(N * N);
  Vector B_vec(N * N);
  Vector C_vec(N * N);

  std::mdspan A(A_vec.data());
  std::mdspan B(B_vec.data());
  HermitianMatrix C(C_vec.data());

  init_mat(A);
  init_mat(B, 1);
  init_herm_mat(C);

  // (1)
  std::cout << "(1)\n";
  std::linalg::hermitian_matrix_rank_2k_update(
    A,
    B,
    C,
    std::linalg::upper_triangle);
  print_mat(C);

  // (2)
  init_herm_mat(C);
  std::cout << "(2)\n";
  std::linalg::hermitian_matrix_rank_2k_update(
    std::execution::par,
    A,
    B,
    C,
    std::linalg::upper_triangle);
  print_mat(C);

  return 0;
}
```
* A.extent[link /reference/mdspan/extents/extent.md]
* std::complex[link /reference/complex/complex.md]
* std::linalg::layout_blas_packed[link /reference/linalg/layout_blas_packed.md]
* std::linalg::upper_triangle_t[link /reference/linalg/upper_triangle_t.md]
* std::linalg::row_major_t[link /reference/linalg/row_major_t.md]
* std::linalg::upper_triangle[link /reference/linalg/upper_triangle_t.md]
* std::linalg::hermitian_matrix_rank_2k_update[color ff0000]


### 出力
```
(1)
(4,0) (6,4)
(6,-4) (13,0)
(2)
(4,0) (6,4)
(6,-4) (13,0)
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
- [LAPACK: {he,sy}r2k: Hermitian/symmetric rank-2k update](https://netlib.org/lapack/explore-html/d8/d94/group__her2k.html)
