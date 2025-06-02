# common_range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept common_range = range<T> && same_as<iterator_t<T>, sentinel_t<T>>;
}
```
* range[link range.md]
* iterator_t[link iterator_t.md]
* sentinel_t[link sentinel_t.md]

## 概要
`common_range`は、イテレータと番兵の型が等しいRangeを表すコンセプトである。

標準のコンテナはすべて`common_range`のモデルである。

## モデル
型`T`が`common_range`のモデルとなるのは、`T`が[`range`](range.md)のモデルであり、`T`から取得した番兵とイテレータの型が等しい場合である。

## 例
```cpp example
#include <ranges>

int main() {
  namespace ranges = std::ranges;
  namespace views = std::views;

  // 無限長のiotaはcommon_rangeではない
  // (イテレータと番兵の型が異なる)
  static_assert(!ranges::common_range<decltype(views::iota(0))>);

  // commonを適用するとcommon_rangeになる
  static_assert(ranges::common_range<decltype(views::iota(0) | views::common)>);
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
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 関連項目

- [C++17 範囲 for ループの制限緩和](/lang/cpp17/generalizing_the_range-based_for_loop.md)  
  範囲for文は、C++17の時点で先行して`common_range`ではない範囲を扱えるようになっている
- [`views::common`](common_view.md)  
  任意の範囲を`common_range`に変換するRangeアダプタオブジェクト

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
