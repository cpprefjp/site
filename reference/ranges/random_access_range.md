# random_access_range
* ranges[meta header]
* concept[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T>
  concept random_access_range = bidirectional_range<T> && random_access_iterator<iterator_t<T>>;
}
```

## 概要
`random_access_range`は、イテレータが[`random_access_iterator`](/reference/iterator/random_access_iterator.md)であるRangeを表すコンセプトである。

## モデル
型`T`が`random_access_range`のモデルとなるのは、`T`が[`bidirectional_range`](bidirectional_range.md)のモデルであり、かつそのイテレータが[`random_access_iterator`](/reference/iterator/random_access_iterator.md)のモデルである場合である。

## 例
```cpp example
#include <ranges>
#include <list>
#include <set>
#include <vector>

int main()
{
  // vectorはrandom_access_range
  static_assert(std::ranges::random_access_range<std::vector<int>>);

  // listはrandom_access_rangeではない
  static_assert(!std::ranges::random_access_range<std::list<int>>);

  // setはrandom_access_rangeではない
  static_assert(!std::ranges::random_access_range<std::set<int>>);
}
```
* std::ranges::random_access_range[color ff0000]

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
