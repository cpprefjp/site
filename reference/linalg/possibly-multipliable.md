# possibly-multipliable
* [mathjax enable]
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-matrix InMat, in-vector InVec, in-vector OutVec>
  constexpr bool possibly-multipliable()
  {
    return compatible-static-extents<OutVec, InMat>(0, 0) &&
           compatible-static-extents<InMat, InVec>(1, 0);
  } // (1)

  template<in-vector InVec, in-matrix InMat, in-vector OutVec>
  constexpr bool possibly-multipliable()
  {
    return compatible-static-extents<OutVec, InMat>(0, 1) &&
           compatible-static-extents<InMat, InVec>(0, 0);
  } // (2)

  template<in-matrix InMat1, in-matrix InMat2, in-matrix OutMat>
  constexpr bool possibly-multipliable()
  {
    return compatible-static-extents<OutMat, InMat1>(0, 0) &&
           compatible-static-extents<OutMat, InMat2>(1, 1) &&
           compatible-static-extents<InMat1, InMat2>(1, 0);
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


