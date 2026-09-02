# canonical_slices
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class IndexType, size_t... Extents, class... Slices>
  constexpr auto canonical_slices(
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
- `S`が[`extent_slice`](extent_slice.md)の特殊化であり、`X`が`S::offset_type`, `S::extent_type`, `S::stride_type`を表すとき[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<X, IndexType>`がいずれも`true`
- `S`が[`range_slice`](range_slice.md)の特殊化であり、`X`がメンバ変数`S::first`, `S::last`, `S::stride`の型を表すとき[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<X, IndexType>`がいずれも`true`
- 以下を全て満たす
    - 型`S`のオブジェクト`s`に対して、宣言`auto [...ls] = std::move(s);`が有効
    - `sizeof...(ls)`が`2`に等しい
    - `(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<decltype(std::move(ls)), IndexType> && ...)`が`true`

### 正則`submdspan`スライス型
符号付きもしくは符号なし整数型`IndexType`に対して、型`S`が`IndexType`もしくは値`0`以上の任意の値`v`を保持する[`constant_wrapper<v>`](/reference/utility/constant_wrapper.md)であるとき、型`S`は`IndexType`の正則`submdspan`インデクス型となる。

符号付きもしくは符号なし整数型`IndexType`に対して、下記のうちただ1つだけを満たすとき、型`S`は`IndexType`の正則`submdspan`スライス型(canonical `submdspan` slice type)となる。

- `S`が[`full_extent_t`](full_extent_t.md)
- `S`が`IndexType`の正則`submdspan`インデクス型である
- `S`が[`extent_slice`](extent_slice.md)の特殊化であり、下記を全て満たす
    - `S::offset_type`, `S::extent_type`, `S::stride_type`が、全て`IndexType`の正則`submdspan`インデクス型である
    - `S::stride_type`および`S::extent_type`がいずれも[`constant_wrapper`](/reference/utility/constant_wrapper.md)の特殊化であるとき、`S::stride_type::value`が`0`より大きい

### 縮約スライス型と`MAP_RANK`
ある型が[`full_extent_t`](full_extent_t.md)ないし[`extent_slice`](extent_slice.md)の特殊化いずれでもないとき、縮約スライス型(collapsing slice type)となる。

パック`p`と整数`i`に対して、説明用の`MAP_RANK(p, i)`を`0 <= j < i`のうち縮約スライス型ではない要素`p...[j]`の個数とする。

### `submdspan`スライス範囲
[`extents`](extents.md)の特殊化である型`E`のオブジェクト`e`と、`E::index_type`の正則`submdspan`スライス型である型`S`のオブジェクト`s`に対して、`e`の`k`番目次元に対する`s`の`submdspan`スライス範囲(`submdspan` slice range)は下記の半開区間となる。

- `S`が[`full_extent_t`](full_extent_t.md)のとき、`[0,` [`e.extent`](extents/extent.md)`(k))`
- `S`が[`extent_slice`](extent_slice.md)の特殊化であり、`E::index_type(s.extent)`が`0`のとき、`[E::index_type(s.offset), E::index_type(s.offset))`、そうでなければ、
- `S`が[`extent_slice`](extent_slice.md)の特殊化のとき、`[E::index_type(s.offset), E::index_type(s.offset + 1 + (s.extent - 1) * s.stride))`、そうでなければ、
- `[E::index_type(s), E::index_type(s) + 1)`


### 有効`submdspan`スライス型
[`extents`](extents.md)の特殊化である型`E`に対して、型`S`が`E::index_type`の正則スライス型であり、かつ`E::static_extent(k)`に等しい`x`に対して`x`が`dynamic_extent`に等しいか下記を満たすとき、型`S`は`E`の`k`番目次元の有効`submdspan`スライス型(valid `submdspan` slice type)となる。

- `S`が[`extent_slice`](extent_slice.md)の特殊化であるとき、`o`, `e`, `t`を下記のように定めて :
    - `o`が`x`以下
    - `e`が`x`以下
    - `e`が`1`より大きいとき、`t`が`0`より大きい
    - `e`が`0`より大きいとき、`o + 1 + (e - 1) * t`が`x`以下

    ここで`o`は、`S::offset_type`が[`constant_wrapper`](/reference/utility/constant_wrapper.md)の特殊化であれば`S::offset_type::value`、そうでなければ`0`とする。`e`は、`S::extent_type`が[`constant_wrapper`](/reference/utility/constant_wrapper.md)の特殊化であれば`S::extent_type::value`、そうでなければ`0`とする。`t`は、`S::stride_type`が[`constant_wrapper`](/reference/utility/constant_wrapper.md)の特殊化であれば`S::stride_type::value`、そうでなければ`1`とする。
- `S`が[`constant_wrapper`](/reference/utility/constant_wrapper.md)の特殊化であるとき、`S::value`が`x`より小さい

### 有効`submdspan`スライス
[`extents`](extents.md)の特殊化である型`E`のオブジェクト`e`と、型`S`のオブジェクト`s`に対して、下記を満たすとき`s`は`e`の`k`番目次元の有効`submdspan`スライス(valid `submdspan` slice)となる。

- `S`が`E`の`k`番目次元の有効`submdspan`スライス型
- `e`の`k`番目区間が、`e`の`k`番目次元に対して`s`の`submdspan`スライス範囲を含む
- `S`が[`extent_slice`](extent_slice.md)の特殊化であるとき :
    - `s.extent`が値`0`以上であり、かつ
    - `s.extent`が値`2`より小さい、もしくは`s.stride`が値`0`より大きい


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
- [GCC](/implementation.md#gcc): 17 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`submdspan`](submdspan.md)


## 参照
- [P3663R3 Future-proof `submdspan_mapping`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3663r3.html)
- [LWG Issue 4491. Rename `submdspan_extents` and `submdspan_canonicalize_slices`](https://cplusplus.github.io/LWG/issue4491)
    - この関数はC++26のリリース前に`submdspan_canonicalize_slices`から`canonical_slices`へ改名された
- [P3982R2 Split `strided_slice` into `extent_slice` and `range_slice` for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3982r2.html)
    - C++26のリリース前に、`strided_slice`が[`extent_slice`](extent_slice.md)へ改名されて`extent`メンバ変数の意味が変更され、[`range_slice`](range_slice.md)が`submdspan`スライス型として追加された。これにともない、`submdspan`スライス範囲・有効`submdspan`スライス型・有効`submdspan`スライスの規定が更新された
