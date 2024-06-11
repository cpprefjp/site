# viewable_range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept viewable_range =
    range<T> &&
    ((view<remove_cvref_t<T>> && constructible_from<remove_cvref_t<T>, T>) ||
     (!view<remove_cvref_t<T>> &&
      (is_lvalue_reference_v<T> || (movable<remove_reference_t<T>> && !is-initializer-list<T>))));
}
```
* range[link range.md]
* view[link view.md]
* constructible_from[link /reference/concepts/constructible_from.md]
* is_lvalue_reference_v[link /reference/type_traits/is_lvalue_reference.md]
* movable[link /reference/concepts/movable.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* is-initializer-list[italic]

## 概要
`viewable_range`は、安全に[`view`](view.md)へ変換できるRangeを表すコンセプトである。

Rangeアダプタを適用するには、`viewable_range`である必要がある。

## モデル
型`T`が`viewable_range`のモデルとなるのは、`T`が[`range`](range.md)のモデルであり、かつ`T`が[`borrowed_range`](borrowed_range.md)のモデルであるか、[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<T>`が[`view`](view.md)のモデルである場合である。

[`borrowed_range`](borrowed_range.md)または[`view`](view.md)ではない[`range`](range.md)の右辺値は、`viewable_range`のモデルにはならない。

## 例
(執筆中)

### 出力
(執筆中)

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [LWG Issue 3481 `viewable_range` mishandles lvalue move-only views](https://cplusplus.github.io/LWG/lwg-defects.html#3481)
- [P2415R2 What is a `view`?](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2415r2.html) (本提案文書はC++20に遡って適用されている)
