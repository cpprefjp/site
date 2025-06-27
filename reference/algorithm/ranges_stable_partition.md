# stable_partition
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <bidirectional_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
    requires permutable<I>
  subrange<I>
    stable_partition(I first,
                     S last,
                     Pred pred,
                     Proj proj = {}); // (1) C++20
  template <bidirectional_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
    requires permutable<I>
  constexpr subrange<I>
    stable_partition(I first,
                     S last,
                     Pred pred,
                     Proj proj = {}); // (1) C++26

  template <bidirectional_range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
    requires permutable<iterator_t<R>>
  borrowed_subrange_t<R>
    stable_partition(R&& r,
                     Pred pred,
                     Proj proj = {}); // (2) C++20
  template <bidirectional_range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
    requires permutable<iterator_t<R>>
  constexpr borrowed_subrange_t<R>
    stable_partition(R&& r,
                     Pred pred,
                     Proj proj = {}); // (2) C++26
}
```
* bidirectional_iterator[link /reference/iterator/bidirectional_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* identity[link /reference/functional/identity.md]
* indirect_unary_predicate[link /reference/iterator/indirect_unary_predicate.md]
* projected[link /reference/iterator/projected.md]
* permutable[link /reference/iterator/permutable.md]
* subrange[link /reference/ranges/subrange.md]
* bidirectional_range[link /reference/ranges/bidirectional_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_subrange_t[link /reference/ranges/borrowed_subrange_t.md]


## 概要
与えられた範囲を相対順序を保ちながら条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 効果
`[first,last)` 内にある `pred` を満たす全ての要素を、`pred` を満たさない全ての要素より前に移動させる。


## 戻り値
`{i, last}`

ただし、`[first,i)` 内にあるイテレータ `j` について `pred(*j) != false` を満たし、`[i,last)` 内にあるイテレータ `k` について `pred(*k) == false` を満たすようなイテレータ(つまり、[区分化](/reference/algorithm.md#sequence-is-partitioned)された境界を指すイテレータ)を `i` とする。

条件を満たす・満たさない両グループ内での要素間の相対順序は保たれる。


## 計算量
`N = last - first`として説明する。

- (1), (2) : 最大でN log N回 swap が行われるが、余分なメモリを使って構わないのであれば線形回数の swap になる。それに加えて、正確にN回だけ述語が適用される


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  // 偶数グループと奇数グループに分ける
  std::ranges::stable_partition(v, [](int x) { return x % 2 == 0; });

  for (int x : v) {
   std::cout << x << std::endl;
  }
}
```
* std::ranges::stable_partition[color ff0000]

### 出力
```
2
4
1
3
5
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
