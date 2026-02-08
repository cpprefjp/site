# index-pair-like
* [meta exposition-only]
* mdspan[meta header]
* concept[meta id-type]
* cpp26[meta cpp]

```cpp
template<class T, class IndexType>
concept index-pair-like =                        // exposition only
  pair-like<T> &&
  convertible_to<tuple_element_t<0,T>, IndexType> &&
  convertible_to<tuple_element_t<1,T>, IndexType>;
```
* pair-like[link /reference/tuple/pair-like.md]

## 概要
`index-pair-like`は、インデクス値ペアと互換があることを表す説明専用コンセプトである。


## バージョン
### 言語
- C++26


## 参照
- [P2630R4 Submdspan](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2630r4.html)
