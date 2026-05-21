# reserve_hint
* ranges[meta header]
* std::ranges[meta namespace]
* chunk_view[meta class]
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

`chunk_view`は元のRangeを N 個ずつの塊に分けるため、要素数の近似値は「元のRangeの`reserve_hint`の N での切り上げ除算」となる。


## テンプレートパラメータ制約
- (1) : 型`V`が[`approximately_sized_range`](/reference/ranges/approximately_sized_range.md)であること
- (2) : 型`const V`が[`approximately_sized_range`](/reference/ranges/approximately_sized_range.md)であること


## 効果
以下と等価：

```cpp
auto s = static_cast<range_difference_t<decltype((base_))>>(ranges::reserve_hint(base_));
return to-unsigned-like(div-ceil(s, n_));
```
* ranges::reserve_hint[link /reference/ranges/reserve_hint.md]
* range_difference_t[link /reference/ranges/range_difference_t.md]

ここで`div-ceil(a, b)`は`a / b`の切り上げ除算を返す説明専用関数である。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P2846R6 `reserve_hint`: Eagerly reserving memory for not-quite-sized lazy ranges](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2846r6.pdf)
