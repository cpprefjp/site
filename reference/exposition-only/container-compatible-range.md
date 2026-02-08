# container-compatible-range
* [meta exposition-only]
* exposition-only[meta header]
* concept[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class R, class T>
  concept container-compatible-range =
    ranges::input_range<R> && convertible_to<ranges::range_reference_t<R>, T>;
}
```
* ranges::input_range[link /reference/ranges/input_range.md]
* ranges::range_reference[link /reference/ranges/range_reference_t.md]

## 概要
container-compatible-rangeは、指定されたコンテナと互換性のあるRangeであることを表すコンセプトである。


## バージョン
### 言語
- C++23


## 参照
- [P1206R7 `ranges::to`: A function to convert any range to a container](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1206r7.pdf)
