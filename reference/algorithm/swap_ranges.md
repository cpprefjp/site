#swap_ranges
* algorithm[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class ForwardIterator1, class ForwardIterator2>
  ForwardIterator2 swap_ranges(ForwardIterator1 first1,
                               ForwardIterator1 last1,
                               ForwardIterator2 first2);
}
```

##概要
指定された2つの範囲同士を swap する。


##効果
0 以上 `last1 - first1` 以下のそれぞれの `n` について [`swap`](/reference/utility/swap.md)`(*(first1 + n), *(first2 + n))` を行う


##要件
`[first1,last1)` と `[first2,first2 + (last1 - first1))` の範囲が重なってはならない。
0 以上 `last1 - first1` 未満のそれぞれの `n` について、`*(first1 + n) と *(first2 + n)` は `Swappable` でなければならない。


##戻り値
`first2 + (last1 - first1)`


##計算量
正確に `last1 - first1` 回のスワップが行われる



##例
```cpp
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>
 
int main() {
  std::vector<int> v1 = { 3,1,2 };
  std::vector<int> v2 = { 5,2,4,1,3 };
 
  std::swap_ranges(v1.begin(), v1.end(), v2.begin());
 
  std::cout << "v1: ";
  std::copy(v1.begin(), v1.end(), std::ostream_iterator<int>(std::cout, ","));
  std::cout << std::endl;
 
  std::cout << "v2: ";
  std::copy(v2.begin(), v2.end(), std::ostream_iterator<int>(std::cout, ","));
  std::cout << std::endl;
}
```
* swap_ranges[color ff0000]


###出力
```
v1: 5,2,4,
v2: 3,1,2,1,3,
```


##実装例
```cpp
template<class ForwardIterator1, class ForwardIterator2>
ForwardIterator2 swap_ranges(ForwardIterator1 first1, ForwardIterator1 last1,
                             ForwardIterator2 first2) {
  while (first1 != last1)
    iter_swap(first1++, first2++);
  return first2;
}
```

