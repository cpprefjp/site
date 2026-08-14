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
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_2k_update(
    InMat1 A,
    InMat2 B,
    OutMat C,
    Triangle t); // (1)

  template<class ExecutionPolicy,
           in-matrix InMat1,
           in-matrix InMat2,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_2k_update(
    ExecutionPolicy&& exec,
    InMat1 A,
    InMat2 B,
    OutMat C,
    Triangle t); // (2)

  template<in-matrix InMat1,
           in-matrix InMat2,
           in-matrix InMat3,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_2k_update(
    InMat1 A,
    InMat2 B,
    InMat3 E,
    OutMat C,
    Triangle t); // (3)

  template<class ExecutionPolicy,
           in-matrix InMat1,
           in-matrix InMat2,
           in-matrix InMat3,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void hermitian_matrix_rank_2k_update(
    ExecutionPolicy&& exec,
    InMat1 A,
    InMat2 B,
    InMat3 E,
    OutMat C,
    Triangle t); // (4)
}
```
* in-matrix[link inout-matrix.md]
* possibly-packed-out-matrix[link possibly-packed-out-matrix.md]

## 概要
エルミートな(対称かつ共役を取る)rank-2k updateを対称行列に行う。

- (1), (2)は上書き(overwriting)版であり、出力行列`C`を計算結果で上書きする。
- (3), (4)は更新(updating)版であり、入力行列`E`に更新項を加えた結果を出力行列`C`に書き込む。

引数`t`は対称行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。

- (1): $C = AB^* + BA^*$
- (2): (1)を指定された実行ポリシーで実行する。
- (3): $C = E + AB^* + BA^*$
- (4): (3)を指定された実行ポリシーで実行する。


## 適格要件
- 共通:
    + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
    + `OutMat`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`possibly-multipliable`](possibly-multipliable.md)`<decltype(A), decltype(`[`transposed`](transposed.md)`(B)), decltype(C)>()`が`true`
    + [`possibly-multipliable`](possibly-multipliable.md)`<decltype(B), decltype(`[`transposed`](transposed.md)`(A)), decltype(C)>()`が`true`
- (3), (4): 上記に加えて、
    + `InMat3`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`possibly-addable`](possibly-addable.md)`<decltype(C), decltype(E), decltype(C)>()`が`true`
- (2), (4): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
- [`multipliable`](multipliable.md)`(A, `[`transposed`](transposed.md)`(B), C) == true`
- [`multipliable`](multipliable.md)`(B, `[`transposed`](transposed.md)`(A), C) == true` (上記と合わせて`C`が正方行列であることを含意する)
- (3), (4): [`addable`](addable.md)`(C, E, C) == true`


## 効果
- (1), (2): $C = AB^* + BA^*$
- (3), (4): $C = E + AB^* + BA^*$


## 戻り値
なし


## 計算量
$O(\verb|A.extent(0)| \times \verb|A.extent(1)| \times \verb|B.extent(0)|)$


## 備考
- (1), (2)は出力行列`C`を上書きする。従来の加算更新 ($C \leftarrow C + AB^* + BA^*$) を行いたい場合は、updating版 (3), (4)に元の行列を`E`として渡す。
- エルミート行列`C`の対角成分については、[`real-if-needed`](real-if-needed.md)により実部のみが使用される。対角成分が非ゼロの虚部を持っていても、その虚部は無視される。


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
  constexpr std::size_t N = 2;

  using Scalar = std::complex<double>;
  using Vector = std::vector<Scalar>;
  using Matrix = std::mdspan<Scalar, std::extents<std::size_t, N, N>>;
  using HermitianMatrix = std::mdspan<
      Scalar,
      std::extents<std::size_t, N, N>,
      std::linalg::layout_blas_packed<
        std::linalg::upper_triangle_t,
        std::linalg::row_major_t>
    >;

  Vector A_vec(N * N);
  Vector B_vec(N * N);
  Vector E_vec(N * N);
  Vector C_vec(N * N);

  Matrix A(A_vec.data());
  Matrix B(B_vec.data());
  HermitianMatrix E(E_vec.data());
  HermitianMatrix C(C_vec.data());

  init_mat(A);
  init_mat(B, 1);
  init_herm_mat(E);

  // (1) overwriting: C = A B^* + B A^*
  std::cout << "(1)\n";
  std::linalg::hermitian_matrix_rank_2k_update(
    A,
    B,
    C,
    std::linalg::upper_triangle);
  print_mat(C);

  // (3) updating: C = E + A B^* + B A^*
  std::cout << "(3)\n";
  std::linalg::hermitian_matrix_rank_2k_update(
    A,
    B,
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
* std::linalg::hermitian_matrix_rank_2k_update[color ff0000]


### 出力
```
(1)
(4,0) (6,4)
(6,4) (12,0)
(3)
(4,0) (6,5)
(6,5) (13,0)
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
- [P3371R5 Fix C++26 BLAS rank updates consistency](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3371r5.html)
    - C++26で、上書き(overwriting)版と更新(updating)版のオーバーロードに再構成され、BLASと整合するようになった
- [LWG Issue 4136. Specify behavior of \[linalg\] Hermitian algorithms on diagonal with nonzero imaginary part](https://cplusplus.github.io/LWG/issue4136)
    - C++26で、エルミート行列の対角成分が非ゼロの虚部を持つ場合に実部のみ（`real-if-needed`）が使用されることが明文化された。それまで対角成分の虚部の扱いが未規定だった問題を解消するもの
- [LWG Issue 4137. Fix `Mandates`, `Preconditions`, and `Complexity` elements of \[linalg\] algorithms](https://cplusplus.github.io/LWG/issue4137)
    - C++26で、適格要件・事前条件が2つの`possibly-multipliable`/`multipliable`を用いた形へ整理され、計算量が`A.extent(0) × A.extent(1) × B.extent(0)`へ修正された
