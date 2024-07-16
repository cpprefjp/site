# vector_abs_sum

* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-vector InVec, class Scalar>
  Scalar vector_abs_sum(InVec v, Scalar init);          // (1)

  template<class ExecutionPolicy,
           in-vector InVec,
           class Scalar>
  Scalar vector_abs_sum(ExecutionPolicy&& exec,
                        InVec v,
                        Scalar init);                   // (2)

  template<in-vector InVec>
  auto vector_abs_sum(InVec v);                         // (3)

  template<class ExecutionPolicy, in-vector InVec>
  auto vector_abs_sum(ExecutionPolicy&& exec, InVec v); // (4)
}
```


## 概要
ベクトルの各成分の絶対値の和(1ノルム)を計算する。

- (1): 逐次実行する。
- (2): 指定された実行ポリシーに応じて実行する。
- (3): (1)で`init`に`InVec::value_type`のデフォルト値を与えて逐次実行する。
- (4): (2)で`init`に`InVec::value_type`のデフォルト値を与えて、指定された実行ポリシーに応じて実行する。


## 適格要件
- (1), (2): `decltype(init +` [`abs-if-needed`](abs-if-needed.md)`(`[`real-if-needed`](real-if-needed.md)`(declval<typename InVec::value_type>())) + abs-if-needed(`[`imag-if-needed`](imag-if-needed.md)`(declval<typename InVec::value_type>())))`が`Scalar`に変換可能。
- (2), (4): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`

## 効果
- (3), (4): `T`を`typename InVec::value_type`とすると、
    + (3): `vector_abs_sum(v, T{})`を返す。
    + (4): `vector_abs_sum(std::forward<ExecutionPolicy>(exec), v, T{})`を返す。


## 戻り値
- (1), (2): `N`を`v`の次元`v.extent(0)`とすると、以下を返す。
    + もし`N`が0なら`init`
    + そうでない場合、もし`InVec::value_type`が算術型なら以下の式の値

    $$
    \sum_{i = 0}^{N - 1} |\verb|v[|i\verb|]|| + \verb|init|
    $$

    + そうでない場合、以下の式の値

    $$
    \sum_{i = 0}^{N - 1} \left\{|\mathrm{Re}(\verb|v[|i\verb|]|)| + |\mathrm{Im}(\verb|v[|i\verb|]|)|\right\} + \verb|init|
    $$


- (3), (4): `T`を`typename InVec::value_type`とすると、
    + (3): `vector_abs_sum(v, T{})`を返す。
    + (4): `vector_abs_sum(std::forward<ExecutionPolicy>(exec), v, T{})`を返す。


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

  std::cout << std::linalg::vector_abs_sum(v, -5.0 / 6) << '\n'                      // (1)
            << std::linalg::vector_abs_sum(std::execution::par, v, -5.0 / 6) << '\n' // (2)
            << std::linalg::vector_abs_sum(v) << '\n'                                // (3)
            << std::linalg::vector_abs_sum(std::execution::par, v) << '\n';          // (4)

  return 0;
}
```
* std::linalg::vector_abs_sum[color ff0000]

### 出力
```
1.25
1.25
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
- [LAPACK: dzasum](https://netlib.org/lapack/explore-html/d5/d72/group__asum_gaf23444d1c822b34db864558d7afc76dd.html#gaf23444d1c822b34db864558d7afc76dd)

