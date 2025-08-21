# iterator_concept
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::iterator[meta class]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
using iterator_concept = 以下参照; // (1) C++20
```

## 概要
イテレータコンセプトを表す型。

- `V`が[`bidirectional_range`](/reference/ranges/bidirectional_range.md)コンセプトのモデルである場合、[`bidirectional_iterator_tag`](/reference/iterator/iterator_tag.md)
- `V`が[`forward_range`](/reference/ranges/forward_range.md)コンセプトのモデルである場合、[`forward_iterator_tag`](/reference/iterator/iterator_tag.md)
- そうでない場合、[`input_iterator_tag`](/reference/iterator/iterator_tag.md)


## バージョン
### 言語
- C++20
