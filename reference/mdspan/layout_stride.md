# layout_stride
* mdspan[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  struct layout_stride {
    template<class Extents>
    class mapping;
  };
}
```
* Extents[link extents.md]
* mapping[link mapping.md.nolink]

## 概要
`layout_stride`は、多次元配列ビュー[`mdspan`](mdspan.md)に対して、次元毎に任意ストライド幅を指定した[レイアウトマッピング](LayoutMapping.md)を表現するポリシークラスである。

`layout_stride`は、[レイアウトマッピングポリシー要件](LayoutMappingPolicy.md)を満たす[トリビアル型](/reference/type_traits/is_trivial.md)である。


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`mapping`](mapping.md.nolink) | レイアウトマッピング | C++23 |


## 例
```cpp example
#include <array>
#include <mdspan>
#include <iostream>

int main()
{
  double arr[] = {1, 2, 3, 0, 4, 5, 6, 0};

  // 要素数2x3の2次元配列／行優先かつパディングありレイアウト
  using Ext2x3 = std::extents<size_t, 2, 3>;
  std::array<int, 2> strides{4, 1};
  std::layout_stride::mapping<Ext2x3> mapping{{}, strides};
  std::mdspan<double, Ext2x3, std::layout_stride> mat{arr, mapping};

  for (size_t i = 0; i < mat.extent(0); ++i) {
    for (size_t j = 0; j < mat.extent(1); ++j) {
      std::cout << (j ? " " : "") << mat[i, j];
    }
    std::cout << "\n";
  }
}
```
* std::layout_stride[color ff0000]
* std::mdspan[link mdspan.md]
* std::extents[link extents.md]

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
- [`layout_right`](layout_right.md)


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
