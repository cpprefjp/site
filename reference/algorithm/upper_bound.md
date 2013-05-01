#upper_bound
```cpp
namespace std {
  template<class ForwardIterator, class T>
  ForwardIterator upper_bound(ForwardIterator first, ForwardIterator last,
                              const T& value);

  template<class ForwardIterator, class T, class Compare>
  ForwardIterator upper_bound(ForwardIterator first, ForwardIterator last,
                              const T& value, Compare comp);
}
```

##概要

指定された要素より大きい値が現れる最も後ろの位置のイテレータを取得する



##要件

[first,last) の要素 e は !(value < e) または !comp(value, e) によってパーティションされていなければならない。


##戻り値

[first,last] 内のイテレータ i について、[first,i) 内の全てのイテレータ j が !(value < *j) または comp(value, *j) == false であるような、最も first から離れているイテレータ i を返す。


##計算量

最大で log2(last - first) + O(1) 回の比較を行う



##備考



##例

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  std::sort(v.begin(), v.end());

  // 3より大きい要素を二分探索で検索
  decltype(v)::iterator it = std::upper_bound(v.begin(), v.end(), 3);

  std::cout << *it << std::endl;
}
```
* upper_bound[color ff0000]

###出力

```cpp
4
```

##実装例

```cpp
```

##参照
```