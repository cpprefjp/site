# layout_blas_packed
* linalg[meta header]
* class template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class Triangle, class StorageOrder>
  class layout_blas_packed;
}
```

## 概要
`layout_blas_packed`は、多次元配列ビュー[`mdspan`](/reference/mdspan/mdspan.md)を用いた正方行列(square matrix)に対して、BLASにおけるパックレイアウトと互換性のある行列要素配置を表現する[レイアウトマッピングポリシー](/reference/mdspan/LayoutMappingPolicy.md)クラスである。

- `Triangle` : 指定する行列要素の種別を、上三角[`upper_triangle_t`](upper_triangle_t.md.nolink)または下三角[`lower_triangle_t`](lower_triangle_t.md.nolink)から指定する。
- `StorageOrder` : 行列要素の格納順を、列優先[`column_major_t`](column_major_t.md.nolink)または行優先[`row_major_t`](row_major_t.md.nolink)から指定する。

`layout_blas_packed`を用いて、BLASの Symmetric Packed (SP), Hermitian Packed (HP), Triangular Packed (TP) 行列レイアウトを表現できる。


## 適格要件
- `Triangle`は[`upper_triangle_t`](upper_triangle_t.md.nolink)または[`lower_triangle_t`](lower_triangle_t.md.nolink)のいずれか
- `StorageOrder`は[`column_major_t`](column_major_t.md.nolink)または[`row_major_t`](row_major_t.md.nolink)のいずれか


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `triangle_type` | `Triangle` | C++26 |
| `storage_order_type` | `StorageOrder` | C++26 |
| [`mapping`](layout_blas_packed/mapping.md) | レイアウトマッピング | C++26 |


## 例
```cpp example
#include <linalg>
#include <mdspan>
#include <print>
namespace linalg = std::linalg;

int main()
{
  double arr[] = {1, 2, 3, 4, 5, 6};

  // 行優先レイアウトの下三角要素から3x3対称行列を構築
  std::mdspan<
    double,
    std::extents<size_t, 3, 3>,
    linalg::layout_blas_packed<linalg::lower_triangle, linalg::column_major>
  > mat{arr};
  // 1 . .
  // 2 4 .
  // 3 5 6

  for (size_t i = 0; i < mat.extent(0); i++) {
    for (size_t j = 0; j < mat.extent(1); j++) {
      std::print(" {}", mat[i, j]);
    }
    std::println("");
  }
}
```
* linalg::layout_blas_packed[color ff0000]
* linalg::lower_triangle[link lower_triangle_t.md.nolink]
* linalg::column_major[link column_major_t.md.nolink]
* mat.extent[link /reference/mdspan/mdspan/extent.md]
* std::print[link /reference/print/print.md]
* std::println[link /reference/print/println.md]


### 出力
```
 1 2 3
 2 4 5
 3 5 6
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
- [`mdspan`](/reference/mdspan/mdspan.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
- [P1674R2: Evolving a Standard C++ Linear Algebra Library from the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1674r2.html)
