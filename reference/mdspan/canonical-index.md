# canonical-index
* [meta exposition-only]
* mdspan[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class IndexType, class S>
constexpr auto canonical-index(S s);
```

## 概要
`canonical-index`は、[`submdspan`](submdspan.md)動作仕様定義で用いられる説明専用の関数テンプレートである。


## 適格要件
`S`が[`integral-constant-like`](/reference/span/integral-constant-like.md)のモデルであるとき、`extents<IndexType>::`[`index-cast`](extents/index-cast.md)`(`[`std::move`](/reference/utility/move.md)`(s))`を`IndexType`型の値として表現できること。


## 事前条件
`extents<IndexType>::`[`index-cast`](extents/index-cast.md)`(`[`std::move`](/reference/utility/move.md)`(s))`を`IndexType`型の値として表現できること。


## 効果
以下と等価

- `S`が[`integral-constant-like`](/reference/span/integral-constant-like.md)のモデルであるとき、`return` [`cw`](/reference/type_traits/constant_wrapper.md.nolink)`<IndexType(S::value)>`
- そうではないとき、`return IndexType(`[`std::move`](/reference/utility/move.md)`(s))`


## バージョン
### 言語
- C++26


## 関連項目
- [`submdspan_canonicalize_slices`](submdspan_canonicalize_slices.md)


## 参照
- [P3663R3 Future-proof `submdspan_mapping`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3663r3.html)
