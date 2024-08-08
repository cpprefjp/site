# possibly-packed-inout-matrix
* linalg[meta header]
* concept[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
constexpr bool is-layout-blas-packed = false;

template<class Triangle, class StorageOrder>
constexpr bool is-layout-blas-packed<layout_blas_packed<Triangle, StorageOrder>> = true;

template<class T>
concept possibly-packed-inout-matrix =
  is-mdspan<T> && T::rank() == 2 &&
  is_assignable_v<typename T::reference, typename T::element_type> &&
  (T::is_always_unique() || is-layout-blas-packed<typename T::layout_type>);
```
* layout_blas_packed[link layout_blas_packed.md]
* is-mdspan[link is-mdspan.md]
* rank[link /reference/mdspan/mdspan/rank.md]
* is_assignable_v[link /reference/type_traits/is_assignable.md]
* is_always_unique[link /reference/mdspan/mdspan.md]

## 概要
型`T`が行列（2次元[`mdspan`](/reference/mdspan/mdspan.md)）であり、そのレイアウトが[`layout_blas_packed`](layout_blas_packed.md)である可能性を表す、説明専用のコンセプトである。

入出力パラメータを表しており、要素の読み取りと演算結果の書き出しが行われる。

関数仕様で明示されない限り、`possibly-packed-inout-matrix`で制約される`mdspan`型引数は、同関数の他`mdspan`引数のエイリアスであってはならない。


## バージョン
### 言語
- C++26


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
