# hermitian_matrix_rank_2_update
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-vector InVec1,
           in-vector InVec2,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_2_update(
    InVec1 x,
    InVec2 y,
    OutMat A,
    Triangle t); // (1)

  template<class ExecutionPolicy,
           in-vector InVec1,
           in-vector InVec2,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_2_update(
    ExecutionPolicy&& exec,
    InVec1 x,
    InVec2 y,
    OutMat A,
    Triangle t); // (2)

  template<in-vector InVec1,
           in-vector InVec2,
           in-matrix InMat,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_2_update(
    InVec1 x,
    InVec2 y,
    InMat E,
    OutMat A,
    Triangle t); // (3)

  template<class ExecutionPolicy,
           in-vector InVec1,
           in-vector InVec2,
           in-matrix InMat,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_2_update(
    ExecutionPolicy&& exec,
    InVec1 x,
    InVec2 y,
    InMat E,
    OutMat A,
    Triangle t); // (4)
}
```
* in-vector[link inout-vector.md]
* in-matrix[link inout-matrix.md]
* possibly-packed-out-matrix[link possibly-packed-inout-matrix.md]

## 概要
エルミートな(対称かつ共役を取る)rank-2 updateをエルミート行列に行う。
引数`t`はエルミート行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。

(1), (2)は更新結果を出力行列`A`に上書きする(overwriting)。
(3), (4)は入力行列`E`に更新項を加えた結果を出力行列`A`に書き込む(updating)。

- (1): $A = xy^* + yx^*$
- (2): (1)を指定された実行ポリシーで実行する。
- (3): $A = E + xy^* + yx^*$
- (4): (3)を指定された実行ポリシーで実行する。


## 適格要件
- 共通:
    + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
    + `OutMat`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`possibly-multipliable`](possibly-multipliable.md)`<decltype(A), decltype(x), decltype(y)>()`が`true`
- (2), (4): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`
- (3), (4): [`possibly-multipliable`](possibly-multipliable.md)`<decltype(E), decltype(x), decltype(y)>()`が`true`


## 事前条件
- `A.extent(0) == A.extent(1)`
- [`multipliable`](multipliable.md)`(A, x, y) == true`
- (3), (4): `E.extent(0) == A.extent(0)`かつ`E.extent(1) == A.extent(1)`


## 効果
- (1), (2): $A = xy^* + yx^*$
- (3), (4): $A = E + xy^* + yx^*$


## 戻り値
なし


## 計算量
$O(\verb|x.extent(0)| \times \verb|y.extent(0)|)$


## 備考
加算更新$A \leftarrow A + xy^* + yx^*$を行いたい場合は、更新前の行列を`E`として渡すupdating版(3), (4)を使用する。


## 例
**[注意] 処理系にあるコンパイラで確認していないため、間違っているかもしれません。**

```cpp example
#include <array>
#include <complex>
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
    A[i, i] = std::complex<double>(i, 0);
    for(int j = i + 1; j < A.extent(1); ++j) {
      A[i, j] = std::complex<double>(i, j);
    }
  }
}

int main()
{
  constexpr size_t N = 4;

  std::vector<std::complex<double>> A_vec(N * N);
  std::vector<std::complex<double>> E_vec(N * N);
  std::vector<std::complex<double>> x_vec(N);
  std::array<std::complex<double>, N> y_vec;

  using packed_mat = std::mdspan<
    std::complex<double>,
    std::extents<size_t, N, N>,
    std::linalg::layout_blas_packed<
      std::linalg::upper_triangle_t,
      std::linalg::row_major_t>>;

  packed_mat A(A_vec.data());
  packed_mat E(E_vec.data());
  std::mdspan x(x_vec.data(), N);
  std::mdspan y(y_vec.data(), N);

  for (int i = 0; i < x.extent(0); ++i) {
    x[i] = std::complex<double>(i, 0);
  }
  for (int i = 0; i < y.extent(0); ++i) {
    y[i] = std::complex<double>(i, 1);
  }

  // (1) 上書き版： A = xy^* + yx^*
  std::cout << "(1)\n";
  std::linalg::hermitian_matrix_rank_2_update(
    x,
    y,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  // (3) 更新版： A = E + xy^* + yx^*
  init_mat(E);
  std::cout << "(3)\n";
  std::linalg::hermitian_matrix_rank_2_update(
    x,
    y,
    E,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  return 0;
}
```
* A.extent[link /reference/mdspan/extents/extent.md]
* x.extent[link /reference/mdspan/extents/extent.md]
* y.extent[link /reference/mdspan/extents/extent.md]
* std::complex[link /reference/complex/complex.md]
* std::linalg::layout_blas_packed[link /reference/linalg/layout_blas_packed.md]
* std::linalg::upper_triangle_t[link /reference/linalg/upper_triangle_t.md]
* std::linalg::row_major_t[link /reference/linalg/row_major_t.md]
* std::linalg::upper_triangle[link /reference/linalg/upper_triangle_t.md]
* std::linalg::hermitian_matrix_rank_2_update[color ff0000]


### 出力
```
(1)
(0,0) (0,1) (0,2) (0,3)
(0,1) (2,0) (4,1) (6,2)
(0,2) (4,1) (8,0) (12,1)
(0,3) (6,2) (12,1) (18,0)
(3)
(0,0) (0,2) (0,4) (0,6)
(0,2) (3,0) (5,3) (7,5)
(0,4) (5,3) (10,0) (14,4)
(0,6) (7,5) (14,4) (21,0)
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
- [P3371R5 Fix C++26 BLAS rank updates consistency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3371r5.html)
    - C++26で、上書き(overwriting)版と更新(updating)版のオーバーロードに再構成され、BLASと整合するようになった
