#set_union
```cpp
namespace std {
  template <class InputIterator1, class InputIterator2, class OutputIterator>
  OutputIterator set_union(InputIterator1 first1, InputIterator1 last1,
                           InputIterator2 first2, InputIterator2 last2,
                           OutputIterator result);

  template <class InputIterator1, class InputIterator2, class OutputIterator,
            class Compare>
  OutputIterator set_union(InputIterator1 first1, InputIterator1 last1,
                           InputIterator2 first2, InputIterator2 last2,
                           OutputIterator result, Compare comp);
}
```

##概要
2つのソート済み範囲の和集合を得る


##要件
結果の範囲は両方の入力の範囲と重なっていてはならない。


##効果
２つの範囲からソート済みの union を構築する。つまり、片方または両方の範囲にある要素の集合を構築する。


##戻り値
構築された範囲の終端


##計算量
最大で `2 * ((last1 - first1) + (last2 - first2)) - 1` 回の比較を行う


##備考
`[first1,last1)` が `m` 個、`[first2,last2)` が `n` 個の等価な要素を含んでいる場合、`[first1,last1)` から `m` 個全ての要素が出力の範囲へ順番にコピーされ、その後 `[first2,last2)` から `max(n - m, 0)` 個の要素が出力の範囲へ順番にコピーされる。
（`[first2,last2)` から [`max`](/reference/algorithm/max.md)`(n-m,0)` 個というのが、最初から [`max`](/reference/algorithm/max.md)`(n-m,0)` 個なのか最後から [`max`](/reference/algorithm/max.md)`(n-m,0)` 個なのかが明確に書かれてない）



##例
```cpp
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
  std::set_union(a.begin(), a.end(),
                 b.begin(), b.end(),
                 std::inserter(result, result.end()));

  std::for_each(result.begin(), result.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* set_union[color ff0000]


###出力
```
1
2
3
4
5
6
```


