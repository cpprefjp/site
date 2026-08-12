# symmetric_matrix_rank_2k_update
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
  void symmetric_matrix_rank_2k_update(
    InMat1 A,
    InMat2 B,
    OutMat C,
    Triangle t); // (1)

  template<class ExecutionPolicy,
           in-matrix InMat1,
           in-matrix InMat2,
           possibly-packed-out-matrix OutMat,
           class Triangle>
  void symmetric_matrix_rank_2k_update(
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
  void symmetric_matrix_rank_2k_update(
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
  void symmetric_matrix_rank_2k_update(
    ExecutionPolicy&& exec,
    InMat1 A,
    InMat2 B,
    InMat3 E,
    OutMat C,
    Triangle t); // (4)
}
```
* in-matrix[link inout-matrix.md]
* possibly-packed-out-matrix[link possibly-packed-inout-matrix.md]

## 概要
対称かつ共役を取らないrank-2k updateを対称行列に行う。

- (1), (2)は上書き(overwriting)版であり、出力行列`C`を計算結果で上書きする。
- (3), (4)は更新(updating)版であり、入力行列`E`に更新項を加えた結果を出力行列`C`に書き込む。

引数`t`は対称行列の成分が上三角にあるのか、それとも下三角にあるのかを示す。

- (1): $C = AB^T + BA^T$
- (2): (1)を指定された実行ポリシーで実行する。
- (3): $C = E + AB^T + BA^T$
- (4): (3)を指定された実行ポリシーで実行する。


## 適格要件
- 共通:
    + `Triangle`は[`upper_triangle_t`](upper_triangle_t.md)または[`lower_triangle_t`](lower_triangle_t.md)
    + `OutMat`が[`layout_blas_packed`](layout_blas_packed.md)を持つなら、レイアウトの`Triangle`テンプレート引数とこの関数の`Triangle`テンプレート引数が同じ型
    + [`possibly-addable`](possibly-addable.md)`<decltype(A), decltype(B), decltype(C)>()`が`true`
    + [`compatible-static-extents`](compatible-static-extents.md)`<decltype(A), decltype(A)>(0, 1)`が`true` (つまり`A`が正方行列であること)
- (3), (4): 上記に加えて、入力行列`E`が出力行列`C`と整合する次元・レイアウトを持つこと ([`possibly-addable`](possibly-addable.md)`<decltype(C), decltype(E), decltype(C)>()`が`true`)
- (2), (4): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
- `A.extent(0) == A.extent(1)`
- [`addable`](addable.md)`(A, B, C)`が`true`
- (3), (4): [`addable`](addable.md)`(C, E, C)`が`true`


## 効果
- (1), (2): $C = AB^T + BA^T$
- (3), (4): $C = E + AB^T + BA^T$


## 戻り値
なし


## 計算量
$O(\verb|A.extent(0)| \times \verb|A.extent(1)| \times \verb|C.extent(0)|)$


## 備考
- (1), (2)は出力行列`C`を上書きする。従来の加算更新 ($C \leftarrow C + AB^T + BA^T$) を行いたい場合は、updating版 (3), (4)に元の行列を`E`として渡す。


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
void init_mat(Matrix& A, double geta = 0.0) {
  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = 0; j < A.extent(1); ++j) {
      A[i,j] = A.extent(1) * i + j + geta;
    }
  }
}

template <class Matrix>
void init_symm_mat(Matrix& A) {
  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = i; j < A.extent(1); ++j) {
      A[i, j] = i * A.extent(1) + j;
    }
  }
}

int main()
{
  constexpr std::size_t N = 2;

  using Matrix = std::mdspan<double, std::extents<std::size_t, N, N>>;
  using SymmetricMatrix = std::mdspan<
    double,
    std::extents<std::size_t, N, N>,
    std::linalg::layout_blas_packed<
      std::linalg::upper_triangle_t,
      std::linalg::row_major_t>>;

  std::vector<double> A_vec(N * N);
  std::vector<double> B_vec(N * N);
  std::vector<double> E_vec(N * N);
  std::vector<double> C_vec(N * N);

  Matrix A(A_vec.data());
  Matrix B(B_vec.data());
  SymmetricMatrix E(E_vec.data());
  SymmetricMatrix C(C_vec.data());

  init_mat(A);
  init_mat(B, 1);
  init_symm_mat(E);

  // (1) overwriting: C = A B^T + B A^T
  std::cout << "(1)\n";
  std::linalg::symmetric_matrix_rank_2k_update(
    A,
    B,
    C,
    std::linalg::upper_triangle);
  print_mat(C);

  // (3) updating: C = E + A B^T + B A^T
  std::cout << "(3)\n";
  std::linalg::symmetric_matrix_rank_2k_update(
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
* std::linalg::layout_blas_packed[link /reference/linalg/layout_blas_packed.md]
* std::linalg::upper_triangle_t[link /reference/linalg/upper_triangle_t.md]
* std::linalg::row_major_t[link /reference/linalg/row_major_t.md]
* std::linalg::upper_triangle[link /reference/linalg/upper_triangle_t.md]
* std::linalg::symmetric_matrix_rank_2k_update[color ff0000]


### 出力
```
(1)
4 12
12 36
(3)
4 13
13 39
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
