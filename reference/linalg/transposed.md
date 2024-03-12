# transposed
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class ElementType, class Extents, class Layout, class Accessor>
    constexpr auto transposed(mdspan<ElementType, Extents, Layout, Accessor> a);
}
```
* Extents[link /reference/mdspan/extents.md]
* Layout[link /reference/mdspan/LayoutMappingPolicy.md]
* Accessor[link /reference/mdspan/AccessorPolicy.md]
* mdspan[link /reference/mdspan/mdspan.md]

## 概要
行列(matrix)を表現する2次元配列ビュー[`std::mdspan`](/reference/mdspan/mdspan.md)に対して、転置行列(transposed matrix)を表現する新しい2次元配列ビューを作る。

本操作により`mdspan`参照先メモリブロックが書き換えられることはなく、戻り値`mdspan`を介した要素アクセス時に行／列を入れ替える転置操作が行われる。


## 適格要件
[`Extents::rank()`](/reference/mdspan/extents/rank.md) `== 2`


## 戻り値
説明用の型`ReturnExtents`を[`transpose-extents-t`](layout_transpose/transpose-extents.md)`<Extents>`、型`R`を[`mdspan`](/reference/mdspan/mdspan.md)`<ElementType, ReturnExtents, ReturnLayout, Accessor>`、型`ReturnLayout`を下記の通りとする。

- `Layout`が[`layout_left`](/reference/mdspan/layout_left.md)のとき、[`layout_right`](/reference/mdspan/layout_right.md)
- `Layout`が[`layout_right`](/reference/mdspan/layout_right.md)のとき、[`layout_left`](/reference/mdspan/layout_left.md)
- `Layout`が[`layout_stride`](/reference/mdspan/layout_stride.md)のとき、`layout_stride`
- `Layout`が[`layout_blas_packed`](layout_blas_packed.md)`<Triangle, StorageOrder>`のとき、`layout_blas_packed<OppositeTriangle, OppositeStorageOrder>`
    - `OppositeTriangle`は[`conditional_t`](/reference/type_traits/conditional.md)`<`[`is_same_v`](/reference/type_traits/is_same.md)`<Triangle, upper_triangle_t>, lower_triangle_t, upper_triangle_t>`
    - `OppositeStorageOrder`は[`conditional_t`](/reference/type_traits/conditional.md)`<`[`is_same_v`](/reference/type_traits/is_same.md)`<StorageOrder, column_major_t>, row_major_t, column_major_t>`
- `Layout`が[`layout_transpose`](layout_transpose.md)`<NestedLayout>`のとき、`NestedLayout`
- そうでなければ、[`layout_transpose`](layout_transpose.md)`<Layout>`

型`ReturnMapping`を`ReturnLayout::mapping<ReturnExtents>`として、次の値を返す。

- `Layout`が[`layout_left`](/reference/mdspan/layout_left.md)または[`layout_right`](/reference/mdspan/layout_right.md)または[`layout_blas_packed`](layout_blas_packed.md)の特殊化であるとき、

    ```cpp
    R(a.data_handle(),
      ReturnMapping(transpose-extents(a.mapping().extents())),
      a.accessor())
    ```
    * transpose-extents[link layout_transpose/transpose-extents.md]

- `Layout`が[`layout_stride`](/reference/mdspan/layout_stride.md)の特殊化であるとき、

    ```cpp
    R(a.data_handle(),
      ReturnMapping(transpose-extents(a.mapping().extents()),
                    array{a.mapping().stride(1), a.mapping().stride(0)}),
      a.accessor())
    ```
    * transpose-extents[link layout_transpose/transpose-extents.md]

- `Layout`が[`layout_transpose`](layout_transpose.md)の特殊化であるとき、

    ```cpp
    R(a.data_handle(), a.mapping().nested_mapping(), a.accessor())
    ```

- それ以外のとき、

    ```cpp
    R(a.data_handle(), ReturnMapping(a.mapping()), a.accessor())
    ```


## 例
```cpp example
#include <cassert>
#include <linalg>
#include <mdspan>

int main()
{
  int arr[] = {1, 2, 3, 4, 5, 6};

  std::mdspan mat0{arr, 2, 3};
  assert(mat0.extent(0) == 2 && mat0.extent(1) == 3);
  // 1 2
  // 3 4
  // 5 6

  auto mat1 = std::linalg::transposed(mat0);
  assert(mat1.extent(0) == 3 && mat1.extent(1) == 2);
  // 1 3 5
  // 2 4 6

  // transposed戻り値は書き換え可能なmdspan
  mat0[1, 2] = 42;  // 6 -> 42
  asssert((mat1[2, 1] == 42));
}
```
* std::linalg::transposed[color ff0000]

### 出力
```
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
