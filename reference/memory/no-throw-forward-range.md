# no-throw-forward-range
* [meta exposition-only]
* memory[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class R>
  concept no-throw-forward-range =
    no-throw-input-range<R> &&
    no-throw-forward-iterator<iterator_t<R>>;
}
```
* no-throw-input-range[link no-throw-input-range.md]
* no-throw-forward-iterator[link no-throw-forward-iterator.md]

## 概要

`no-throw-forward-range`は、`R`型のオブジェクトに対する以下の操作で例外を投げない入力Rangeの説明用コンセプトである：

- [`std::ranges::begin`](/reference/ranges/begin.md)
- [`std::ranges::end`](/reference/ranges/end.md)


## 備考
- このコンセプトは[`forward_iterator`](/reference/iterator/forward_iterator.md)のいくつかの操作で例外を投げることを許可する
- このコンセプトは、[`std::vector`](/reference/vector/vector.md)`<bool>`のような、プロキシオブジェクトを指すイテレータをもつ範囲を除外する


## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
