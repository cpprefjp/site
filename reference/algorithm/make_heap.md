#make_heap
* algorithm[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void make_heap(RandomAccessIterator first, RandomAccessIterator last);

  template <class RandomAccessIterator, class Compare>
  void make_heap(RandomAccessIterator first, RandomAccessIterator last, Compare comp);
}
```

##概要
範囲をヒープ化する。


##要件
`*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしていること


##効果
`[first,last)` の範囲で heap を構築する


##戻り値
なし


##計算量
最大で `3 * (last - first)` 回比較する


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4};

  // ヒープ化する
  std::make_heap(v.begin(), v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* make_heap[color ff0000]
* iostream[link ../iostream.md]
* vector[link ../vector.md]
* algorithm[link ../algorithm.md]
* for_each[link for_each.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]
* begin[link ../vector/begin.md]
* end[link ../vector/end.md]

###出力
```
4
1
3
```


##実装例
```cpp
template <class RandomAccessIterator>
void make_heap(RandomAccessIterator first, RandomAccessIterator last)
{
  typedef typename std::iterator_traits<RandomAccessIterator>::difference_type difference_type;
  typedef typename std::iterator_traits<RandomAccessIterator>::value_type value_type;

  const difference_type len = last - first;
  for (difference_type top = len / 2 - 1; top >= 0; --top) {
    value_type v = std::move(first[top]);
    difference_type p = top;
    for (c = p * 2 + 1; c < len; c = p * 2 + 1) {
      if (c + 1 < len && first[c] < first[c + 1])
        ++c;
      if (!bool(v < first[c]))
        break;
      first[p] = std::move(first[c]);
      p = c;
    }
    first[p] = std::move(v);
  }
}

template <class RandomAccessIterator, class Compare>
void make_heap(RandomAccessIterator first, RandomAccessIterator last, Compare comp)
{
  typedef typename std::iterator_traits<RandomAccessIterator>::difference_type difference_type;
  typedef typename std::iterator_traits<RandomAccessIterator>::value_type value_type;

  const difference_type len = last - first;
  for (difference_type top = len / 2 - 1; top >= 0; --top) {
    value_type v = std::move(first[top]);
    difference_type p = top;
    for (c = p * 2 + 1; c < len; c = p * 2 + 1) {
      if (c + 1 < len && comp(first[c], first[c + 1]))
        ++c;
      if (!bool(comp(v, first[c])))
        break;
      first[p] = std::move(first[c]);
      p = c;
    }
    first[p] = std::move(v);
  }
}
```
* iterator_traits[link ../iterator/iterator_traits.md]
* move[link ../utility/move.md]

なお、[`push_heap`](push_heap.md) を使用すると以下のように実装できるが、一般的に上記の実装方法の方が効率が良いようである。
```cpp
template <class RandomAccessIterator>
void make_heap(RandomAccessIterator first, RandomAccessIterator last)
{
  for (RandomAccessIterator current = first + 1; current < last; ) {
    std::push_heap(first, ++current);
  }
}

template <class RandomAccessIterator, class Compare>
void make_heap(RandomAccessIterator first, RandomAccessIterator last, Compare comp)
{
  for (RandomAccessIterator current = first + 1; current < last; ) {
    std::push_heap(first, ++current, comp);
  }
}
```
* push_heap[link push_heap.md]
