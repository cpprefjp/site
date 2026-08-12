# reserve_hint
* ranges[meta header]
* std::ranges[meta namespace]
* concat_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto reserve_hint()
  requires (approximately_sized_range<Views> && ...);       // (1) C++26
constexpr auto reserve_hint() const
  requires (approximately_sized_range<const Views> && ...); // (2) C++26
```
* approximately_sized_range[link /reference/ranges/approximately_sized_range.md]

## 概要
要素数の近似値を取得する。

`concat_view`は連結するすべてのRangeの要素を並べるため、近似値は各Rangeの`reserve_hint`の総和となる。連結するすべてのViewが[`approximately_sized_range`](/reference/ranges/approximately_sized_range.md)であるときのみ提供される。


## 効果
以下と等価：

```cpp
return apply(
  [](auto... sizes) {
    using CT = make-unsigned-like-t<common_type_t<decltype(sizes)...>>;
    return (CT(sizes) + ...);
  },
  tuple-transform(ranges::reserve_hint, views_));
```
* apply[link /reference/tuple/apply.md]
* common_type_t[link /reference/type_traits/common_type.md]
* ranges::reserve_hint[link /reference/ranges/reserve_hint.md]


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::ranges::concat_view`](../concat_view.md)
- [`std::ranges::reserve_hint`](../reserve_hint.md)


## 参照
- [P2846R6 `reserve_hint`: Eagerly reserving memory for not-quite-sized lazy ranges](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2846r6.pdf)
- [LWG Issue 4553. Wording for FR-025-246 25.7.18.2 Add a `reserve_hint` function to `concat_view`](https://cplusplus.github.io/LWG/issue4553)
    - C++26で`concat_view`に`reserve_hint`メンバ関数が追加された
