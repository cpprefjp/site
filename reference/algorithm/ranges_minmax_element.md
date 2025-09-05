# minmax_element
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
  constexpr minmax_element_result<I>
    minmax_element(I first,
                   S last,
                   Comp comp = {},
                   Proj proj = {}); // (1) C++20

  template <forward_range R,
            class Proj = identity,
            indirect_strict_weak_order<projected<iterator_t<R>, Proj>> Comp = ranges::less>
  constexpr minmax_element_result<borrowed_iterator_t<R>>
    minmax_element(R&& r,
                   Comp comp = {},
                   Proj proj = {}); // (2) C++20
}
```
* minmax_element_result[link ranges_min_max_result.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* ranges::less[link /reference/functional/ranges_less.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]


## 概要
`[first, last)` の範囲において、最小要素を指すイテレータと最大要素を指すイテレータの組を取得する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 戻り値
```cpp
minmax_element_result {
  .min = 最小の要素を指すイテレータ,
  .max = 最大の要素を指すイテレータ,
}
```
* minmax_element_result[link ranges_min_max_result.md]

それぞれ、比較 [`invoke`](/reference/functional/invoke.md)`(comp,` [`invoke`](/reference/functional/invoke.md)`(proj, *i),` [`invoke`](/reference/functional/invoke.md)`(proj, *j))` によって判断し、同じ値の要素が複数ある場合は、最小の要素は最初の要素、最大の要素は最後の要素となる。

## 計算量
`n` を範囲の要素数とする場合、[`max`](max.md)`(floor(3(n - 1) / 2), 0)` 回の述語適用を行う。

## 例
```cpp example
#include <cassert>
#include <algorithm>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  auto [min1, max1] = std::ranges::minmax_element(v);
  assert(*min1 == 1);
  assert(*max1 == 4);

  auto [min2, max2] = std::ranges::minmax_element(v, std::ranges::greater());
  assert(*min2 == 4);
  assert(*max2 == 1);
}
```
* std::ranges::minmax_element[color ff0000]

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
