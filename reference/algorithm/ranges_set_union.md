# set_union
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I1,
            sentinel_for<I1> S1,
            input_iterator I2,
            sentinel_for<I2> S2,
            weakly_incrementable O,
            class Comp = ranges::less,
            class Proj1 = identity,
            class Proj2 = identity>
    requires mergeable<I1, I2, O, Comp, Proj1, Proj2>
  constexpr set_union_result<I1, I2, O>
    set_union(I1 first1,
              S1 last1,
              I2 first2,
              S2 last2,
              O result,
              Comp comp = {},
              Proj1 proj1 = {},
              Proj2 proj2 = {}); // (1) C++20

  template <input_range R1,
            input_range R2,
            weakly_incrementable O,
            class Comp = ranges::less,
            class Proj1 = identity,
            class Proj2 = identity>
    requires mergeable<
               iterator_t<R1>,
               iterator_t<R2>,
               O,
               Comp,
               Proj1,
               Proj2>
  constexpr set_union_result<borrowed_iterator_t<R1>, borrowed_iterator_t<R2>, O>
    set_union(R1&& r1,
              R2&& r2,
              O result,
              Comp comp = {},
              Proj1 proj1 = {},
              Proj2 proj2 = {}); // (2) C++20
}
```
* set_union_result[link ranges_in_in_out_result.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* ranges::less[link /reference/functional/ranges_less.md]
* mergeable[link /reference/iterator/mergeable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
2つのソート済み範囲の和集合を得る

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 事前条件
結果の範囲は両方の入力の範囲と重なっていてはならない。


## 効果
２つの範囲からソート済みの union を構築する。つまり、片方または両方の範囲にある要素の集合を構築する。


## 戻り値
```cpp
set_union_result {
  .in1 = last1,
  .in2 = last2,
  .out = result_last,
}
```
* set_union_result[link ranges_in_in_out_result.md]

ただし、`result_last` は構築された範囲の終端。 

## 計算量
最大で `2 * ((last1 - first1) + (last2 - first2)) - 1` 回の比較を行う

## 例
```cpp example
#include <iostream>
#include <set>
#include <list>
#include <vector>
#include <algorithm>
#include <iterator>
#include <ranges>

int main()
{
  std::list<int> a = {1, 2, 3, 4};
  std::multiset<int> b = {4, 5, 6, 2};
  std::vector<int> result;

  // aとbの和集合を作る
  std::ranges::set_union(a, b, std::inserter(result, std::ranges::end(result)));

  for (int x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::ranges::set_union[color ff0000]
* std::multiset[link /reference/set/multiset.md]
* std::inserter[link /reference/iterator/inserter.md]
* std::ranges::end[link /reference/ranges/end.md]

### 出力
```
1
2
3
4
5
6
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
