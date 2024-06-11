# size
* ranges[meta header]
* std::ranges[meta namespace]
* iota_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto size() const
  requires (same_as<W, Bound> && advanceable<W>) || (integral<W> && integral<Bound>) || sized_sentinel_for<Bound, W>;
```
* integral[link /reference/concepts/same_as.md]
* advanceable[italic][link iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]

## 概要
[`iota_view`](../iota_view.md)の大きさを取得する。

この関数は、[`iota_view`](../iota_view.md)が[`sized_range`](../sized_range.md)のときのみオーバーロード解決に参加する。

## 効果

```cpp
if constexpr (is-integer-like<W> && is-integer-like<Bound>)
  return (value_ < 0)
    ? ((bound_ < 0)
      ? to-unsigned-like(-value_) - to-unsigned-like(-bound_)
      : to-unsigned-like(bound_) + to-unsigned-like(-value_))
    : to-unsigned-like(bound_) - to-unsigned-like(value_);
else
  return to-unsigned-like(bound_ - value_);
```
* to-unsigned-like[italic]
* is-integer-like[link /reference/iterator/is_integer_like.md]

`to-unsigned-like`は、処理系定義の型(例えば128ビット整数など)も含めて、符号なし整数へ変換する説明専用の関数。

## 例
```cpp example
#include <ranges>

int main()
{
  constexpr std::ranges::iota_view iota{0, 5};
  static_assert(iota.size() == 5);
  static_assert(std::same_as<decltype(iota.size()), unsigned int>);
}
```

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
