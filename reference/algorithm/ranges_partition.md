# partition
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <permutable I,
            sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
  constexpr subrange<I>
    partition(I first,
              S last,
              Pred pred,
              Proj proj = {}); // (1) C++20

  template <forward_range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
    requires permutable<iterator_t<R>>
  constexpr borrowed_subrange_t<R>
    partition(R&& r,
              Pred pred,
              Proj proj = {}); // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
    requires permutable<I>
  subrange<I>
    partition(Ep&& exec,
              I first,
              S last,
              Pred pred,
              Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
    requires permutable<iterator_t<R>>
  borrowed_subrange_t<R>
    partition(Ep&& exec,
              R&& r,
              Pred pred,
              Proj proj = {}); // (4) C++26
}
```
* permutable[link /reference/iterator/permutable.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
与えられた範囲を条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 効果
`[first,last)` 内にある `pred` を満たす全ての要素を、`pred` を満たさない全ての要素より前に移動させる。


## 戻り値
`{i, last}`

ただし、`[first,i)` 内にあるイテレータ `j` について `pred(*j) != false` を満たし、`[i,last)` 内にあるイテレータ `k` について `pred(*k) == false` を満たすようなイテレータ (つまり、[区分化](/reference/algorithm.md#sequence-is-partitioned)された境界を指すイテレータ) を `i` とする。



## 計算量

`N = last - first`として

- (1), (2) : `I` が [`bidirectional_iterator`](/reference/iterator/bidirectional_iterator.md)のモデルとなる場合、最大で `N / 2` 回 swap され、そうでない場合、最大で `N` 回 swap される。それに加えて、正確に `N` 回だけ述語が適用される


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 偶数グループと奇数グループに分ける
  std::ranges::subrange latter = std::ranges::partition(v, [](int x) { return x % 2 == 0; });
  std::ranges::subrange former = {v.begin(), latter.begin()};

  // 条件x % 2 == 0を満たす要素
  for (int x : former) {
   std::cout << x << std::endl;
  }

  // それ以外の要素
  std::cout << "----" << std::endl;
  for (int x : latter) {
   std::cout << x << std::endl;
  }
}
```
* std::ranges::partition[color ff0000]
* std::ranges::subrange[link /reference/ranges/subrange.md]

### 出力
```
4
2
----
3
1
5
```


### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8};

  // 並列に偶数グループと奇数グループに分ける
  auto boundary = std::ranges::partition(std::execution::par, v, [](int x) { return x % 2 == 0; });

  std::cout << "even: ";
  for (auto it = v.begin(); it != boundary.begin(); ++it) {
    std::cout << *it << ' ';
  }
  std::cout << std::endl;

  std::cout << "odd: ";
  for (int x : boundary) {
    std::cout << x << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::partition[color ff0000]

#### 出力例
```
even: 8 2 6 4
odd: 5 3 7 1
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
