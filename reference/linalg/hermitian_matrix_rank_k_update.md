# hermitian_matrix_rank_k_update
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class Scalar,
           in-matrix InMat,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_k_update(
    Scalar alpha,
    InMat A,
    OutMat C,
    Triangle t); // (1)

  template<class ExecutionPolicy,
           class Scalar,
           in-matrix InMat,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_k_update(
    ExecutionPolicy&& exec,
    Scalar alpha,
    InMat A,
    OutMat C,
    Triangle t); // (2)

  template<class Scalar,
           in-matrix InMat1,
           in-matrix InMat2,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_k_update(
    Scalar alpha,
    InMat1 A,
    InMat2 E,
    OutMat C,
    Triangle t); // (3)

  template<class ExecutionPolicy,
           class Scalar,
           in-matrix InMat1,
           in-matrix InMat2,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_k_update(
    ExecutionPolicy&& exec,
    Scalar alpha,
    InMat1 A,
    InMat2 E,
    OutMat C,
    Triangle t); // (4)
}
```
* in-matrix[link inout-matrix.md]
* possibly-packed-out-matrix[link possibly-packed-inout-matrix.md]

## 概要
エルミートな(対称かつ共役を取る)rank-k updateをエルミート行列に行う。
引数`t`はエルミート行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。

(1), (2)は結果を`C`に上書きするoverwriting版、(3), (4)は入力行列`E`に更新項を加えて`C`に書き込むupdating版である。

- (1): $C = \alpha AA^*$
- (2): (1)を指定された実行ポリシーで実行する。
- (3): $C = E + \alpha AA^*$
- (4): (3)を指定された実行ポリシーで実行する。


## 適格要件
- 共通:
    + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
    + `OutMat`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`possibly-multipliable`](possibly-multipliable.md)`<decltype(A), decltype(`[`transposed`](transposed.md)`(A)), decltype(C)>()`が`true`
- (2), (4): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`
- (3), (4): 追加で、
    + `InMat2`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`possibly-addable`](possibly-addable.md)`<decltype(C), decltype(E), decltype(C)>()`が`true`


## 事前条件
- [`multipliable`](multipliable.md)`(A, `[`transposed`](transposed.md)`(A), C) == true` (これは`C`が正方行列であることを含意する)
- (3), (4): [`addable`](addable.md)`(C, E, C) == true`


## 効果
- (1), (2): $C = \alpha AA^*$
- (3), (4): $C = E + \alpha AA^*$


## 戻り値
なし


## 計算量
$O(\verb|A.extent(0)| \times \verb|A.extent(1)| \times \verb|A.extent(0)|)$


## 備考
- overwriting版(1), (2)は`C`に結果を上書きする。加算更新$C = C + \alpha AA^*$を行いたい場合は、updating版(3), (4)に更新前の行列を`E`として渡す。
- エルミート性を維持するため、`alpha`は実部のみが使用される。


## 例
**[注意] 処理系にあるコンパイラで確認していないため、間違っているかもしれません。**

```cpp example
#include <array>
#include <iostream>
#include <linalg>
#include <mdspan>
#include <vector>
#include <complex>

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
    for(int j = 0; j < A.extent(1); ++j) {
      A[i,j] = std::complex<double>(i, j);
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
  Vector E_vec(N * N);
  Vector C_vec(N * N);

  std::mdspan     A(A_vec.data());
  HermitianMatrix E(E_vec.data());
  HermitianMatrix C(C_vec.data());

  init_mat(A);
  init_herm_mat(E);

  // (1) overwriting: C = alpha AA^*
  std::cout << "overwriting (1)\n";
  std::linalg::hermitian_matrix_rank_k_update(
    -1.0,
    A,
    C,
    std::linalg::upper_triangle);
  print_mat(C);

  // (3) updating: C = E + alpha AA^*
  std::cout << "updating (3)\n";
  std::linalg::hermitian_matrix_rank_k_update(
    -1.0,
    A,
    E,
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
* std::linalg::hermitian_matrix_rank_k_update[color ff0000]


### 出力
```
overwriting (1)
(-1,0) (-1,-1)
(-1,-1) (-3,0)
updating (3)
(-1,0) (-1,0)
(-1,0) (-2,0)
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
- [LAPACK: {he,sy}rk: Hermitian/symmetric rank-k update](https://netlib.org/lapack/explore-html/d4/d6e/group__herk.html)
- [P3371R5 Fix C++26 BLAS rank updates consistency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3371r5.html)
    - C++26で、上書き(overwriting)版と更新(updating)版のオーバーロードに再構成され、BLASと整合するようになった
- [LWG Issue 4137. Fix `Mandates`, `Preconditions`, and `Complexity` elements of \[linalg\] algorithms](https://cplusplus.github.io/LWG/issue4137)
    - C++26で、適格要件・事前条件が`possibly-multipliable`/`multipliable`を用いた形へ整理され、計算量が`A.extent(0) × A.extent(1) × A.extent(0)`へ修正された
