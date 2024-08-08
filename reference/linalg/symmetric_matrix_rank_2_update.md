# symmetric_matrix_rank_2_update
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-vector InVec1,
           in-vector InVec2,
           possibly-packed-inout-matrix InOutMat,
           class Triangle>
  void symmetric_matrix_rank_2_update(
    InVec1 x,
    InVec2 y,
    InOutMat A,
    Triangle t); // (1)

  template<class ExecutionPolicy,
           in-vector InVec1,
           in-vector InVec2,
           possibly-packed-inout-matrix InOutMat,
           class Triangle>
  void symmetric_matrix_rank_2_update(
    ExecutionPolicy&& exec,
    InVec1 x,
    InVec2 y,
    InOutMat A,
    Triangle t); // (2)
}
```
* in-vector[link inout-vector.md]
* possibly-packed-inout-matrix[link possibly-packed-inout-matrix.md]

## 概要
対称かつ共役を取らないrank-2 updateを対称行列に行う。
引数`t`は対称行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。

- (1): $A \leftarrow A + xy^T + yx^T$
- (2): (1)を指定された実行ポリシーで実行する。


## 適格要件
- 共通:
  + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
  + `InMat`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
  + [`possibly-multipliable`](possibly-multipliable.md)`<decltype(A), decltype(x), decltype(y)>()`が`true`
- (2): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`

## 事前条件
- `A.extent(0) == A.extent(1)`
- [`multipliable`](multipliable.md)`(A, x, y) == true`


## 効果
$A \leftarrow A + xx^T$


## 戻り値
なし


## 計算量
$O(\verb|x.extent(0)| \times \verb|y.extent(0)|)$


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
  std::array<double, N> y_vec;

  std::mdspan<
    double,
    std::extents<size_t, N, N>,
    std::linalg::layout_blas_packed<
      std::linalg::upper_triangle_t,
      std::linalg::row_major_t>
  > A(A_vec.data());
  std::mdspan x(x_vec.data(), N);
  std::mdspan y(y_vec.data(), N);

  init_mat(A);

  for (int i = 0; i < x.extent(0); ++i) {
    x[i] = i;
  }
  for (int i = 0; i < y.extent(0); ++i) {
    y[i] = i + y.extent(0);
  }

  // (1)
  std::cout << "(1)\n";
  std::linalg::symmetric_matrix_rank_2_update(
    x,
    y,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  // (2)
  init_mat(A);
  std::cout << "(2)\n";
  std::linalg::symmetric_matrix_rank_2_update(
    std::execution::par,
    x,
    y,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  return 0;
}
```
* A.extent[link /reference/mdspan/extents/extent.md]
* x.extent[link /reference/mdspan/extents/extent.md]
* y.extent[link /reference/mdspan/extents/extent.md]
* std::mdspan[link /reference/mdspan/mdspan.md]
* std::extents[link /reference/mdspan/extents.md]
* std::linalg::layout_blas_packed[link /reference/linalg/layout_blas_packed.md]
* std::linalg::upper_triangle_t[link /reference/linalg/upper_triangle_t.md]
* std::linalg::row_major_t[link /reference/linalg/row_major_t.md]
* std::linalg::upper_triangle[link /reference/linalg/upper_triangle_t.md]
* std::execution::par[link /reference/execution/execution/execution_policy.md]
* std::linalg::symmetric_matrix_rank_2_update[color ff0000]


### 出力
```
(1)
0 5 10 15
5 15 22 29
10 22 34 43
15 29 43 57
(2)
0 5 10 15
5 15 22 29
10 22 34 43
15 29 43 57
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
- [LAPACK: {he,sy}r: Hermitian/symmetric rank-2 update](https://netlib.org/lapack/explore-html/dd/de5/group__her2.html)

