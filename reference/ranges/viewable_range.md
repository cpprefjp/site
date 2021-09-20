# viewable_range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept viewable_range = range<T> && (borrowed_range<T> || view<remove_cvref_t<T>>);
}
```
* range[link range.md]
* borrowed_range[link borrowed_range.md]
* view[link view.md]
* remove_cvref_t[link /reference/type_traits/remove_cvref.md]

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
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
