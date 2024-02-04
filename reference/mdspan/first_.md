# first_
* mdspan[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class IndexType, size_t k, class ... SliceSpecifiers>
constexpr IndexType first_(SliceSpecifiers... slices);
```

## 概要
`first_`は[`submdspan`](submdspan.md)動作説明用の関数テンプレートである。

`S_k`を`SliceSpecifiers`の`k`番目の型、`s_k`を`slices`の`k`番目の値としたとき、説明用の`P_k`の値を次のように定義する。

- 型`S_k`が[`convertible_to`](/reference/concepts/convertible_to.md)`<index_type>`のモデルのとき`s_k`、そうでなければ
- 型`S_k`が[`index-pair-like`](index-pair-like.md)`<index_type>`のモデルのとき`get<0>(s_k)`、そうでなければ
- 型`S_k`が[`strided_slice`](strided_slice.md)の特殊化のとき[`de-ice`](de-ice.md)`(s_k.offset)`、そうでなければ
- 値`0`


## 適格要件
`IndexType`は符号付き整数型または符号無し整数型であること。


## 事前条件
`P_k`が`IndexType`型で表現可能な値であること。


## 戻り値
[`extents`](extents.md)`<IndexType>::`[`index-cast`](extents/index-cast.md)`(P_k)`


## バージョン
### 言語
- C++26


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
