# triangular_matrix_vector_product
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
           out-vector OutVec>
  void triangular_matrix_vector_product(
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InVec x,
    OutVec y); // (1)

  template<class ExecutionPolicy,
           in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           in-vector InVec,
           out-vector OutVec>
  void triangular_matrix_vector_product(
    ExecutionPolicy&& exec,
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InVec x,
    OutVec y); // (2)

  template<in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           inout-vector InOutVec>
  void triangular_matrix_vector_product(
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InOutVec y); // (3)

  template<class ExecutionPolicy,
           in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           inout-vector InOutVec>
  void triangular_matrix_vector_product(
    ExecutionPolicy&& exec,
    InMat A,
    Triangle t,
    DiagonalStorage d,
    InOutVec y); // (4)

  template<in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           in-vector InVec1,
           in-vector InVec2,
           out-vector OutVec>
  void triangular_matrix_vector_product(InMat A,
                                        Triangle t,
                                        DiagonalStorage d,
                                        InVec1 x,
                                        InVec2 y,
                                        OutVec z); // (5)

  template<class ExecutionPolicy,
           in-matrix InMat,
           class Triangle,
           class DiagonalStorage,
           in-vector InVec1,
           in-vector InVec2,
           out-vector OutVec>
  void triangular_matrix_vector_product(ExecutionPolicy&& exec,
                                        InMat A,
                                        Triangle t,
                                        DiagonalStorage d,
                                        InVec1 x,
                                        InVec2 y,
                                        OutVec z); // (6)
}
```
* in-vector[link inout-vector.md]
* out-vector[link inout-vector.md]
* in-matrix[link inout-matrix.md]

## 概要
三角行列とベクトルの積を計算する。
引数`t`は対称行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。
引数`d`は対称行列の対角成分を暗黙に乗法における単位元とみなすかどうかを指定する。

- (1): $y \leftarrow Ax$
- (2): (1)を指定された実行ポリシーで実行する。
- (3): $y \leftarrow Ay$
- (4): (3)を指定された実行ポリシーで実行する。
- (5): $z \leftarrow y + Ax$
- (6): (5)を指定された実行ポリシーで実行する。


## 適格要件
- 共通:
    + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
    + `DiagonalStorage`は[`implicit_unit_diagonal_t`](implicit_unit_diagonal_t.md)または[`explicit_diagonal_t`](explicit_diagonal_t.md)
    + `InMat`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(A)>(0, 1)`が`true` (つまり`A`が正方行列であること)
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(y)>(0, 0)`が`true` (つまり`A`の次元と`y`の次元が同じであること)
- (1), (2), (5), (6): [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(x)>(0, 0)`が`true` (つまり`A`の次元と`x`の次元が同じであること)
- (5), (6): [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(z)>(0, 0)`が`true` (つまり`A`の次元と`x`の次元が同じであること)
- (2), (4), (6): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
- 共通:
    + `A.extent(0) == A.extent(1)` (つまり`A`が正方行列であること)
    + `A.extent(0) == y.extent(0)` (つまり`y`に結果を代入できること)
- (1), (2), (5), (6): `A.extent(0) == x.extent(0)` (つまり$Ax$を計算できること)
- (5), (6): `A.extent(0) == z.extent(0)` (つまり`z`に結果を代入できること)


## 効果
対称行列の成分の位置を示す`t`と対角成分へアクセスするかどうかを示す`d`を考慮した、対称行列とベクトルの積を計算する。

- (1), (2): $y \leftarrow Ax$
- (3), (4): $y \leftarrow Ay$
- (5), (6): $z \leftarrow y + Ax$


## 戻り値
なし


## 計算量
$O(\verb|A.extent(1)|\times \verb|x.extent(0)|)$


## 備考
- (4): in-placeアルゴリズムなので並列実行を妨げるが、ベクトル化といった`ExecutionPolicy`特有の最適化はできる。
- (5), (6): `z`に`y`を入れても良い。


## 例
**[注意] 処理系にあるコンパイラで確認していないため、間違っているかもしれません。**

```cpp example
#include <array>
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
  constexpr size_t M = 4;

  std::vector<double> A_vec(N*M);
  std::vector<double> x_vec(M);
  std::array<double, N> y_vec, z_vec;

  std::mdspan<
    double,
    std::extents<size_t, N, M>,
    std::linalg::layout_blas_packed<
      std::linalg::upper_triangle_t,
      std::linalg::row_major_t>
  > A(A_vec.data());
  std::mdspan x(x_vec.data(), M);
  std::mdspan y(y_vec.data(), N);
  std::mdspan z(z_vec.data(), N);

  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = i + 1; j < A.extent(1); ++j) {
      A[i,j] = A.extent(1) * i + j;
    }
  }

  init(x);

  // (1)
  std::cout << "(1)\n";
  std::linalg::triangular_matrix_vector_product(
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    x,
    y);
  print(y, "y");

  // (2)
  std::cout << "(2)\n";
  std::linalg::triangular_matrix_vector_product(
    std::execution::par,
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    x,
    y);
  print(y, "y");

  init(y);

  // (3)
  std::cout << "(3)\n";
  std::linalg::triangular_matrix_vector_product(
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    y);
  print(y, "y");

  init(y);

  // (4)
  std::cout << "(4)\n";
  std::linalg::triangular_matrix_vector_product(
    std::execution::par,
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    y);
  print(y, "y");

  init(y);

  // (5)
  std::cout << "(5)\n";
  std::linalg::triangular_matrix_vector_product(
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    x,
    y,
    z);
  print(z, "z");

  // (6)
  std::cout << "(6)\n";
  std::linalg::triangular_matrix_vector_product(
    std::execution::par,
    A,
    std::linalg::upper_triangle,
    std::linalg::implicit_unit_diagonal,
    x,
    y,
    z);
  print(z, "z");

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
* std::linalg::triangular_matrix_vector_product[color ff0000]


### 出力
```
(1)
y[0] = 14
y[1] = 34
y[2] = 35
y[3] = 3
(2)
y[0] = 14
y[1] = 34
y[2] = 35
y[3] = 3
(3)
y[0] = 14
y[1] = 34
y[2] = 35
y[3] = 3
(4)
y[0] = 14
y[1] = 34
y[2] = 35
y[3] = 3
(5)
z[0] = 14
z[1] = 35
z[2] = 37
z[3] = 6
(6)
z[0] = 14
z[1] = 35
z[2] = 37
z[3] = 6
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
- [LAPACK: ctrmv](https://netlib.org/lapack/explore-html/d6/d1c/group__trmv_ga0adaf80ae1dfe117390bd7030fd865f1.html#ga0adaf80ae1dfe117390bd7030fd865f1)


