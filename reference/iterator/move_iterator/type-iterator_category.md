# iterator_category
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* type-alias[meta id-type]
* cpp11[meta cpp]

```cpp
using iterator_category = 以下参照; // (1) C++11
```

## 概要
イテレータの分類を表す型。

- C++11:
    - [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::iterator_category`
- C++20:
    - [`iterator_traits`](/reference/iterator/iterator_traits.md)`<Iterator>::iterator_category`
    - ただし、[`contiguous_iterator_tag`](/reference/iterator/iterator_tag.md)となる場合は[`random_access_iterator_tag`](/reference/iterator/iterator_tag.md)


## バージョン
### 言語
- C++11

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
