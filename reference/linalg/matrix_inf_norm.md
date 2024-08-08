# matrix_inf_norm
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-matrix InMat, class Scalar>
  Scalar matrix_inf_norm(InMat A, Scalar init);          // (1)

  template<class ExecutionPolicy,
           in-matrix InMat,
           class Scalar>
  Scalar matrix_inf_norm(
    ExecutionPolicy&& exec,
    InMat A,
    Scalar init);                                        // (2)

  template<in-matrix InMat>
  auto matrix_inf_norm(InMat A);                         // (3)

  template<class ExecutionPolicy, in-matrix InMat>
  auto matrix_inf_norm(ExecutionPolicy&& exec, InMat A); // (4)
}
```
* in-matrix[link inout-matrix.md]

## 概要
行列の無限大ノルムを計算する。

- (1): 逐次実行する。
- (2): 指定された実行ポリシーに応じて実行する。
- (3): (1)で`init`に`InMat::value_type`のデフォルト値を与えて逐次実行する。
- (4): (2)で`init`に`InMat::value_type`のデフォルト値を与えて、指定された実行ポリシーに応じて実行する。


## 適格要件
- (1), (2): `decltype(`[`abs-if-needed`](abs-if-needed.md)`(declval<typename InMat::value_type>()))`が`Scalar`に変換可能。
- (2), (4): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 効果
- (3), (4): `T`を`decltype(`[`abs-if-needed`](abs-if-needed.md)`(declval<typename InMat::value_type>()))`とすると、
    + (3): `matrix_inf_norm(A, T{})`を返す。
    + (4): `matrix_inf_norm(std::forward<ExecutionPolicy>(exec), A, T{})`を返す。


## 戻り値
- (1), (2): `A`が $m \times n$ 行列とすると、以下の値を返す。
    1. もし、`m`が0なら`init`
    2. そうでないなら、以下の式の値

$$
\verb|init| + \max_{i = 0, \dots ,m - 1}\sum_{j = 0}^{n - 1} |\verb|A[|i, j\verb|]||
$$

- (3), (4): `T`を`decltype(`[`abs-if-needed`](abs-if-needed.md)`(declval<typename InMat::value_type>()))`とすると、
    + (3): `matrix_inf_norm(A, T{})`を返す。
    + (4): `matrix_inf_norm(std::forward<ExecutionPolicy>(exec), A, T{})`を返す。


## 備考
- (1), (2): もし`InMat::value_type`と`Scalar`がどちらも浮動小数点数型または[`std::complex`](/reference/complex/complex.md)の特殊化で、`Scalar`が`InMat::value_type`より精度が高い場合、和の各項は`Scalar`またはより高い精度の型が使われる。


## 例
**[注意] 処理系にあるコンパイラで確認していないため、間違っているかもしれません。**

```cpp example
#include <array>
#include <cmath>
#include <execution>
#include <iostream>
#include <linalg>
#include <mdspan>

int main()
{
  constexpr size_t M = 4;
  constexpr size_t N = 4;

  std::array<double, M * N> mat;

  std::mdspan A(mat.data(), M, N);

  for(int i = 0; i < A.extent(0); ++i) {
    for(int j = 0; j < A.extent(1); ++j) {
      A[i,j] = ((i + j) % 2 == 0 ? 1.0 : -1.0) / (i * A.extent(1) + j + 1);
    }
  }

  std::cout << std::linalg::matrix_inf_norm(A, -1.0 / 3) << '\n'
            << std::linalg::matrix_inf_norm(std::execution::par, A, -1.0 / 3) << '\n'
            << std::linalg::matrix_inf_norm(A) << '\n'
            << std::linalg::matrix_inf_norm(std::execution::par, A) << '\n';

  return 0;
}
```
* std::linalg::matrix_inf_norm[color ff0000]

### 出力
```
1.75
1.75
2.08333
2.08333
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

