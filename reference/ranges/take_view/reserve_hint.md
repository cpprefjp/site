# reserve_hint
* ranges[meta header]
* std::ranges[meta namespace]
* take_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto reserve_hint();       // (1) C++26
constexpr auto reserve_hint() const; // (2) C++26
```

## 概要
要素数の近似値を取得する。

`take_view`は元のRangeから先頭 N 個を取り出すため、近似値も「元のRangeの`reserve_hint`と N の最小値」となる。元のRangeが[`approximately_sized_range`](/reference/ranges/approximately_sized_range.md)でない場合は N を返す。

`take_view`は`size`と同様、元のRangeが[`approximately_sized_range`](/reference/ranges/approximately_sized_range.md)でなくとも常に`reserve_hint`を提供する。


## 効果
以下と等価：

```cpp
if constexpr (approximately_sized_range<V>) {
  auto n = static_cast<range_difference_t<V>>(ranges::reserve_hint(base_));
  return to-unsigned-like(ranges::min(n, count_));
}
return to-unsigned-like(count_);
```
* approximately_sized_range[link /reference/ranges/approximately_sized_range.md]
* ranges::reserve_hint[link /reference/ranges/reserve_hint.md]
* ranges::min[link /reference/algorithm/ranges_min.md]
* range_difference_t[link /reference/ranges/range_difference_t.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P2846R6 `reserve_hint`: Eagerly reserving memory for not-quite-sized lazy ranges](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2846r6.pdf)
