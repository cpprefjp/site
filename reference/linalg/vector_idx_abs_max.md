# vector_abs_sum

* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-vector InVec>
  typename InVec::size_type vector_idx_abs_max(InVec v); // (1)

  template<class ExecutionPolicy, in-vector InVec>
  typename InVec::size_type vector_idx_abs_max(ExecutionPolicy&& exec,
                                               InVec v); // (2)
}
```


## 概要
ベクトルの各成分の絶対値が最大となるインデックスを計算する。

- (1): 逐次実行する。
- (2): 指定された実行ポリシーに応じて実行する。


## 適格要件
- (1), (2): `T`を`decltype(`[`abs-if-needed`](abs-if-needed.md)`(`[`real-if-needed`](real-if-needed.md)`(declval<typename InVec::value_type>())) + abs-if-needed(`[`imag-if-needed`](imag-if-needed.md)`(declval<typename InVec::value_type>())))`とすると、`declval<T>() < declval<T>()`が有効な式であること。
- (2): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 戻り値
- (1), (2): `N`を`v`の次元`v.extent(0)`とすると、以下を返す。
  1. もし`N`が0なら`std::numeric_limits<typename InVec::size_type>::max()`
  2. そうでない場合、もし`InVec::value_type`が算術型なら絶対値が最大の最初の`v`の成分のインデックス。つまり、
  $$
  \argmax_{i = 0, \dots, N - 1} |\verb|v[|i\verb|]||
  $$
  3. そうでない場合、

  $$
  \argmax_{i = 0, \dots, N - 1}\left\{|\mathrm{Re}(\verb|v[|i\verb|]|)| + |\mathrm{Im}(\verb|v[|i\verb|]|)|\right\}
  $$


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

  std::cout << std::linalg::vector_idx_abs_max(v) << '\n'                       // (1)
            << std::linalg::vector_idx_abs_max(std::execution::par, v) << '\n'; // (2)

  return 0;
}
```


### 出力
```
0
0
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
- [LAPACK: icamax](https://netlib.org/lapack/explore-html/dd/d52/group__iamax_gafdf273dcc3f020e2aa5c716c1b3d7265.html#gafdf273dcc3f020e2aa5c716c1b3d7265)


