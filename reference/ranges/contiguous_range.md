# contiguous_range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept contiguous_range = random_access_range<T> && contiguous_iterator<iterator_t<T>> &&
    requires(T& t) {
      { ranges::data(t) } -> same_as<add_pointer_t<range_reference_t<T>>>;
    };
}
```
* ranges::data[link data.md]
* add_pointer_t[link /reference/type_traits/add_pointer.md]

## 概要
`contiguous_range`は、イテレータが[`contiguous_iterator`](/reference/iterator/contiguous_iterator.md)であるRangeを表すコンセプトである。

`contiguous_range`であるRangeは、要素がメモリ上で連続して配置されており、[`ranges::data`](data.md)や[`ranges::cdata`](cdata.md)で要素のポインタを取得できる。

## モデル
`decltype((t))`が`T&`であるような式`t`があるとする。
`T`が`contiguous_range`のモデルとなるのは、[`to_address`](/reference/memory/to_address.md)`(`[`ranges::begin`](begin.md)`(t)) ==` [`ranges::data`](data.md)`(t)`が`true`となる場合である。

## 例
```cpp example
#include <ranges>
#include <vector>

int main() {
  using namespace std;
  // vectorはcontiguous_range
  static_assert(ranges::contiguous_range<vector<int>>);

  // vectorから作ったelements_viewはcontiguous_rangeではない
  using view_t = ranges::elements_view<ranges::views::all_t<vector<pair<int, int>>&>, 0>;
  static_assert(ranges::random_access_range<view_t>);
  static_assert(!ranges::contiguous_range<view_t>);
}
```
* ranges::contiguous_range[color ff0000]
* ranges::elements_view[link elements_view.md]
* ranges::views::all_t[link all.md]
* ranges::random_access_range[link random_access_range.md]

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
