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
           inout-matrix InOutMat>
  void matrix_rank_1_update(
    InVec1 x,
    InVec2 y,
    InOutMat A); // (1)

  template<class ExecutionPolicy,
           in-vector InVec1,
           in-vector InVec2,
           inout-matrix InOutMat>
  void matrix_rank_1_update(
    ExecutionPolicy&& exec,
    InVec1 x,
    InVec2 y,
    InOutMat A); // (2)
}
```
* in-vector[link inout-vector.md]
* inout-matrix[link inout-matrix.md]

## 概要
非対称かつ共役を取らないrank-1 updateを行う。

- (1): $A \leftarrow A + xy^T$
- (2): (1)を指定された実行ポリシーで実行する。


## 適格要件
- (1), (2): [`possibly-multipliable`](possibly-multipliable.md)`<InOutMat, InVec2, InVec1>() == true`
- (2): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
- [`multipliable`](multipliable.md)`(A, y, x) == true`


## 効果
- (1): $A \leftarrow A + xy^T$
- (2): (1)を指定された実行ポリシーで実行する。


## 戻り値
なし


## 計算量
$O(\verb|x.extent(0)|\times \verb|y.extent(0)|)$


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
  std::vector<double> x_vec(N);
  std::array<double, N> y_vec;

  std::mdspan<
    double,
    std::extents<size_t, N, N>> A(A_vec.data());
  std::mdspan x(x_vec.data(), N);
  std::mdspan y(y_vec.data(), N);

  init_mat(A);
  init_vec(x);
  init_vec(y);

  // (1)
  std::cout << "(1)\n";
  std::linalg::matrix_rank_1_update(
    x,
    y,
    A);
  print_mat(A);

  init_mat(A);

  // (2)
  std::cout << "(2)\n";
  std::linalg::matrix_rank_1_update(
    std::execution::par,
    x,
    y,
    A);
  print_mat(A);

  return 0;
}
```
* A.extent[link /reference/mdspan/extents/extent.md]
* v.extent[link /reference/mdspan/extents/extent.md]
* std::mdspan[link /reference/mdspan/mdspan.md]
* std::execution::par[link /reference/execution/execution/execution_policy.md]
* std::linalg::matrix_rank_1_update[color ff0000]


### 出力
```
(1)
0 1 2 3
4 6 8 10
8 11 14 17
12 16 20 24
(2)
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

