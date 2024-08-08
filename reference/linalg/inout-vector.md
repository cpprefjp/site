# in-vector, out-vector, inout-vector
* linalg[meta header]
* concept[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
concept in-vector =
  is-mdspan<T> && T::rank() == 1;

template<class T>
concept out-vector =
  is-mdspan<T> && T::rank() == 1 &&
  is_assignable_v<typename T::reference, typename T::element_type> && T::is_always_unique();

template<class T>
concept inout-vector =
  is-mdspan<T> && T::rank() == 1 &&
  is_assignable_v<typename T::reference, typename T::element_type> && T::is_always_unique();
```
* is-mdspan[link is-mdspan.md]
* rank[link /reference/mdspan/mdspan/rank.md]
* is_assignable_v[link /reference/type_traits/is_assignable.md]
* is_always_unique[link /reference/mdspan/mdspan.md]

## 概要
型`T`がベクトル（1次元[`mdspan`](/reference/mdspan/mdspan.md)）であることを表す、説明専用のコンセプトである。

- `in-vector` : 入力パラメータを表す。アルゴリズム内で`mdspan`要素が更新されることはない。
- `out-vector` : 出力パラメータを表す。演算結果の書き出しが行われる。
- `inout-vector` : 入出力パラメータを表す。要素の読み取りと演算結果の書き出しが行われる。

関数仕様で明示されない限り、`out-vector`および`inout-vector`で制約される`mdspan`型引数は、同関数の他`mdspan`引数のエイリアスであってはならない。


## バージョン
### 言語
- C++26


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
