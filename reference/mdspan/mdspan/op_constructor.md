# コンストラクタ
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* mdspan[meta class]
* cpp23[meta cpp]

```cpp
constexpr mdspan();  // (1)

constexpr mdspan(const mdspan& rhs) = default;  // (2)

constexpr mdspan(mdspan&& rhs) = default;  // (3)

template<class... OtherIndexTypes>
  constexpr explicit
  mdspan(data_handle_type p, OtherIndexTypes... exts);  // (4)

template<class OtherIndexType, size_t N>
  constexpr explicit(N != rank_dynamic())
  mdspan(data_handle_type p, span<OtherIndexType, N> exts);  // (5)

template<class OtherIndexType, size_t N>
  constexpr explicit(N != rank_dynamic())
  mdspan(data_handle_type p, const array<OtherIndexType, N>& exts);  // (6)

constexpr mdspan(data_handle_type p, const extents_type& ext);  // (7)

constexpr mdspan(data_handle_type p, const mapping_type& m);  // (8)

constexpr mdspan(data_handle_type p, const mapping_type& m, const accessor_type& a);  // (9)

template<class OtherElementType, class OtherExtents,
         class OtherLayoutPolicy, class OtherAccessorPolicy>
  constexpr explicit(see below)
  mdspan(const mdspan<OtherElementType, OtherExtents,
                      OtherLayoutPolicy, OtherAccessorPolicy>& other);  // (10)
```
* span[link /reference/span/span.md]
* array[link /reference/array/array.md]
* rank_dynamic[link rank_dynamic.md]
* extents_type[link ../extents.md]
* mapping_type[link ../LayoutMapping.md]
* accessor_type[link ../AccessorPolicy.md]
* OtherExtents[link ../extents.md]
* OtherLayoutPolicy[link ../LayoutMappingPolicy.md]
* OtherAccessorPolicy[link ../AccessorPolicy.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : コピーコンストラクタ
- (3) : ムーブコンストラクタ
- (4), (5), (6) : メモリブロックのポインタ`p`、各次元の要素数リスト`exts`から構築
- (7) : メモリブロックのポインタ`p`、多次元配列サイズ`ext`から構築
- (8) : メモリブロックのポインタ`p`、レイアウトマッピング`m`から構築
- (9) : メモリブロックのポインタ`p`、レイアウトマッピング`m`、要素アクセサ`a`から構築
- (10) : 他`mdspan`からの変換コンストラクタ

以降は説明専用のメンバ変数`ptr_`, `map_`, `acc_`を用いる。


## テンプレートパラメータ制約
- (1) :
    - [`rank_dynamic()`](rank_dynamic.md) `> 0`
    - [`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<data_handle_type>`が`true`
    - [`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<mapping_type>`が`true`
    - [`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<accessor_type>`が`true`
- (4) : `N`を`sizeof...(OtherIndexTypes)`としたとき
    - `(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<OtherIndexTypes, index_type> && ...)`が`true`
    - `(`[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_convertible.md)`<index_type, OtherIndexTypes> && ...)`が`true`
    - `N ==` [`rank()`](rank.md) `|| N ==` [`rank_dynamic()`](rank_dynamic.md)が`true`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<mapping_type, extents_type>`が`true`
    - [`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<accessor_type>`が`true`
- (5), (6) :
    - `(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const OtherIndexTypes&, index_type> && ...)`が`true`
    - `(`[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_convertible.md)`<index_type, const OtherIndexTypes&> && ...)`が`true`
    - `N ==` [`rank()`](rank.md) `|| N ==` [`rank_dynamic()`](rank_dynamic.md)が`true`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<mapping_type, extents_type>`が`true`
    - [`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<accessor_type>`が`true`
- (7) :
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<mapping_type, extents_type>`が`true`
    - [`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<accessor_type>`が`true`
- (8) :
    - [`is_default_constructible_v`](/reference/type_traits/is_default_constructible.md)`<accessor_type>`が`true`
- (10) :
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<mapping_type, const OtherLayoutPolicy::template mapping<OtherExtents>&>`が`true`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<accessor_type, const OtherAccessor&>`が`true`


## 適格要件
- (10) :
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<data_handle_type, const OtherAccessor::data_handle_type&>`が`true`
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<extents_type, OtherExtents>`が`true`


## 事前条件
- (1) : デフォルト構築された`map_`, `acc_`を用いたとき、半開区間`[0, map_.required_span_size())`が`ptr_`と`acc_`によってアクセス可能な範囲であること。
- (4), (5), (6), (7) : このコンストラクタで構築された`map_`とデフォルト構築された`acc_`を用いたとき、半開区間`[0, map_.required_span_size())`が`p`と`acc_`によってアクセス可能な範囲であること。
- (8) : デフォルト構築された`acc_`を用いたとき、半開区間`[0, m.required_span_size())`が`p`と`acc_`によってアクセス可能な範囲であること。
- (9) : 半開区間`[0, m.required_span_size())`が`p`と`a`によってアクセス可能な範囲であること。
- (10) :
    - [`extents_type`](../extents.md)の全ての次元`r`に対して、[`static_extent`](../extents/static_extent.md)`(r) ==` [`dynamic_extent`](/reference/span/dynamic_extent.md) `||` [`static_extent`](../extents/static_extent.md)`(r) == other.extent(r)`が`true`であり、
    - このコンストラクタで構築された`ptr_`, `map_`, `acc_`を用いたとき、半開区間`[0, map_.required_span_size())`が`ptr_`と`acc_`によってアクセス可能な範囲であること。


## 効果
- (1) : `ptr_`, `map_`, `acc_`を値初期化する。
- (4) :
    - `ptr_`を[`std::move`](/reference/utility/move.md)`(p)`で直接非リスト初期化し、
    - `map_`を[`extents_type`](../extents.md)`(static_cast<index_type>(`[`std::move`](/reference/utility/move.md)`(exts))...)`で直接非リスト初期化し、
    - `acc_`を値初期化する。
- (5), (6) :
    - `ptr_`を[`std::move`](/reference/utility/move.md)`(p)`で直接非リスト初期化し、
    - `map_`を[`extents_type`](../extents.md)`(exts)`で直接非リスト初期化し、
    - `acc_`を値初期化する。
- (7) :
    - `ptr_`を[`std::move`](/reference/utility/move.md)`(p)`で直接非リスト初期化し、
    - `map_`を`ext`で直接非リスト初期化し、
    - `acc_`を値初期化する。
- (8) :
    - `ptr_`を[`std::move`](/reference/utility/move.md)`(p)`で直接非リスト初期化し、
    - `map_`を`m`で直接非リスト初期化し、
    - `acc_`を値初期化する。
- (9) :
    - `ptr_`を[`std::move`](/reference/utility/move.md)`(p)`で直接非リスト初期化し、
    - `map_`を`m`で直接非リスト初期化し、
    - `acc_`を`a`で直接非リスト初期化する。
- (10) :
    - `ptr_`を`other.ptr_`で直接非リスト初期化し、
    - `map_`を`other.map_`で直接非リスト初期化し、
    - `acc_`を`other.acc_`で直接非リスト初期化する。


## explicitになる条件
- (5), (6) : `N !=` [`rank_dynamic()`](rank_dynamic.md)
- (10) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const OtherLayoutPolicy::template mapping<OtherExtents>&, mapping_type> || !`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const OtherAccessor&, accessor_type>`


## 例
```cpp example
#include <cassert>
#include <array>
#include <span>
#include <mdspan>

using Ext3x4 = std::extents<size_t, 3, 4>;
using Ext3xN = std::extents<size_t, 3, std::dynamic_extent>;
using Ext2D = std::dextents<size_t, 2>;

int main()
{
  int arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12};

  // (1) : デフォルトコンストラクタ
  {
    std::mdspan<int, Ext3xN> mat1_3xN;
    assert(mat1_3xN.empty());
    // 動的要素数をもつ次元がない場合は不適格
    // std::mdspan<int, Ext3x4> mat1_3x4;
  }
  // (2), (3) : コピー/ムーブコンストラクタ
  {
    std::mdspan<int, Ext3xN> src{arr, 4};  // オーバーロード(4)
    std::mdspan<int, Ext3xN> dst = src;
    assert(dst.data_handle() == src.data_handle());
    assert(dst.mapping() == src.mapping());
  }
  // (4) : ポインタ＋要素数リストから構築
  {
    std::mdspan<int, Ext3xN> mat4_all{arr, 3, 4};  // 全次元を設定
    std::mdspan<int, Ext3xN> mat4_dyn{arr, 4};     // 動的要素数のみ設定
    assert(mat4_all.size() == mat4_dyn.size());
    std::mdspan<int, Ext3x4> mat4_static{arr};  // 全次元が静的要素数
    assert(mat4_static.size() == 12);
  }
  // (5) : ポインタ＋要素数spanから構築
  {
    int exts_all[] = {3, 4};
    int exts_dyn[] = {4};
    std::mdspan<int, Ext3xN> mat5_all{arr, std::span{exts_all}};  // 全次元を設定
    std::mdspan<int, Ext3xN> mat5_dyn{arr, std::span{exts_dyn}};  // 動的要素数のみ設定
    assert(mat5_all.size() == mat5_dyn.size());
  }
  // (6) : ポインタ＋要素数arrayから構築
  {
    std::array exts_all{3, 4};
    std::array exts_dyn{4};
    std::mdspan<int, Ext3xN> mat6_all{arr, exts_all};  // 全次元を設定
    std::mdspan<int, Ext3xN> mat6_dyn{arr, exts_dyn};  // 動的要素数のみ設定
    assert(mat6_all.size() == mat6_dyn.size());
  }
  // (7) : ポインタ＋多次元配列サイズから構築
  {
    Ext2D ext{3, 4};
    std::mdspan<int, Ext2D> mat7{arr, ext};
    assert(mat7.size() == 12);
  }
  // (8) : ポインタ＋レイアウトマッピングから構築
  {
    // 要素数 3x3（ストライド幅=[4,1]）の2次元ビュー
    using Mapping = std::layout_stride::mapping<Ext2D>;
    Mapping map{Ext2D{3, 3}, std::array{4, 1}};
    std::mdspan<int, Ext2D, std::layout_stride> mat8{arr, map};
    assert(mat8.size() == 9);
    assert(mat8.mapping().required_span_size() == 11);
    // 1  2  3 (4)
    // 5  6  7 (8)
    // 9 10 11  -
    assert((mat8[1,1] == 6 && mat8[2,2] == 11));
  }
  // (9) : ポインタ＋レイアウトマッピング＋要素アクセサから構築
  {
    // 要素数 3x4, 列優先レイアウト の2次元ビュー
    std::layout_left::mapping<Ext3x4> map;
    std::default_accessor<int> acc;
    std::mdspan<int, Ext2D, std::layout_stride> mat9{arr, map, acc};
    // Extents:      extents<size_t, 3, 4> -> dextents<size_t, 2>
    // LayoutPolicy: layout_left -> layout_stride
  }
  // (10) : 他mdspanからの変換コンストラクタ
  {
    // 要素数 3x4, 行優先レイアウト の2次元ビュー
    std::mdspan<int, Ext3x4> src{arr};  // オーバーロード(4)
    std::mdspan<const int, Ext2D, std::layout_stride> dst = src;
    // ElementType:    int -> const int
    // Extents:        extents<size_t, 3, 4> -> dextents<size_t, 2>
    // LayoutPolicy:   layout_right -> layout_stride
    // AccessorPolicy: default_accessor<int> -> default_accessor<const int>
  }
}
```
* std::mdspan[color ff0000]
* empty()[link empty.md]
* data_handle()[link data_handle.md]
* mapping()[link mapping.md]
* size()[link size.md]
* std::layout_stride::mapping[link ../layout_stride/mapping.md]]
* std::layout_stride[link ../layout_stride.md]
* std::layout_left::mapping[link ../layout_left/mapping.md]
* std::default_accessor[link ../default_accessor.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`extents`](../extents.md)
- [LayoutMapping](../LayoutMapping.md)
- [AccessorPolicy](../AccessorPolicy.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
