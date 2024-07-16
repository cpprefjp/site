# conjugated_accessor
* linalg[meta header]
* class template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template< class NestedAccessor>
  class conjugated_accessor;
}
```
* NestedAccessor[link /reference/mdspan/AccessorPolicy.md]

## 概要
`conjugated_accessor`は、多次元配列ビュー[`mdspan`](/reference/mdspan/mdspan.md)の全要素を複素共役した多次元配列ビューを表現する[アクセサポリシー](/reference/mdspan/AccessorPolicy.md)クラスである。

`conjugated_accessor`クラステンプレートは、複素共役操作[`conjugated`](conjugated.md)の戻り値型として利用される。
戻り値`mdspad`の要素型は読み取り専用となる。

### 説明専用メンバ
`conjugated_accessor`クラステンプレートは、下記の説明専用メンバ変数を保持する。

- `nested-accessor_` : `NestedAccessor`型の入れ子アクセサポリシー


## 適格要件
- `element_type`が適格な型であること
- [`is_copy_constructible_v`](/reference/type_traits/is_copy_constructible.md)`<reference> == true`
- [`is_reference_v`](/reference/type_traits/is_reference.md)`<element_type> == false`
- `NestedAccessor`が[アクセサポリシー](/reference/mdspan/AccessorPolicy.md)要件を満たす


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`(constructor)`](conjugated_accessor/op_constructor.md) | コンストラクタ | C++26 |
| `(destructor)` | デストラクタ | C++26 |
| [`access`](conjugated_accessor/access.md) | 指定オフセット位置にある要素へアクセスする | C++26 |
| [`offset`](conjugated_accessor/offset.md) | 指定オフセット位置のハンドルを取得する | C++26 |
| `nested_accessor` | 入れ子アクセサポリシー`nested-accessor_`を取得する | C++26 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `element_type` | [`add_const_t`](/reference/type_traits/add_const.md)`<decltype(`[`conj-if-needed`](conj-if-needed.md)`(declval<NestedAccessor::element_type>()))>` | C++26 |
| `reference` | [`remove_const_t`](/reference/type_traits/remove_const.md)`<element_type>` | C++26 |
| `data_handle_type` | `NestedAccessor::data_handle_type` | C++26 |
| `offset_policy` | `conjugated_accessor<NestedAccessor::offset_policy>` | C++26 |


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
- [`conjugated`](conjugated.md)
- [`conjugate_transposed`](conjugate_transposed.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [P1674R2: Evolving a Standard C++ Linear Algebra Library from the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1674r2.html)
