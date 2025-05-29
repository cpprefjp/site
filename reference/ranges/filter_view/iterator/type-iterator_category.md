# iterator_category
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::iterator[meta class]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
using iterator_category = 以下参照; // (1) C++20
```

## 概要
イテレータの分類を表す型。

このメンバ型`iterator_concept`は、`V`が[`forward_ranges`](/reference/ranges/forward_range.md)コンセプトのモデルである場合にのみ、以下のように定義される。

- `C = iterator_traits<iterator_t<V>>::iterator_category;`であるとして、
- `C`が[`derived_from`](/reference/concepts/derived_from.md)`<`[`bidirectional_iterator_tag`](/reference/iterator/iterator_tag.md)`>`のモデルである場合、`iterator_category`は[`bidirectional_iterator_tag`](/reference/iterator/iterator_tag.md)となる
- そうでない場合、`C`が[`derived_from`](/reference/concepts/derived_from.md)`<`[`forward_iterator_tag`](/reference/iterator/iterator_tag.md)`>`のモデルである場合、`iterator_category`は[`forward_iterator_tag`](/reference/iterator/iterator_tag.md)となる
- そうでない場合、`iterator_category`は`C`となる


## バージョン
### 言語
- C++20
