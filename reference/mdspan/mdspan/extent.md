# extent
* mdspan[meta header]
* function[meta id-type]
* std[meta namespace]
* mdspan[meta class]
* cpp23[meta cpp]

```cpp
constexpr index_type extent(rank_type r) const noexcept;
```

## 概要
指定次元の要素数を取得する。


## 戻り値
[`extents().extent(r)`](../extents/extent.md)


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <mdspan>

int main()
{
  int arr[] = {1, 2, 3, 4, 5, 6};
  // 動的要素数 2x3 の2次元配列ビュー
  std::mdspan<int, std::dextents<size_t, 2>> mat{arr, 2, 3};

  static_assert(mat.static_extent(1) == std::dynamic_extent);
  assert(mat.extent(1) == 3);
}
```
* extent[color ff0000]
* std::mdspan[link ../mdspan.md]
* std::dextents[link ../extents.md]
* static_extent[link static_extent.md]

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
- [`static_extent()`](static_extent.md)
- [`extents`](../extents.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
