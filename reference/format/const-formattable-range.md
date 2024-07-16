# const-formattable-range
* format[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class R, class charT>
  concept const-formattable-range =
    ranges::input_range<const R> &&
    formattable<ranges::range_reference_t<const R>, charT>;
}
```
* ranges::input_range[link /reference/ranges/input_range.md]
* formattable[link formattable.md]
* ranges::range_reference_t[link /reference/ranges/range_reference_t.md]

## 概要
`const-formattable-range`は、`const R`入力Rangeの要素型が文字列フォーマット可能であることを表す説明専用コンセプトである。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`fmt-maybe-const`](fmt-maybe-const.md)


## 参照
- [P2286R8 Formatting Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2286r8.html)
