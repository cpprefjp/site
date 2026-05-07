# sliceable-mapping
* [meta exposition-only]
* mdspan[meta header]
* concept[meta id-type]
* cpp26[meta cpp]

```cpp
template<class LayoutMapping>
concept sliceable-mapping = see below;
```

## 概要
`sliceable-mapping`は、[`submdspan`](submdspan.md)動作仕様定義で用いられる説明専用のコンセプトである。

説明用の`lm`を`LayoutMapping`型のオブジェクト、`fe`を`sizeof...(fe) == LayoutMapping::extents_type::rank()`が`true`となる[`full_extent_t`](full_extent_t.md)型オブジェクトのパックとする。下記を満たすとき、型`LayoutMapping`は`sliceable-mapping`を満たす。

- 評価されないオペランドとして扱われるとき式`submdspan_mapping(lm, fe...)`が適格であり、かつ
- その式の型が[`submdspan_mapping_result`](submdspan_mapping_result.md)の特殊化であること。

型`LayoutMapping`がスライス可能レイアウトマッピング(sliceable layout mapping)要件を満たすとき、型`LayoutMapping`は`sliceable-mapping`のモデルである。

### スライス可能レイアウトマッピング要件
下記の説明用エンティティを定義する。

- 型`M` : [レイアウトマッピング](LayoutMapping.md)クラス
- 型`IT` : `M::extents_type::index_type`
- 値`m` : （const修飾された）`M`型の値
- 値`M_rank` : `M::extents_type::rank()`
- オブジェクトのパック`valid_slices` : `sizeof...(valid_slices) == M_rank`であり、`m.extents()`の各次元インデクス`i`に対して`valid_slices...[i]`が`m.extents()`の`i`番目次元の有効な`submdspan`スライス
- オブジェクトのパック`invalid_slices` : `sizeof...(invalid_slices) == M_rank`であり、`invalid_slices...[k]`のcv非修飾型が下記いずれでもない整数`k`が存在する
    - 型`IT`
    - [`full_extent_t`](full_extent_t.md)
    - [`constant_wrapper`](/reference/type_traits/constant_wrapper.md.nolink)の特殊化
    - [`strided_slice`](strided_slice.md)の特殊化

下記を満たすとき、型`M`はスライス可能レイアウトマッピング(sliceable layout mapping)要件を満たす。

- `M`が[レイアウトマッピング要件](LayoutMapping.md)を満たす
- 式`submdspan_mapping(m, invalid_slices...)`が不適格である
- 下記式が適格であり、かつ指定されたセマンティクスを持つこと :

    ```cpp
    submdspan_mapping(m, valid_slices...)
    ```

    下記を満たす型`SM`に対して[`submdspan_mapping_result`](submdspan_mapping_result.md)`<SM>`の特殊化である型`SMR`をもつ。

    - `SM`が[レイアウトマッピング要件](LayoutMapping.md)を満たす
    - `SM::extents_type`が[`extents`](extents.md)の特殊化である
    - `SM::extents_type::rank()`が[`MAP_RANK`](submdspan_canonicalize_slices.md)`(valid_slices, M_rank)`に等しい
    - `SM::extents_type::index_type`が`IT`を表す

    下記を満たす`SMR`型のオブジェクト`smr`を返す。

    - `smr.mapping.extents() ==` [`submdspan_extents`](submdspan_extents.md)`(m.extents(), valid_slices...)`、かつ
    - `smr.mapping.extents()`の多次元インデクス値を表す整数パック`i`に対して、下記を満たす整数パック`j`に対し`smr.mapping(i...) + smr.offset == m(j)`が`true`となる
        - `sizeof...(j)`が`M_rank`に等しく、かつ
        - `m.extents()`の各次元インデクス`r`に対して、`j...[r]`が下記の総和に等しい
            - `m.extents()`の`r`次元に対して`valid_slices...[r]`の`submdspan`スライス範囲の下限、および
            - `valid_slices...[r]`の型が[縮約スライス型(collapsing slice type)](submdspan_canonicalize_slices.md)ならば値`0`、そうでなければ`i...[`[`MAP_RANK`](submdspan_canonicalize_slices.md)`(valid_slices, r)]`


## バージョン
### 言語
- C++26


## 関連項目
- [`submdspan`](submdspan.md)


## 参照
- [P3663R3 Future-proof `submdspan_mapping`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3663r3.html)
