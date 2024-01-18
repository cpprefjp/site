# コンストラクタ
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* layout_left::mapping[meta class]
* cpp23[meta cpp]

```cpp
constexpr mapping() noexcept = default;  // (1)

constexpr mapping(const mapping&) noexcept = default;  // (2)

constexpr mapping(const extents_type& e) noexcept;  // (3)

template<class OtherExtents>
constexpr explicit(!is_convertible_v<OtherExtents, extents_type>)
  mapping(const mapping<OtherExtents>& other) noexcept;  // (4)

template<class OtherExtents>
constexpr explicit(!is_convertible_v<OtherExtents, extents_type>)
  mapping(const layout_right::mapping<OtherExtents>& other) noexcept;  // (5)

template<class OtherExtents>
constexpr explicit(extents_type::rank() > 0)
  mapping(const layout_stride::mapping<OtherExtents>& other) noexcept;  // (6)
```
* is_convertible_v[link /reference/type_traits/is_convertible.md]
* rank()[link ../../extents/rank.md]
* layout_right::mapping[link ../../layout_right/mapping.md]
* layout_stride::mapping[link ../../layout_stride/mapping.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : コピーコンストラクタ
- (3) : [`extents`](../../extents.md)からの変換コンストラクタ
- (4) : 他`layout_left::mapping`からの変換コンストラクタ
- (5) : [`layout_right::mapping`](../../layout_right/mapping.md)からの変換コンストラクタ
- (6) : [`layout_stride::mapping`](../../layout_stride/mapping.md)からの変換コンストラクタ


## テンプレートパラメータ制約
- (4) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<extents_type, OtherExtents>`が`true`であること。
- (5) :
    - `extents_type::`[`rank()`](../../extents/rank.md) `<= 1`、かつ
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<extents_type, OtherExtents>`が`true`であること。
- (6) : [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<extents_type, OtherExtents>`が`true`であること。


## 事前条件
- (3) : `e`の多次元インデクス空間のサイズを、`index_type`型で表現できること。
- (4) : `other.`[`required_span_size()`](required_span_size.md)を、`index_type`型で表現できること。
- (5) : `other.`[`required_span_size()`](../../layout_left/mapping/required_span_size.md)を、`index_type`型で表現できること。
- (6) :
    - `extents_type::`[`rank()`](../../extents/rank.md) `> 0`のとき、`other`における全次元のストライド幅が[`layout_left::mapping`相当の制約](stride.md)をもつこと。
    - `other.`[`required_span_size()`](../../layout_stride/mapping/required_span_size.md)を、`index_type`型で表現できること。


## 効果
- (3) : `e`を用いて`extents_`を直接非リスト初期化する。
- (4), (5), (6) : `other.extents()`を用いて`extents_`を直接非リスト初期化する。


## 例外
投げない


## explicitになる条件
- (4), (5) : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<OtherExtents, extents_type>`
- (6) : [`extents_type::rank()`](../../extents/rank.md) `> 0`


## 例
```cpp example
#include <cassert>
#include <array>
#include <mdspan>

using Ext3x4 = std::extents<size_t, 3, 4>;
using Ext3xN = std::extents<size_t, 3, std::dynamic_extent>;

int main()
{
  // (1) : デフォルトコンストラクタ
  {
    std::layout_left::mapping<Ext3x4> map1_3x4;
    std::layout_left::mapping<Ext3xN> map1_3xN;
    assert(map1_3x4.required_span_size() == 12);
    assert(map1_3xN.required_span_size() == 0);
  }
  // (2) : コピーコンストラクタ
  {
    std::layout_left::mapping<Ext3xN> map2_a;
    std::layout_left::mapping<Ext3xN> map2_b = map2_a;
    assert(map2_a == map2_b);
  }
  // (3) : extentsからの変換コンストラクタ
  {
    Ext3xN ext{4};
    std::layout_left::mapping<Ext3xN> map3 = ext;
    assert(map3.extents() == ext);
  }
  // (4) : layout_left::mappingからの変換コンストラクタ
  {
    std::layout_left::mapping<Ext3x4> map4_3x4;
    std::layout_left::mapping<Ext3xN> map4_3xN = map4_3x4;
    assert(map4_3x4 == map4_3xN);
  }
  // (5) : layout_right::mappingからの変換コンストラクタ
  {
    using Ext1D = std::dextents<size_t, 1>;
    std::layout_right::mapping<Ext1D> src5{Ext1D{5}};
    std::layout_left::mapping<Ext1D>  dst5 = src5;
  }
  // (6) : layout_stride::mappingからの変換コンストラクタ
  {
    std::array strides{1, 3};
    std::layout_stride::mapping<Ext3x4> src6{{}, strides};
    std::layout_left::mapping<Ext3x4>   dst6{src6};  // (explicit)
  }
}
```
* std::layout_left::mapping[color ff0000]
* std::layout_right::mapping[link ../../layout_right/mapping.md]
* std::layout_stride::mapping[link ../../layout_stride/mapping.md]
* required_span_size()[link required_span_size.md]

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
- [`layout_right::mapping`](../../layout_right/mapping.md)
- [`layout_stride::mapping`](../../layout_stride/mapping.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
