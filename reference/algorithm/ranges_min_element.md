# min_element
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
  constexpr I
    min_element(I first,
                S last,
                Comp comp = {},
                Proj proj = {}); // (1) C++20

  template <forward_range R,
            class Proj = identity,
            indirect_strict_weak_order<projected<iterator_t<R>, Proj>> Comp = ranges::less>
  constexpr borrowed_iterator_t<R>
    min_element(R&& r,
                Comp comp = {},
                Proj proj = {}); // (2) C++20
}
```
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* ranges::less[link /reference/functional/ranges_less.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]


## 概要
`[first, last)`の範囲において、最小要素を指す最初のイテレータを取得する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 戻り値
比較 [`invoke`](/reference/functional/invoke.md)`(comp,` [`invoke`](/reference/functional/invoke.md)`(proj, *i),` [`invoke`](/reference/functional/invoke.md)`(proj, *j))` によって最小と判断された最初の要素を指すイテレータ


## 計算量
[`max`](/reference/algorithm/max.md)`((last - first) - 1, 0)`回の比較を行う


## 例
```cpp example
#include <algorithm>
#include <cassert>
#include <utility>
#include <vector>

int main()
{
  std::vector<int> v1 = {3, 1, 4};

  auto v1_min_element = std::ranges::min_element(v1);
  assert(*v1_min_element == 1);


  std::vector<std::pair<int, int>> v2 = {{0, 3}, {1, 1}, {2, 4}};

  auto v2_min_element = std::ranges::min_element(v2, {}, &std::pair<int, int>::second);
  assert(v2_min_element->first == 1);
  assert(v2_min_element->second == 1);
}
```
* std::ranges::min_element[color ff0000]

### 出力
```
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
