# is_sorted
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            indirect_strict_weak_order<projected<I, Proj>> Comp = ranges::less>
  constexpr bool
    is_sorted(I first,
              S last,
              Comp comp = {},
              Proj proj = {}); // (1) C++20

  template <forward_range R,
            class Proj = identity,
            indirect_strict_weak_order<projected<iterator_t<R>, Proj>> Comp = ranges::less>
  constexpr bool
    is_sorted(R&& r,
              Comp comp = {},
              Proj proj = {}); // (2) C++20
}
```
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::less[link /reference/functional/ranges_less.md]
* identity[link /reference/functional/identity.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* projected[link /reference/iterator/projected.md]
* forward_range[link /reference/ranges/forward_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]

## 概要
与えられた範囲がソート済みか判定する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


### 戻り値
- (1) : [`ranges::is_sorted_until`](/reference/algorithm/ranges_is_sorted_until.md)`(first, last, comp, proj) == last`
- (2) : [`ranges::is_sorted_until`](/reference/algorithm/ranges_is_sorted_until.md)`(r, comp, proj) == last`

## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  std::cout << std::boolalpha;
  std::cout << "before: is sorted? " << std::ranges::is_sorted(v) << std::endl;

  std::ranges::sort(v);

  std::cout << " after: is sorted? " << std::ranges::is_sorted(v) << std::endl;
}
```
* std::ranges::sort[link ranges_sort.md]
* std::ranges::is_sorted[color ff0000]

### 出力
```
before: is sorted? false
 after: is sorted? true
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
