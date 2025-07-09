# bidirectional_range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept bidirectional_range = forward_range<T> && bidirectional_iterator<iterator_t<T>>;
}
```

## 概要
`bidirectional_range`は、イテレータが[`bidirectional_iterator`](/reference/iterator/bidirectional_iterator.md)であるRangeを表すコンセプトである。

## モデル
型`T`が`bidirectional_range`のモデルとなるのは、`T`が[`forward_range`](forward_range.md)のモデルであり、かつそのイテレータが[`bidirectional_iterator`](/reference/iterator/bidirectional_iterator.md)のモデルである場合である。

## 例
```cpp example
#include <ranges>
#include <forward_list>
#include <list>

int main() {
  using namespace std;
  // listはbidirectional_range
  static_assert(ranges::bidirectional_range<list<int>>);

  // forward_listはbidirectional_rangeではなく、forward_range
  static_assert(!ranges::bidirectional_range<forward_list<int>>);
  static_assert(ranges::forward_range<forward_list<int>>);
}
```
* ranges::bidirectional_range[color ff0000]
* ranges::forward_range[link forward_range.md]

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
