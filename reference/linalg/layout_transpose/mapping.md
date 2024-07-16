# mapping
* linalg[meta header]
* class template[meta id-type]
* std::linalg[meta namespace]
* layout_transpose[meta class]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class Layout>
  class layout_transpose {
    template<class Extents>
    struct mapping;
  };
}
```
* layout_transpose[link ../layout_transpose.md]
* Extents[link /reference/mdspan/extents.md]

## 概要
`layout_transpose::mapping`は、任意の[レイアウトマッピングポリシー](/reference/mdspan/LayoutMappingPolicy.md)に対して行列転置操作を行った[レイアウトマッピング](/reference/mdspan/LayoutMapping.md)を表現するクラスである。

### 説明専用メンバ
説明専用メンバ型`nested-mapping-type`を`Layout::mapping<`[`transpose-extents-t`](transpose-extents.md)`<Extents>>`とする。

`layout_transpose::mapping`クラステンプレートは、下記の説明専用メンバ変数を保持する。

- `nested-mapping_` : `nested-mapping-type`型の入れ子[レイアウトマッピング](/reference/mdspan/LayoutMapping.md)
- `extents_` : `extents_type`型の[多次元配列サイズ情報](/reference/mdspan/extents.md)


## 適格要件
- `Extents`は[`extents`](/reference/mdspan/extents.md)の特殊化であること
- [`Extents::rank()`](/reference/mdspan/extents/rank.md) `== 2`


## メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](mapping/op_constructor.md) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |

### 観測

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `extents` | 多次元配列のサイズ`extents_`を取得する | C++26 |
| `required_span_size` | `nested-mapping_.required_span_size()` | C++26 |
| [`operator()`](mapping/op_call.md) | 多次元配列インデクスから要素位置へ変換する | C++26 |
| `nested_mapping` | 入れ子レイアウトマッピング`nested-mapping_`を取得する　| C++26 |
| [`stride`](mapping/stride.md) | 指定次元のストライド幅を取得する | C++26 |
| `is_unique`     | `nested-mapping_.is_unique()` | C++26 |
| `is_exhaustive` | `nested-mapping_.is_exhaustive()` | C++26 |
| `is_strided`    | `nested-mapping_.is_strided()` | C++26 |


## 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `is_always_unique`     | `nested-mapping-type::is_always_unique` | C++26 |
| `is_always_exhaustive` | `nested-mapping-type::is_always_exhaustive` | C++26 |
| `is_always_strided`    | `nested-mapping-type::is_always_strided` | C++26 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `extents_type` | [`Extents`](/reference/mdspan/extents.md) | C++26 |
| `index_type` | [`Extents::index_type`](/reference/mdspan/extents.md) | C++26 |
| `size_type` | [`Extents::size_type`](/reference/mdspan/extents.md) | C++26 |
| `rank_type` | [`Extents::rank_type`](/reference/mdspan/extents.md) | C++26 |
| `layout_type` | [`layout_transpose`](../layout_transpose.md) | C++26 |


## 非メンバ（*Hidden friends*）関数
### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`operator==`](mapping/op_equal.md) | 等値比較 | C++26 |
| [`operator!=`](mapping/op_equal.md) | 非等値比較 (`==`により使用可能) | C++26 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
