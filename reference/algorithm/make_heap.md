# make_heap
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void make_heap(RandomAccessIterator first,
                 RandomAccessIterator last);           // (1) C++03

  template <class RandomAccessIterator>
  constexpr void make_heap(RandomAccessIterator first,
                           RandomAccessIterator last); // (1) C++20

  template <class RandomAccessIterator, class Compare>
  void make_heap(RandomAccessIterator first,
                 RandomAccessIterator last,
                 Compare comp);                        // (2) C++03

  template <class RandomAccessIterator, class Compare>
  constexpr void make_heap(RandomAccessIterator first,
                           RandomAccessIterator last,
                           Compare comp);              // (2) C++20
}
```

## 概要
イテレータ範囲`[first, last)`をヒープ化する。


## テンプレートパラメータ制約
- `*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしていること


## 効果
`[first,last)` の範囲で heap を構築する


## 戻り値
なし


## 計算量
最大で `3 * (last - first)` 回比較する


## 例
```cpp example
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
* std::make_heap[color ff0000]

### 出力
```
4
1
3
```


## 実装例
```cpp
template <class RandomAccessIterator>
void make_heap(RandomAccessIterator first, RandomAccessIterator last)
{
  using difference_type = typename std::iterator_traits<RandomAccessIterator>::difference_type;
  using value_type      = typename std::iterator_traits<RandomAccessIterator>::value_type;

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
  using difference_type = typename std::iterator_traits<RandomAccessIterator>::difference_type;
  using value_type      = typename std::iterator_traits<RandomAccessIterator>::value_type;

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
* std::iterator_traits[link /reference/iterator/iterator_traits.md]
* std::move[link /reference/utility/move.md]

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


## 参照
- [P0879R0 Constexpr for `swap` and `swap` related functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html)
