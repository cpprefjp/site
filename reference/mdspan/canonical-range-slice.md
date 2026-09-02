# canonical-range-slice
* [meta exposition-only]
* mdspan[meta header]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class IndexType,
         class OffsetType,
         class SpanType,
         class... StrideTypes>
constexpr auto
  canonical-range-slice(OffsetType offset,
                        SpanType span,
                        StrideTypes... strides);
```

## 概要
`canonical-range-slice`は、[`submdspan`](submdspan.md)動作仕様定義で用いられる説明専用の関数テンプレートである。

取り出し元の要素数`span`とストライド幅`strides...`から、取り出す要素数を求めて[`extent_slice`](extent_slice.md)を構築する。

説明用の型`StrideType`、値`stride`、`extent-value`、`extent`を次の通り定義する。

- 型`StrideType` : `StrideTypes`が空のパックであるか、`SpanType`が[`constant_wrapper`](/reference/utility/constant_wrapper.md)`<IndexType(0)>`であるとき[`constant_wrapper`](/reference/utility/constant_wrapper.md)`<IndexType(1)>`、そうでなければ`StrideTypes...[0]`
- 値`stride` : `StrideType`が[`constant_wrapper`](/reference/utility/constant_wrapper.md)の特殊化であるとき`StrideType()`、そうでなければ`span == 0`が`true`のとき`IndexType(1)`、そうでなければ`strides...[0]`
- 値`extent-value` : `span != 0`が`true`のとき`1 + (span - 1) / stride`、そうでなければ`0`
- 値`extent` : `SpanType`と`StrideType`がいずれも[`constant_wrapper`](/reference/utility/constant_wrapper.md)の特殊化であるとき[`cw`](/reference/utility/constant_wrapper.md)`<IndexType(extent-value)>`、そうでなければ`IndexType(extent-value)`


## 適格要件
`sizeof...(StrideTypes) <= 1`が`true`であり、`StrideType`が[`constant_wrapper`](/reference/utility/constant_wrapper.md)の特殊化であるとき`StrideType::value > 0`が`true`であること。


## 事前条件
`stride > 0`が`true`であること。


## 戻り値
```cpp
extent_slice{.offset = offset, .extent = extent, .stride = stride}
```
* extent_slice[link extent_slice.md]


## バージョン
### 言語
- C++26


## 関連項目
- [`canonical-slice`](canonical-slice.md)
- [`extent_slice`](extent_slice.md)
- [`range_slice`](range_slice.md)


## 参照
- [P3982R2 Split `strided_slice` into `extent_slice` and `range_slice` for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3982r2.html)
    - C++26で、[`range_slice`](range_slice.md)やインデクス範囲指定を[`extent_slice`](extent_slice.md)へ変換するために追加された
