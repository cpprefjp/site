# sum_of_squares_result

* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-vector InVec, class Scalar>
  sum_of_squares_result<Scalar> vector_sum_of_squares(
    InVec v,
    sum_of_squares_result<Scalar> init); // (1)

  template<class ExecutionPolicy,
           in-vector InVec,
           class Scalar>
  sum_of_squares_result<Scalar> vector_sum_of_squares(
    ExecutionPolicy&& exec,
    InVec v,
    sum_of_squares_result<Scalar> init); // (2)
}
```


## 概要
アンダーフローとオーバーフローが起きないようスケールされた、ベクトルの成分の2乗和を計算する。すなわち、戻り値を`result`とし、説明用の関数

```cpp
  template<class Scalar>
  Scalar get_sum_of_squares(sum_of_squares_result<Scalar> result) {
    return std::pow(result.scaling_factor, 2) * result.scaled_sum_of_squares;
  }
```

を定義すると、以下の式が成り立つように計算する。

$$
\verb|get_sum_of_squares(result)| = \sum_{i = 0}^{n - 1} |\verb|v[|i\verb|]||^2 + \verb|get_sum_of_squares(init)|
$$

ただし、`n`は`v`の次元である。


## 適格要件
- `decltype(`[`abs-if-needed`](abs-if-needed.md)`(declval<typename InVec::value_type>()))`が`Scalar`に変換可能。


## 効果
- (1): 以下の条件を満たす`sum_of_squares_result<Scalar>`型の値`result`を返す。
  + `result.scaling_factor`が`init.scaling_factor`と$\max_{i = 0, \dots, n - 1}|\verb|v[|i\verb|]||$の最大値。ただし、`n`は`v`の次元である。
  + 概要に記載した式を満たす。
- (2): (1)の並列アルゴリズム版。


## 戻り値
`sum_of_squares_result<Scalar>`


## 備考
- `init.scaled_sum_of_squares`は0以上でなければならない。
- もし`InVec::value_type`と`Scalar`がどちらも浮動小数点数型または`std::complex`の特殊化で、`Scalar`が`InVec::value_type`より精度が高い場合、和の各項は`Scalar`またはより高い精度の型が使われる。


## 例
**[注意] 処理系にあるコンパイラで確認していないため、間違っているかもしれません。**

```cpp example
#include <array>
#include <cmath>
#include <execution>
#include <iostream>
#include <linalg>
#include <mdspan>


template<class Scalar>
Scalar get_sum_of_squares(std::linalg::sum_of_squares_result<Scalar> result) {
  return std::pow(result.scaling_factor, 2) * result.scaled_sum_of_squares;
}


int main()
{
  constexpr size_t N = 4;

  std::array<double, N> vec;

  std::mdspan v(vec.data(), N);

  for(int i = 0; i < v.extent(0); ++i) {
    v[i] = std::pow(-1.0, i) / (i + 1);
  }

  auto init = std::linalg::sum_of_squares_result<double>{.scaling_factor = 1.0 / 5,
                                                         .scaled_sum_of_squares = 1.0};

  std::cout << get_sum_of_squares(
                std::linalg::vector_sum_of_squares(v, init))                              // (1)
            << get_sum_of_squares(
                std::linalg::vector_sum_of_squares(std::execution::par, v, init)) << '\n' // (2)
            << get_sum_of_squares(
                std::linalg::vector_sum_of_squares(v)) << '\n'                            // (3)
            << get_sum_of_squares(
                std::linalg::vector_sum_of_squares(std::execution::par, v)) << '\n';      // (4)

  return 0;
}
```


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
- [`sum_of_squares_result`](sum_of_squares_result.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [LAPACK: classq](https://netlib.org/lapack/explore-html/d8/d76/group__lassq_gab70baa330cb7a13111b72aef0734e26d.html#gab70baa330cb7a13111b72aef0734e26d)
