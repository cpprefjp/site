# adjacent_find
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<forward_iterator I, sentinel_for<I> S, class Proj = identity, indirect_binary_predicate<projected<I, Proj>, projected<I, Proj>> Pred = ranges::equal_to>
  constexpr I adjacent_find(I first, S last, Pred pred = {}, Proj proj = {});

  template<forward_range R, class Proj = identity, indirect_binary_predicate<projected<iterator_t<R>, Proj>, projected<iterator_t<R>, Proj>> Pred = ranges::equal_to>
  constexpr borrowed_iterator_t<R> adjacent_find(R&& r, Pred pred = {}, Proj proj = {});
}
```
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* identity[link /reference/functional/identity.md]
* indirect_binary_predicate[link /reference/iterator/indirect_binary_predicate.md]
* projected[link /reference/iterator/projected.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* forward_range[link /reference/ranges/forward_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]


## 概要
隣接する要素で条件を満たしている最初の要素を検索する。


## 戻り値
`[first,last)` 内にあるイテレータ i について、[`invoke`](/reference/functional/invoke.md)`(pred, `[`invoke`](/reference/functional/invoke.md)`(proj, *i), `[`invoke`](/reference/functional/invoke.md)`(proj, *(i + 1))) != false` であるような最初のイテレータを返す。

もしそのようなイテレータが見つからなかった場合は `last` を返す。


## 計算量
与えられたシーケンスが空でない場合、正確に [`min`](/reference/algorithm/min.md)`((i - first) + 1, (last - first) - 1)` 回（`i` は `adjacent_find` の戻り値）の比較または述語が適用される


## 例
```cpp example
#include <algorithm>
#include <iterator>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 1,4,3,3,1,2,2 };

  // 同じ値が連続している最初の要素を検索する
  auto it = std::ranges::adjacent_find(v);
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::ranges::distance(v.begin(), it) << std::endl;
    std::cout << std::boolalpha << "*it == *(it+1): " << (*it == *(it+1)) << std::endl;
  }
}
```
* std::ranges::distance[link /reference/iterator/ranges_distance.md]
* std::ranges::adjacent_find[color ff0000]

### 出力
```
found: index==2
*it == *(it+1): true
```

## 実装例
```cpp
struct adjacent_find_impl {
  template<forward_iterator I, sentinel_for<I> S, class Proj = identity, indirect_binary_predicate<projected<I, Proj>, projected<I, Proj>> Pred = ranges::equal_to>
  constexpr I adjacent_find(I first, S last, Pred pred = {}, Proj proj = {}) {
    if (first == last)
      return last;

    I next = first;
    ++next;
    for ( ; next != last; ++next, ++first)
      if (invoke(pred, invoke(proj, *first), invoke(proj, *next)))
        return first;
    return last;
  }

  template<forward_range R, class Proj = identity, indirect_binary_predicate<projected<iterator_t<R>, Proj>, projected<iterator_t<R>, Proj>> Pred = ranges::equal_to>
  constexpr borrowed_iterator_t<R> adjacent_find(R&& r, Pred pred = {}, Proj proj = {}) {
    return (*this)(begin(r), end(r), ref(pred), ref(proj));
  }
};

inline constexpr adjacent_find_impl adjacent_find;
```
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* identity[link /reference/functional/identity.md]
* indirect_binary_predicate[link /reference/iterator/indirect_binary_predicate.md]
* projected[link /reference/iterator/projected.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* forward_range[link /reference/ranges/forward_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* invoke[link /reference/functional/invoke.md]
* begin[link /reference/ranges/begin.md]
* end[link /reference/ranges/end.md]
* ref[link /reference/functional/ref.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4821 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
