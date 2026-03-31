# submdspan_extents
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class IndexType, class... Extents, class... SliceSpecifiers>
  constexpr auto submdspan_extents(const extents<IndexType, Extents...>& src,
                                   SliceSpecifiers... raw_slices);
}
```
* extents[link extents.md]

## 概要
多次元配列サイズ[`extents`](extents.md)と各次元からの要素取り出し（スライス）方式を指定して、新しい多次元配列サイズ[`extents`](extents.md)を取得する。

各次元からの要素取り出し方式は、[`submdspan`](submdspan.md)を参照のこと。

説明用のパック`slices`を以下の通り宣言する。

```cpp
auto [...slices] = submdspan_canonicalize_slices(src, raw_slices...);
```
* submdspan_canonicalize_slices[link submdspan_canonicalize_slices.md]


## テンプレートパラメータ制約
`sizeof...(SliceSpecifiers)`が`sizeof...(Extents)`と等しいこと。


## 適格要件
`src`の各次元インデクス`k`に対して、
 
- `SliceSpecifiers...[k]`が`IndexType`の`submdspan`スライス型であり、かつ
- `decltype(slices...[k])`が[`extents`](extents.md)`<IndexType, Extents...>`のk番目次元の[有効`submdspan`スライス型(valid `submdspan` slice type)](submdspan_canonicalize_slices.md)であること。


## 事前条件
`src`の各次元インデクス`k`に対して、`slices...[k]`が`src`のk番目次元の[有効`submdspan`スライス(valid `submdspan` slice)](submdspan_canonicalize_slices.md)であること。


## 戻り値
説明用の型`SubExtents`を、下記を満たす[`extents`](extents.md)の特殊化とする。

- [`SubExtents::rank()`](extents/rank.md)が[`MAP_RANK`](submdspan_canonicalize_slices.md)`(slices, Extents::rank())`に等しく、かつ
- `slices...[k]`の型が[縮約スライス型(collapsing slice type)](submdspan_canonicalize_slices.md)ではない`Extents`の各次元インデクス`k`に対して、説明用の`S_k`を`slices...[k]`の型としたとき、[`SubExtents::static_extent`](extents/static_extent.md)`(`[`MAP_RANK`](submdspan_canonicalize_slices.md)`(slices, k))`が下記と等しいこと。
    - 型`S_k`が[`full_extent_t`](full_extent_t.md)のとき、[`SubExtents::static_extent`](extents/static_extent.md)`(k)`、そうでなければ、
    - 型`S_k`が[`strided_slice`](strided_slice.md)の特殊化かつメンバ型`S_k::extent_type`が[`constant_wrapper`](/reference/type_traits/constant_wrapper.md.nolink)`<IndexType(0)>`のとき、値`0`、そうでなければ
    - 型`S_k`が[`strided_slice`](strided_slice.md)の特殊化かつメンバ型`extent_type`および`stride_type`がいずれも[`constant_wrapper`](/reference/type_traits/constant_wrapper.md.nolink)の特殊化であるとき、`1 + ((S_k::extent_type::value - 1) / S_k::stride_type::value)`
    - そうでなければ、[`dynamic_extent`](/reference/span/dynamic_extent.md)

以下を満たす`SubExtents`型の値`ext`を返す。

- `slices...[k]`の型が[縮約スライス型(collapsing slice type)](submdspan_canonicalize_slices.md)ではない`extents<IndexType, Extents...>`の各次元インデクス`k`について、説明用の`s_k`を`slices...[k]`としたとき、[`ext.extent`](extents/extent.md)`(`[`MAP_RANK`](submdspan_canonicalize_slices.md)`(slices, k))`が下記に等しいこと。
    - `s_k`の型が[`strided_slice`](strided_slice.md)の特殊化であるとき、`s_k.extent == 0 ? 0 : 1 + (s_k.extent - 1) / s_k.stride`
    - そうでなければ、`src`のk番目の要素に対して`submdspan`スライス範囲である半開区間`[L, U)`に対して、`U - L`


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
- [P3663R3 Future-proof `submdspan_mapping`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3663r3.html)
