# operator==
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* layout_right::mapping[meta class]
* cpp23[meta cpp]

```cpp
template<class OtherExtents>
friend constexpr bool operator==(
  const mapping& x, const mapping<OtherExtents>& y) noexcept;

//operator==により、以下のオーバーロードが使用可能になる        
template<class OtherExtents>
friend constexpr bool operator!=(
  const mapping& x, const mapping<OtherExtents>& y) noexcept;
```

## 概要
`mapping`の等値比較を行う。


## テンプレートパラメータ制約
`extents_type::`[`rank()`](../../extents/rank.md) `== OtherExtents::`[`rank()`](../../extents/rank.md)


## 戻り値
[`x.extents() == y.extents()`](../../extents/op_equal.md)


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <mdspan>

int main()
{
  using Ext3x4 = std::extents<size_t, 3, 4>;
  using Mapping3x4 = std::layout_right::mapping<Ext3x4>;
  Mapping3x4 map1;

  using Ext3xN = std::extents<size_t, 3, std::dynamic_extent>;
  using Mapping3xN = std::layout_right::mapping<Ext3xN>;
  Mapping3xN map2{Ext3xN{4}};

  assert(map1 == map2);
}
```
* ==[color ff0000]
* std::extents[link ../../extents.md]
* std::layout_right::mapping[link ../mapping.md]


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
