# is_permutation
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I1,
            sentinel_for<I1> S1,
            forward_iterator I2,
            sentinel_for<I2> S2,
            class Proj1 = identity,
            class Proj2 = identity,
            indirect_equivalence_relation<
              projected<I1, Proj1>,
              projected<I2, Proj2>
            > Pred = ranges::equal_to>
  constexpr bool
    is_permutation(I1 first1,
                   S1 last1,
                   I2 first2,
                   S2 last2,
                   Pred pred = {},
                   Proj1 proj1 = {},
                   Proj2 proj2 = {}); // (1) C++20

  template <forward_range R1,
            forward_range R2,
            class Proj1 = identity,
            class Proj2 = identity,
            indirect_equivalence_relation<
              projected<iterator_t<R1>, Proj1>,
              projected<iterator_t<R2>, Proj2>
            > Pred = ranges::equal_to>
  constexpr bool
    is_permutation(R1&& r1,
                   R2&& r2,
                   Pred pred = {},
                   Proj1 proj1 = {},
                   Proj2 proj2 = {}); // (2) C++20
}
```
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* identity[link /reference/functional/identity.md]
* indirect_equivalence_relation[link /reference/iterator/indirect_equivalence_relation.md]
* projected[link /reference/iterator/projected.md]
* forward_range[link /reference/ranges/forward_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]

## 概要
範囲 `[first2, last2)` を並べ替えたものが、`[first1, last1)` の範囲と一致するか判定する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 戻り値
`last2` が与えられている形式の場合、`last1 - first1 != last2 - first2` であれば `false` を返す。  
そうでなければ、`[first1, last1)` の範囲と `[first2, first2 + (last1 - first1))` の範囲を並び変えたもので、[`equal`](equal.md)`(first1, last1, first2)`、あるいは [`equal`](equal.md)`(first1, last1, first2, pred)` が `true` を返すようなものがあれば `true` を、そうでなければ `false` を返す。  
なお、実際に並べ替えが行われるわけではない。


## 計算量
`last2` が与えられている形式の場合、`I1` と `I2` がどちらも[`random_access_iterator`](/reference/iterator/random_access_iterator.md)のモデルであり、かつ `last1 - first1 != last2 - first2` であれば 1 度も述語の適用を行わない。  
そうでなければ、[`equal`](/reference/algorithm/equal.md)`(first1, last1, first2, last2) == true` もしくは [`equal`](/reference/algorithm/equal.md)`(first1, last1, first2, last2, pred) == true` の場合（`last2` が無い形式の場合、[`equal`](/reference/algorithm/equal.md) も `last2` の無い形式で置き換える）、[`distance`](/reference/iterator/distance.md)`(first1, last1)` 回の述語適用で完了する。  
そうでなければ、[`distance`](/reference/iterator/distance.md)`(first1, last1)` をNとした場合に最悪O(N^2)回の述語適用で完了する。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main ()
{
  std::vector<int> v = {1, 2, 3};

  std::vector<int> good = {2, 3, 1};
  std::vector<int> bad = {2, 3, 4};

  std::cout << std::boolalpha;
  std::cout << std::ranges::is_permutation(v, good) << std::endl;
  std::cout << std::ranges::is_permutation(v, bad) << std::endl;
}
```
* std::ranges::is_permutation[color ff0000]

### 出力
```
true
false
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
