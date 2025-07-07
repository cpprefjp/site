# find_first_of
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class ForwardIterator1, class ForwardIterator2>
  ForwardIterator1
    find_first_of(ForwardIterator1 first1,
                  ForwardIterator1 last1,
                  ForwardIterator2 first2,
                  ForwardIterator2 last2); // (1) C++03

  template <class InputIterator, class ForwardIterator>
  InputIterator
    find_first_of(InputIterator first1,
                  InputIterator last1,
                  ForwardIterator first2,
                  ForwardIterator last2);  // (1) C++11

  template <class InputIterator, class ForwardIterator>
  constexpr InputIterator
    find_first_of(InputIterator first1,
                  InputIterator last1,
                  ForwardIterator first2,
                  ForwardIterator last2);  // (1) C++20

  template <class ForwardIterator1, class ForwardIterator2, class BinaryPredicate>
  ForwardIterator1
    find_first_of(ForwardIterator1 first1,
                  ForwardIterator1 last1,
                  ForwardIterator2 first2,
                  ForwardIterator2 last2,
                  BinaryPredicate pred);   // (2) C++03

  template <class InputIterator, class ForwardIterator, class BinaryPredicate>
  InputIterator
    find_first_of(InputIterator first1,
                  InputIterator last1,
                  ForwardIterator first2,
                  ForwardIterator last2,
                  BinaryPredicate pred);   // (2) C++11

  template <class InputIterator, class ForwardIterator, class BinaryPredicate>
  constexpr InputIterator
    find_first_of(InputIterator first1,
                  InputIterator last1,
                  ForwardIterator first2,
                  ForwardIterator last2,
                  BinaryPredicate pred);   // (2) C++20

  template <class ExecutionPolicy, class ForwardIterator1, class ForwardIterator2>
  ForwardIterator1
    find_first_of(ExecutionPolicy&& exec,
                  ForwardIterator1 first1,
                  ForwardIterator1 last1,
                  ForwardIterator2 first2,
                  ForwardIterator2 last2); // (3) C++17

  template <class ExecutionPolicy, class ForwardIterator1,
            class ForwardIterator2, class BinaryPredicate>
  ForwardIterator1
    find_first_of(ExecutionPolicy&& exec,
                  ForwardIterator1 first1,
                  ForwardIterator1 last1,
                  ForwardIterator2 first2,
                  ForwardIterator2 last2,
                  BinaryPredicate pred);   // (4) C++17
}
```

## 概要
イテレータ範囲`[first1, last1)`から、集合`[first2, last2)`のいずれかの要素とマッチする最初の要素を検索する。


## 戻り値
`[first1,last1 - (last2 - first2))` 内のイテレータ `i` があるとき、`[first2,last2)` 内のイテレータ `j` について、どれかが `*i == *j` もしくは `pred(*i,*j)` であるような最初のイテレータを返す。

そのようなイテレータが見つからない、もしくは `[first2,last2)` が空である場合は `last1` を返す。


## 計算量
最大で `(last1 - first1) * (last2 - first2)` 回の、対応する比較もしくは述語が適用される。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>

int main() {
  std::vector<int> v = { 1,3,7,4,2 };
  std::list<int> ls = { 2,4,6,8 };

  // 2,4,6,8 のどれかと一致する最初の要素を返す
  std::vector<int>::iterator it = std::find_first_of(v.begin(), v.end(), ls.begin(), ls.end());
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), it) << ", value==" << *it << std::endl;
  }
}
```
* std::find_first_of[color ff0000]
* std::vector[link /reference/vector/vector.md]
* std::list[link /reference/list/list.md]
* v.begin[link /reference/vector/vector/begin.md]
* v.end[link /reference/vector/vector/end.md]
* ls.begin[link /reference/list/list/begin.md]
* ls.end[link /reference/list/list/end.md]
* std::distance[link /reference/iterator/distance.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]

### 出力
```
found: index==3, value==4
```


## 実装例
```cpp
template <class InputIterator, class ForwardIterator>
InputIterator find_first_of(InputIterator first1, InputIterator last1,
                            ForwardIterator first2, ForwardIterator last2) {
  for ( ; first1 != last1; ++first1)
    for (ForwardIterator it = first2; it != last2; ++it)
      if (*first1 == *it) return first1;
  return last1;
}

template <class InputIterator, class ForwardIterator, class BinaryPredicate>
InputIterator find_first_of(InputIterator first1, InputIterator last1,
                            ForwardIterator first2, ForwardIterator last2, BinaryPredicate pred) {
  for ( ; first1 != last1; ++first1)
    for (ForwardIterator it = first2; it != last2; ++it)
      if (pred(*first1, *it)) return first1;
  return last1;
}
```


## 参照
- [LWG Issue 576. `find_first_of` is overconstrained](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#576)
    - C++11から、パラメータのイテレータ型に対する制約が緩和され、`ForwardIterator`から`InputIterator`に変更になった経緯のレポート
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [P0467R2 Iterator Concerns for Parallel Algorithms](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0467r2.html)
