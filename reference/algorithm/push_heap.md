# push_heap
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void push_heap(RandomAccessIterator first,
                 RandomAccessIterator last);           // (1) C++03

  template <class RandomAccessIterator>
  constexpr void push_heap(RandomAccessIterator first,
                           RandomAccessIterator last); // (1) C++20

  template <class RandomAccessIterator, class Compare>
  void push_heap(RandomAccessIterator first,
                 RandomAccessIterator last,
                 Compare comp);                        // (2) C++03

  template <class RandomAccessIterator, class Compare>
  constexpr void push_heap(RandomAccessIterator first,
                           RandomAccessIterator last,
                           Compare comp);              // (2) C++20
}
```

## 概要
ヒープ化されたイテレータ範囲`[first, last - 1)`に要素を追加する。

この関数は、イテレータ範囲の末尾要素`*(last - 1)`を、範囲全体がヒープとなるよう配置し直す。


## テンプレートパラメータ制約
- `*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしていること


## 事前条件
- `[first,last - 1)` は有効なヒープであること


## 効果
`last - 1` の値を、`[first,last)` が有効なヒープとなるように配置する


## 戻り値
なし


## 計算量
最大で `log(last - first)` 回比較する。


## 例
```cpp example
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
* std::push_heap[color ff0000]
* v.push_back[link /reference/vector/vector/push_back.md]

### 出力
```
1
2
3
4
```


## 実装例
```cpp
template <class RandomAccessIterator>
void push_heap(RandomAccessIterator first, RandomAccessIterator last)
{
  using difference_type = typename std::iterator_traits<RandomAccessIterator>::difference_type;
  using value_type      = typename std::iterator_traits<RandomAccessIterator>::value_type;
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
  using difference_type = typename std::iterator_traits<RandomAccessIterator>::difference_type;
  using value_type      = typename std::iterator_traits<RandomAccessIterator>::value_type;

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
* std::move[link /reference/utility/move.md]
* std::iterator_traits[link /reference/iterator/iterator_traits.md]


## 参照
- [P0879R0 Constexpr for `swap` and `swap` related functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html)
