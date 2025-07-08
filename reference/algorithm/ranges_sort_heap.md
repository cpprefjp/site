# sort_heap
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
    sort_heap(I first,
              S last,
              Comp comp = {},
              Proj proj = {}); // (1) C++20

  template <random_access_range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  constexpr borrowed_iterator_t<R>
    sort_heap(R&& r,
              Comp comp = {},
              Proj proj = {}); // (2) C++20
}
```
* ranges::less[link /reference/functional/ranges_less.md]
* sortable[link /reference/iterator/sortable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
ヒープ化された範囲を並べ替える

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
- `[first,last)` は有効なヒープである必要がある。


## 効果
ヒープ化されている `[first,last)` をソートする


## 戻り値
`last`


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
  std::ranges::make_heap(v);

  // ヒープ化された範囲をソート
  std::ranges::sort_heap(v);

  for (int x : v) {
    std::cout << x << std::endl;
  }
}
```
* std::ranges::sort_heap[color ff0000]
* std::ranges::make_heap[link ranges_make_heap.md]

### 出力
```
1
3
4
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
