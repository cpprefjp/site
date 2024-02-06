# submdspan_extents
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class IndexType, class ... Extents, class ... SliceSpecifiers>
  constexpr auto submdspan_extents(const extents<IndexType, Extents...>& src, SliceSpecifiers ... slices);
}
```
* extents[link extents.md]

## 概要
多次元配列サイズ[`extents`](extents.md)と各次元からの要素取り出し（スライス）方式を指定して、新しい多次元配列サイズ[`extents`](extents.md)を取得する。

### 動作説明用
- 型`S_k` : `SliceSpecifiers`の`k`番目の型
- 値`s_k` : `slices`の`k`番目の値
- 値`map-rank` : `k`番目の要素`map-rank[k]`が下記を満たす、[`array`](/reference/array/array.md)`<size_t, sizeof...(SliceSpecifiers)>`型の配列値
    - 型`S_k`が[`convertible_to`](/reference/concepts/convertible_to.md)`<IndexType>`のモデルのとき[`dynamic_extent`](/reference/span/dynamic_extent.md)、そうでなければ
    - `j < k`において型`S_j`が[`convertible_to`](/reference/concepts/convertible_to.md)`<IndexType>`のモデルではない個数

動作説明用の配列`map-rank[]`は、変換元の次元インデクス`k`から変換先の次元インデクスへの対応関係を表現している。要素値`dynamic_extent`は変換により削減される次元を表す。


## テンプレートパラメータ制約
`sizeof...(slices)`が`Extents::rank()`と等しいこと。


## 適格要件
`src`の各次元インデクス`k`に対して、下記いずれかのうち1つだけを満たすこと。
 
- 型`S_k`が[`convertible_to`](/reference/concepts/convertible_to.md)`<IndexType>`のモデル
- 型`S_k`が[`index-pair-like`](index-pair-like.md)`<IndexType>`のモデル
- [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<S_k,` [`full_extent_t`](full_extent_t.md)`>`が`true`
- 型`S_k`が[`strided_slice`](strided_slice.md)の特殊化


## 事前条件
`src`の各次元インデクス`k`に対して、下記を全て満たすこと。

- 型`S_k`が[`strided_slice`](strided_slice.md)の特殊化のとき
    - `s_k.extent == 0`、または
    - `s_k.stride > 0`
- `0` ≤ [`first_`](first_.md)`<IndexType, k>(slices...)` ≤ [`last_`](last_.md)`<k>(src, slices...)` ≤ [`src.extent(k)`](extents/extent.md)


## 戻り値
説明用の型`SubExtents`を、下記を満たす[`extents`](extents.md)の特殊化とする。

- [`SubExtents::rank()`](extents/rank.md)は、型`S_k`が[`convertible_to`](/reference/concepts/convertible_to.md)`<IndexType>`のモデルではない`k`の個数に等しく、かつ
- `map-rank[k] !=` [`dynamic_extent`](/reference/span/dynamic_extent.md)を満たす`Extents`の次元インデクス`k`について、[`SubExtents::static_extent`](extents/static_extent.md)`(map-rank[k])`が下記と等しいこと
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<S_k,` [`full_extent_t`](full_extent_t.md)`>`が`true`のとき、[`SubExtents::static_extent`](extents/static_extent.md)`(k)`、そうでなければ、
    - 型`S_k`が[`index-pair-like`](index-pair-like.md)のモデルかつ`tuple_element_t<0, S_k>`および`tuple_element_t<1, S_k>`がいずれも[`integral-constant-like`](integral-constant-like.md)のモデルであるとき、[`de-ice`](de-ice.md)`(tuple_element_t<1, S_k>) -` [`de-ice`](de-ice.md)`(tuple_element_t<0, S_k>)`、そうでなければ
    - 型`S_k`が[`strided_slice`](strided_slice.md)の特殊化かつメンバ型`extent_type`が`S_k::extent_type() == 0`かつ[`integral-constant-like`](integral-constant-like.md)のモデルであるとき、値`0`、そうでなければ
    - 型`S_k`が[`strided_slice`](strided_slice.md)の特殊化かつメンバ型`extent_type`および`stride_type`がいずれも[`integral-constant-like`](integral-constant-like.md)のモデルであるとき、`1 + (`[`de-ice`](de-ice.md)`(S_k::extent_type()) - 1) /` [`de-ice`](de-ice.md)`(S_k::stride_type())`、そうでなければ
    - [`dynamic_extent`](/reference/span/dynamic_extent.md)

以下を満たす`SubExtents`型の値`ext`を返す。

- `map-rank[k] !=` [`dynamic_extent`](/reference/span/dynamic_extent.md)を満たす次元インデクス`k`について、[`ext.extent`](extents/extent.md)`(map-rank[k])`が下記に等しいこと
    - 型`S_k`が[`strided_slice`](strided_slice.md)の特殊化であるとき、`s_k.extent == 0 ? 0 : 1 + (`[`de-ice`](de-ice.md)`(s_k.extent) - 1) /` [`de-ice`](de-ice.md)`(s_k.stride)`
    - そうでなければ、[`last_`](last_.md)`<k>(src, slices...) -` [`first_`](first_.md)`<IndexType, k>(slices...)`


## 例
```cpp example
#include <cassert>
#include <concepts>
#include <mdspan>
#include <type_traits>

template <int N>
constexpr auto Int = std::integral_constant<int, N>{};

int main()
{
  std::extents<size_t, 10> exts{};

  auto ext0 = std::submdspan_extents(exts, 0);
  static_assert(std::same_as<decltype(ext0), std::extents<size_t>>);

  auto ext1 = std::submdspan_extents(exts, std::full_extent);
  static_assert(std::same_as<decltype(ext1), std::extents<size_t, 10>>);

  auto ext2 = std::submdspan_extents(exts, std::pair{Int<2>, Int<8>});
  static_assert(std::same_as<decltype(ext2), std::extents<size_t, 6>>);

  auto ext3 = std::submdspan_extents(exts, std::strided_slice{0, Int<0>, 1});
  static_assert(std::same_as<decltype(ext3), std::dextents<size_t, 1>>);
  assert(ext3.extent(0) == 0);

  auto ext4 = std::submdspan_extents(exts, std::strided_slice{0, Int<10>, Int<3>});
  static_assert(std::same_as<decltype(ext4), std::extents<size_t, 4>>);

  auto ext5 = std::submdspan_extents(exts, std::pair{2, 8});
  static_assert(std::same_as<decltype(ext5), std::dextents<size_t, 1>>);
  assert(ext5.extent(0) == 6);
}
```
* std::submdspan_extents[color ff0000]
* std::full_extent[link full_extent_t.md]
* std::strided_slice[link strided_slice.md]
* std::integral_constant[link /reference/type_traits/integral_constant.md]

### 出力
```
```


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
- [`full_extent`](full_extent_t.md)
- [`strided_slice`](strided_slice.md)


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
