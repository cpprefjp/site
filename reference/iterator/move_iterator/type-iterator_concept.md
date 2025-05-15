# iterator_concept
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* type-alias[meta id-type]
* cpp20[meta cpp]

```cpp
using iterator_concept = 以下参照; // (1) C++20
```

## 概要
イテレータコンセプトを表す型。

- C++20:
    - [`input_iterator_tag`](/reference/iterator/iterator_tag.md)
- C++23:
    - `Iterator`が[`random_access_iterator`](/reference/iterator/random_access_iterator.md)コンセプトのモデルである場合、[`random_access_iterator_tag`](/reference/iterator/iterator_tag.md)
    - `Iterator`が[`bidirectional_iterator`](/reference/iterator/bidirectional_iterator.md)コンセプトのモデルである場合、[`bidirectional_iterator_tag`](/reference/iterator/iterator_tag.md)
    - `Iterator`が[`forward_iterator`](/reference/iterator/forward_iterator.md)コンセプトのモデルである場合、[`forward_iterator_tag`](/reference/iterator/iterator_tag.md)
    - そうでない場合、[`input_iterator_tag`](/reference/iterator/iterator_tag.md)


## バージョン
### 言語
- C++20

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
- [P2520R0 `move_iterator<T*>` should be a random access iterator](https://wg21.link/p2520r0)
    - C++23で`iterator_concept`がランダムアクセスイテレータにできるようになった
