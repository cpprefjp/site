# コンストラクタ
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* extents[meta class]
* cpp23[meta cpp]

```cpp
constexpr extents() noexcept = default;  // (1)

template<class OtherIndexType, size_t... OtherExtents>
constexpr explicit(see below)
  extents(const extents<OtherIndexType, OtherExtents...>& other) noexcept;  // (2)

template<class... OtherIndexTypes>
constexpr explicit extents(OtherIndexTypes... exts) noexcept;  // (3)

template<class OtherIndexType, size_t N>
constexpr explicit(N != rank_dynamic())
  extents(span<OtherIndexType, N> exts) noexcept;  // (4)

template<class OtherIndexType, size_t N>
constexpr explicit(N != rank_dynamic())
  extents(const array<OtherIndexType, N>& exts) noexcept;  // (5)
```
* rank_dynamic()[link rank_dynamic.md]
* span[link /reference/span/span.md]
* array[link /reference/array/array.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : 他`extents`からの変換コンストラクタ
- (3) : 要素数を値リストで設定するコンストラクタ
- (4) : 要素数を`span`で設定するコンストラクタ
- (5) : 要素数を`array`で設定するコンストラクタ


## テンプレートパラメータ制約
- (2) :
    - `sizeof...(OtherExtents) ==` [`rank()`](rank.md)が`true`、かつ
    - `((OtherExtents == dynamic_extent || Extents == dynamic_extent || OtherExtents == Extents) && ...)`が`true`であること
- (3) : `N`を`sizeof...(OtherIndexTypes)`、`exts_arr`を[`array`](/reference/array/array.md)`<index_type, N>{static_cast<index_type>(std::move(exts))...}`としたとき
    - `(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<OtherIndexTypes, index_type> && ...)`が`true`、かつ
    - `(`[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<index_type, OtherIndexTypes> && ...)`が`true`、かつ
    - `N ==` [`rank_dynamic()`](rank_dynamic.md) `|| N ==` [`rank()`](rank.md)が`true`であること
- (4), (5) :
    - `(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const OtherIndexTypes&, index_type> && ...)`が`true`、かつ
    - `(`[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<index_type, const OtherIndexTypes&> && ...)`が`true`、かつ
    - `N ==` [`rank_dynamic()`](rank_dynamic.md) `|| N ==` [`rank()`](rank.md)が`true`であること


## 事前条件
- (2) : それぞれ`r`番目の次元が静的要素数に対して要素数が`other.`[`extent`](extent.md)`(r)`と等しく、かつ
    - `sizeof...(OtherExtents) == 0`、もしくは
    - `other`の全ての次元`r`において`other.extent(r)`が`index_type`型で表現可能な値であること
- (3) : `N`を`sizeof...(OtherIndexTypes)`、`exts_arr`を[`array`](/reference/array/array.md)`<index_type, N>{static_cast<index_type>(std::move(exts))...}`としたとき
    - `N !=` [`rank_dynamic()`](rank_dynamic.md)ならば、それぞれ`r`番目の次元が静的要素数に対して要素数が`exts_arr[r]`と等しく、かつ
    - `sizeof...(exts) == 0`もしくは`exts`の各要素が`index_type`型で表現可能な値であること
- (4), (5) : `N !=` [`rank_dynamic()`](rank_dynamic.md)ならば、それぞれ`r`番目の次元が静的要素数に対して要素数が`exts[r]`と等しく、かつ
    - `N == 0`、もしくは
    - `exts`の各要素が`index_type`型で表現可能な値であること


## 効果
- (4), (5) : 動的要素数に指定された各次元の要素数を`exts`の値を用いて初期化する。


## 事後条件
- (2) : `*this == other`
- (3) : `exts_arr`を[`array`](/reference/array/array.md)`<index_type, N>{static_cast<index_type>(std::move(exts))...}`としたとき、`*this == extents(exts_arr)`（オーバーロード(5)の効果を参照）


## 例外
投げない


## explicitになる条件
- (2) : `(((Extents != dynamic_extent) && (OtherExtents == dynamic_extent)) || ... ) || (numeric_limits<index_type>::max() < numeric_limits<OtherIndexType>::max())`
- (4), (5) : `N !=` [`rank_dynamic()`](rank_dynamic.md)


## 例
```cpp example
#include <cassert>
#include <array>
#include <mdspan>
#include <span>

using Ext3x4 = std::extents<size_t, 3, 4>;
using Ext3xN = std::extents<size_t, 3, std::dynamic_extent>;

int main()
{
  // (1) : デフォルトコンストラクタ
  {
    Ext3x4 ext1_3x4;
    Ext3xN ext1_3xN;
    assert(ext1_3xN.extent(1) == 0);
  }
  // (2) : 変換コンストラクタ
  {
    Ext3x4 ext1_3x4;
    Ext3xN ext1_3xN = ext1_3x4;
    assert(ext1_3xN.extent(1) == 4);
  }
  // (3) : 要素数を値リストで設定するコンストラクタ
  {
    Ext3xN ext3_all{3, 4};  // 全次元を設定
    Ext3xN ext3_dyn{4};     // 動的要素数のみ設定
    assert(ext3_all == ext3_dyn);
  }
  // (4) : 要素数をspanで設定するコンストラクタ
  {
    int exts_all[] = {3, 4};
    int exts_dyn[] = {4};
    Ext3xN ext4_all{ std::span{exts_all} };  // 全次元を設定(explicit)
    Ext3xN ext4_dyn = std::span{exts_dyn};   // 動的要素数のみ設定
    assert(ext4_all == ext4_dyn);
  }
  // (5) : 要素数をarrayで設定するコンストラクタ
  {
    std::array exts_all{3, 4};
    std::array exts_dyn{4};
    Ext3xN ext5_all{ exts_all };  // 全次元を設定(explicit)
    Ext3xN ext5_dyn = exts_dyn;   // 動的要素数のみ設定
    assert(ext5_all == ext5_dyn);
  }
}
```

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


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [P2599R2 `index_type` & `size_type` in `mdspan`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2599r2.pdf)
