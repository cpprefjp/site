# set_union
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2, class OutputIterator>
  OutputIterator
    set_union(InputIterator1 first1,
              InputIterator1 last1,
              InputIterator2 first2,
              InputIterator2 last2,
              OutputIterator result); // (1) C++03

  template <class InputIterator1, class InputIterator2, class OutputIterator>
  constexpr OutputIterator
    set_union(InputIterator1 first1,
              InputIterator1 last1,
              InputIterator2 first2,
              InputIterator2 last2,
              OutputIterator result); // (1) C++20

  template <class InputIterator1, class InputIterator2, class OutputIterator,
            class Compare>
  OutputIterator
    set_union(InputIterator1 first1,
              InputIterator1 last1,
              InputIterator2 first2,
              InputIterator2 last2,
              OutputIterator result,
              Compare comp);          // (2) C++03

  template <class InputIterator1, class InputIterator2, class OutputIterator,
            class Compare>
  constexpr OutputIterator
    set_union(InputIterator1 first1,
              InputIterator1 last1,
              InputIterator2 first2,
              InputIterator2 last2,
              OutputIterator result,
              Compare comp);          // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class ForwardIterator>
  ForwardIterator
    set_union(ExecutionPolicy&& exec,
              ForwardIterator1 first1,
              ForwardIterator1 last1,
              ForwardIterator2 first2,
              ForwardIterator2 last2,
              ForwardIterator result); // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2,
            class ForwardIterator, class Compare>
  ForwardIterator
    set_union(ExecutionPolicy&& exec,
              ForwardIterator1 first1,
              ForwardIterator1 last1,
              ForwardIterator2 first2,
              ForwardIterator2 last2,
              ForwardIterator result,
              Compare comp);           // (4) C++17
}
```

## 概要
2つのソート済み範囲の和集合を得る


## 要件
結果の範囲は両方の入力の範囲と重なっていてはならない。


## 効果
２つの範囲からソート済みの union を構築する。つまり、片方または両方の範囲にある要素の集合を構築する。


## 戻り値
構築された範囲の終端


## 計算量
最大で `2 * ((last1 - first1) + (last2 - first2)) - 1` 回の比較を行う


## 備考
`[first1,last1)` が `m` 個、`[first2,last2)` が `n` 個の�価な要素を含んでいる場合、`[first1,last1)` から `m` 個全ての要素が出力の範囲へ順番にコピーされ、その後 `[first2,last2)` から [`max`](max.md)`(n - m, 0)` 個の要素が出力の範囲へ順番にコピーされる。
（`[first2,last2)` から [`max`](max.md)`(n-m,0)` 個というのが、最初から [`max`](max.md)`(n-m,0)` 個なのか最後から [`max`](max.md)`(n-m,0)` 個なのかが明確に書かれてない）



## 例
```cpp example
#include <iostream>
#include <set>
#include <list>
#include <vector>
#include <algorithm>
#include <iterator>

int main()
{
  std::list<int> a = {1, 2, 3, 4};
  std::multiset<int> b = {4, 5, 6, 2};
  std::vector<int> result;

  // aとbの和集合を作る
  std::set_union(std::begin(a), std::end(a),
                 std::begin(b), std::end(b),
                 std::inserter(result, std::end(result)));

  std::for_each(std::begin(result), std::end(result), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::set_union[color ff0000]
* std::multiset[link /reference/set/multiset.md]
* std::inserter[link /reference/iterator/inserter.md]

### 出力
```
1
2
3
4
5
6
```


## 実装例
```cpp
template <class InputIterator1, class InputIterator2, class OutputIterator,
          class Compare>
OutputIterator set_union(InputIterator1 first1, InputIterator1 last1,
                         InputIterator2 first2, InputIterator2 last2,
                         OutputIterator result, Compare comp)
{
  for (; first1 != last1; ++result) {
    if (first2 == last2)
      return std::copy(first1, last1, result);
    if (comp(*first2, *first1)) {
      *result = *first2;
      ++first2;
    } else {
      if (!bool(comp(*first1, *first2)))
        ++first2;
      *result = *first1;
      ++first1;
    }
  }
  return std::copy(first2, last2, result);
}

struct less_inner {
  template <class T, class U>
  bool operator()(const T& lhs, const U& rhs) const { return bool(lhs < rhs); }
};

template <class InputIterator1, class InputIterator2, class OutputIterator>
OutputIterator set_union(InputIterator1 first1, InputIterator1 last1,
                         InputIterator2 first2, InputIterator2 last2,
                         OutputIterator result)
{
  return std::set_union(first1, last1, first2, last2, result, less_inner());
}
```
* std::copy[link copy.md]


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
