# is_heap_until
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

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

## 概要
範囲がヒープ化されているか判定し、ヒープ化されていない最初の要素を指すイテレータを取得する。


## 戻り値
[`distance`](/reference/iterator/distance.md)`(first, last) < 2` の場合は `last` を返す。そうでない場合、`[first,last]` 内のイテレータ `i` について、`[first,i)` が `heap` であるような最後の `i` を返す。


## 計算量
線形時間


## 例
```cpp example
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
* std::is_heap_until[color ff0000]
* std::make_heap[link make_heap.md]

### 出力
```
before: is heap? false
 after: is heap? true
```


## 実装例
```cpp
template<class RandomAccessIterator>
RandomAccessIterator is_heap_until(RandomAccessIterator first, RandomAccessIterator last)
{
  using diff = typename std::iterator_traits<RandomAccessIterator>::difference_type;
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
  using diff = typename std::iterator_traits<RandomAccessIterator>::difference_type;
  for (diff len = last - first, p = 0, c = 1; c < len; ++c) {
    if (comp(first[c], first[p]))
      return first + c;
    if ((c & 1) == 0)
      ++p;
  }
  return last;
}

```
* std::iterator_traits[link /reference/iterator/iterator_traits.md]


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0


## 参照
- [N2246 2 of the least crazy ideas for the standard library in C++0x](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2246.html)
