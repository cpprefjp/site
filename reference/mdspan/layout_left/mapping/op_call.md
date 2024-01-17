# operator()
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* layout_left::mapping[meta class]
* cpp23[meta cpp]

```cpp
template<class... Indices>
constexpr index_type operator()(Indices... i) const noexcept;
```

## 概要
多次元インデクス値`i...`に対応する要素位置を求める。


## テンプレートパラメータ制約
- `sizeof...(Indices) ==` [`extents_tyoe::rank()`](../../extents/rank.md)が`true`、かつ
- `(`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<Indices, index_type> && ...)`が`true`、かつ
- `(`[`is_nothrow_constructible_v`](/reference/type_traits/is_nothrow_constructible.md)`<index_type, Indices> && ...)`が`true`であること。


## 事前条件
多次元インデクス値[`extents_type::index-cast(i)`](../../extents/index-cast.md)は、多次元配列サイズ`extents_`における有効なインデクスであること。


## 戻り値
説明用のパラメータパック`P`において、[`is_same_v`](/reference/type_traits/is_same.md)`<`[`index_sequence_for`](/reference/utility/index_sequence_for.md)`<Indices...>,` [`index_sequence`](/reference/utility/index_sequence.md)`<P...>>`が`true`となるとき、以下と等価。

```cpp
return ((static_cast<index_type>(Indices...) * stride(P)) + ... + 0);
```
* stride[link stride.md]


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <mdspan>

int main()
{
  using Ext3x4 = std::extents<size_t, 3, 4>;
  using Mapping3x4 = std::layout_left::mapping<Ext3x4>;
  Mapping3x4 map;
  assert(map(0,0) == 0);
  assert(map(0,1) == 3);
  assert(map(1,0) == 1);
  assert(map(2,3) == 11);
}
```
* std::extents[link ../../extents.md]
* std::layout_left::mapping[link ../mapping.md]

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
