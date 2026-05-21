# reserve_hint
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_transform_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto reserve_hint()
  requires approximately_sized_range<InnerView>;       // (1) C++26

constexpr auto reserve_hint() const
  requires approximately_sized_range<const InnerView>; // (2) C++26
```
* approximately_sized_range[link /reference/ranges/approximately_sized_range.md]

## 概要
要素数の近似値を取得する。

`InnerView`は内部で保持する[`adjacent_view`](/reference/ranges/adjacent_view.md)`<V, N>`型の説明専用エイリアスである。`adjacent_view`の`reserve_hint`をそのまま転送する。


## テンプレートパラメータ制約
- (1) : 型`InnerView`が[`approximately_sized_range`](/reference/ranges/approximately_sized_range.md)であること
- (2) : 型`const InnerView`が[`approximately_sized_range`](/reference/ranges/approximately_sized_range.md)であること


## 戻り値
内部の[`adjacent_view`](/reference/ranges/adjacent_view.md) `inner_`に対して、以下を返す：

```cpp
return inner_.reserve_hint();
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P2846R6 `reserve_hint`: Eagerly reserving memory for not-quite-sized lazy ranges](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2846r6.pdf)
