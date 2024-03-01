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
`layout_blas_packed`は、多次元配列ビュー[`mdspan`](/reference/mdspan/mdspan.md)を用いた正方行列(square matrix)に対して、BLASにおけるパックレイアウトと互換性のある行列要素メモリ配置を表現する[レイアウトマッピングポリシー](/reference/mdspan/LayoutMappingPolicy.md)クラスである。

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
#include <string_view>
namespace linalg = std::linalg;

// 行列(matrix)の要素表示
template <class T, class E, class L, class A>
void print_mat(std::string_view name, const std::mdspan<T, E, L, A>& mat)
{
  static_assert(mat.rank() == 2);
  std::println("{}:", name);
  for (size_t i = 0; i < mat.extent(0); ++i) {
    for (size_t j = 0; j < mat.extent(1); ++j) {
      std::print(" {:2}", mat[i, j]);
    }
    std::println("");
  }
}

int main()
{
  double arr[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  // 列優先格納順の下三角要素から4x4対称行列を構築
  std::mdspan<
    double,
    std::extents<size_t, 4, 4>,
    linalg::layout_blas_packed<linalg::lower_triangle_t, linalg::column_major_t>
  > mat1{arr};
  // 1 - -  -
  // 2 5 -  -
  // 3 6 8  -
  // 4 7 9 10
  print_mat("mat1", mat);

  // 行優先格納順の下三角要素から4x4対称行列を構築
  std::mdspan<
    double,
    std::extents<size_t, 4, 4>,
    linalg::layout_blas_packed<linalg::lower_triangle_t, linalg::row_major_t>
  > mat2{arr};
  // 1 - -  -
  // 2 3 -  -
  // 4 5 6  -
  // 7 8 9 10
  print_mat("mat2", mat2);
}
```
* linalg::layout_blas_packed[color ff0000]
* linalg::lower_triangle_t[link lower_triangle_t.md.nolink]
* linalg::column_major_t[link column_major_t.md.nolink]
* linalg::row_major_t[link row_major_t.md.nolink]
* mat.extent[link /reference/mdspan/mdspan/extent.md]
* std::print[link /reference/print/print.md]
* std::println[link /reference/print/println.md]

### 出力
```
mat1:
  1  2  3  4
  2  5  6  7
  3  6  8  9
  4  7  9 10
mat2:
  1  2  4  7
  2  3  5  8
  4  5  6  9
  7  8  9 10
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