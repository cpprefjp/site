# is-mdspan
* [meta exposition-only]
* linalg[meta header]
* variable[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T>
constexpr bool is-mdspan = false;

template<class ElementType, class Extents, class Layout, class Accessor>
constexpr bool is-mdspan<mdspan<ElementType, Extents, Layout, Accessor>> = true;
```

## 概要
与えられた型が[`mdspan`](/reference/mdspan.md)の特殊化かどうかを表す、説明専用の定数である。


## 戻り値
与えられた型が`mdspan`の場合、`true`を返す。そうでない場合は、`false`を返す。


## バージョン
### 言語
- C++26


## 関連項目
- [`mdspan`](/reference/mdspan.md)


## 参照
- [P1673R13 A free function linear algebra interface based on the BLAS](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p1673r13.html)
