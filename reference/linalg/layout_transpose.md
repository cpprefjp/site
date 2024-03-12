# layout_transpose
* linalg[meta header]
* class template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class Layout>
  class layout_transpose;
}
```

## 概要
`layout_transpose`は、多次元配列ビュー[`mdspan`](/reference/mdspan/mdspan.md)を用いた行列(matrix)において、転置行列を表現する[レイアウトマッピングポリシー](/reference/mdspan/LayoutMappingPolicy.md)クラスである。

`layout_transpose`クラステンプレートは、行列転置操作[`transposed`](transposed.md)の戻り値型として利用される。


## 適格要件
`Layout`は[レイアウトマッピングポリシー要件](/reference/mdspan/LayoutMappingPolicy.md)を満たすこと。


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `nested_layout_type` | `Layout` | C++26 |
| [`mapping`](layout_transpose/mapping.md) | レイアウトマッピング (class template) | C++26 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`mdspan`](/reference/mdspan/mdspan.md)
- [`transposed`](transposed.md)
- [`conjugate_transposed`](conjugate_transposed.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [P1674R2: Evolving a Standard C++ Linear Algebra Library from the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1674r2.html)
