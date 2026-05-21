# reserve_hint
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto reserve_hint()
  requires approximately_sized_range<V>;       // (1) C++26

constexpr auto reserve_hint() const
  requires approximately_sized_range<const V>; // (2) C++26
```
* approximately_sized_range[link /reference/ranges/approximately_sized_range.md]

## 概要
要素数の近似値を取得する。

`adjacent_view`は元のRangeから N 個の連続する要素のタプルを生成するため、要素数の近似値は「元のRangeの`reserve_hint` − N + 1」（負になる場合は 0）となる。


## テンプレートパラメータ制約
- (1) : 型`V`が[`approximately_sized_range`](/reference/ranges/approximately_sized_range.md)であること
- (2) : 型`const V`が[`approximately_sized_range`](/reference/ranges/approximately_sized_range.md)であること


## 効果
以下と等価：

```cpp
using DT = range_difference_t<decltype((base_))>;
using CT = common_type_t<DT, size_t>;
auto sz = static_cast<CT>(ranges::reserve_hint(base_));
sz -= std::min<CT>(sz, N - 1);
return to-unsigned-like(sz);
```
* ranges::reserve_hint[link /reference/ranges/reserve_hint.md]
* range_difference_t[link /reference/ranges/range_difference_t.md]
* common_type_t[link /reference/type_traits/common_type.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P2846R6 `reserve_hint`: Eagerly reserving memory for not-quite-sized lazy ranges](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2846r6.pdf)
