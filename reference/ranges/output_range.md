# output_range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class R, class T>
  concept output_range = range<R> && output_iterator<iterator_t<R>, T>;
}
```

## 概要
`output_range`は、イテレータが[`output_iterator`](/reference/iterator/output_iterator.md)であるRangeを表すコンセプトである。

## モデル
型`T`が`output_range`のモデルとなるのは、`T`が[`range`](range.md)のモデルであり、かつそのイテレータが[`output_iterator`](/reference/iterator/output_iterator.md)のモデルである場合である。

## 例
```cpp example
#include <ranges>
#include <iterator>
#include <concepts>
#include <iostream>
#include <vector>

int main() {
  using namespace std;
  // ostream_iteratorから作ったRangeはoutput_range
  ostream_iterator<int> osi(cout);
  static_assert(ranges::output_range<decltype(views::counted(osi, 5)), int>);

  // constではないコンテナはoutput_range
  static_assert(ranges::output_range<vector<int>&, int>);

  // constなコンテナには書き込めないので、output_rangeではない
  static_assert(!ranges::output_range<const vector<int>&, int>);
}
```
* ranges::output_range[color ff0000]
* views::counted[link counted.md]
* ostream_iterator[link /reference/iterator/ostream_iterator.md]

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
