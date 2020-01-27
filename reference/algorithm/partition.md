# partition
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class BidirectionalIterator, class Predicate>
  BidirectionalIterator
    partition(BidirectionalIterator first,
              BidirectionalIterator last,
              Predicate pred);              // (1) C++03

  template <class ForwardIterator, class Predicate>
  ForwardIterator
    partition(ForwardIterator first,
              ForwardIterator last,
              Predicate pred);              // (1) C++11

  template <class ForwardIterator, class Predicate>
  constexpr ForwardIterator
    partition(ForwardIterator first,
              ForwardIterator last,
              Predicate pred);              // (1) C++20

  template <class ExecutionPolicy, class ForwardIterator, class Predicate>
  ForwardIterator
    partition(ExecutionPolicy&& exec,
              ForwardIterator first,
              ForwardIterator last,
              Predicate pred);              // (2) C++17
}
```

## 概要
与えられた範囲を条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)する。


## 要件
- C++03 : `BidirectionalIterator` は `ValueSwappable` の要件を満たしている必要がある。
- C++11 : `ForwardIterator` は `ValueSwappable` の要件を満たしている必要がある。

## 効果
`[first,last)` 内にある `pred` を満たす全ての要素を、`pred` を満たさない全ての要素より前に移動させる。


## 戻り値
`[first,i)` 内にあるイテレータ `j` について `pred(*j) != false` を満たし、`[i,last)` 内にあるイテレータ `k` について `pred(*k) == false` を満たすような、イテレータ `i` を返す。つまり、[区分化](/reference/algorithm.md#sequence-is-partitioned)された境界を指すイテレータを返す。


## 計算量
- (1) : `ForwardIterator` が `BidirectionalIterator` の要求を満たしている場合、最大で `(last - first) / 2` 回 swap され、そうでない場合、最大で `last - first` 回 swap される。それに加えて、�確に `last - first` 回だけ述語が適用される
- (2) : O(NlogN)計算量でswapが行われ、それに加えてO(N)計算量の回数だけ述語が適用される


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 偶数グループと奇数グループに分ける
  auto pos = std::partition(v.begin(), v.end(), [](int x) { return x % 2 == 0; });

  // 条件x % 2 == 0を満たす要素
  std::for_each(v.begin(), pos, [](int x) {
   std::cout << x << std::endl;
  });

  // それ以外の要素
  std::cout << "----" << std::endl;
  std::for_each(pos, v.end(), [](int x) {
   std::cout << x << std::endl;
  });
}
```
* std::partition[color ff0000]

### 出力
```
4
2
----
3
1
5
```

## 実装例
```cpp
template <class ForwardIterator, class Predicate>
ForwardIterator partition(ForwardIterator first, ForwardIterator last, Predicate pred)
{
  first = std::find_if_not(first, last, pred);
  auto it = std::find_if(first, last, pred);
  while (it != last) {
    std::iter_swap(first, it);
    first = std::find_if_not(first, last, pred);
    it = std::find_if(it, last, pred);
  }
  return first;
}
```
* std::find_if_not[link find_if_not.md]
* std::find_if[link find_if.md]
* std::iter_swap[link iter_swap.md]


## 参照
- [LWG Issue 2150. Unclear specification of `find_end`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2150)
- [P0574R1 Algorithm Complexity Constraints and Parallel Overloads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0574r1.html)
- [P0879R0 Constexpr for `swap` and `swap` related functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html)
