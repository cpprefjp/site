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
`S`が`IndexType`の[`submdspan`スライス型](submdspan_canonicalize_slices.md)であること。


## 効果
以下と等価

```cpp
if constexpr (is_convertible_v<S, full_extent_t>) {
  return static_cast<full_extent_t>(std::move(s));
} else if constexpr (is_convertible_v<S, IndexType>) {
  return canonical-index<IndexType>(std::move(s));
} else if constexpr (is-strided-slice<S>) {
  auto c_extent = canonical-index<IndexType>(std::move(s.extent));
  auto c_offset = canonical-index<IndexType>(std::move(s.offset));
  if constexpr (is_same_v<decltype(c_extent), constant_wrapper<IndexType(0)>>) {
    return strided_slice{
      .offset = c_offset,
      .extent = c_extent,
      .stride = cw<IndexType(1)>
    };
  } else {
    return strided_slice{
      .offset = c_offset,
      .extent = c_extent,
      .stride = canonical-index<IndexType>(std::move(s.stride))
    };
  }
} else {
  auto [s_first, s_last] = std::move(s);
  auto c_first = canonical-index<IndexType>(std::move(s_first));
  auto c_last  = canonical-index<IndexType>(std::move(s_last));
  return strided_slice{
    .offset = c_first,
    .extent = canonical-index<IndexType>(c_last - c_first),
    .stride = cw<IndexType(1)>
  };
}
```
* full_extent_t[link full_extent_t.md]
* strided_slice[link strided_slice.md]
* canonical-index[link canonical-index.md]
* is_convertible_v[link /reference/type_traits/is_convertible.md]
* is_same_v[link /reference/type_traits/is_same.md]
* constant_wrapper[link /reference/type_traits/constant_wrapper.md.nolink]
* cw[link /reference/type_traits/constant_wrapper.md.nolink]
* std::move[link /reference/utility/move.md]

ここで`is-strided-slice`は、型`S`が[`strided_slice`](strided_slice.md)の特殊化であることを表す説明専用コンセプトとする。


## バージョン
### 言語
- C++26


## 関連項目
- [`submdspan_canonicalize_slices`](submdspan_canonicalize_slices.md)


## 参照
- [P3663R3 Future-proof `submdspan_mapping`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3663r3.html)
