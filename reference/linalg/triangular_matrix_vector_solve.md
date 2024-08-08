# triangular_matrix_vector_solve
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
           in-vector InVec,
           out-vector OutVec,
           class BinaryDivideOp>
  void triangular_matrix_vector_solve(
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InVec b,
    OutVec x,
    BinaryDivideOp divide); // (1)

  template<class ExecutionPolicy,
           in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           in-vector InVec,
           out-vector OutVec,
           class BinaryDivideOp>
  void triangular_matrix_vector_solve(
    ExecutionPolicy&& exec,
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InVec b,
    OutVec x,
    BinaryDivideOp divide); // (2)

  template<in-matrix InMat,
          class Triangle,
          class DiagonalStorage,
          in-vector InVec,
          out-vector OutVec>
  void triangular_matrix_vector_solve(
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InVec b,
    OutVec x); // (3)

  template<class ExecutionPolicy,
           in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           in-vector InVec,
           out-vector OutVec>
  void triangular_matrix_vector_solve(
    ExecutionPolicy&& exec,
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InVec b,
    OutVec x); // (4)

  template<in-matrix InMat,
            class Triangle,
            class DiagonalStorage,
            inout-vector InOutVec,
            class BinaryDivideOp>
  void triangular_matrix_vector_solve(
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InOutVec b,
    BinaryDivideOp divide); // (5)

  template<class ExecutionPolicy,
          in-matrix InMat,
          class Triangle,
          class DiagonalStorage,
          inout-vector InOutVec,
          class BinaryDivideOp>
  void triangular_matrix_vector_solve(
    ExecutionPolicy&& exec,
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InOutVec b,
    BinaryDivideOp divide); // (6)
    
  template<in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           inout-vector InOutVec>
  void triangular_matrix_vector_solve(
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InOutVec b); // (7)

  template<class ExecutionPolicy,
           in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           inout-vector InOutVec>
  void triangular_matrix_vector_solve(
    ExecutionPolicy&& exec,
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InOutVec b); // (8)
}
```
* in-vector[link inout-vector.md]
* out-vector[link inout-vector.md]
* in-matrix[link inout-matrix.md]

## 概要
三角行列に対して、連立一次方程式を解く。
引数`t`は対称行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。
引数`d`には対称行列の対角成分を暗黙に乗法における単位元とみなすかどうかを指定する。
引数`divide`には値の割り算を指定する。この引数は非可換な掛け算を持つ値型をサポートするためにある。

- (1): 連立一次方程式 $Ay = b$ を解き、`y`を`x`に代入する。もし解が存在しないなら、`x`は有効だが未規定。
- (2): (1)を指定された実行ポリシーで実行する。
- (3): 割り算に[`std::divides`](/reference/functional/divides.md)`<void>`を用いて、(1)を行う。
- (4): (3)を指定された実行ポリシーで実行する。
- (5): `x`に`b`を使って、in-placeに(1)を行う。
- (6): (5)を指定された実行ポリシーで実行する。
- (7): 割り算に[`std::divides`](/reference/functional/divides.md)`<void>`を用いて、(5)を行う。
- (8): (7)を指定された実行ポリシーで実行する。


## 適格要件
- 共通:
  + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
  + `DiagonalStorage`は[`implicit_unit_diagonal_t`](implicit_unit_diagonal_t.md)または[`explicit_diagonal_t`](explicit_diagonal_t.md)
  + `InMat`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
  + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(A)>(0, 1)`が`true` (つまり`A`が正方行列であること)
  + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(b)>(0, 0)`が`true` (つまり`A`の次元と`b`の次元が同じであること)
- (1), (2), (3), (4): [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(x)>(0, 0)`が`true` (つまり`A`の次元と`b`の次元が同じであること)
- (2), (4), (6), (8): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
- 共通:
  + `A.extent(0) == A.extent(1)` (つまり`A`が正方行列であること)
  + `A.extent(0) == b.extent(0)` (つまり`A`の次元と`b`の次元が同じであること)
- (1), (2), (3), (4): `A.extent(0) == x.extent(0)` (つまり`A`の次元と`x`の次元が同じであること)


## 効果
対称行列の成分の位置を示す`t`と対角成分へアクセスするかどうかを示す`d`を考慮して、連立一次方程式の解を求める。

- (1), (2): 連立一次方程式 $Ay = b$ を解き、`y`を`x`に代入する。もし解が存在しないなら、`x`は有効だが未規定。
- (3): `triangular_matrix_vector_solve(A, t, d, b, x, divides<void>{})`と同じ。
- (4): `triangular_matrix_vector_solve(std::forward<ExecutionPolicy>(exec), A, t, d, b, x, divides<void>{})`と同じ。
- (5), (6): `x`に`b`を使って、in-placeに(1)を行う。
- (7): `triangular_matrix_vector_solve(A, t, d, b, divides<void>{})`と同じ。
- (8): `triangular_matrix_vector_solve(std::forward<ExecutionPolicy>(exec), A, t, d, b, divides<void>{})`と同じ。


## 戻り値
なし


## 計算量
$O(\verb|A.extent(1)|\times \verb|x.extent(0)|)$


## 備考
- (6), (8): in-placeアルゴリズムなので並列実行を妨げるが、ベクトル化といった`ExecutionPolicy`特有の最適化はできる。


## 例
**[注意] 処理系にあるコンパイラで確認していないため、間違っているかもしれません。**

```cpp example
#include <array>
#include <functional>
#include <iostream>
#include <linalg>
#include <mdspan>
#include <vector>

template <class Vector>
void print(const Vector& v, const std::string& name) {
  for (int i = 0; i < v.extent(0); ++i) {
    std::cout << name << "[" << i << "]" << " = " << v[i] << '\n';
  }
}

template <class Vector>
void init(Vector& v) {
  for (int i = 0; i < v.extent(0); ++i) {
    v[i] = i;
  }
}

int main()
{
  constexpr size_t N = 4;

  std::vector<double> A_vec(N * N);
  std::vector<double> x_vec(N);
  std::array<double, N> b_vec;

  std::mdspan<
    double,
    std::extents<size_t, N, N>,
    std::linalg::layout_blas_packed<
      std::linalg::upper_triangle_t,
      std::linalg::row_major_t>
  > A(A_vec.data());
  std::mdspan x(x_vec.data(), N);
  std::mdspan b(b_vec.data(), N);

  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = i + 1; j < A.extent(1); ++j) {
      A[i,j] = A.extent(1) * i + j;
    }
  }

  init(b);

  // (1)
  std::cout << "(1)\n";
  std::linalg::triangular_matrix_vector_solve(
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    b,
    x,
    std::divides<void>{});
  print(x, "x");

  // (2)
  std::cout << "(2)\n";
  std::linalg::triangular_matrix_vector_solve(
    std::execution::par,
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    b,
    x,
    std::divides<void>{});
  print(x, "x");

  // (3)
  std::cout << "(3)\n";
  std::linalg::triangular_matrix_vector_solve(
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    b,
    x);
  print(x, "x");

  // (4)
  std::cout << "(4)\n";
  std::linalg::triangular_matrix_vector_solve(
    std::execution::par,
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    b,
    x);
  print(x, "x");

  // (5)
  std::cout << "(5)\n";
  std::linalg::triangular_matrix_vector_solve(
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    b,
    std::divides<void>{});
  print(b, "b");

  init(b);

  // (6)
  std::cout << "(6)\n";
  std::linalg::triangular_matrix_vector_solve(
    std::execution::par,
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    b,
    std::divides<void>{});
  print(b, "b");

  init(b);

  // (7)
  std::cout << "(7)\n";
  std::linalg::triangular_matrix_vector_solve(
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    b);
  print(b, "b");

  init(b);

  // (8)
  std::cout << "(8)\n";
  std::linalg::triangular_matrix_vector_solve(
    std::execution::par,
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    b);
  print(b, "b");

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
* std::linalg::implicit_unit_diagonal[link /reference/linalg/implicit_unit_diagonal_t.md]
* std::execution::par[link /reference/execution/execution/execution_policy.md]
* std::linalg::triangular_matrix_vector_solve[color ff0000]


### 出力
```
(1)
x[0] = -3
x[1] = -4
x[2] = -1
x[3] = 3
(2)
x[0] = -3
x[1] = -4
x[2] = -1
x[3] = 3
(3)
x[0] = -3
x[1] = -4
x[2] = -1
x[3] = 3
(4)
x[0] = -3
x[1] = -4
x[2] = -1
x[3] = 3
(5)
b[0] = -3
b[1] = -4
b[2] = -1
b[3] = 3
(6)
b[0] = -3
b[1] = -4
b[2] = -1
b[3] = 3
(7)
b[0] = -3
b[1] = -4
b[2] = -1
b[3] = 3
(8)
b[0] = -3
b[1] = -4
b[2] = -1
b[3] = 3
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
- [LAPACK: trmv](https://netlib.org/lapack/explore-html/dd/dc3/group__trsv.html)
