# submdspan
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<
    class ElementType,
    class Extents,
    class LayoutPolicy,
    class AccessorPolicy,
    class... SliceSpecifiers>
  constexpr auto submdspan(
    const mdspan<ElementType, Extents, LayoutPolicy, AccessorPolicy>& src,
    SliceSpecifiers... slices) -> see below;
}
```
* Extents[link extents.md]
* LayoutPolicy[link LayoutMappingPolicy.md]
* AccessorPolicy[link AccessorPolicy.md]
* mdspan[link mdspan.md]
* see below[italic]

## 概要
多次元配列ビュー[`mdspan`](mdspan.md)と各次元からの要素取り出し（スライス）方式を指定して、メモリブロックに対する新しい多次元配列ビュー[`mdspan`](mdspan.md)を取得する。

### スライス指定
各次元からの要素取り出し方式は、下記の4種類をサポートする。
スライス指定子リスト`slices...`にインデクス値指定が含まれる場合、戻り値の次元数(rank)は元の多次元配列ビューに対してインデクス値指定した次元数だけ削減される。

- インデクス値指定 : 整数値。指定次元に対する多次元インデクス値を固定する。
- インデクス範囲指定 : [インデクス・ペア互換型](index-pair-like.md)の値。開始位置(begin)と終了位置(end)で表現される半開区間から要素群を取り出す。
- ストライド・スライス指定 : [`std::strided_slice`](strided_slice.md)の値。オフセット(offset)と要素数(extent)とストライド幅(stride)で指定される要素群を取り出す。
- 全要素指定 : [`std::full_extent`](full_extent_t.md)。指定次元の全要素を取り出す。


## テンプレートパラメータ制約
- `sizeof...(slices)`が[`Extents::rank()`](extents/rank.md)と等しく、かつ
- 評価されない文脈において式`submdspan_mapping(`[`src.mapping()`](mdspan/mapping.md)`, slices...)`が妥当な式であること。


## 適格要件
説明用の型`index_type`を[`Extents::index_type`](extents.md)、変数`sub_map_offset`を`submdspan_mapping(`[`src.mapping()`](mdspan/mapping.md)`, slices...)`の結果としたとき、

- 型`decltype(submdspan_mapping(`[`src.mapping()`](mdspan/mapping.md)`, slices...))`が[`submdspan_mapping_result`](submdspan_mapping_result.md)の特殊化であり、
- [`is_same_v`](/reference/type_traits/is_same.md)`<`[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype(`[`sub_map_offset.mapping`](submdspan_mapping_result.md)`.extents())>, decltype(`[`submdspan_extents`](submdspan_extents.md)`(`[`src.mapping()`](mdspan/mapping.md)`, slices...))>`が`true`、かつ
- [`src.extents()`](mdspan/extents.md)の各次元インデクス`k`において、`S_k`を`SliceSpecifiers`の`k`番目の型としたき、下記いずれかのうち1つだけを満たすこと。
    - 型`S_k`が[`convertible_to`](/reference/concepts/convertible_to.md)`<index_type>`のモデル
    - 型`S_k`が[`index-pair-like`](index-pair-like.md)`<index_type>`のモデル
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<S_k,` [`full_extent_t`](full_extent_t.md)`>`が`true`
    - 型`S_k`が[`strided_slice`](strided_slice.md)の特殊化


## 事前条件
- [`src.extents()`](mdspan/extents.md)の各次元インデクス`k`において、`S_k`を`SliceSpecifiers`の`k`番目の型、`s_k`を`slices`の`k`番目の値としたとき、下記を全て満たすこと。
    - 型`S_k`が[`strided_slice`](strided_slice.md)の特殊化のとき
        - `s_k.extent == 0`、または
        - `s_k.stride > 0`
    - `0` ≤ [`first_`](first_.md)`<index_type, k>(slices...)` ≤ [`last_`](last_.md)`<k>(`[`src.extents()`](mdspan/extents.md)`, slices...)` ≤ [`src.extent(k)`](mdspan/extent.md)
- [`sub_map_offset.mapping`](submdspan_mapping_result.md)`.extents() ==` [`submdspan_extents`](submdspan_extents.md)`(`[`src.mapping()`](mdspan/mapping.md)`, slices...)`が`true`、かつ
- [`sub_map_offset.mapping`](submdspan_mapping_result.md)`.extents()`の多次元インデクス値を表す任意の整数パック`I`に対して、`sub_map_offset.mapping(I...) +` [`sub_map_offset.offset`](submdspan_mapping_result.md) `==` [`src.mapping()`](mdspan/mapping.md)`(`[`src-indices`](src-indices.md)`(`[`array`](/reference/array/array.md)`{I...}, slices...))`が`true`であること。


## 効果
以下と等価

```cpp
auto sub_map_offset = submdspan_mapping(src.mapping(), slices...);
return mdspan(src.accessor().offset(src.data_handle(), sub_map_offset.offset),
              sub_map_offset.mapping,
              AccessorPolicy::offset_policy(src.accessor()));
```
* mdspan[link mdspan.md]
* sub_map_offset[link submdspan_mapping_result.md]
* src.mapping()[link mdspan/mapping.md]
* src.data_handle()[link mdspan/mapping.md]
* src.accessor()[link mdspan/accessor.md]
* AccessorPolicy::offset_policy[link AccessorPolicy.md]


## 例
### 基本的な使い方
```cpp example
#include <mdspan>
#include <numeric>
#include <print>
#include <string_view>

// 2次元配列ビュー(Matrix)の要素表示
template <class T, class E, class L, class A>
void print_mat(std::string_view name, const std::mdspan<T, E, L, A>& mat)
{
  static_assert(mat.rank() == 2);
  std::println("{}:", name);
  for (size_t i = 0; i < mat.extent(0); ++i) {
    for (size_t j = 0; j < mat.extent(1); ++j) {
      std::print(" {:2}", mat[i, j]);
    }
    std::println("");
  }
}

// 1次元配列ビュー(Vector)の要素表示
template <class T, class E, class L, class A>
void print_vec(std::string_view name, const std::mdspan<T, E, L, A>& mat)
{
  static_assert(mat.rank() == 1);
  std::println("{}:", name);
  for (size_t i = 0; i < mat.extent(0); ++i) {
    std::print(" {:2}", mat[i]);
  }
  std::println("");
}

int main()
{
  int arr[20];
  std::ranges::iota(arr, 1);

  // 4x5要素の2次元配列ビュー
  using Ext2D = std::dextents<size_t, 2>;
  std::mdspan mat{arr, Ext2D{4, 5}};
  print_mat("mat", mat);

  // インデクス値指定＋全要素指定（2次元→1次元）
  auto row1 = std::submdspan(mat, 1, std::full_extent);
  print_vec("mat[1,M]", row1);
  auto col2 = std::submdspan(mat, std::full_extent, 2);
  print_vec("mat[N,2]", col2);

  // 単一要素の取り出し（2次元→0次元）
  auto elem = std::submdspan(mat, 1, 2);
  std::println("mat[1,2]:\n {:2}", elem[]);

  // インデクス範囲指定
  auto submat = std::submdspan(mat, std::pair{1,3}, std::pair{1,4});
  print_mat("submat", submat);

  // ストライド・スライス指定
  auto strided = std::submdspan(mat,
    std::strided_slice{.offset=1, .extent=3, .stride=2}, 
    std::strided_slice{.offset=0, .extent=5, .stride=2});
  print_mat("strided", strided);
}
```
* std::submdspan[color ff0000]
* std::full_extent[link full_extent_t.md]
* std::strided_slice[link strided_slice.md]
* std::print[link /reference/print/print.md]
* std::println[link /reference/print/println.md]
* std::ranges::iota[link /reference/numeric/ranges_iota.md]

#### 出力
```
mat:
  1  2  3  4  5
  6  7  8  9 10
 11 12 13 14 15
 16 17 18 19 20
mat[1,M]:
  6  7  8  9 10
mat[N,2]:
  3  8 13 18
mat[1,2]:
  8
submat:
  7  8  9
 12 13 14
strided:
  6  8 10
 16 18 20
```

### 静的要素数mdspanの生成
```cpp example
#include <concepts>
#include <mdspan>
#include <numeric>
#include <print>

// 整数定数型
template <int N>
constexpr auto Int = std::integral_constant<int, N>{};

int main()
{
  int arr[20];
  std::ranges::iota(arr, 1);

  // 静的要素数 4x5 の2次元配列ビュー
  std::mdspan mat{arr, std::extents<size_t, 4, 5>{}};

  // 動的要素数 2x3 の2次元配列部分ビューを取り出し
  auto submat_dyn = std::submdspan(mat,
    std::pair{1, 3},
    std::strided_slice{.offset=0, .extent=5, .stride=2});
  static_assert(std::same_as<decltype(submat_dyn)::extents_type, std::dextents<size_t, 2>>);
  std::println("submat_dyn {}x{}", submat_dyn.extent(0), submat_dyn.extent(1));

  // 静的要素数 2x3 の2次元配列部分ビューを取り出し
  auto submat_2x3 = std::submdspan(mat,
    std::pair{Int<1>, Int<3>},
    std::strided_slice{.offset=0, .extent=Int<5>, .stride=Int<2>});
  // (strided_slice::offset は戻り値型に影響を与えない)
  static_assert(std::same_as<decltype(submat_2x3)::extents_type, std::extents<size_t, 2, 3>>);
  std::println("submat_2x3 {}x{}", submat_2x3.extent(0), submat_2x3.extent(1));
}
```
* std::submdspan[color ff0000]
* std::strided_slice[link strided_slice.md]
* std::integral_constant[link /reference/type_traits/integral_constant.md]
* std::ranges::iota[link /reference/numeric/ranges_iota.md]
* std::println[link /reference/print/println.md]

#### 出力
```
submat_dyn 2x3
submat_2x3 2x3
```

### レイアウトマッピング互換性
```cpp example
#include <mdspan>

int main()
{
  int arr[6] = {1, 2, 3, 4, 5, 6};

  // 3x2要素の2次元配列ビュー（行優先レイアウト）
  std::mdspan mat{arr, std::extents<size_t, 3, 2>{}};
  static_assert(std::same_as<decltype(mat)::layout_type, std::layout_right>);
  // 1 2
  // 3 4
  // 5 6

  // 行優先レイアウト std::layout_right　を維持
  auto row0 = std::submdspan(mat, 0, std::full_extent);
  // 1 2
  auto row12 = std::submdspan(mat, std::pair{1,3}, std::full_extent);
  // 3 4
  // 5 6
  static_assert(std::same_as<decltype(row0)::layout_type, std::layout_right>);
  static_assert(std::same_as<decltype(row12)::layout_type, std::layout_right>);

  // 汎用ストライド指定レイアウト std::layout_stride に変換
  auto col1 = std::submdspan(mat, std::full_extent, 1);
  // 2 4 6
  auto row02 = std::submdspan(mat,
    std::strided_slice{.offset=0, .extent=3, .stride=2},
    std::full_extent);
  // 1 2
  // 5 6
  static_assert(std::same_as<decltype(col1)::layout_type, std::layout_stride>);
  static_assert(std::same_as<decltype(row02)::layout_type, std::layout_stride>);
}
```
* std::submdspan[color ff0000]
* std::full_extent[link full_extent_t.md]
* std::strided_slice[link strided_slice.md]
* std::layout_right[link layout_right.md]
* std::layout_stride[link layout_stride.md]

#### 出力
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
- [`mdspan`](mdspan.md)
- [`full_extent`](full_extent_t.md)
- [`strided_slice`](strided_slice.md)


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
