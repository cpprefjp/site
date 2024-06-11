# equal_range
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I,
            sentinel_for<I> S,
            class T,
            class Proj = identity,
            indirect_strict_weak_order<const T*, projected<I, Proj>> Comp = ranges::less>
  constexpr subrange<I>
    equal_range(I first,
                S last,
                const T& value,
                Comp comp = {},
                Proj proj = {}); // (1) C++20

  template <forward_range R,
            class T,
            class Proj = identity,
            indirect_strict_weak_order<const T*, projected<iterator_t<R>, Proj>> Comp = ranges::less>
  constexpr borrowed_subrange_t<R>
    equal_range(R&& r,
                const T& value,
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
* subrange[link /reference/ranges/subrange.md]
* forward_range[link /reference/ranges/forward_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_subrange_t[link /reference/ranges/borrowed_subrange_t.md]


## 概要
指定した値と等しい範囲を取得する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
`[first,last)` の要素 `e` は `e < value` および `!(value < e)` 、あるいは `comp(e, value)` および `!comp(value, e)` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていなければならない。

また、`[first, last)` の要素 `e` は全て暗黙に、`e < value` が `!(value < e)` または `comp(e, value)` が `!comp(value, e)` を意味している必要がある。


## 戻り値
`{`[`ranges::lower_bound`](ranges_lower_bound.md)`(first, last, value, comp, proj), `[`ranges::upper_bound`](ranges_upper_bound.md)`(first, last, value, comp, proj)}`

## 計算量
最大で 2 * log2(`last - first`) + O(1) 回の比較を行う


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v   = {3, 1, 4, 2, 5, 3};
  std::vector<int> v2  = {1, 4, 2, 5};

  std::ranges::sort(v);
  std::ranges::sort(v2);

  auto result  = std::ranges::equal_range(v, 3);
  auto result2 = std::ranges::equal_range(v2, 3);

  std::cout << "size: " << result.size() << std::endl;
  for (int i : result) {
    std::cout << i << std::endl;
  }
  std::cout << std::endl;

  std::cout << "size: " << result2.size() << std::endl;
  for (int i : result2) {
    std::cout << i << std::endl;
  }
}
```
* std::ranges::sort[link ranges_sort.md]
* std::ranges::equal_range[color ff0000]

### 出力
```
size: 2
3
3

size: 0
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
