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

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Proj = identity,
            indirect_strict_weak_order<projected<I, Proj>> Comp = ranges::less>
  bool is_sorted(Ep&& exec,
                 I first,
                 S last,
                 Comp comp = {},
                 Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            indirect_strict_weak_order<projected<iterator_t<R>, Proj>> Comp = ranges::less>
  bool is_sorted(Ep&& exec,
                 R&& r,
                 Comp comp = {},
                 Proj proj = {}); // (4) C++26
}
```
* ranges::less[link /reference/functional/ranges_less.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
与えられた範囲がソート済みか判定する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


### 戻り値
- (1) : [`ranges::is_sorted_until`](/reference/algorithm/ranges_is_sorted_until.md)`(first, last, comp, proj) == last`
- (2) : [`ranges::is_sorted_until`](/reference/algorithm/ranges_is_sorted_until.md)`(r, comp, proj) == last`

## 例
### 基本的な使い方
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

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main()
{
  std::vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};

  std::cout << std::boolalpha;
  std::cout << "before: is sorted? "
            << std::ranges::is_sorted(std::execution::par, v) << std::endl;

  std::ranges::sort(v);

  std::cout << " after: is sorted? "
            << std::ranges::is_sorted(std::execution::par, v) << std::endl;
}
```
* std::ranges::is_sorted[color ff0000]
* std::ranges::sort[link ranges_sort.md]

#### 出力
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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
