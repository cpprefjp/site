# subextents
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class IndexType, class... Extents, class... SliceSpecifiers>
  constexpr auto subextents(const extents<IndexType, Extents...>& src,
                                   SliceSpecifiers... raw_slices);
}
```
* extents[link extents.md]

## 概要
多次元配列サイズ[`extents`](extents.md)と各次元からの要素取り出し（スライス）方式を指定して、新しい多次元配列サイズ[`extents`](extents.md)を取得する。

各次元からの要素取り出し方式は、[`submdspan`](submdspan.md)を参照のこと。

説明用のパック`slices`を以下の通り宣言する。

```cpp
auto [...slices] = canonical_slices(src, raw_slices...);
```
* canonical_slices[link canonical_slices.md]


## テンプレートパラメータ制約
`sizeof...(SliceSpecifiers)`が`sizeof...(Extents)`と等しいこと。


## 適格要件
`src`の各次元インデクス`k`に対して、
 
- `SliceSpecifiers...[k]`が`IndexType`の`submdspan`スライス型であり、かつ
- `decltype(slices...[k])`が[`extents`](extents.md)`<IndexType, Extents...>`のk番目次元の[有効`submdspan`スライス型(valid `submdspan` slice type)](canonical_slices.md)であること。


## 事前条件
`src`の各次元インデクス`k`に対して、`slices...[k]`が`src`のk番目次元の[有効`submdspan`スライス(valid `submdspan` slice)](canonical_slices.md)であること。


## 戻り値
説明用の型`SubExtents`を、下記を満たす[`extents`](extents.md)の特殊化とする。

- [`SubExtents::rank()`](extents/rank.md)が[`MAP_RANK`](canonical_slices.md)`(slices, Extents::rank())`に等しく、かつ
- `slices...[k]`の型が[縮約スライス型(collapsing slice type)](canonical_slices.md)ではない`Extents`の各次元インデクス`k`に対して、説明用の`S_k`を`slices...[k]`の型としたとき、[`SubExtents::static_extent`](extents/static_extent.md)`(`[`MAP_RANK`](canonical_slices.md)`(slices, k))`が下記と等しいこと。
    - 型`S_k`が[`full_extent_t`](full_extent_t.md)のとき、[`Extents::static_extent`](extents/static_extent.md)`(k)`、そうでなければ、
    - 型`S_k`が[`extent_slice`](extent_slice.md)の特殊化かつメンバ型`S_k::extent_type`が[`constant_wrapper`](/reference/utility/constant_wrapper.md)の特殊化であるとき、`S_k::extent_type::value`
    - そうでなければ、[`dynamic_extent`](/reference/span/dynamic_extent.md)

以下を満たす`SubExtents`型の値`ext`を返す。

- `slices...[k]`の型が[縮約スライス型(collapsing slice type)](canonical_slices.md)ではない`extents<IndexType, Extents...>`の各次元インデクス`k`について、説明用の`s_k`を`slices...[k]`としたとき、[`ext.extent`](extents/extent.md)`(`[`MAP_RANK`](canonical_slices.md)`(slices, k))`が下記に等しいこと。
    - `s_k`の型が[`extent_slice`](extent_slice.md)の特殊化であるとき、`s_k.extent`
    - そうでなければ、`src`のk番目の要素に対して`submdspan`スライス範囲である半開区間`[L, U)`に対して、`U - L`


## 例
```cpp example
#include <cassert>
#include <concepts>
#include <mdspan>
#include <type_traits>
#include <utility>

template <int N>
constexpr auto Int = std::integral_constant<int, N>{};

int main()
{
  std::extents<size_t, 10> exts{};

  auto ext0 = std::subextents(exts, 0);
  static_assert(std::same_as<decltype(ext0), std::extents<size_t>>);

  auto ext1 = std::subextents(exts, std::full_extent);
  static_assert(std::same_as<decltype(ext1), std::extents<size_t, 10>>);

  auto ext2 = std::subextents(exts, std::pair{Int<2>, Int<8>});
  static_assert(std::same_as<decltype(ext2), std::extents<size_t, 6>>);

  auto ext3 = std::subextents(exts, std::extent_slice{0, Int<0>, 1});
  static_assert(std::same_as<decltype(ext3), std::extents<size_t, 0>>);

  auto ext4 = std::subextents(exts, std::extent_slice{0, Int<4>, 3});
  static_assert(std::same_as<decltype(ext4), std::extents<size_t, 4>>);

  auto ext5 = std::subextents(exts, std::pair{2, 8});
  static_assert(std::same_as<decltype(ext5), std::dextents<size_t, 1>>);
  assert(ext5.extent(0) == 6);
}
```
* std::subextents[color ff0000]
* std::full_extent[link full_extent_t.md]
* std::extent_slice[link extent_slice.md]
* std::integral_constant[link /reference/type_traits/integral_constant.md]

### 出力
```
```


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
- [`full_extent`](full_extent_t.md)
- [`extent_slice`](extent_slice.md)
- [`range_slice`](range_slice.md)


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
- [P3663R3 Future-proof `submdspan_mapping`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3663r3.html)
- [LWG Issue 4491. Rename `submdspan_extents` and `submdspan_canonicalize_slices`](https://cplusplus.github.io/LWG/issue4491)
    - この関数はC++26のリリース前に`submdspan_extents`から`subextents`へ改名された
- [P3982R2 Split `strided_slice` into `extent_slice` and `range_slice` for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3982r2.html)
    - C++26のリリース前に、[`extent_slice`](extent_slice.md)の`extent`メンバ変数が取り出す要素数を表すようになったことで、戻り値の要素数がストライド幅による除算なしで求まるようになった
