# push_heap
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  // (1)
  template<random_access_iterator I, sentinel_for<I> S, class Comp = ranges::less, class Proj = identity>
    requires sortable<I, Comp, Proj>
  constexpr I push_heap(I first, S last, Comp comp = {}, Proj proj = {});

  // (2)
  template<random_access_range R, class Comp = ranges::less, class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  constexpr borrowed_iterator_t<R> push_heap(R&& r, Comp comp = {}, Proj proj = {});
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
ヒープ化された範囲に要素を追加する

* (1): イテレータペアで範囲を指定する
* (2): 範囲を直接指定する


## 事前条件
- `[first,last - 1)` は有効な heap である必要がある。


## 効果
`last - 1` の値を、`[first,last)` が有効な heap となるように配置する


## 戻り値
`last`


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

  std::ranges::make_heap(v);

  // 要素を追加してヒープ化
  v.push_back(2);
  std::ranges::push_heap(v);

  std::ranges::sort_heap(v);

  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```
* std::ranges::push_heap[color ff0000]
* std::ranges::make_heap[link ranges_make_heap.md]
* v.push_back[link /reference/vector/vector/push_back.md]
* std::ranges::sort_heap[link ranges_sort_heap.md]

### 出力
```
1
2
3
4
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
