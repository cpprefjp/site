# AccessorPolicy
* cpp23[meta cpp]
* mdspan[meta header]
* named requirement[meta id-type]
* [meta namespace]


## 概要
AccessorPolicyは、多次元配列ビュー[`mdspan`](mdspan.md)を介した要素アクセス動作を定義するクラスが満たすべき要件である。


## 要件
AccessorPolicyを満たす型`A`は

- `A`は[`copyable`](/reference/concepts/copyable.md)のモデルであり、かつ
- [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<A>`は`true`であり、かつ
- [`is_nothrow_move_assignable_v`](/reference/type_traits/is_nothrow_move_assignable.md)`<A>`は`true`であり、かつ
- [`is_nothrow_swappable_v`](/reference/type_traits/is_nothrow_swappable.md)`<A>`は`true`であること

型`A`は下記のメンバ型を持つこと

- `A::element_type` : 要素型
- `A::data_handle_type` : メモリブロックのポインタ型
- `A::reference` : 要素への参照型
- `A::offset_policy` : `offset`適用後のアクセサポリシー

説明用の変数`a`を`(const) A`の値、`p`を`(const) A::data_handle_type`の値、`i`を`size_t`の値としたとき、下記の式が妥当であること

- `a.access(p, i)` : `A::reference`を返す
- `a.offset(p, i)` : `A::offset_policy::data_handle_type`を返す


## `AccessorPolicy`に該当する型

- [`<mdspan>`](/reference/mdspan.md)ヘッダ
    - C++23 [`default_accessor`](default_accessor.md)
    - C++26 [`aligned_accessor`](aligned_accessor.md)
- [`<linalg>`](/reference/linalg.md)ヘッダ
    - C++26 [`scaled_accessor`](/reference/linalg/scaled_accessor.md)
    - C++26 [`conjugated_accessor`](/reference/linalg/conjugated_accessor.md)


## バージョン
### 言語
- C++23


## 関連項目
- [`mdspan`](mdspan.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [P2604R0 `mdspan`: rename `pointer` and `contiguous`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2604r0.html)
