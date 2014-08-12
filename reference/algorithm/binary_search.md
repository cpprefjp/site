#binary_search
```cpp
namespace std {
  template <class ForwardIterator, class T>
  bool binary_search(ForwardIterator first,
                     ForwardIterator last,
                     const T& value);

  template <class ForwardIterator, class T, class Compare>
  bool binary_search(ForwardIterator first,
                     ForwardIterator last,
                     const T& value,
                     Compare comp);
}
```

##概要
二分探索法による検索を行う。


##要件
`[first,last)` の要素 `e` は `e < value && !(value < e)` または `comp(e, value) && !comp(value, e)` によって区分化されていなければならない。

また、`[first, last)` の要素 `e` は全て暗黙に、`e < value` が `!(value < e)` または `comp(e, value)` が `!comp(value, e)` を意味している必要がある。


##戻り値
`[first,last)` 内のイテレータ `i` について、`!(*i < value) && !(value < *i)` または `comp(*i, value) == false && comp(value, *i) == false` であるようなイテレータが見つかった場合は `true` を返す。


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

  if (std::binary_search(v.begin(), v.end(), 3)) {
    std::cout << "found" << std::endl;
  }
  else {
    std::cout << "not found" << std::endl;
  }
}
```
* binary_search[color ff0000]

###出力
```
found
```


