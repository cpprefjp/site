#push_heap
* algorithm[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void push_heap(RandomAccessIterator first, RandomAccessIterator last);

  template <class RandomAccessIterator, class Compare>
  void push_heap(RandomAccessIterator first, RandomAccessIterator last,
                 Compare comp);
}
```

##概要
ヒープ化された範囲に要素を追加したヒープ範囲を得る


##要件
- `[first,last - 1)` は有効な heap である必要がある。
- `*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


##効果
`last - 1` の値を、`[first,last)` が有効な heap となるように配置する


##戻り値
なし


##計算量
最大で `log(last - first)` 回比較する。


##例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4};

  std::make_heap(v.begin(), v.end());

  // 要素を追加してヒープ化
  v.push_back(2);
  std::push_heap(v.begin(), v.end());

  std::sort_heap(v.begin(), v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* push_heap[color ff0000]
* iostream[link ../iostream.md]
* vector[link ../vector.md]
* algorithm[link ../algorithm.md]
* make_heap[link make_heap.md]
* push_back[link ../vector/push_back.md]
* sort_heap[link sort_heap.md]
* for_each[link for_each.md]
* begin[link ../vector/begin.md]
* end[link ../vector/end.md]
* cout[link ../iostream/cout.md]
* endl[link ../ostream/endl.md]

###出力
```
1
2
3
4
```


##実装例
```cpp
template <class RandomAccessIterator>
void push_heap(RandomAccessIterator first, RandomAccessIterator last)
{
  typedef typename std::iterator_traits<RandomAccessIterator>::difference_type difference_type;
  typedef typename std::iterator_traits<RandomAccessIterator>::value_type value_type;
  difference_type c = last - first - 1;
  value_type v = std::move(first[c]);
  while (c > 0) {
    difference_type p = (c - 1) / 2;
    if (!bool(first[p] < v))
      break;
    first[c] = std::move(first[p]);
    c = p;
  }
  first[c] = std::move(v);
}

template <class RandomAccessIterator, class Compare>
void push_heap(RandomAccessIterator first, RandomAccessIterator last, Compare comp)
{
  typedef typename std::iterator_traits<RandomAccessIterator>::difference_type difference_type;
  typedef typename std::iterator_traits<RandomAccessIterator>::value_type value_type;

  difference_type c = last - first - 1;
  value_type v = std::move(first[c]);
  while (c > 0) {
    difference_type p = (c - 1) / 2;
    if (!bool(comp(first[p], v)))
      break;
    first[c] = std::move(first[p]);
    c = p;
  }
  first[c] = std::move(v);
}
```
* move[link ../utility/move.md]
* iterator_traits[link ../iterator/iterator_traits.md]
