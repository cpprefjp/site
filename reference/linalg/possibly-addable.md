# possibly-addable
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<in-vector In1, in-vector In2, in-vector Out>
  constexpr bool possibly-addable()
  {
    return compatible-static-extents<Out, In1>(0, 0) &&
           compatible-static-extents<Out, In2>(0, 0) &&
           compatible-static-extents<In1, In2>(0, 0);
  }   // (1)

  template<in-matrix In1, in-matrix In2, in-matrix Out>
  constexpr bool possibly-addable()
  {
    return compatible-static-extents<Out, In1>(0, 0) &&
           compatible-static-extents<Out, In1>(1, 1) &&
           compatible-static-extents<Out, In2>(0, 0) &&
           compatible-static-extents<Out, In2>(1, 1) &&
           compatible-static-extents<In1, In2>(0, 0) &&
           compatible-static-extents<In1, In2>(1, 1);
  }   // (2)
}
```
* in-vector[link inout-vector.md]
* in-matrix[link inout-matrix.md]

## 概要
テンプレートパラメータに指定されたベクトルまたは行列の次元が同じかどうかを静的要素数で判定する、説明専用の関数である。


## 戻り値
`In1`、`In2`、`Out`の各次元の静的要素数が同じ場合`true`を返す。そうでない場合は、`false`を返す。

- (1): ベクトル
- (2): 行列


## バージョン
### 言語
- C++26


## 関連項目
- [`mdspan`](/reference/mdspan.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
