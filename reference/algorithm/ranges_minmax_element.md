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

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Proj = identity,
            indirect_strict_weak_order<projected<I, Proj>> Comp = ranges::less>
  minmax_element_result<I>
    minmax_element(Ep&& exec,
                   I first,
                   S last,
                   Comp comp = {},
                   Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            indirect_strict_weak_order<projected<iterator_t<R>, Proj>> Comp = ranges::less>
  minmax_element_result<borrowed_iterator_t<R>>
    minmax_element(Ep&& exec,
                   R&& r,
                   Comp comp = {},
                   Proj proj = {}); // (4) C++26
}
```
* minmax_element_result[link ranges_min_max_result.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* ranges::less[link /reference/functional/ranges_less.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]


## 概要
`[first, last)` の範囲において、最小要素を指すイテレータと最大要素を指すイテレータの組を取得する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


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
### 基本的な使い方
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

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main()
{
  std::vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};

  // 並列に最小要素と最大要素を同時に検索する
  auto [min_it, max_it] = std::ranges::minmax_element(std::execution::par, v);

  std::cout << "min: " << *min_it << std::endl;
  std::cout << "max: " << *max_it << std::endl;
}
```
* std::ranges::minmax_element[color ff0000]

#### 出力
```
min: 1
max: 9
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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
