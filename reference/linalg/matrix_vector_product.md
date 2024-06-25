# matrix_vector_product


* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]


```cpp
namespace std::linalg {
  template<in-matrix InMat,
           in-vector InVec,
           out-vector OutVec>
  void matrix_vector_product(InMat A,
                             InVec x,
                             OutVec y);

  template<class ExecutionPolicy,
           in-matrix InMat,
           in-vector InVec,
           out-vector OutVec>
  void matrix_vector_product(ExecutionPolicy&& exec,
                             InMat A,
                             InVec x,
                             OutVec y);

  template<in-matrix InMat,
           in-vector InVec1,
           in-vector InVec2,
           out-vector OutVec>
  void matrix_vector_product(InMat A,
                             InVec1 x,
                             InVec2 y,
                             OutVec z);

  template<class ExecutionPolicy,
           in-matrix InMat,
           in-vector InVec1,
           in-vector InVec2,
           out-vector OutVec>
  void matrix_vector_product(ExecutionPolicy&& exec,
                             InMat A,
                             InVec1 x,
                             InVec2 y,
                             OutVec z);
}
```


## 概要
(ここには、関数・変数・定数の概要を記述します。必須事項です。)

(必要な項目を省略する場合には、「(執筆中)」と書いておいてください。)


## テンプレートパラメータ制約
(ここには、関数がオーバーロード解決に参加するための条件を記載します。SFINAE-friendlyな関数の条件、制約テンプレートによるオーバーロードの条件などを記載します。)


## 適格要件
- (1), (2), (3), (4): [`possibly-multipliable`](possibly-multipliable.md)`<decltype(A), decltype(x), decltype(y)>()`が`true`
- (3), (4): [`possibly-addable`](possibly-addable.md)`<decltype(x),decltype(y),decltype(z)>()`が`true`


## 事前条件
- (1), (2), (3), (4): [`multipliable`](multipliable.md)`(A,x,y) == true`
- (3), (4): [`addable`](addable.md)`(x, y, z) == true`


## 効果
- (1), (2): $y \leftarrow Ax$
- (3), (4): $z \leftarrow y + Ax$


## 戻り値
なし


## 計算量
$O(\verb|A.extent(1)|\times \verb|x.extent(0)|)$


## 備考
- (3), (4): `z`に`y`を入れても良い。


## 例
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

int main()
{
  constexpr size_t N = 4;
  constexpr size_t M = 2;

  std::vector<double> A_vec(N*M);
  std::vector<double> x_vec(M);
  std::array<double, N> y_vec, z_vec;

  std::mdspan A(A_vec.data(), N, M);
  std::mdspan x(x_vec.data(), M);
  std::mdspan y(y_vec.data(), N);
  std::mdspan z(z_vec.data(), N);

  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = 0; j < A.extent(1); ++j) {
      A[i,j] = 100.0 * i + j;
    }
  }

  for(int j = 0; j < x.extent(0); ++j) {
    x[j] = 1.0 * j;
  }
  for(int i = 0; i < y.extent(0); ++i) {
    y[i] = -1.0 * i;
  }

  // (1)
  std::cout << "(1)\n";
  std::linalg::matrix_vector_product(A, x, y);
  print(y, "y");

  // (2)
  std::cout << "(2)\n";
  std::linalg::matrix_vector_product(std::execution::par, A, x, y);
  print(y, "y");

  // (3)
  std::cout << "(3)\n";
  std::linalg::matrix_vector_product(A, x, y, z);
  print(z, "z");

  // (4)
  std::cout << "(4)\n";
  std::linalg::matrix_vector_product(std::execution::par, A, x, y, z);
  print(z, "z");

  return 0;
}
```


### 出力
```
(1)
y[0] = 1
y[1] = 101
y[2] = 201
y[3] = 301
(2)
y[0] = 1
y[1] = 101
y[2] = 201
y[3] = 301
(3)
z[0] = 2
z[1] = 202
z[2] = 402
z[3] = 602
(4)
z[0] = 2
z[1] = 202
z[2] = 402
z[3] = 602
```


## バージョン
### 言語
- C++11

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
- [LAPACK: cgemv](https://netlib.org/lapack/explore-html/d7/dda/group__gemv_ga44c85a0d7ecd60a6bc8ca27b222d7792.html#ga44c85a0d7ecd60a6bc8ca27b222d7792)

