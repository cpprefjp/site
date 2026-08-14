# hermitian_matrix_rank_1_update
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<scalar Scalar,
           in-vector InVec,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_1_update(
    Scalar alpha,
    InVec x,
    OutMat A,
    Triangle t); // (1)

  template<class ExecutionPolicy,
           scalar Scalar,
           in-vector InVec,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_1_update(
    ExecutionPolicy&& exec,
    Scalar alpha,
    InVec x,
    OutMat A,
    Triangle t); // (2)

  template<scalar Scalar,
           in-vector InVec,
           in-matrix InMat,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_1_update(
    Scalar alpha,
    InVec x,
    InMat E,
    OutMat A,
    Triangle t); // (3)

  template<class ExecutionPolicy,
           scalar Scalar,
           in-vector InVec,
           in-matrix InMat,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_1_update(
    ExecutionPolicy&& exec,
    Scalar alpha,
    InVec x,
    InMat E,
    OutMat A,
    Triangle t); // (4)
}
```
* scalar[link scalar.md]
* in-vector[link inout-vector.md]
* in-matrix[link inout-matrix.md]
* possibly-packed-out-matrix[link possibly-packed-out-matrix.md]

## 概要
エルミートな(対称かつ共役を取る)rank-1 updateをエルミート行列に行う。
引数`t`はエルミート行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。

(1), (2)は結果を`A`に上書きするoverwriting版、(3), (4)は入力行列`E`に更新項を加えて`A`に書き込むupdating版である。

- (1): $A = \alpha xx^*$
- (2): (1)を指定された実行ポリシーで実行する。
- (3): $A = E + \alpha xx^*$
- (4): (3)を指定された実行ポリシーで実行する。


## 適格要件
- 共通:
    + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
    + `OutMat`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(A)>(0, 1)`が`true` (つまり`A`が正方行列であること)
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(x)>(0, 0)`が`true` (つまり`A`の次元と`x`の次元が同じであること)
- (2), (4): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`
- (3), (4): 追加で、`E`が`A`と整合すること
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(E), decltype(E)>(0, 1)`が`true` (つまり`E`が正方行列であること)
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(E), decltype(A)>(0, 0)`が`true` (つまり`E`の次元と`A`の次元が同じであること)


## 事前条件
- `A.extent(0) == A.extent(1)`
- `A.extent(0) == x.extent(0)`
- (3), (4): `E.extent(0) == E.extent(1)`かつ`E.extent(0) == A.extent(0)`


## 効果
- (1), (2): $A = \alpha xx^*$
- (3), (4): $A = E + \alpha xx^*$


## 戻り値
なし


## 計算量
$O((\verb|x.extent(0)|)^2)$


## 備考
- overwriting版(1), (2)は`A`に結果を上書きする。加算更新$A = A + \alpha xx^*$を行いたい場合は、updating版(3), (4)に更新前の行列を`E`として渡す。
- エルミート性を維持するため、`alpha`は実部のみが使用される。
- エルミート行列`A`の対角成分については、[`real-if-needed`](real-if-needed.md)により実部のみが使用される。対角成分が非ゼロの虚部を持っていても、その虚部は無視される。


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

template <class Vector>
void init_vec(Vector& v) {
  for (int i = 0; i < v.extent(0); ++i) {
    v[i] = std::complex<double>(0, i);
  }
}

template <class Matrix>
void init_mat(Matrix& A) {
  for(int i = 0; i < A.extent(0); ++i) {
    A[i,i] = std::complex<double>(i, 0);
    for(int j = i + 1; j < A.extent(1); ++j) {
      A[i,j] = std::complex<double>(i, j);
    }
  }
}

int main()
{
  constexpr size_t N = 4;

  using PackedMatrix = std::mdspan<
    std::complex<double>,
    std::extents<size_t, N, N>,
    std::linalg::layout_blas_packed<
      std::linalg::upper_triangle_t,
      std::linalg::row_major_t>>;

  std::vector<std::complex<double>> A_vec(N * N);
  std::vector<std::complex<double>> E_vec(N * N);
  std::vector<std::complex<double>> x_vec(N);

  PackedMatrix A(A_vec.data());
  PackedMatrix E(E_vec.data());
  std::mdspan  x(x_vec.data(), N);

  init_vec(x);

  // (1) overwriting: A = alpha xx^*
  std::cout << "overwriting (1)\n";
  std::linalg::hermitian_matrix_rank_1_update(
    2.0,
    x,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  // (3) updating: A = E + alpha xx^*
  init_mat(E);
  std::cout << "updating (3)\n";
  std::linalg::hermitian_matrix_rank_1_update(
    2.0,
    x,
    E,
    A,
    std::linalg::upper_triangle);
  print_mat(A);

  return 0;
}
```
* A.extent[link /reference/mdspan/extents/extent.md]
* v.extent[link /reference/mdspan/extents/extent.md]
* std::complex[link /reference/complex/complex.md]
* std::linalg::layout_blas_packed[link /reference/linalg/layout_blas_packed.md]
* std::linalg::upper_triangle_t[link /reference/linalg/upper_triangle_t.md]
* std::linalg::row_major_t[link /reference/linalg/row_major_t.md]
* std::linalg::upper_triangle[link /reference/linalg/upper_triangle_t.md]
* std::linalg::hermitian_matrix_rank_1_update[color ff0000]


### 出力
```
overwriting (1)
(0,0) (0,0) (0,0) (0,0)
(0,0) (2,0) (4,0) (6,0)
(0,0) (4,0) (8,0) (12,0)
(0,0) (6,0) (12,0) (18,0)
updating (3)
(0,0) (0,1) (0,2) (0,3)
(0,1) (3,0) (5,2) (7,3)
(0,2) (5,2) (10,0) (14,3)
(0,3) (7,3) (14,3) (21,0)
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
- [P3371R5 Fix C++26 BLAS rank updates consistency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3371r5.html)
    - C++26で、上書き(overwriting)版と更新(updating)版のオーバーロードに再構成され、BLASと整合するようになった
- [LWG Issue 4136. Specify behavior of \[linalg\] Hermitian algorithms on diagonal with nonzero imaginary part](https://cplusplus.github.io/LWG/issue4136)
    - C++26で、エルミート行列の対角成分が非ゼロの虚部を持つ場合に実部のみ（`real-if-needed`）が使用されることが明文化された。それまで対角成分の虚部の扱いが未規定だった問題を解消するもの
