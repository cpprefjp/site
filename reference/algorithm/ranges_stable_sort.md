# stable_sort
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
  I
    stable_sort(I first,
                S last,
                Comp comp = {},
                Proj proj = {}); // (1) C++20
  template <random_access_iterator I,
            sentinel_for<I> S,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<I, Comp, Proj>
  constexpr I
    stable_sort(I first,
                S last,
                Comp comp = {},
                Proj proj = {}); // (1) C++26

  template <random_access_range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  borrowed_iterator_t<R>
    stable_sort(R&& r,
                Comp comp = {},
                Proj proj = {}); // (2) C++20
  template <random_access_range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  constexpr borrowed_iterator_t<R>
    stable_sort(R&& r,
                Comp comp = {},
                Proj proj = {}); // (2) C++26
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
範囲を安定ソートで並べ替える

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 効果
`[first,last)` の範囲をソートする


## 戻り値
`last`

## 計算量
最大で N log^2(N) （N == `last - first`）回の比較を行う。ただし、十分なメモリがあれば N log(N) になる。


## 備考
同じ値が複数あった場合に、ソート前の位置関係が保たれる、「安定ソート」を行う。
一般的にマージソートで実装される。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  // 並べ替える
  std::ranges::stable_sort(v);

  for (int i : v) {
    std::cout << i;
  }
  std::cout << std::endl;
}
```
* std::ranges::stable_sort[color ff0000]

### 出力
```
12345
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
- [P2562R1 `constexpr` Stable Sorting](https://open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2562r1.pdf)
    - C++26から`constexpr`に対応した
