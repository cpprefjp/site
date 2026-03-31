# submdspan_mapping
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* layout_left::mapping[meta class]
* cpp26[meta cpp]

```cpp
template<class... SliceSpecifiers>
constexpr auto submdspan-mapping-impl(  // exposition only
  SliceSpecifiers... slices) const -> see below;

template<class... SliceSpecifiers>
friend constexpr auto submdspan_mapping(
  const mapping& src, SliceSpecifiers... slices)
{
  return src.submdspan-mapping-impl(slices...);
}
```
* submdspan-mapping-impl[italic]

## 概要
[`submdspan`](../../submdspan.md)関数をサポートするためのカスタマイゼーションポイント。


## テンプレートパラメータ制約
`sizeof...(SliceSpecifiers)`が[`Extents::rank()`](../../extents/rank.md)と等しいこと。


## 適格要件
`extents()`の各次元インデクス`k`において、`SliceSpecifiers...[k]`が`Extents`のk番目次元の[有効`submdspan`スライス型(valid `submdspan` slice type)](../../submdspan_canonicalize_slices.md)であること。


## 事前条件
`extents()`の各次元インデクス`k`において、`slices...[k]`が`extents()`のk番目次元の有効スライスであること。


## 戻り値
説明用の値や型を次の通り定義する。

- 値`sub_ext` : 式[`submdspan_extents`](../../submdspan_extents.md)`(extents(), slices...)`の結果
- 型`SubExtents` : `decltype(sub_ext)`
- 値`sub_strides` : `slices...[k]`の型が縮約スライス型(collapsing slice type)ではない`extents()`の各次元インデクス`k`において`sub_strides[MAP_RANK(slices, k)]`が下記を満たす、[`array`](/reference/array/array.md)`<SubExtents::index_type,` [`SubExtents::rank()`](../../extents/rank.md)`>`型の配列値
    - 説明用の`s`を`slices...[k]`としたとき、`s`の型が[`strided_slice`](../../strided_slice.md)の特殊化かつ`s.stride < s.extent`の場合、[`stride(k)`](stride.md) `* s.stride`
    - そうでなければ、[`stride(k)`](stride.md)
- パック`ls` : `extents()`の次元`r`に対して、`r`番目の要素が`slices...[r]`の`submdspan`スライス範囲の下限に等しい`index_type`型の値パック
- 値`offset` : `extents()`における任意の次元インデクス`k`に対して`ls...[k]`が`extents().extent(k)`と等しいとき、`required_span_size()`に等しい`size_t`型の値。そうでなければ、[`operator()`](op_call.md)に等しい`size_t`型の値。

下記を満たす型`S`を、単位ストライド幅スライス型と定義する。

- `S`が[`strided_slice`](../../strided_slice.md)の特殊化であり、`S::stride_type`が[`constant_wrapper`](/reference/type_traits/constant_wrapper.md.nolink)の特殊化かつ`S::stride_type::value`が`1`、または
- `S`が[`full_extent_t`](../../full_extent_t.md)

説明専用の`submdspan-mapping-impl`関数テンプレートは下記の値を返す。

- [`Extents::rank()`](../../extents/rank.md) `== 0`のとき、[`submdspan_mapping_result`](../../submdspan_mapping_result.md)`{*this, 0}`
- `SubExtents::rank() == 0`のとき、[`submdspan_mapping_result`](../../submdspan_mapping_result.md)`{`[`layout_left::mapping`](../../layout_left.md)`(sub_ext), offset}`
- 以下を満たすとき、[`submdspan_mapping_result`](../../submdspan_mapping_result.md)`{`[`layout_left::mapping`](../../layout_left.md)`(sub_ext), offset}`
    - 半開区間`[0, SubExtents::rank()-1)`の値`k`に対して、`SliceSpecifiers...[k]`が[`full_extent_t`](../../full_extent_t.md)を表し、かつ
    - `SubExtents::rank()-1`に等しい値`k`に対して、`SliceSpecifiers...[k]`が単位ストライド幅スライス型である
- 以下を満たすとき、[`submdspan_mapping_result`](../../submdspan_mapping_result.md)`{`[`layout_left_padded<S_static>::mapping`](../../layout_left_padded/mapping.md)`(sub_ext, stride(u + 1)), offset}`
    - `SliceSpecifiers...[p]`が単位ストライド幅スライス型となる`0`より大きい最小値`p`に対して、`u+1`が`p`となる値`u`を用いて
        - 型`SliceSpecifiers...[0]`が単位ストライド幅スライス型であり、かつ
        - 半開区間`[u+1, u+SubExtents::rank()-1)`の値`k`に対して、`SliceSpecifiers...[k]`が[`full_extent_t`](../../full_extent_t.md)を表し、かつ
        - `u+SubExtents::rank()-1`に等しい値`k`に対して、`SliceSpecifiers...[k]`が単位ストライド幅スライス型である
    - ここで定数`S_static`は
        - 半開区間`[0, u+1)`のいずれかの値`k`に対して`static_extent(k)`が[`dynamic_extent`](/reference/span/dynamic_extent.md)のとき、`dynamic_extent`
        - そうでなければ、半開区間`[0, u+1)`の全ての値`k`に対して`static_extent(k)`を乗算した値
- [`submdspan_mapping_result`](../../submdspan_mapping_result.md)`{`[`layout_stride::mapping`](../../layout_stride.md)`(sub_ext, sub_strides), offset}`


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`submdspan`](../../submdspan.md)


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
- [P2642R6 Padded mdspan layouts](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2642r6.pdf)
- [P3355R1 Fix submdspan for C++26](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3355r1.html)
- [P3663R3 Future-proof `submdspan_mapping`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3663r3.html)
