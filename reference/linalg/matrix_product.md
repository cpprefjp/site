# matrix_product


* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]


```cpp
namespace std::linalg {
  template<in-matrix InMat1,
          in-matrix InMat2,
          out-matrix OutMat>
  void matrix_product(InMat1 A,
                      InMat2 B,
                      OutMat C); // (1)

  template<class ExecutionPolicy,
          in-matrix InMat1,
          in-matrix InMat2,
          out-matrix OutMat>
  void matrix_product(ExecutionPolicy&& exec,
                      InMat1 A,
                      InMat2 B,
                      OutMat C); // (2)

  template<in-matrix InMat1,
          in-matrix InMat2,
          in-matrix InMat3,
          out-matrix OutMat>
  void matrix_product(InMat1 A,
                      InMat2 B,
                      InMat3 E,
                      OutMat C); // (3)

  template<class ExecutionPolicy,
          in-matrix InMat1,
          in-matrix InMat2,
          in-matrix InMat3,
          out-matrix OutMat>
  void matrix_product(ExecutionPolicy&& exec,
                      InMat1 A,
                      InMat2 B,
                      InMat3 E,
                      OutMat C); // (4)
}
```


## 概要
行列同士の積を計算する。

- (1): $C \leftarrow AB$
- (2): (1)を指定された実行ポリシーで実行する。
- (3): $C \leftarrow E + AB$
- (4): (3)を指定された実行ポリシーで実行する。


## 適格要件
- (1), (2), (3), (4): [`possibly-multipliable`](possibly-multipliable.md)`<decltype(A), decltype(B), decltype(C)>()`が`true`
- (3), (4): [`possibly-addable`](possibly-addable.md)`<decltype(E),decltype(E),decltype(C)>()`が`true`


## 事前条件
- (1), (2), (3), (4): [`multipliable`](multipliable.md)`(A, B, C) == true`
- (3), (4): [`addable`](addable.md)`(E, E, C) == true`


## 効果
- (1), (2): $C \leftarrow AB$
- (3), (4): $C \leftarrow E + AB$


## 戻り値
なし


## 計算量
$O(\verb|A.extent(0)| \times \verb|A.extent(1)| \times \verb|B.extent(1)|)$


## 備考
- (3), (4): `C`に`E`を入れても良い。


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

template <class Matrix>
void init_mat(Matrix& A) {
  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = 0; j < A.extent(1); ++j) {
      A[i, j] = i * A.extent(1) + j;
    }
  }
}

int main()
{
  constexpr size_t N = 2;

  std::vector<double> A_vec(N * N);
  std::vector<double> B_vec(N * N);
  std::vector<double> C_vec(N * N);
  std::vector<double> E_vec(N * N);

  std::mdspan A(A_vec.data(), N, N);
  std::mdspan B(B_vec.data(), N, N);
  std::mdspan C(C_vec.data(), N, N);
  std::mdspan E(E_vec.data(), N, N);

  init_mat(A);
  init_mat(B);
  init_mat(E);

  for(int i = 0; i < B.extent(0); ++i) {
    for(int j = 0; j < B.extent(1); ++j) {
      B[i, j] += 4;
    }
  }

  // (1)
  std::cout << "(1)\n";
  std::linalg::matrix_product(A, B, C);
  print_mat(C);

  // (2)
  std::cout << "(2)\n";
  std::linalg::matrix_product(std::execution::par, A, B, C);
  print_mat(C);

  // (3)
  std::cout << "(3)\n";
  std::linalg::matrix_product(A, B, E, C);
  print_mat(C);

  // (4)
  std::cout << "(4)\n";
  std::linalg::matrix_product(std::execution::par, A, B, E, C);
  print_mat(C);

  return 0;
}
```


### 出力
```
(1)
6 7
26 31
(2)
6 7
26 31
(3)
6 8
28 34
(4)
6 8
28 34
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
- [LAPACK: gemm](https://netlib.org/lapack/explore-html/dd/d09/group__gemm.html)
