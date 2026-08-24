# sort_heap
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void sort_heap(RandomAccessIterator first,
                 RandomAccessIterator last);           // (1) C++03

  template <class RandomAccessIterator>
  constexpr void sort_heap(RandomAccessIterator first,
                           RandomAccessIterator last); // (1) C++20

  template <class RandomAccessIterator, class Compare>
  void sort_heap(RandomAccessIterator first,
                 RandomAccessIterator last,
                 Compare comp);                        // (2) C++03

  template <class RandomAccessIterator, class Compare>
  constexpr void sort_heap(RandomAccessIterator first,
                           RandomAccessIterator last,
                           Compare comp);              // (2) C++20
}
```

## 概要
ヒープ化されたイテレータ範囲`[first, last)`を並べ替える


## テンプレートパラメータ制約
- `RandomAccessIterator` は `ValueSwappable` の要件を満たしていること
- `*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしていること


## 事前条件
- `[first,last)` は有効なヒープであること


## 効果
ヒープ化されている `[first,last)` をソートする


## 戻り値
なし


## 計算量
最大で 2N log(N) 回比較する（N == `last - first`）


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4};
  std::make_heap(v.begin(), v.end());

  // ヒープ化された範囲をソート
  std::sort_heap(v.begin(), v.end());

  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::sort_heap[color ff0000]
* std::make_heap[link make_heap.md]

### 出力
```
1
3
4
```


## 関連項目
- [`ranges::sort_heap`](/reference/algorithm/ranges_sort_heap.md)

## 参照
- [P0879R0 Constexpr for `swap` and `swap` related functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0879r0.html)
- [LWG Issue 2444. Inconsistent complexity for `std::sort_heap`](https://cplusplus.github.io/LWG/issue2444)
    - 計算量の上限が「N log(N)回」から「2N log(N)回」に修正された（`sort_heap`はN回の`pop_heap`を行うため）。この修正は欠陥報告(DR)であり、C++17にも遡及して適用される
