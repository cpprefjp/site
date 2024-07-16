# pop_heap
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <random_access_iterator I,
            sentinel_for<I> S,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<I, Comp, Proj>
  constexpr I
    pop_heap(I first,
             S last,
             Comp comp = {},
             Proj proj = {}); // (1) C++20

  template <random_access_range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  constexpr borrowed_iterator_t<R>
    pop_heap(R&& r,
             Comp comp = {},
             Proj proj = {}); // (2) C++20
}
```
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::less[link /reference/functional/ranges_less.md]
* identity[link /reference/functional/identity.md]
* sortable[link /reference/iterator/sortable.md]
* random_access_range[link /reference/ranges/random_access_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
ヒープ化された範囲の先頭と末尾を入れ替え、ヒープ範囲を作り直す

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
- `[first,last)` は空でない heap でなければならない。


## 効果
`first` にある値を `last - 1` と交換し、その後 `[first,last - 1)` が有効な heap となるように配置する。


## 戻り値
`last`


## 計算量
最大で `2 * log(last - first)` 回比較する


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4};

  std::ranges::make_heap(v);

  // 最後尾要素を削除してヒープ化
  std::ranges::pop_heap(v);
  v.pop_back();

  std::ranges::sort_heap(v);

  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```
* std::ranges::pop_heap[color ff0000]
* std::ranges::make_heap[link ranges_make_heap.md]
* v.pop_back()[link /reference/vector/vector/pop_back.md]
* std::ranges::sort_heap[link ranges_sort_heap.md]

### 出力
```
1
3
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
