# コンストラクタ
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* layout_stride::mapping[meta class]
* cpp23[meta cpp]

```cpp
constexpr mapping() noexcept;  // (1)

constexpr mapping(const mapping&) noexcept = default;  // (2)

template<class OtherIndexType>
  constexpr mapping(const extents_type& e, span<OtherIndexType, rank_> s) noexcept;  // (3)

template<class OtherIndexType>
  constexpr mapping(const extents_type& e, const array<OtherIndexType, rank_>& s) noexcept;  // (4)

template<class StridedLayoutMapping>
  constexpr explicit(see below) mapping(const StridedLayoutMapping& other) noexcept;  // (5)
```
* span[link /reference/span/span.md]
* array[link /reference/array/array.md]
* rank_[italic]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : コピーコンストラクタ
- (3), (4) : [`extents`](../../extents.md)とストライド幅から構築（定数`rank_`は次元数）
- (5) : [レイアウトマッピング](../../LayoutMapping.md)からの変換コンストラクタ


## テンプレートパラメータ制約
- (3), (4) :
    - [`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const OtherIndexType&, index_type>`が`true`、かつ
    - [`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<index_type, const OtherIndexType&>`が`true`であること。
- (5) :
    - [`layout-mapping-alike`](layout-mapping-alike.md)`<StridedLayoutMapping>`を満たす
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<extents_type, typename StridedLayoutMapping::extents_type> == true`
    - `StridedLayoutMapping::is_always_unique() == true`
    - `StridedLayoutMapping::is_always_strided() == true`


## 事前条件
- (1) : [`layout_right::mapping<extents_type>()`](../../layout_right/mapping.md)`.`[`required_span_size()`](../../layout_right/mapping/required_span_size.md)を、`index_type`型で表現できること。
- (3), (4) :
    - 半開区間`[0, rank_)`の全ての`i`に対して、`s[i]`を`index_type`へ変換した結果が`0`より大きいこと。
    - [`REQUIRED-SPAN-SIZE`](required_span_size.md)`(e, s)`を`index_type`型で表現できること。
    - `rank_ > 0`のとき、半開区間`[1, rank_)`の全ての`i`に対して`j = i-1`として`s[Pi] >= s[Pj] * e.extents(Pj)`を満たすの整数値の組合せ`P`が存在すること。
- (5) :
    - `StridedLayoutMapping`が[レイアウトマッピングポリシー](../../LayoutMappingPolicy.md)を満たす
    - `extents()`の全ての次元`r`に対して`other.stride(r) > 0`
    - `other.required_span_size()`を`index_type`型で表現できること
    - [`OFFSET`](op_equal.md)`(other) == 0`


## 効果
- (1) : `extents_type()`で`extents_`を直接非リスト初期化し、全ての次元`d`に対して[`layout_right::mapping<extents_type>()`](../../layout_right/mapping.md)`.`[`stride(d)`](../../layout_right/mapping/stride.md)で`strides_[d]`を直接非リスト初期化する。
- (3), (4) : `e`で`extents_`を直接非リスト初期化し、全ての次元`d`に対して[`as_const`](/reference/utility/as_const.md)`(s[d])`で`strides_[d]`を直接非リスト初期化する。
- (5) : `other.extents()`で`extents_`を直接非リスト初期化し、全ての次元`d`に対して`other.stride(d)`で`strides_[d]`を直接非リスト初期化する。


## 例外
投げない


## explicitになる条件
- (5) : `explicit`指定子の式は以下と等価
```cpp
// C++23
!(is_convertible_v<typename StridedLayoutMapping::extents_type, extents_type> &&
  (is-mapping-of<layout_left, StridedLayoutMapping> ||
   is-mapping-of<layout_right, StridedLayoutMapping> ||
   is-mapping-of<layout_stride, StridedLayoutMapping>))

// C++26
!(is_convertible_v<typename StridedLayoutMapping::extents_type, extents_type> &&
  (is-mapping-of<layout_left, StridedLayoutMapping> ||
   is-mapping-of<layout_right, StridedLayoutMapping> ||
   is-layout-left-padded-mapping-of<StridedLayoutMapping> ||
   is-layout-right-padded-mapping-of<StridedLayoutMapping> ||
   is-mapping-of<layout_stride, StridedLayoutMapping>))
```
* is_convertible_v[link /reference/type_traits/is_convertible.md]
* layout_left[link ../../layout_left.md]
* layout_right[link ../../layout_right.md]
* layout_stride[link ../../layout_stride.md]
* is-mapping-of[link ../../is-mapping-of.md]
* is-layout-left-padded-mapping-of[link ../../is-layout-left-padded-mapping-of.md]
* is-layout-right-padded-mapping-of[link ../../is-layout-right-padded-mapping-of.md]


## 例
```cpp example
#include <cassert>
#include <array>
#include <span>
#include <mdspan>

using Ext3x4 = std::extents<size_t, 3, 4>;

int main()
{
  // (1) : デフォルトコンストラクタ
  {
    std::layout_stride::mapping<Ext3x4> map1;
    std::layout_right::mapping<Ext3x4>  map1R;
    assert(map1 == map1R);
  }
  // (2) : コピーコンストラクタ
  {
    std::layout_stride::mapping<Ext3x4> map2_a;
    std::layout_stride::mapping<Ext3x4> map2_b = map2_a;
    assert(map2_a == map2_b);
  }
  // (3) : extentsとストライド幅(span)による構築
  {
    int strides[] = {4, 1};
    std::layout_stride::mapping<Ext3x4> map3{Ext3x4{}, std::span(strides)};
    assert(map3.stride(0) == 4);
    assert(map3.stride(1) == 1);
  }
  // (4) : extentsとストライド幅(array)による構築
  {
    std::array strides{4, 1};
    std::layout_stride::mapping<Ext3x4> map4{Ext3x4{}, strides};
    assert(map4.stride(0) == 4);
    assert(map4.stride(1) == 1);
  }
  // (5) : レイアウトマッピングからの変換コンストラクタ
  {
    std::layout_left::mapping<Ext3x4>   map5L;
    std::layout_stride::mapping<Ext3x4> map5 = map5L;
    assert(map5 == map5L);
  }
}
```
* std::layout_stride::mapping[color ff0000]
* std::layout_right::mapping[link ../../layout_right/mapping.md]
* std::layout_left::mapping[link ../../layout_left/mapping.md]
* stride[link stride.md]

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
- [`layout_left::mapping`](../../layout_left/mapping.md)
- [`layout_right::mapping`](../../layout_right/mapping.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [P2763R1 `layout_stride` static extents default constructor fix](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2763r1.html)
- [P2642R6 Padded mdspan layouts](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2642r6.pdf)
    - C++26でオーバーロード(5)のexplicit条件に[`layout_left_padded`](../../layout_left_padded.md), [`layout_right_padded`](../../layout_right_padded.md)対応が追加された。
