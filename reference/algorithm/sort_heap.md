# sort_heap
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template <class RandomAccessIterator>
  void sort_heap(RandomAccessIterator first, RandomAccessIterator last);

  template <class RandomAccessIterator, class Compare>
  void sort_heap(RandomAccessIterator first, RandomAccessIterator last,
                 Compare comp);
}
```

## 概要
ヒープ化された範囲を並べ替える


## 要件
- `[first,last)` は有効なヒープである必要がある。
- `RandomAccessIterator` は `ValueSwappable` の要件を満たしている必要がある。
- `*first` の型は `MoveConstructible` と `MoveAssignable` の要件を満たしている必要がある。


## 効果
ヒープ化されている `[first,last)` をソートする


## 戻り値
なし


## 計算量
最大で N log(N) 回比較する（N == `last - first`）


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


