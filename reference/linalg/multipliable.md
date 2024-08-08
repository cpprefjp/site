# multipliable
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  constexpr bool multipliable(
    const in-matrix auto& in_mat,
    const in-vector auto& in_vec,
    const in-vector auto& out_vec)
  {
    return out_vec.extent(0) == in_mat.extent(0) &&
           in_mat.extent(1) == in_vec.extent(0);
  } // (1)

  constexpr bool multipliable(
    const in-vector auto& in_vec,
    const in-matrix auto& in_mat,
    const in-vector auto& out_vec)
  {
    return out_vec.extent(0) == in_mat.extent(1) &&
           in_mat.extent(0) == in_vec.extent(0);
  } // (2)

  constexpr bool multipliable(
    const in-matrix auto& in_mat1,
    const in-matrix auto& in_mat2,
    const in-matrix auto& out_mat)
  {
    return out_mat.extent(0) == in_mat1.extent(0) &&
           out_mat.extent(1) == in_mat2.extent(1) &&
           in1_mat.extent(1) == in_mat2.extent(0);
  } // (3)
}
```
* in-vector[link inout-vector.md]
* in-matrix[link inout-matrix.md]

## 概要
テンプレートパラメータに指定されたベクトルや行列が掛けられるかを静的要素数で判定する、説明専用の関数である。


## 戻り値
`InMat`型の変数を`A`, `InVec`型の変数を`x`, `OutVec`型の変数を`y`とする。

- (1): $y \leftarrow Ax$ が可能なら`true`、そうでないなら`false`
- (2): $y^t \leftarrow x^t A$ が可能なら`true`、そうでないなら`false`
- (3): `InMat1`型の変数を`A`, `InMat2`型の変数を`B`, `OutMat`型の変数`C`とすると、$C \leftarrow AB$ が可能なら`true`、そうでないなら`false`


## バージョン
### 言語
- C++26


## 関連項目
- [`mdspan`](/reference/mdspan.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)


