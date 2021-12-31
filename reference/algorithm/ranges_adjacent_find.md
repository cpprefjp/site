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

## 概要
隣接する要素で条件を満たしている最初の要素を検索する。


## 戻り値
`[first,last)` 内にあるイテレータ i について、`*i == *(i + 1)` もしくは `pred(*i, *(i + 1)) != false` であるような最初のイテレータを返す。

もしそのようなイテレータが見つからなかった場合は `last` を返す。


## 計算量
- (1), (2) : 与えられたシーケンスが空でない場合、正確に [`min`](/reference/algorithm/min.md)`((i - first) + 1, (last - first) - 1)` 回（`i` は `adjacent_find` の戻り値）の比較または述語が適用される
- (3), (4) : O`(last - first)`の計算量の回数だけ比較または述語が適用される


## 例
```cpp example
#include <algorithm>
#include <iterator>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 1,4,3,3,1,2,2 };

  // 同じ値が連続している最初の要素を検索する
  auto it = std::adjacent_find(v.begin(), v.end());
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), it) << std::endl;
    std::cout << std::boolalpha << "*it == *(it+1): " << (*it == *(it+1)) << std::endl;
  }
}
```
* adjacent_find[color ff0000]

### 出力
```
found: index==2
*it == *(it+1): true
```

## 実装例
```cpp
template <class ForwardIterator>
ForwardIterator adjacent_find(ForwardIterator first, ForwardIterator last)
{
  if (first == last)
    return last;

  ForwardIterator next = first;
  ++next;
  for ( ; next != last; ++next, ++first)
    if (*first == *next)
      return first;
  return last;
}

template <class ForwardIterator, class BinaryPredicate>
ForwardIterator adjacent_find(ForwardIterator first, ForwardIterator last, BinaryPredicate pred)
{
  if (first == last)
    return last;

  ForwardIterator next = first;
  ++next;

  for ( ; next != last; ++next, ++first)
    if (pred(*first, *next))
      return first;
  return last;
}
```

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
