# src-indices
* mdspan[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class IndexType, size_t N, class ... SliceSpecifiers>
constexpr array<IndexType, sizeof...(SliceSpecifiers)>
  src-indices(const array<IndexType, N>& indices, SliceSpecifiers ... slices);
```
* array[link /reference/array/array.md]

## 概要
`src-indices`は[`submdspan`](submdspan.md)動作説明用の関数テンプレートである。

説明のため`rank`を`slices`の要素数、`S_k`を`SliceSpecifiers`の`k`番目の型とする
[`array`](/reference/array/array.md)`<size_t, rank>`型の配列`map-rank`を導入し、その要素`map-rank[k]`を下記の通り定義する。

- 型`S_k`が[`convertible_to`](/reference/concepts/convertible_to.md)`<IndexType>`のモデルのとき[`dynamic_extent`](/reference/span/dynamic_extent.md)、そうでなければ
- `j < k`において型`S_j`が[`convertible_to`](/reference/concepts/convertible_to.md)`<IndexType>`のモデルではない個数


## 適格要件
`IndexType`は符号付き整数型または符号無し整数型であること。


## 戻り値
半開区間`[0, rank)`の`k`に対して、`k`番目の要素が下記の値を持つ配列を返す。

- `map-rank[k]`が[`dynamic_extent`](/reference/span/dynamic_extent.md)に等しいとき、[`first_`](first_.md)`<IndexType, k>(slices...)`
- そうでなければ、[`first_`](first_.md)`<IndexType, k>(slices...) + indices[map-rank[k]]`


## バージョン
### 言語
- C++26


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
