# is_heap_until
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <random_access_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            indirect_strict_weak_order<projected<I, Proj>> Comp = ranges::less>
  constexpr I
    is_heap_until(I first,
                  S last,
                  Comp comp = {},
                  Proj proj = {}); // (1) C++20

  template <random_access_range R,
            class Proj = identity,
            indirect_strict_weak_order<projected<iterator_t<R>, Proj>> Comp = ranges::less>
  constexpr borrowed_iterator_t<R>
    is_heap_until(R&& r,
                  Comp comp = {},
                  Proj proj = {}); // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Proj = identity,
            indirect_strict_weak_order<projected<I, Proj>> Comp = ranges::less>
  I is_heap_until(Ep&& exec,
                  I first,
                  S last,
                  Comp comp = {},
                  Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            indirect_strict_weak_order<projected<iterator_t<R>, Proj>> Comp = ranges::less>
  borrowed_iterator_t<R>
    is_heap_until(Ep&& exec,
                  R&& r,
                  Comp comp = {},
                  Proj proj = {}); // (4) C++26
}
```
* ranges::less[link /reference/functional/ranges_less.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
範囲がヒープ化されているか判定し、ヒープ化されていない最初の要素を指すイテレータを取得する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 戻り値
[`distance`](/reference/iterator/distance.md)`(first, last) < 2` の場合は `last` を返す。そうでない場合、`[first,last]` 内のイテレータ `i` について、`[first,i)` が `heap` であるような最後の `i` を返す。


## 計算量
線形時間


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4};

  std::cout << std::boolalpha;

  std::cout << "before: is heap? "
            << (std::ranges::is_heap_until(v) == v.end()) << std::endl;

  std::ranges::make_heap(v);
  std::cout << " after: is heap? "
            << (std::ranges::is_heap_until(v) == v.end()) << std::endl;
}
```
* std::ranges::is_heap_until[color ff0000]
* std::ranges::make_heap[link ranges_make_heap.md]

#### 出力
```
before: is heap? false
 after: is heap? true
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {9, 5, 7, 3, 1, 2, 4};

  // 並列にヒープ条件を満たさなくなる位置を検索
  auto it = std::ranges::is_heap_until(std::execution::par, v);

  std::cout << "heap part: ";
  for (auto i = v.begin(); i != it; ++i) {
    std::cout << *i << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::is_heap_until[color ff0000]

#### 出力
```
heap part: 9 5 7 3 1 2 4
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
