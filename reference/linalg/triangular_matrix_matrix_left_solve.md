# triangular_matrix_matrix_left_solve


* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]


```cpp
namespace std::linalg {
  template<in-matrix InMat1,
           class Triangle,
           class DiagonalStorage,
           in-matrix InMat2,
           out-matrix OutMat,
           class BinaryDivideOp>
  void triangular_matrix_matrix_left_solve(
    InMat1 A,
    Triangle t,
    DiagonalStorage d,
    InMat2 B,
    OutMat X,
    BinaryDivideOp divide); // (1)

  template<class ExecutionPolicy,
           in-matrix InMat1,
           class Triangle,
           class DiagonalStorage,
           in-matrix InMat2,
           out-matrix OutMat,
           class BinaryDivideOp>
  void triangular_matrix_matrix_left_solve(
    ExecutionPolicy&& exec,
    InMat1 A,
    Triangle t,
    DiagonalStorage d,
    InMat2 B,
    OutMat X,
    BinaryDivideOp divide); // (2)

  template<in-matrix InMat1,
           class Triangle,
           class DiagonalStorage,
           in-matrix InMat2,
           out-matrix OutMat>
  void triangular_matrix_matrix_left_solve(
    InMat1 A,
    Triangle t,
    DiagonalStorage d,
    InMat2 B,
    OutMat X); // (3)

  template<class ExecutionPolicy,
           in-matrix InMat1,
           class Triangle,
           class DiagonalStorage,
           in-matrix InMat2,
           out-matrix OutMat>
  void triangular_matrix_matrix_left_solve(
    ExecutionPolicy&& exec,
    InMat1 A,
    Triangle t,
    DiagonalStorage d,
    InMat2 B,
    OutMat X); // (4)

  template<in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           inout-matrix InOutMat,
           class BinaryDivideOp>
  void triangular_matrix_matrix_left_solve(
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InOutMat B,
    BinaryDivideOp divide); // (5)

  template<class ExecutionPolicy,
          in-matrix InMat,
          class Triangle,
          class DiagonalStorage,
          inout-matrix InOutMat,
          class BinaryDivideOp>
  void triangular_matrix_matrix_left_solve(
    ExecutionPolicy&& exec,
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InOutMat B,
    BinaryDivideOp divide); // (6)

  template<in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           inout-matrix InOutMat>
  void triangular_matrix_matrix_left_solve(
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InOutMat B); // (7)

  template<class ExecutionPolicy,
           in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           inout-matrix InOutMat>
  void triangular_matrix_matrix_left_solve(
    ExecutionPolicy&& exec,
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InOutMat B); // (8)
}
```


## 概要
三角行列に対して、連立一次方程式を解く。
引数`t`は対称行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。
引数`d`には対称行列の対角成分を暗黙に乗法における単位元とみなすかどうかを指定する。
引数`divide`には値の割り算を指定する。この引数は非可換な掛け算を持つ値型をサポートするためにある。

- (1): 連立一次方程式 $AY = B$ を解き、`Y`を`X`に代入する。もし解が存在しないなら、`X`は有効だが未規定。
- (2): (1)を指定された実行ポリシーで実行する。
- (3): 割り算に[`std::divides`](/reference/functional/divides.md)`<void>`を用いて、(1)を行う。
- (4): (3)を指定された実行ポリシーで実行する。
- (5): `X`に`B`を使って、in-placeに(1)を行う。
- (6): (5)を指定された実行ポリシーで実行する。
- (7): 割り算に[`std::divides`](/reference/functional/divides.md)`<void>`を用いて、(5)を行う。
- (8): (7)を指定された実行ポリシーで実行する。


## 適格要件
- 共通:
    + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
    + `DiagonalStorage`は[`implicit_unit_diagonal_t`](implicit_unit_diagonal_t.md)または[`explicit_diagonal_t`](explicit_diagonal_t.md)
    + `decltype(A)`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(A)>(0, 1)`が`true` (つまり`A`が正方行列であること)
- (1), (2), (3), (4): [`possibly-multipliable`](possibly-multipliable.md)`<decltype(A), decltype(X), decltype(B)>()`が`true`
- (5), (6), (7), (8): [`possibly-multipliable`](possibly-multipliable.md)`<decltype(A), decltype(B), decltype(B)>()`が`true`
- (2), (4), (6), (8): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
- 共通:
    + `A.extent(0) == A.extent(1)` (つまり`A`が正方行列であること)
- (1), (2), (3), (4): [`multipliable`](multipliable.md)`(A, X, B)`が`true`
- (5), (6), (7), (8): [`multipliable`](multipliable.md)`(A, B, B)`が`true`


## 効果
対称行列の成分の位置を示す`t`と対角成分へアクセスするかどうかを示す`d`を考慮して、連立一次方程式の解を求める。

- (1), (2): 連立一次方程式 $AY = B$ を解き、`Y`を`X`に代入する。もし解が存在しないなら、`X`は有効だが未規定。
- (3): `triangular_matrix_matrix_left_solve(A, t, d, B, X, divides<void>{})`と同じ。
- (4): `triangular_matrix_matrix_left_solve(std::forward<ExecutionPolicy>(exec), A, t, d, B, X, divides<void>{})`と同じ。
- (5), (6): `X`に`B`を使って、in-placeに(1)を行う。
- (7): `triangular_matrix_matrix_left_solve(A, t, d, B, divides<void>{})`と同じ。
- (8): `triangular_matrix_matrix_left_solve(std::forward<ExecutionPolicy>(exec), A, t, d, B, divides<void>{})`と同じ。


## 戻り値
なし


## 計算量
$O((\verb|A.extent(0)|)^2 \times \verb|B.extent(1)|)$


## 備考
- 三角行列が左側にあるので、非可換な掛け算の場合の`divide`の望ましい実装は数学では$y^{-1}x$と同等と思われる。ここで`x`は最初の引数で`y`は2番目の引数、$y^{-1}$は`y`の掛け算での逆元である。


## 例
**[注意] 処理系にあるコンパイラで確認していないため、間違っているかもしれません。**

```cpp example
#include <array>
#include <functional>
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
void init_mat(Matrix& A) {
  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = 0; j < A.extent(1); ++j) {
      A[i, j] = i * A.extent(1) + j;
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
  constexpr size_t N = 4;

  std::vector<double> A_vec(N * N);
  std::vector<double> X_vec(N * N);
  std::vector<double> B_vec(N * N);

  std::mdspan<
    double,
    std::extents<size_t, N, N>,
    std::linalg::layout_blas_packed<
      std::linalg::upper_triangle_t,
      std::linalg::row_major_t>
  > A(A_vec.data());
  std::mdspan X(X_vec.data(), N, N);
  std::mdspan B(B_vec.data(), N, N);

  init_tria_mat(A);
  init_mat(B);

  // (1)
  std::cout << "(1)\n";
  std::linalg::triangular_matrix_matrix_left_solve(
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    B,
    X,
    std::divides<void>{});
  print_mat(X);

  // (2)
  std::cout << "(2)\n";
  std::linalg::triangular_matrix_matrix_left_solve(
    std::execution::par,
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    B,
    X,
    std::divides<void>{});
  print_mat(X);

  // (3)
  std::cout << "(3)\n";
  std::linalg::triangular_matrix_matrix_left_solve(
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    B,
    X);
  print_mat(X);

  // (4)
  std::cout << "(4)\n";
  std::linalg::triangular_matrix_matrix_left_solve(
    std::execution::par,
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    B,
    X);
  print_mat(X);

  // (5)
  std::cout << "(5)\n";
  std::linalg::triangular_matrix_matrix_left_solve(
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    B,
    std::divides<void>{});
  print_mat(B);

  // (6)
  init_mat(B);
  std::cout << "(6)\n";
  std::linalg::triangular_matrix_matrix_left_solve(
    std::execution::par,
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    B,
    std::divides<void>{});
  print_mat(B);

  // (7)
  init_mat(B);
  std::cout << "(7)\n";
  std::linalg::triangular_matrix_matrix_left_solve(
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    B);
  print_mat(B);

  // (8)
  init_mat(B);
  std::cout << "(8)\n";
  std::linalg::triangular_matrix_matrix_left_solve(
    std::execution::par,
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    B);
  print_mat(B);

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
* std::linalg::implicit_unit_diagonal[link /reference/linalg/implicit_unit_diagonal_t.md]
* std::execution::par[link /reference/execution/execution/execution_policy.md]
* std::linalg::triangular_matrix_matrix_left_solve[color ff0000]


### 出力
```
(1)
-2 -2
2 3
(2)
-2 -2
2 3
(3)
-2 -2
2 3
(4)
-2 -2
2 3
(5)
-2 -2
2 3
(6)
-2 -2
2 3
(7)
-2 -2
2 3
(8)
-2 -2
2 3
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
- [`implicit_unit_diagonal`](implicit_unit_diagonal_t.md)
- [`explicit_diagonal`](explicit_diagonal_t.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [LAPACK: trsm](https://netlib.org/lapack/explore-html/d9/de5/group__trsm.html)

