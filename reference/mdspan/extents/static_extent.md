# static_extent
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* extents[meta class]
* cpp23[meta cpp]

```cpp
static constexpr size_t static_extent(rank_type i) noexcept;
```

## 概要
多次元配列サイズのうち`i`番目次元の静的要素数を取得する。


## 事前条件
`i <` [`rank()`](rank.md)


## 戻り値
`i`番目次元の静的要素数。同次元が動的要素数の場合は[`std::dynamic_extent`](/reference/span/dynamic_extent.md)を返す。


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <mdspan>

int main()
{
  using Ext3x4 = std::extents<size_t, 3, 4>;
  static_assert(Ext3x4::static_extent(0) == 3);
  static_assert(Ext3x4::static_extent(1) == 4);
  Ext3x4 ext1;
  assert(ext1.extent(0) == 3);
  assert(ext1.extent(1) == 4);

  using Ext3xN = std::extents<size_t, 3, std::dynamic_extent>;
  static_assert(Ext3xN::static_extent(0) == 3);
  static_assert(Ext3xN::static_extent(1) == std::dynamic_extent);
  Ext3xN ext2{10};
  assert(ext2.extent(0) == 3);
  assert(ext2.extent(1) == 10);
}
```
* static_extent[color ff0000]
* extent[link extent.md]

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
- [`extent`](extent.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
