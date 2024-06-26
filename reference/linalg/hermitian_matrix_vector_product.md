# hermitian_matrix_vector_product


* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]


```cpp
namespace std::linalg {
  template<in-matrix InMat,
           class Triangle,
           in-vector InVec,
           out-vector OutVec>
  void hermitian_matrix_vector_product(InMat A,
                                       Triangle t,
                                       InVec x,
                                       OutVec y); // (1)

  template<class ExecutionPolicy,
           in-matrix InMat,
           class Triangle,
           in-vector InVec,
           out-vector OutVec>
  void hermitian_matrix_vector_product(ExecutionPolicy&& exec,
                                       InMat A,
                                       Triangle t,
                                       InVec x,
                                       OutVec y); // (2)

  template<in-matrix InMat,
           class Triangle,
           in-vector InVec1,
           in-vector InVec2,
           out-vector OutVec>
  void hermitian_matrix_vector_product(
    InMat A,
    Triangle t,
    InVec1 x,
    InVec2 y,
    OutVec z); // (3)

  template<class ExecutionPolicy,
           in-matrix InMat,
           class Triangle,
           in-vector InVec1,
           in-vector InVec2,
           out-vector OutVec>
  void hermitian_matrix_vector_product(
    ExecutionPolicy&& exec,
    InMat A,
    Triangle t,
    InVec1 x,
    InVec2 y,
    OutVec z); // (4)
}
```


## 概要
エルミート行列とベクトルの積を計算する。
引数`t`は対称行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。

- (1): $y \leftarrow Ax$
- (2): (1)を指定された実行ポリシーで実行する。
- (3): $z \leftarrow y + Ax$
- (4): (3)を指定された実行ポリシーで実行する。


## 適格要件
- (1), (2), (3), (4): `InMat`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
- (1), (2), (3), (4): [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(A)>(0, 1)`が`true` (つまり`A`が正方行列であること)
- (1), (2), (3), (4): [`possibly-multipliable`](possibly-multipliable.md)`<decltype(A), decltype(x), decltype(y)>()`が`true`
- (3), (4): [`possibly-addable`](possibly-addable.md)`<decltype(x),decltype(y),decltype(z)>()`が`true`


## 事前条件
- (1), (2), (3), (4): `A.extent(0) == A.extent(1)`
- (1), (2), (3), (4): [`multipliable`](multipliable.md)`(A, x, y) == true`
- (3), (4): [`addable`](addable.md)`(x, y, z) == true`


## 効果
エルミート行列の成分の位置を示す`t`を考慮した、エルミート行列とベクトルの積を計算する。

- (1), (2): $y \leftarrow Ax$
- (3), (4): $z \leftarrow y + Ax$


## 戻り値
なし


## 計算量
$O(\verb|A.extent(1)|\times \verb|x.extent(0)|)$


## 備考
- (3), (4): `z`に`y`を入れても良い。


## 例
**[注意] 処理系にあるコンパイラで確認していないため、間違っているかもしれません。**

```cpp example
#include <array>
#include <complex>
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

int main()
{
  constexpr size_t N = 4;
  constexpr size_t M = 4;

  std::vector<std::complex<double>> A_vec(N*M);
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
    for(int j = i; j < A.extent(1); ++j) {
      A[i,j] = std::complex<double>(i, j);
    }
  }

  for(int j = 0; j < x.extent(0); ++j) {
    x[j] = j;
  }

  // (1)
  std::cout << "(1)\n";
  std::linalg::hermitian_matrix_vector_product(A, std::linalg::upper_triangle, x, y);
  print(y, "y");

  // (2)
  std::cout << "(2)\n";
  std::linalg::hermitian_matrix_vector_product(std::execution::par, A, std::linalg::upper_triangle, x, y);
  print(y, "y");

  for(int i = 0; i < y.extent(0); ++i) {
    y[i] = -i;
  }

  // (3)
  std::cout << "(3)\n";
  std::linalg::hermitian_matrix_vector_product(A, std::linalg::upper_triangle, x, y, z);
  print(z, "z");

  // (4)
  std::cout << "(4)\n";
  std::linalg::hermitian_matrix_vector_product(std::execution::par, A, std::linalg::upper_triangle, x, y, z);
  print(z, "z");

  return 0;
}
```


### 出力
```
(1)
y[0] = (0,14)
y[1] = (6,14)
y[2] = (11,11)
y[3] = (14,0)
(2)
y[0] = (0,14)
y[1] = (6,14)
y[2] = (11,11)
y[3] = (14,0)
(3)
z[0] = (0,14)
z[1] = (5,14)
z[2] = (9,11)
z[3] = (11,0)
(4)
z[0] = (0,14)
z[1] = (5,14)
z[2] = (9,11)
z[3] = (11,0)
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


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [LAPACK: csymv](https://netlib.org/lapack/explore-html/db/d17/group__hemv_gab137e328e44dc1530ab0a93ff65c108a.html#gab137e328e44dc1530ab0a93ff65c108a)

