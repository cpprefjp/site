#lower_bound
```cpp
namespace std {
  template<class ForwardIterator, class T>
  ForwardIterator lower_bound(ForwardIterator first, ForwardIterator last,
                              const T& value);

  template<class ForwardIterator, class T, class Compare>
  ForwardIterator lower_bound(ForwardIterator first, ForwardIterator last,
                              const T& value, Compare comp);
}
```

##概要
指定された要素以上の値が現れる最初の位置のイテレータを取得する


##要件
`[first,last)` の要素 `e` は `e < value` または `comp(e, value)` によってパーティションされていなければならない。


##戻り値
`[first,last]` 内のイテレータ `i` について、`[first,i)` 内の全てのイテレータ `j` が `*j < value` または `comp(*j, value) != false` であるような、最も `first` から離れているイテレータ `i` を返す。


##計算量
最大で log2(`last - first`) + O(1) 回の比較を行う


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  std::sort(v.begin(), v.end());

  // 3以上の要素を二分探索で検索
  decltype(v)::iterator it = std::lower_bound(v.begin(), v.end(), 3);

  std::cout << *it << std::endl;
}
```
* lower_bound[color ff0000]

###出力
```
3
```

##実装例
```cpp
```

##参照

