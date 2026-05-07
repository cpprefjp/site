# submdspan_canonicalize_slices
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class IndexType, size_t... Extents, class... Slices>
  constexpr auto submdspan_canonicalize_slices(
    const extents<IndexType, Extents...>& src, Slices... slices);
}
```
* extents[link extents.md]

## 概要
多次元配列サイズ[`extents`](extents.md)と各次元からの要素取り出し（スライス）情報を正規化する。

各次元からの要素取り出し方式は、[`submdspan`](submdspan.md)を参照のこと。

### `submdspan`スライス型
符号付きもしくは符号なし整数型`IndexType`に対して、下記のうち少なくとも1つを満たすとき、型`S`は`IndexType`の`submdspan`スライス型(`submdspan` slice type)となる。

- [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<S,` [`full_extent_t`](full_extent_t.md)`>`が`true`
- [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<S, IndexType>`が`true`
- `S`が[`strided_slice`](strided_slice.md)の特殊化であり、`X`が`S::offset_type`, `S::extent_type`, `S::stride_type`を表すとき[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<X, IndexType>`がいずれも`true`
- 以下を全て満たす
    - 型`S`のオブジェクト`s`に対して、宣言`auto [...ls] = std::move(s);`が有効
    - `sizeof...(ls)`が`2`に等しい
    - `(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<decltype(std::move(ls)), IndexType> && ...)`が`true`

### 正則`submdspan`スライス型
符号付きもしくは符号なし整数型`IndexType`に対して、型`S`が`IndexType`もしくは値`0`以上の任意の値`v`を保持する[`constant_wrapper<v>`](/reference/type_traits/constant_wrapper.md.nolink)であるとき、型`S`は`IndexType`の正則`submdspan`インデクス型となる。

符号付きもしくは符号なし整数型`IndexType`に対して、下記のうちただ1つだけを満たすとき、型`S`は`IndexType`の正則`submdspan`スライス型(canonical `submdspan` slice type)となる。

- `S`が[`full_extent_t`](full_extent_t.md)
- `S`が`IndexType`の正則`submdspan`インデクス型である
- `S`が[`strided_slice`](strided_slice.md)の特殊化であり、下記を全て満たす
    - `S::offset_type`, `S::extent_type`, `S::stride_type`が、全て`IndexType`の正則`submdspan`インデクス型である
    - `S::stride_type`および`S::extent_type`がいずれも[`constant_wrapper`](/reference/type_traits/constant_wrapper.md.nolink)の特殊化であり、`S::stride_type::value`が`0`より大きい

### 縮約スライス型と`MAP_RANK`
ある型が[`full_extent_t`](full_extent_t.md)ないし[`strided_slice`](strided_slice.md)の特殊化いずれでもないとき、縮約スライス型(collapsing slice type)となる。

パック`p`と整数`i`に対して、説明用の`MAP_RANK(p, i)`を`0 <= j < i`のうち縮約スライス型ではない要素`p...[j]`の個数とする。

### 有効`submdspan`スライス型
[`extents`](extents.md)の特殊化である型`E`に対して、型`S`が`E::index_type`の正則スライス型であり、かつ`E::static_extent(k)`に等しい`x`に対して`x`が`dynamic_extent`に等しいか下記を満たすとき、型`S`は`E`の`k`番目次元の有効`submdspan`スライス型(valid `submdspan` slice type)となる。

- `S`が[`strided_slice`](strided_slice.md)の特殊化であるとき :
    - `S::offset_type`が[`constant_wrapper`](/reference/type_traits/constant_wrapper.md.nolink)の特殊化であるとき、`S::offset_type::value`が`x`以下
    - `S::extent_type`が[`constant_wrapper`](/reference/type_traits/constant_wrapper.md.nolink)の特殊化であるとき、`S::extent_type::value`が`x`以下
    - `S::offset_type`および`S::extent_type`が[`constant_wrapper`](/reference/type_traits/constant_wrapper.md.nolink)の特殊化であるとき、`S::offset_type::value + S::extent_type::value`が`x`以下
- `S`が[`constant_wrapper`](/reference/type_traits/constant_wrapper.md.nolink)の特殊化であるとき、`S::value`が`x`より小さい

### 有効`submdspan`スライス
[`extents`](extents.md)の特殊化である型`E`のオブジェクト`e`と、型`S`のオブジェクト`s`に対して、下記を満たすとき`s`は`e`の`k`番目次元の有効`submdspan`スライス(valid `submdspan` slice)となる。

- `S`が`E`の`k`番目次元の有効`submdspan`スライス型
- `e`の`k`番目区間が、`e`の`k`番目次元に対して`s`の`submdspan`スライス範囲を含む
- `S`が[`strided_slice`](strided_slice.md)の特殊化であるとき :
    - `s.extent`が値`0`以上であり、かつ
    - `s.extent`が値`0`に等しい、もしくは`s.stride`が値`0`より大きい


## テンプレートパラメータ制約
`sizeof...(SliceSpecifiers)`が`sizeof...(Extents)`と等しいこと。


## 適格要件
`src`の各次元インデクス`k`に対して、

- `SliceSpecifiers...[k]`が`IndexType`の`submdspan`スライス型であり、かつ
- `decltype(`[`canonical-slice`](canonical-slice.md)`<IndexType>(slices...[k]))`が[`extents`](extents.md)`<IndexType, Extents...>`のk番目次元の有効`submdspan`スライス型(valid `submdspan` slice type)であること。


## 事前条件
`src`の各次元インデクス`k`に対して、[`canonical-slice`](canonical-slice.md)`<IndexType>(slices...[k])`が`src`のk番目次元の有効`submdspan`スライス(valid `submdspan` slice)であること。


## 戻り値
```cpp
make_tuple(canonical-slice<IndexType>(slices)...)
```
* make_tuple[link /reference/tuple/make_tuple.md]
* canonical-slice[link canonical-slice.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`submdspan`](submdspan.md)


## 参照
- [P3663R3 Future-proof `submdspan_mapping`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3663r3.html)
