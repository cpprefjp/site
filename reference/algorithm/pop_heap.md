# pop_heap
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void pop_heap(RandomAccessIterator first, RandomAccessIterator last);

  template <class RandomAccessIterator, class Compare>
  void pop_heap(RandomAccessIterator first, RandomAccessIterator last,
                Compare comp);
}
```

## 概要
ヒープ化された範囲の先頭と末尾を入れ替え、ヒープ範囲を作り直す


## 要件
- `[first,last)` は空でない heap でなければならない。
- `RandomAccessIterator` は `ValueSwappable` の要件を満たしている必要がある。
- `*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


## 効果
`first` にある値を `last - 1` と交換し、その後 `[first,last - 1)` が有効な heap となるように配置する。


## 戻り値
なし


## 計算量
最大で `2 * log(last - first)` 回比較する


## 例
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4};

  std::make_heap(v.begin(), v.end());

  // 最後尾要素を削除してヒープ化
  std::pop_heap(v.begin(), v.end());
  v.pop_back();

  std::sort_heap(v.begin(), v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::pop_heap[color ff0000]
* std::make_heap[link make_heap.md]
* v.pop_back()[link /reference/vector/pop_back.md]
* std::sort_heap[link sort_heap.md]

### 出力
```
1
3
```


## 実装例
```cpp
template <class RandomAccessIterator>
void pop_heap(RandomAccessIterator first, RandomAccessIterator last)
{
  using difference_type = typename std::iterator_traits<RandomAccessIterator>::difference_type;
  using value_type      = typename std::iterator_traits<RandomAccessIterator>::value_type;
  --last;
  difference_type len = last - first;
  if (len > 0) {
    value_type v = std::move(*last);
    *last = std::move(*first);
    difference_type p = 0;
    for (difference_type c = 1; c < len; c = p * 2 + 1) {
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
void pop_heap(RandomAccessIterator first, RandomAccessIterator last, Compare comp)
{
  using difference_type = typename std::iterator_traits<RandomAccessIterator>::difference_type;
  using value_type      = typename std::iterator_traits<RandomAccessIterator>::value_type;
  --last;
  difference_type len = last - first;
  if (len > 0) {
    value_type v = std::move(*last);
    *last = std::move(*first);
    difference_type p = 0;
    for (difference_type c = 1; c < len; c = p * 2 + 1) {
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
* std::iterator_traits[link /reference/iterator/iterator_traits.md]
* std::move[link /reference/utility/move.md]
