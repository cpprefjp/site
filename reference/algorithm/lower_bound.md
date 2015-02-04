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
`[first,last)` の要素 `e` は `e < value` または `comp(e, value)` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていなければならない。


##戻り値
`[first,last]` 内のイテレータ `i` について、`[first,i)` 内の全てのイテレータ `j` が `*j < value` または `comp(*j, value) != false` であるような、最も `first` から離れているイテレータ `i` を返す。


##計算量
最大で log2(`last - first`) + O(1) 回の比較を行う


##備考
本関数は、本質的に C++11 で追加された [`partition_point`](partition_point.md) と同一である。  
具体的には、[`partition_point`](partition_point.md)`(first, last, [value](const T& e) { return e < value; })`、あるいは、[`partition_point`](partition_point.md)`(first, last, [value, comp](const T& e) { return comp(e, value); })` とすることで同一の結果が得られる。


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
* iostream[link ../iostream.md]
* vector[link ../vector.md]
* algorithm[link ../algorithm.md]
* sort[link sort.md]
* begin[link ../vector/begin.md]
* end[link ../vector/end.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]


###出力
```
3
```


##実装例
```cpp
template<class ForwardIterator, class T>
ForwardIterator
lower_bound(ForwardIterator first, ForwardIterator last, const T& value)
{
    typedef typename std::iterator_traits<ForwardIterator>::difference_type diff;
    for (diff len = std::distance(first, last); len != 0; ) {
        diff half = len / 2;
        ForwardIterator mid = first;
        std::advance(mid, half);
        if (*mid < value) {
            len -= half + 1;
            first = ++mid;
        } else {
            len = half;
        }
    }
    return first;
}

template<class ForwardIterator, class T, class Compare>
ForwardIterator
lower_bound(ForwardIterator first, ForwardIterator last, const T& value, Compare comp)
{
    typedef typename std::iterator_traits<ForwardIterator>::difference_type diff;
    for (diff len = std::distance(first, last); len != 0; ) {
        diff half = len / 2;
        ForwardIterator mid = first;
        std::advance(mid, half);
        if (comp(*mid, value)) {
            len -= half + 1;
            first = ++mid;
        } else {
            len = half;
        }
    }
    return first;
}
```
* distance[link ../iterator/distance.md]
* advance[link ../iterator/advance.md]
* iterator_traits[link ../iterator/iterator_traits.md]
