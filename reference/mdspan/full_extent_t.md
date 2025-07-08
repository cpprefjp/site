# full_extent_t
* mdspan[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  struct full_extent_t { explicit full_extent_t() = default; };

  inline constexpr full_extent_t full_extent{};
}
```

## 概要
`full_extent_t`は、多次元配列の特定次元に対して全要素取り出しを指示するためのタグ型である。

`full_extent_t`型の定数`full_extent`が提供される。


## 例
```cpp example
#include <mdspan>
#include <print>

int main()
{
  int arr[] = {1, 2, 3, 4, 5, 6};

  // 2x3要素の2次元配列ビュー
  using Ext2x3 = std::extents<size_t, 2, 3>;
  std::mdspan<int, Ext2x3> mat{arr};
  // i/j ->
  // |  1 2 3
  // V  4 5 6

  // i=1行を3要素の1次元ビューとして抽出
  auto row1 = std::submdspan(mat, 1, std::full_extent);
  std::println("row[1]:");
  for (size_t i = 0; i < row1.extent(0); i++) {
    std::print(" {}", row1[i]);
  }

  // j=1列を2要素の1次元ビューとして抽出
  auto col1 = std::submdspan(mat, std::full_extent, 1);
  std::println("\ncol[1]:");
  for (size_t i = 0; i < col1.extent(0); i++) {
    std::print(" {}", col1[i]);
  }
}
```
* std::full_extent[color ff0000]
* std::submdspan[link submdspan.md]
* extent[link mdspan/extent.md]
* std::print[link /reference/print/print.md]

### 出力
```
row[1]:
 4 5 6
col[1]:
 2 5
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
- [`submdspan`](submdspan.md)


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
