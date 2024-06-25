# dot

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
  Scalar dot(InVec1 v1,
             InVec2 v2,
             Scalar init); // (1)

  template<class ExecutionPolicy,
           in-vector InVec1,
           in-vector InVec2,
           class Scalar>
  Scalar dot(ExecutionPolicy&& exec,
             InVec1 v1,
             InVec2 v2,
             Scalar init); // (2)

  template<in-vector InVec1,
           in-vector InVec2>
  auto dot(InVec1 v1,
           InVec2 v2); // (3)

  template<class ExecutionPolicy,
           in-vector InVec1,
           in-vector InVec2>
  auto dot(ExecutionPolicy&& exec,
           InVec1 v1,
           InVec2 v2); // (4)
}
```

## 概要
2つのベクトル`v1`、`v2`の内積を計算する。


## 適格要件
2つのベクトルの静的な要素数が同じであること。

- [`compatible-static-extents`](compatible-static-extents.md)`<InVec1, InVec2>(0, 0) == true`


## 事前条件
2つのベクトルの次元が同じであること。

- `v1.extent(0) == v2.extent(0)`


## 効果
- (1), (2): なし
- (3), (4): `T`を各ベクトルの値型の積の型`decltype(declval<typename InVec1::value_type>() * declval<typename InVec2::value_type>())`とする。
  + (3): `dot(v1, v2, T{})`を返す。
  + (4): `dot(std::forward<ExecutionPolicy>(exec), v1, v2, T{})`を返す。


## 戻り値
2つのベクトルの次元を`N`とする。

- (1): もし`N`が0なら`init`を返す。そうでない場合は、共役を取らない内積、つまり以下の式の`Scalar`型の値を返す。

$$
\verb|init| + \sum_{i = 0}^{N - 1} \verb|v1|[i] * \verb|v2|[i]
$$

- (2): (1)の並列アルゴリズム版。
- (3): (1)の`init`を和の各項の型のデフォルト値に置き換えて計算する。
- (4): (3)の並列アルゴリズム版。


## 備考
- (1), (2): もし`InVec1::value_type`、`InVec2::value_type`、`Scalar`が全て浮動小数点数型または`std::complex`の特殊化で、`Scalar`が`InVec1::value_type`と`InVec2::value_type`より精度が高い場合、和の各項は`Scalar`またはより高い精度の型が使われる。


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
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [`LAPACK: cdotu`](https://netlib.org/lapack/explore-html/d1/dcc/group__dot_ga2cce681b6aed3728b893a555b3bee55c.html#ga2cce681b6aed3728b893a555b3bee55c)
