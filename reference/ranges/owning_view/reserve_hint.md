# reserve_hint
* ranges[meta header]
* std::ranges[meta namespace]
* owning_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto reserve_hint()
  requires approximately_sized_range<R>;       // (1) C++26

constexpr auto reserve_hint() const
  requires approximately_sized_range<const R>; // (2) C++26
```
* approximately_sized_range[link /reference/ranges/approximately_sized_range.md]

## 概要
要素数の近似値を取得する。


## テンプレートパラメータ制約
- (1) : 型`R`が[`approximately_sized_range`](/reference/ranges/approximately_sized_range.md)であること
- (2) : 型`const R`が[`approximately_sized_range`](/reference/ranges/approximately_sized_range.md)であること


## 戻り値
保持しているRange`r_`に対して、以下を返す：

```cpp
return ranges::reserve_hint(r_);
```
* ranges::reserve_hint[link /reference/ranges/reserve_hint.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P2846R6 `reserve_hint`: Eagerly reserving memory for not-quite-sized lazy ranges](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2846r6.pdf)
