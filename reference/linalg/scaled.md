# scaled
* linalg[meta header]
* function template[meta id-type]
* std::linalg[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::linalg {
  template<class ScalingFactor,
           class ElementType, class Extents, class Layout, class Accessor>
  constexpr auto scaled(ScalingFactor alpha, mdspan<ElementType, Extents, Layout, Accessor> x);
}
```
* Extents[link /reference/mdspan/extents.md]
* Layout[link /reference/mdspan/LayoutMappingPolicy.md]
* Accessor[link /reference/mdspan/AccessorPolicy.md]
* mdspan[link /reference/mdspan/mdspan.md]

## 概要
多次元配列ビュー[`std::mdspan`](/reference/mdspan/mdspan.md)に対して、要素値がスカラー倍された新しい多次元配列ビューを作る。

本操作により`mdspan`参照先メモリブロックが書き換えられることはなく、戻り値`mdspan`を介した要素アクセス時にスケーリング係数の乗算が行われる。


## 戻り値
説明用の型`SA`を[`scaled_accessor`](scaled_accessor.md)`<ScalingFactor, Accessor>`として、次の値を返す。

```cpp
mdspan<typename SA::element_type, Extents, Layout, SA>(
  x.data_handle(), x.mapping(), SA(alpha, x.accessor()))
```
* mdspan[link /reference/mdspan/mdspan.md]
* Extents[link /reference/mdspan/extents.md]
* Layout[link /reference/mdspan/LayoutMappingPolicy.md]


## 例
```cpp example
#include <cassert>
#include <linalg>
#include <mdspan>

int main()
{
  int arr[] = {1, 2, 3, 4};
  std::mdspan vec0{arr, 4};
  // 1 2 3 4

  auto vec1 = std::linalg::scaled(2, vec0);
  // 2 4 6 8
  assert(vec1[0] == 2);

  // linalg::scaled適用後のmdspan要素は読み取り専用となり、
  // 例えば vec1[0] = 42; はコンパイルエラーを引き起こす。
}
```
* std::linalg::scaled[color ff0000]

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
