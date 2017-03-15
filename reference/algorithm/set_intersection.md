# set_intersection
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class InputIterator1, class InputIterator2, class OutputIterator>
  OutputIterator set_intersection(InputIterator1 first1, InputIterator1 last1,
                                InputIterator2 first2, InputIterator2 last2,
                                OutputIterator result);
  template <class InputIterator1, class InputIterator2, class OutputIterator,
            class Compare>
  OutputIterator set_intersection(InputIterator1 first1, InputIterator1 last1,
                                  InputIterator2 first2, InputIterator2 last2,
                                  OutputIterator result, Compare comp);
}
```

## 概要
2つのソート済み範囲の積集合を得る


## 要件
結果の範囲は両方の入力の範囲と重なっていてはならない。


## 効果
２つの範囲からソート済みの intersection を構築する。つまり、両方の範囲のみにある要素の集合を構築する。


## 戻り値
構築された範囲の終端


## 計算量
最大で `2 * ((last1 - first1) + (last2 - first2)) - 1` 回の比較を行う


## 備考
`[first1,last1)` が `m` 個、`[first2,last2)` が `n` 個の等価な要素を含んでいる場合、`[first1,last1)` から最初の [`min`](min.md)`(m, n)` 要素が出力の範囲へ順番にコピーされる。


## 例
```cpp
#include <iostream>
#include <set>
#include <algorithm>
#include <iterator>

int main()
{
  std::multiset<int> a = {1, 2, 3, 4};
  std::multiset<int> b = {4, 5, 6, 2};
  std::multiset<int> result;

  // aとbの積集合を作る
  std::set_intersection(a.begin(), a.end(),
                        b.begin(), b.end(),
                        std::inserter(result, result.end()));

  std::for_each(result.begin(), result.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::set_intersection[color ff0000]
* std::multiset[link /reference/set/multiset.md]
* begin()[link /reference/set/set/begin.md]
* end()[link /reference/set/set/end.md]
* std::inserter[link /reference/iterator/inserter.md]

### 出力
```
2
4
```


