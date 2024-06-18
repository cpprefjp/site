# vector_two_norm

* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-vector InVec,
           class Scalar>
  Scalar vector_two_norm(InVec v,
                         Scalar init); // (1)

  template<class ExecutionPolicy,
           in-vector InVec,
           class Scalar>
  Scalar vector_two_norm(ExecutionPolicy&& exec,
                         InVec v,
                         Scalar init); // (2)
}
```


## 概要
ベクトルのユークリッドノルムを計算する。

- (1): 逐次実行する。
- (2): 指定された実行ポリシーに応じて実行する。


## 適格要件
- `decltype(init + `[`abs-if-needed`](abs-if-needed.md)`(declval<typename InVec::value_type>()) * abs-if-needed(declval<typename InVec::value_type>()))`が`Scalar`に変換可能。


## 戻り値
`n`を`v`の次元とすると、

$$
\sqrt{\sum_{i = 0}^{n - 1} |\verb|v[|i\verb|]||^2 + \verb|init|^2}
$$

を返す。


## 備考
- `init.scaled_sum_of_squares`は0以上でなければならない。
- もし`InVec::value_type`と`Scalar`がどちらも浮動小数点数型または`std::complex`の特殊化で、`Scalar`が`InVec::value_type`より精度が高い場合、和の各項は`Scalar`またはより高い精度の型が使われる。


## 例


### 出力


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
- [P0788R3 Standard Library Specification in a Concepts and Contracts World](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0788r3.pdf)
- [LAPACK: dnrm2](https://netlib.org/lapack/explore-html/d1/d2a/group__nrm2_gab5393665c8f0e7d5de9bd1dd2ff0d9d0.html#gab5393665c8f0e7d5de9bd1dd2ff0d9d0)

