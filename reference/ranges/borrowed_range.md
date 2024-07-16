# borrowed_range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept borrowed_range = range<T> && (is_lvalue_reference_v<T> || enable_borrowed_range<remove_cvref_t<T>>);
}
```
* range[link range.md]
* is_lvalue_reference_v[link /reference/type_traits/is_lvalue_reference.md]
* enable_borrowed_range[link enable_borrowed_range.md]

## 概要
`borrowed_range`は、Rangeを所有しない`range`を表すコンセプトである。Rangeオブジェクトの左辺値参照は`borrowed_range`である。

左辺値参照以外の型が値を所有するか否かは構文要件で定義できないため、変数テンプレート[`enable_borrowed_range`](enable_borrowed_range.md)を特殊化して`true`となるようにすることで`borrowed_range`を満たすようにする。

## モデル
`decltype((t))`が`T`であるような式`t`があるとする。`T`が`borrowed_range`のモデルとなるのは、`t`が示すオブジェクトの寿命とそこから取得したイテレータの有効性が結びついていない場合である。

## 備考
`borrowed_range`なRangeはそのイテレータの有効性がRangeの寿命と結びついていないため、そのようなRangeを値で受け取ってイテレータを値で返すような関数がダングリングイテレータの心配なく利用できる。

## 例
```cpp example
#include <ranges>
#include <string_view>
#include <span>
#include <vector>

int main()
{
  // vectorは要素を所有しているので、borrowed_rangeではない
  static_assert(!std::ranges::borrowed_range<std::vector<int>>);

  // vectorの参照は要素を所有していないので、borrowed_rangeである
  static_assert(std::ranges::borrowed_range<std::vector<int>&>);

  // string_viewは文字列を所有していないので、borrowed_rangeである
  static_assert(std::ranges::borrowed_range<std::string_view>);

  // spanはintを所有していないので、borrowed_rangeである
  static_assert(std::ranges::borrowed_range<std::span<int>>);
}
```
* std::ranges::borrowed_range[color ff0000]

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

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
