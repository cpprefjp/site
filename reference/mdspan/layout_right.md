# layout_right
* mdspan[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  struct layout_right {
    template<class Extents>
    class mapping;
  };
}
```
* Extents[link extents.md]
* mapping[link layout_right/mapping.md]

## 概要
`layout_right`は、多次元配列ビュー[`mdspan`](mdspan.md)に対して、C/C++多次元配列と互換性のある行優先(row major)[レイアウトマッピング](LayoutMapping.md)を表現するポリシークラスである。

`layout_right`は、[レイアウトマッピングポリシー要件](LayoutMappingPolicy.md)を満たす[トリビアル型](/reference/type_traits/is_trivial.md)である。

ポリシークラス名の由来は、多次元インデクスのうち最右次元が隣接配置（ストライド幅=1）され、インデクス次元の右から左の順にストライド幅が増大するところから来ている。


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`mapping`](layout_right/mapping.md) | レイアウトマッピング | C++23 |


## 例
```cpp example
#include <mdspan>
#include <iostream>

int main()
{
  double arr[] = {1, 2, 3, 4, 5, 6};

  // 要素数2x3の2次元配列／行優先レイアウト
  using Ext2x3 = std::extents<size_t, 2, 3>;
  std::mdspan<double, Ext2x3, std::layout_right> mat{arr};

  for (size_t i = 0; i < mat.extent(0); ++i) {
    for (size_t j = 0; j < mat.extent(1); ++j) {
      std::cout << (j ? " " : "") << mat[i, j];
    }
    std::cout << "\n";
  }
}
```
* std::layout_right[color ff0000]
* extent[link mdspan/extent.md]

### 出力
```
1 2 3
4 5 6
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
- [`layout_left`](layout_left.md)
- [`layout_stride`](layout_stride.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
