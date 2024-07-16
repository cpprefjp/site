# forward_range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept forward_range = input_range<T> && forward_iterator<iterator_t<T>>;
}
```
* input_range[link input_range.md]
* forward_iterator[link /reference/iterator/forward_iterator.md]
* iterator_t[link iterator_t.md]

## 概要
`forward_range`は、イテレータが[`forward_iterator`](/reference/iterator/forward_iterator.md)であるRangeを表すコンセプトである。

## モデル
型`T`が`forward_range`のモデルとなるのは、`T`が[`input_range`](input_range.md)のモデルであり、かつそのイテレータが[`forward_iterator`](/reference/iterator/forward_iterator.md)のモデルである場合である。

## 例
```cpp example
#include <ranges>
#include <forward_list>
#include <iostream>

int main() {
  using namespace std;
  // forward_listはforward_range
  static_assert(ranges::forward_range<forward_list<int>>);

  // basic_istream_viewはforward_rangeではなく、input_range
  static_assert(!ranges::forward_range<decltype(views::istream<int>(cin))>);
  static_assert(ranges::input_range<decltype(views::istream<int>(cin))>);
}
```
* ranges::forward_range[color ff0000]
* ranges::input_range[link input_range.md]
* basic_istream_view[link basic_istream_view.md]
* views::istream[link basic_istream_view.md]

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
