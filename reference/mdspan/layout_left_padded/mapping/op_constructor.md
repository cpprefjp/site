# コンストラクタ
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* layout_left_padded::mapping[meta class]
* cpp26[meta cpp]

```cpp
constexpr mapping() noexcept;  // (1)

constexpr mapping(const mapping&) noexcept = default;  // (2)

constexpr mapping(const extents_type& ext);  // (3)

template<class OtherIndexType>
constexpr mapping(const extents_type& ext, OtherIndexType pad);  // (4)

template<class OtherExtents>
constexpr explicit(!is_convertible_v<OtherExtents, extents_type>)
  mapping(const layout_left::mapping<OtherExtents>& other);  // (5)

template<class OtherExtents>
constexpr explicit(extents_type::rank() > 0)
  mapping(const layout_stride::mapping<OtherExtents>& other);  // (6)

template<class LayoutLeftPaddedMapping>
constexpr explicit(see below)
  mapping(const LayoutLeftPaddedMapping& other);  // (7)

template<class LayoutRightPaddedMapping>
constexpr explicit(see below)
  mapping(const LayoutRightPaddedMapping& other) noexcept;  // (8)
```
* is_convertible_v[link /reference/type_traits/is_convertible.md]
* rank()[link ../../extents/rank.md]
* layout_left::mapping[link ../../layout_left/mapping.md]
* layout_stride::mapping[link ../../layout_stride/mapping.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : コピーコンストラクタ
- (3) : [`extents`](../../extents.md)から構築
- (4) : [`extents`](../../extents.md)とパディングから構築
- (5) : [`layout_left::mapping`](../../layout_left/mapping.md)からの変換コンストラクタ
- (6) : [`layout_stride::mapping`](../../layout_stride/mapping.md)からの変換コンストラクタ
- (7) : 他`layout_left_padded<S>::mapping`からの変換コンストラクタ
- (8) : [`layout_right::mapping`](../../layout_right/mapping.md)または[`layout_right_padded<S>::mapping`](../../layout_right_padded/mapping.md)からの変換コンストラクタ


## テンプレートパラメータ制約
- (4) :
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<OtherIndexType, index_type>`が`true`であること。
    - [`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<index_type, OtherIndexType>`が`true`であること。
- (5), (6) :
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<extents_type, OtherExtents>`が`true`であること。
- (7) :
    - [`is-layout-left-padded-mapping-of`](../../is-layout-left-padded-mapping-of.md)`<LayoutLeftPaddedMapping>`が`true`であること。
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<extents_type, LayoutLeftPaddedMapping::extents_type>`が`true`であること。
- (8) :
    - [`is-layout-right-padded-mapping-of`](../../is-layout-right-padded-mapping-of.md)`<LayoutRightPaddedMapping>`が`true`、または[`is-mapping-of`](../../is-mapping-of.md)`<`[`layout_right`](../../layout_right.md)`, LayoutRightPaddedMapping>`が`true`であること。
    - `rank_`が`0`または`1`であること。
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<extents_type, LayoutRightPaddedMapping::extents_type>`が`true`であること。


## 適格要件
- (5) : `OtherExtents::`[`rank()`](../../extents/rank.md) `> 1`のとき、`(static-padding-stride ==` [`dynamic_extent`](/reference/span/dynamic_extent.md)`) || (OtherExtents::`[`static_extent`](../../extents/static_extent.md)`(0) == dynamic_extent) || (static-padding-stride == OtherExtents::static_extent(0))`が`true`であること。
- (7) : `rank_ > 1`のとき、`(padding_value ==` [`dynamic_extent`](/reference/span/dynamic_extent.md)`) || (LayoutLeftPaddedMapping::padding_value == dynamic_extent) || (padding_value == LayoutLeftPaddedMapping::padding_value)`が`true`であること。


## 事前条件
- (3) :
    - `ext`の多次元インデクス空間のサイズを、`index_type`型で表現できること。
    - `rank_ > 1`かつ`padding_value !=` [`dynamic_extent`](/reference/span/dynamic_extent.md)のとき、`LEAST-MULTIPLE-AT-LEAST(padding_value, ext.`[`extent`](../../extents/extent.md)`(0))`を`index_type`型で表現できること。
    - `rank_ > 1`かつ`padding_value !=` [`dynamic_extent`](/reference/span/dynamic_extent.md)のとき、半開区間`[1, rank_)`の全ての値`k`に対して`LEAST-MULTIPLE-AT-LEAST(padding_value, ext.`[`extent`](../../extents/extent.md)`(0))`と全ての`ext.extent(k)`を乗算した値を`index_type`型で表現できること。
- (4) :
    - `pad`の値を`index_type`型で表現できること。
    - `extetns_type::`[`index-cast`](../../extents/index-cast.md)`(pad) > 0`
    - `rank_ > 1`のとき、`LEAST-MULTIPLE-AT-LEAST(pad, ext.`[`extent`](../../extents/extent.md)`(0))`を`index_type`型で表現できること。
    - `rank_ > 1`のとき、半開区間`[1, rank_)`の全ての値`k`に対して`LEAST-MULTIPLE-AT-LEAST(pad, ext.`[`extent`](../../extents/extent.md)`(0))`と全ての`ext.extent(k)`を乗算した値を`index_type`型で表現できること。
    - `padding_value !=` [`dynamic_extent`](/reference/span/dynamic_extent.md)のとき、`padding_value == extetns_type::`[`index-cast`](../../extents/index-cast.md)`(pad)`
- (5) :
    - `extents_type::`[`rank()`](../../extents/rank.md) `> 1`かつ`padding_value !=` [`dynamic_extent`](/reference/span/dynamic_extent.md)のとき、`other.`[`stride`](../../layout_left/mapping/stride.md)`(1) == LEAST-MULTIPLE-AT-LEAST(padding_value, extents_type::`[`index-cast`](../../extents/index-cast.md)`(other.extents().`[`extent`](../../extents/extent.md)`(0)))`
    - `other.`[`required_span_size()`](../../layout_left/mapping/required_span_size.md)を、`index_type`型で表現できること。
- (6) :
    - `rank_ > 1`かつ`padding_value !=` [`dynamic_extent`](/reference/span/dynamic_extent.md)のとき、`other.`[`stride`](../../layout_stride/mapping/stride.md)`(1) == LEAST-MULTIPLE-AT-LEAST(padding_value, extents_type::`[`index-cast`](../../extents/index-cast.md)`(other.extents().`[`extent`](../../extents/extent.md)`(0)))`
    - `rank_ > 0`のとき、`other.`[`stride`](../../layout_stride/mapping/stride.md)`(0) == 1`
    - `rank_ > 2`のとき、半開区間`[2, rank_)`の全ての値`r`に対して`other.`[`stride`](../../layout_stride/mapping/stride.md)`(r) == (other.extents().fwd-prod-of-extents(r) / other.extents().`[`extent`](../../extents/extent.md)`(0)) * other.stride(1)`
    - `other.`[`required_span_size()`](../../layout_stride/mapping/required_span_size.md)を、`index_type`型で表現できること。
- (7) :
    - `rank_ > 1`かつ`padding_value !=` [`dynamic_extent`](/reference/span/dynamic_extent.md)のとき、`other.stride(1) == LEAST-MULTIPLE-AT-LEAST(padding_value, extents_type::`[`index-cast`](../../extents/index-cast.md)`(other.extent(0)))`
    - `other.required_span_size()`を、`index_type`型で表現できること。
- (8) :
    - `other.required_span_size()`を、`index_type`型で表現できること。


## 効果
- (1) :
    - `mapping(extents_type{})`と等価。
- (3) :
    - `ext`を用いて`extents_`を直接非リスト初期化する。
    - `rank_ > 1`のとき、次の値を用いて`stride-1`を直接非リスト初期化する。
        - `padding_value ==` [`dynamic_extent`](/reference/span/dynamic_extent.md)のとき、`ext.`[`extent`](../../extents/extent.md)`(0)`
        - そうでなければ、`LEAST-MULTIPLE-AT-LEAST(padding_value, ext.`[`extent`](../../extents/extent.md)`(0))`
- (4) :
    - `ext`を用いて`extents_`を直接非リスト初期化する。
    - `rank_ > 1`のとき、`LEAST-MULTIPLE-AT-LEAST(pad, ext.`[`extent`](../../extents/extent.md)`(0))`を用いて`stride-1`を直接非リスト初期化する。
- (5) :
    - `mapping(other.extents())`と等価。
- (6), (7) :
    - `other.extents()`を用いて`extents_`を直接非リスト初期化する。
    - `rank_ > 1`のとき、`other.stride(1)`を用いて`stride-1`を直接非リスト初期化する。
- (8) :
    - `other.extents()`を用いて`extents_`を直接非リスト初期化する。


## 例外
- (1), (2), (8) : 投げない


## explicitになる条件
- (5) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<OtherExtents, extents_type>`
- (6) : [`extents_type::rank()`](../../extents/rank.md) `> 0`
- (7) : `rank_ > 1 && (padding_value !=` [`dynamic_extent`](/reference/span/dynamic_extent.md) `|| LayoutLeftPaddedMapping::padding_value == dynamic_extent)`
- (8) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<LayoutRightPaddedMapping::extents_type, extents_type>`


## 例
```cpp example
#include <cassert>
#include <array>
#include <mdspan>

using Ext3x3 = std::extents<size_t, 3, 3>;
using Ext2D = std::dims<2>;

int main()
{
  // (1) : デフォルトコンストラクタ
  {
    std::layout_left_padded<4>::mapping<Ext3x3> map1s;
    std::layout_left_padded<>::mapping<Ext3x3> map1d;
    assert(map1s.stride(1) == 4);
    assert(map1d.stride(1) == 3);
  }
  // (2) : コピーコンストラクタ
  {
    std::layout_left_padded<4>::mapping<Ext3x3> map2_a;
    std::layout_left_padded<4>::mapping<Ext3x3> map2_b = map2_a;
    assert(map2_a == map2_b);
  }
  // (3) : extentsから構築
  {
    Ext2D ext{3, 3};
    std::layout_left_padded<>::mapping<Ext2D> map3 = ext;
    assert(map3.extents() == ext);
  }
  // (4) : extentsとパディングから構築
  {
    Ext2D ext{3, 3};
    std::layout_left_padded<>::mapping<Ext2D> map4{ext, 4};
    assert(map4.extents() == ext && map4.stride(1) == 4);
  }
  // (5) : layout_left::mappingからの変換コンストラクタ
  {
    std::layout_left::mapping src5{Ext3x3{}};
    std::layout_left_padded<>::mapping<Ext2D> dst5 = src5;
    assert(dst5.stride(1) == 3);
  }
  // (6) : layout_stride::mappingからの変換コンストラクタ
  {
    std::array<int, 2> strides{1, 4};
    std::layout_stride::mapping src6{Ext3x3{}, strides};
    std::layout_left_padded<>::mapping<Ext2D> dst6{src6};
    assert(dst6.stride(1) == 4);
  }
  // (7) : 他layout_left_padded::mappingからの変換コンストラクタ
  {
    std::layout_left_padded<4>::mapping<Ext3x3> src7;
    std::layout_left_padded<>::mapping<Ext2D> dst7{src7};
    assert(dst7.extents() == Ext3x3{} && dst7.stride(1) == 4);
  }
  // (8) : layout_right(_padded)::mappingからの変換コンストラクタ
  {
    using Ext1D = std::dims<1>;
    std::layout_right::mapping<Ext1D> src8{Ext1D{5}};
    std::layout_left_padded<>::mapping<Ext1D> dst8{src8};
    assert(dst8.extent(0) == 5);
  }
}
```
* std::layout_left_padded<4>::mapping[color ff0000]
* std::layout_left_padded<>::mapping[color ff0000]
* std::layout_left::mapping[link ../../layout_left/mapping.md]
* std::layout_right::mapping[link ../../layout_right/mapping.md]
* std::layout_stride::mapping[link ../../layout_stride/mapping.md]
* std::dims[link ../../extents.md]

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
- [`layout_left::mapping`](../../layout_left/mapping.md)
- [`layout_right::mapping`](../../layout_right/mapping.md)
- [`layout_right_padded::mapping`](../../layout_right_padded/mapping.md)
- [`layout_stride::mapping`](../../layout_stride/mapping.md)


## 参照
- [P2642R6 Padded mdspan layouts](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2642r6.pdf)
