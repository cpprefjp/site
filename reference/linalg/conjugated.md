# conjugated
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class ElementType, class Extents, class Layout, class Accessor>
    constexpr auto conjugated(mdspan<ElementType, Extents, Layout, Accessor> a);
}
```
* Extents[link /reference/mdspan/extents.md]
* Layout[link /reference/mdspan/LayoutMappingPolicy.md]
* Accessor[link /reference/mdspan/AccessorPolicy.md]
* mdspan[link /reference/mdspan/mdspan.md]

## 概要
多次元配列ビュー[`std::mdspan`](/reference/mdspan/mdspan.md)に対して、要素値の複素共役変換を行なった新しい多次元配列ビューを作る。

本操作により`mdspan`参照先メモリブロックが書き換えられることはなく、戻り値`mdspan`を介した要素アクセス時に複素共役変換が行われる。


## 戻り値
説明用の型`A`を下記の通りとする。

- `Accessor`が[`conjugated_accessor`](conjugated_accessor.md)の特殊化のとき、[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype(a.accessor().nested_accessor())>`
- [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<ElementType>`が算術型のとき、`Accessor`
- [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<ElementType>`と等価な型`T`となる任意の部分式`E`に対して、宣言`template<class T> conj(const T&) = delete;`を含むコンテキストでオーバーロード解決が行わた結果`conj(E)`が有効な式ではないとき、`Accessor`
- そうでなければ、[`conjugated_accessor<Accessor>`](conjugated_accessor.md)

戻り値は下記の通り。

- `Accessor`が[`conjugated_accessor`](conjugated_accessor.md)の特殊化のとき、
    ```cpp
    mdspan<typename A::element_type, Extents, Layout, A>(
      a.data_handle(), a.mapping(), a.accessor().nested_accessor())
    ```
    * mdspan[link /reference/mdspan/mdspan.md]
    * Extents[link /reference/mdspan/extents.md]
    * Layout[link /reference/mdspan/LayoutMappingPolicy.md]

- [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<ElementType>`が算術型のとき、`a`
- [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<ElementType>`と等価な型`T`となる任意の部分式`E`に対して、宣言`template<class T> conj(const T&) = delete;`を含むコンテキストでオーバーロード解決が行わた結果`conj(E)`が有効な式ではないとき、`a`
- そうではないとき、
    ```cpp
    mdspan<typename A::element_type, Extents, Layout, A>(
      a.data_handle(), a.mapping(), conjugated_accessor(a.accessor()))
    ```
    * mdspan[link /reference/mdspan/mdspan.md]
    * Extents[link /reference/mdspan/extents.md]
    * Layout[link /reference/mdspan/LayoutMappingPolicy.md]


## 例
```cpp example
#include <cassert>
#include <complex>
#include <linalg>
#include <mdspan>

int main()
{
  std::complex<double> arr[] = {{1, 1}, {2, 2}, {3, 3}};
  std::mdspan vec0{arr, 3};
  // 1+i 2+2i 3+3i

  auto vec1 = std::linalg::conjugated(vec0);
  // 1-i 2-2i 3-3i
  assert(real(vec1[0]) == 1 && imag(vec1[0]) == -1);

  // linalg::conjugated適用後のmdspan要素は読み取り専用となり、
  // 例えば vec1[0] = {4, 4}; はコンパイルエラーを引き起こす。
}
```
* std::linalg::conjugated[color ff0000]

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
- [P3050R2 Fix C++26 by optimizing linalg::conjugated for noncomplex value types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3050r2.html)
