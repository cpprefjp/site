# vector_two_norm
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-vector InVec, class Scalar>
  Scalar vector_two_norm(InVec v, Scalar init);          // (1)

  template<class ExecutionPolicy,
           in-vector InVec,
           class Scalar>
  Scalar vector_two_norm(ExecutionPolicy&& exec,
                         InVec v,
                         Scalar init);                   // (2)

  template<in-vector InVec>
  auto vector_two_norm(InVec v);                         // (3)

  template<class ExecutionPolicy, in-vector InVec>
  auto vector_two_norm(ExecutionPolicy&& exec, InVec v); // (4)
}
```
* in-vector[link inout-vector.md]

## 概要
ベクトルのユークリッドノルムを計算する。

- (1): 逐次実行する。
- (2): 指定された実行ポリシーに応じて実行する。
- (3): (1)で`init`に`InVec::value_type`のデフォルト値を与えて逐次実行する。
- (4): (2)で`init`に`InVec::value_type`のデフォルト値を与えて、指定された実行ポリシーに応じて実行する。


## 適格要件
- (1), (2): `decltype(init +` [`abs-if-needed`](abs-if-needed.md)`(declval<typename InVec::value_type>()) * abs-if-needed(declval<typename InVec::value_type>()))`が`Scalar`に変換可能。
- (2), (4): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 効果
- (3), (4): `T`を`decltype(`[`abs-if-needed`](abs-if-needed.md)`(declval<typename InVec::value_type>()) * abs-if-needed(declval<typename InVec::value_type>()))`とすると、
    + (3): `vector_two_norm(v, T{})`を返す。
    + (4): `vector_two_norm(std::forward<ExecutionPolicy>(exec), v, T{})`を返す。


## 戻り値
- (1), (2): `n`を`v`の次元とすると、以下の式の値を返す。

$$
\sqrt{\sum_{i = 0}^{n - 1} |\verb|v[|i\verb|]||^2 + \verb|init|^2}
$$


- (3), (4): `T`を`decltype(`[`abs-if-needed`](abs-if-needed.md)`(declval<typename InVec::value_type>()) * abs-if-needed(declval<typename InVec::value_type>()))`とすると、
    + (3): `vector_two_norm(v, T{})`を返す。
    + (4): `vector_two_norm(std::forward<ExecutionPolicy>(exec), v, T{})`を返す。


## 備考
- (1), (2): もし`InVec::value_type`と`Scalar`がどちらも浮動小数点数型または[`std::complex`](/reference/complex/complex.md)の特殊化で、`Scalar`が`InVec::value_type`より精度が高い場合、和の各項は`Scalar`またはより高い精度の型が使われる。


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
  constexpr size_t N = 4;

  std::array<double, N> vec;

  std::mdspan v(vec.data(), N);

  for(int i = 0; i < v.extent(0); ++i) {
    v[i] = std::pow(-1.0, i) / (i + 1);
  }

  std::cout << std::linalg::vector_two_norm(v, 1.0 / 5) << '\n'                      // (1)
            << std::linalg::vector_two_norm(std::execution::par, v, 1.0 / 5) << '\n' // (2)
            << std::linalg::vector_two_norm(v) << '\n'                                // (3)
            << std::linalg::vector_two_norm(std::execution::par, v) << '\n';          // (4)

  return 0;
}
```
* std::linalg::vector_two_norm[color ff0000]

### 出力
```
1.46361
1.46361
1.42361
1.42361
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
- [LAPACK: dnrm2](https://netlib.org/lapack/explore-html/d1/d2a/group__nrm2_gab5393665c8f0e7d5de9bd1dd2ff0d9d0.html#gab5393665c8f0e7d5de9bd1dd2ff0d9d0)

