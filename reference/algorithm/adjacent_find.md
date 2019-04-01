# adjacent_find
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator>
  ForwardIterator
    adjacent_find(ForwardIterator first,
                  ForwardIterator last); // (1) C++03

  template <class ForwardIterator>
  constexpr ForwardIterator
    adjacent_find(ForwardIterator first,
                  ForwardIterator last); // (1) C++20

  template <class ForwardIterator, class BinaryPredicate>
  ForwardIterator
    adjacent_find(ForwardIterator first,
                  ForwardIterator last,
                  BinaryPredicate pred); // (2) C++03

  template <class ForwardIterator, class BinaryPredicate>
  constexpr ForwardIterator
    adjacent_find(ForwardIterator first,
                  ForwardIterator last,
                  BinaryPredicate pred); // (2) C++20

  template<class ExecutionPolicy, class ForwardIterator>
  ForwardIterator
    adjacent_find(ExecutionPolicy&& exec,
                  ForwardIterator first,
                  ForwardIterator last); // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator, class BinaryPredicate>
  ForwardIterator
    adjacent_find(ExecutionPolicy&& exec,
                  ForwardIterator first,
                  ForwardIterator last,
                  BinaryPredicate pred); // (4) C++17
}
```

## 概要
隣接する要素で条件を満たしている最初の要素を検索する。


## 戻り値
`[first,last)` 内にあるイテレータ i について、`*i == *(i + 1)` もしくは `pred(*i, *(i + 1)) != false` であるような最初のイテレータを返す。

もしそのようなイテレータが見つからなかった場合は `last` を返す。


## 計算量
- (1), (2) : 与えられたシーケンスが空でない場合、正確に [`min`](/reference/algorithm/min.md)`((i - first) + 1, (last - first) - 1)` 回（`i` は `adjacent_find` の戻り値）の比較または述語が適用される
- (3), (4) : O`(last - first)`の計算量の回数だけ比較または述語が適用される


## 例
```cpp example
#include <algorithm>
#include <iterator>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 1,4,3,3,1,2,2 };

  // 同じ値が連続している最初の要素を検索する
  auto it = std::adjacent_find(v.begin(), v.end());
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), it) << std::endl;
    std::cout << std::boolalpha << "*it == *(it+1): " << (*it == *(it+1)) << std::endl;
  }
}
```
* adjacent_find[color ff0000]

### 出力
```
found: index==2
*it == *(it+1): true
```

## 実装例
```cpp
template <class ForwardIterator>
ForwardIterator adjacent_find(ForwardIterator first, ForwardIterator last)
{
  if (first == last)
    return last;

  ForwardIterator next = first;
  ++next;
  for ( ; next != last; ++next, ++first)
    if (*first == *next)
      return first;
  return last;
}

template <class ForwardIterator, class BinaryPredicate>
ForwardIterator adjacent_find(ForwardIterator first, ForwardIterator last, BinaryPredicate pred)
{
  if (first == last)
    return last;

  ForwardIterator next = first;
  ++next;

  for ( ; next != last; ++next, ++first)
    if (pred(*first, *next))
      return first;
  return last;
}
```


## 参照
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0574R1 Algorithm Complexity Constraints and Parallel Overloads](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0574r1.html)
