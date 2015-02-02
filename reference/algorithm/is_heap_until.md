#is_heap_until (C++11)
```cpp
namespace std {
  template <class RandomAccessIterator>
  RandomAccessIterator is_heap_until(RandomAccessIterator first,
                                     RandomAccessIterator last);

  template <class RandomAccessIterator, class Compare>
  RandomAccessIterator is_heap_until(RandomAccessIterator first,
                                     RandomAccessIterator last,
                                     Compare comp);
}
```

##概要
範囲がヒープ化されているか判定し、ヒープ化されていない最初の要素を指すイテレータを取得する。


##戻り値
[`distance`](/reference/iterator/distance.md)`(first, last) < 2` の場合は `last` を返す。そうでない場合、`[first,last]` 内のイテレータ `i` について、`[first,i)` が `heap` であるような最後の `i` を返す。


##計算量
線形時間


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4};

  std::cout << std::boolalpha;

  std::cout << "before: is heap? "
            << (std::is_heap_until(v.begin(), v.end()) == v.end()) << std::endl;

  std::make_heap(v.begin(), v.end());
  std::cout << " after: is heap? "
            << (std::is_heap_until(v.begin(), v.end()) == v.end()) << std::endl;
}
```
* is_heap_until[color ff0000]
* iostream[link ../iostream.md]
* algorithm[link ../algorithm.md]
* vector[link ../vector.md]
* cout[link ../iostream/cout.md]
* boolalpha[link ../ios/boolalpha.md]
* endl[link ../ostream/endl.md]
* begin[link ../vector/begin.md]
* end[link ../vector/end.md]
* make_heap[link make_heap.md]

###出力
```
before: is heap? false
 after: is heap? true
```


##実装例
```cpp
template<class RandomAccessIterator>
RandomAccessIterator is_heap_until(RandomAccessIterator first, RandomAccessIterator last)
{
  typedef typename std::iterator_traits<RandomAccessIterator>::difference_type diff;
  for (diff len = last - first, p = 0, c = 1; c < len; ++c) {
    if (first[c] < first[p])
      return first + c;
    if ((c & 1) == 0)
      ++p;
  }
  return last;
}

template<class RandomAccessIterator, class Compare>
RandomAccessIterator is_heap_until(RandomAccessIterator first, RandomAccessIterator last,
                                   Compare comp)
{
  typedef typename std::iterator_traits<RandomAccessIterator>::difference_type diff;
  for (diff len = last - first, p = 0, c = 1; c < len; ++c) {
    if (comp(first[c], first[p]))
      return first + c;
    if ((c & 1) == 0)
      ++p;
  }
  return last;
}

```
* iterator_traits[link ../iterator/iterator_traits.md]


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??
