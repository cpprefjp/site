# dotc

* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]


```cpp
namespace std::linalg {
  template<in-vector InVec1,
           in-vector InVec2,
           class Scalar>
  Scalar dotc(InVec1 v1,
             InVec2 v2,
             Scalar init); // (1)

  template<class ExecutionPolicy,
           in-vector InVec1,
           in-vector InVec2,
           class Scalar>
  Scalar dotc(ExecutionPolicy&& exec,
             InVec1 v1,
             InVec2 v2,
             Scalar init); // (2)

  template<in-vector InVec1,
           in-vector InVec2>
  auto dotc(InVec1 v1,
           InVec2 v2); // (3)

  template<class ExecutionPolicy,
           in-vector InVec1,
           in-vector InVec2>
  auto dotc(ExecutionPolicy&& exec,
           InVec1 v1,
           InVec2 v2); // (4)
}
```

## 概要
2つのベクトル`v1`、`v2`のエルミート内積を計算する。


## 適格要件
- 共通:
    + [`compatible-static-extents`](compatible-static-extents.md)`<InVec1, InVec2>(0, 0)`が`true` (2つのベクトルの静的な要素数が同じ)
- (2), (4): [`is_execution_policy`](/reference/execution/is_execution_policy.md)`<ExecutionPolicy>::value`が`true`


## 事前条件
2つのベクトルの次元が同じであること。

- `v1.extent(0) == v2.extent(0)`


## 効果
- (1): [`dot`](dot.md)`(`[`conjugated`](conjugated.md)`(v1), v2, init)`を返す。
- (2): [`dot`](dot.md)`(std::forward<ExecutionPolicy>(exec),` [`conjugated`](conjugated.md)`(v1), v2, init)`を返す。
- (3), (4): `T`を各ベクトルの値型の積の型`decltype(`[`conj-if-needed`](conj-if-needed.md)`(declval<typename InVec1::value_type>()) * declval<typename InVec2::value_type>())`とする。
    + (3): `dotc(v1, v2, T{})`を返す。
    + (4): `dotc(std::forward<ExecutionPolicy>(exec), v1, v2, T{})`を返す。


## 戻り値
2つのベクトルの次元を`N`とする。

- (1): もし`N`が0なら`init`を返す。そうでない場合は、共役を取らない内積、つまり以下の式の`Scalar`型の値を返す。

$$
\verb|init| + \sum_{i = 0}^{N - 1} \overline{\verb|v1|[i]} * \verb|v2|[i]
$$

- (2): (1)の並列アルゴリズム版。
- (3): (1)の`init`を和の各項の型のデフォルト値に置き換えて計算する。
- (4): (3)の並列アルゴリズム版。


## 例
**[注意] 処理系にあるコンパイラで確認していないため、間違っているかもしれません。**

```cpp example
#include <cmath>
#include <complex>
#include <execution>
#include <iostream>
#include <linalg>
#include <mdspan>
#include <numbers>
#include <vector>

int main()
{
  constexpr size_t N = 4;

  std::vector<std::complex<double>> a_vec(N);
  std::mdspan a(a_vec.data(), N);

  for(int i = 0; i < a.extent(0); ++i) {
    auto sign = i % 2 == 0 ? 1.0 : -1.0;
    a[i].real(sign / (2 * i + 1));
    a[i].imag(-sign / (2 * (i + 1)));
  }

  std::vector<std::complex<double>> b_vec(a_vec);
  std::mdspan b(b_vec.data(), N);

  std::cout << std::linalg::dotc(a, b, std::complex<double>(-std::numbers::pi * std::numbers::pi / 6, 0)) << '\n'                      // (1)
            << std::linalg::dotc(std::execution::par, a, b, std::complex<double>(-std::numbers::pi * std::numbers::pi / 6, 0)) << '\n' // (2)
            << std::linalg::dotc(a, b) << '\n'                                // (3)
            << std::linalg::dotc(std::execution::par, a, b) << '\n';          // (4)

  return 0;
}
```
* std::linalg::dotc[color ff0000]

### 出力
```
(-0.117512,-4.62593e-19)
(-0.117512,0)
(1.52742,-4.62593e-19)
(1.52742,0)
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
- [`dot`](dot.md)
- [`execution`](/reference/execution.md)
- [`mdspan`](/reference/mdspan.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [`LAPACK: cdotc`](https://netlib.org/lapack/explore-html/d1/dcc/group__dot_ga5c189335a4e6130a2206c190579b1571.html#ga5c189335a4e6130a2206c190579b1571)

