# canonical-slice
* [meta exposition-only]
* mdspan[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class IndexType, class S>
constexpr auto canonical-slice(S s);
```

## 概要
`canonical-slice`は、[`submdspan`](submdspan.md)動作仕様定義で用いられる説明専用の関数テンプレートである。


## 適格要件
`S`が`IndexType`の[`submdspan`スライス型](canonical_slices.md)であること。


## 効果
以下と等価

```cpp
if constexpr (is_convertible_v<S, full_extent_t>) {
  return static_cast<full_extent_t>(std::move(s));
} else if constexpr (is_convertible_v<S, IndexType>) {
  return canonical-index<IndexType>(std::move(s));
} else if constexpr (is-extent-slice<S>) {
  return extent_slice{
    .offset = canonical-index<IndexType>(std::move(s.offset)),
    .extent = canonical-index<IndexType>(std::move(s.extent)),
    .stride = canonical-index<IndexType>(std::move(s.stride))
  };
} else if constexpr (is-range-slice<S>) {
  auto c_first = canonical-index<IndexType>(std::move(s.first));
  auto c_last  = canonical-index<IndexType>(std::move(s.last));
  return canonical-range-slice<IndexType>(
    c_first,
    canonical-index<IndexType>(c_last - c_first),
    canonical-index<IndexType>(std::move(s.stride)));
} else {
  auto [s_first, s_last] = std::move(s);
  auto c_first = canonical-index<IndexType>(std::move(s_first));
  auto c_last  = canonical-index<IndexType>(std::move(s_last));
  return canonical-range-slice<IndexType>(
    c_first,
    canonical-index<IndexType>(c_last - c_first));
}
```
* full_extent_t[link full_extent_t.md]
* extent_slice[link extent_slice.md]
* canonical-index[link canonical-index.md]
* canonical-range-slice[link canonical-range-slice.md]
* is_convertible_v[link /reference/type_traits/is_convertible.md]
* std::move[link /reference/utility/move.md]

ここで`is-extent-slice`は型`S`が[`extent_slice`](extent_slice.md)の特殊化であることを、`is-range-slice`は型`S`が[`range_slice`](range_slice.md)の特殊化であることを表す説明専用コンセプトとする。


## バージョン
### 言語
- C++26


## 関連項目
- [`canonical_slices`](canonical_slices.md)
- [`canonical-range-slice`](canonical-range-slice.md)


## 参照
- [P3663R3 Future-proof `submdspan_mapping`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3663r3.html)
- [P3982R2 Split `strided_slice` into `extent_slice` and `range_slice` for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3982r2.html)
    - C++26のリリース前に、[`extent_slice`](extent_slice.md)の`extent`メンバ変数が取り出す要素数を表すようになったことで、要素数の計算は[`canonical-range-slice`](canonical-range-slice.md)へ委譲されるようになった。あわせて[`range_slice`](range_slice.md)の変換が追加された
