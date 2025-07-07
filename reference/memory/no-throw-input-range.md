# no-throw-input-range
* memory[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class R>
  concept no-throw-input-range =
    range<R> &&
    no-throw-input-iterator<iterator_t<R>> &&
    no-throw-sentinel<sentinel_t<R>, iterator_t<R>>;
}
```
* no-throw-input-iterator[link no-throw-input-iterator.md]
* no-throw-sentinel[link no-throw-sentinel.md]

## 概要

`no-throw-input-range`は、`R`型のオブジェクトに対する以下の操作で例外を投げない入力Rangeの説明用コンセプトである：

- [`std::ranges::begin`](/reference/ranges/begin.md)
- [`std::ranges::end`](/reference/ranges/end.md)


## 備考
- このコンセプトは、[`std::vector`](/reference/vector/vector.md)`<bool>`のような、プロキシオブジェクトを指すイテレータをもつ範囲を除外する


## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
