# conjugate_transposed
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class ElementType, class Extents, class Layout, class Accessor>
    constexpr auto conjugate_transposed(mdspan<ElementType, Extents, Layout, Accessor> a);
}
```
* Extents[link /reference/mdspan/extents.md]
* Layout[link /reference/mdspan/LayoutMappingPolicy.md]
* Accessor[link /reference/mdspan/AccessorPolicy.md]
* mdspan[link /reference/mdspan/mdspan.md]

## 概要
行列(matrix)を表現する2次元配列ビュー[`std::mdspan`](/reference/mdspan/mdspan.md)に対して、共役転置(conjugate transpose)を表現する新しい2次元配列ビューを作る。

本操作により`mdspan`参照先メモリブロックが書き換えられることはなく、戻り値`mdspan`を介した要素アクセス時に共役転置変換が行われる。


## 効果
以下と等価。
```cpp
return conjugated(transposed(a));
```
* conjugated[link conjugated.md]
* transposed[link transposed.md]


## 例
```cpp example
#include <cassert>
#include <complex>
#include <linalg>
#include <mdspan>

int main()
{
  std::complex<double> arr[] = {{1, 1}, {2, 2}, {3, 3}, {4, 4}};
  std::mdspan mat0{arr, 2, 2};
  // 1+i  2+2i
  // 3+3i 4+4i

  auto mat1 = std::linalg::conjugate_transposed(mat0);
  // 1-i  3-3i
  // 2-2i 4-4i
  assert(imag(mat1[1, 0]) == -3);

  // linalg::conjugate_transposed適用後のmdspan要素は読み取り専用となり、
  // 例えば mat1[0] = {0, 0}; はコンパイルエラーを引き起こす。
}
```
* std::linalg::conjugate_transposed[color ff0000]

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
