# last_
* mdspan[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<size_t k, class Extents, class ... SliceSpecifiers>
constexpr auto last_(const Extents& src, SliceSpecifiers... slices);
```
* Extents[link extents.md]

## 概要
`last_`は[`submdspan`](submdspan.md)動作説明用の関数テンプレートである。

`index_type`を`Extents::index_type`型、`S_k`を`SliceSpecifiers`の`k`番目の型、`s_k`を`slices`の`k`番目の値としたとき、説明用の`L_k`の値を次のように定義する。

- 型`S_k`が[`convertible_to`](/reference/concepts/convertible_to.md)`<index_type>`のモデルのとき[`de-ice`](de-ice.md)`(s_k) + 1`、そうでなければ
- 型`S_k`が[`index-pair-like`](index-pair-like.md)`<index_type>`のモデルのとき`get<1>(s_k)`、そうでなければ
- 型`S_k`が[`strided_slice`](strided_slice.md)の特殊化のとき[`de-ice`](de-ice.md)`(s_k.offset) +` [`de-ice`](de-ice.md)`(s_k.extent)`、そうでなければ
- `src.`[`extent`](extents/extent.md)`(k)`


## 適格要件
`Extents`が[`extents`](extents.md)の特殊化であること。


## 事前条件
`L_k`が`index_type`型で表現可能な値であること。


## 戻り値
[`extents`](extents.md)`<IndexType>::`[`index-cast`](extents/index-cast.md)`(L_k)`


## バージョン
### 言語
- C++26


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
