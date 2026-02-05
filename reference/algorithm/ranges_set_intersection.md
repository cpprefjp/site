# set_intersection
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
  constexpr set_intersection_result<I1, I2, O>
    set_intersection(I1 first1,
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
    requires mergeable<iterator_t<R1>, iterator_t<R2>, O, Comp, Proj1, Proj2>
  constexpr set_intersection_result<
              borrowed_iterator_t<R1>,
              borrowed_iterator_t<R2>,
              O
            >
    set_intersection(R1&& r1,
                     R2&& r2,
                     O result,
                     Comp comp = {},
                     Proj1 proj1 = {},
                     Proj2 proj2 = {}); // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I1,
            sized_sentinel_for<I1> S1,
            random_access_iterator I2,
            sized_sentinel_for<I2> S2,
            random_access_iterator O,
            sized_sentinel_for<O> OutS,
            class Comp = ranges::less,
            class Proj1 = identity,
            class Proj2 = identity>
    requires mergeable<I1, I2, O, Comp, Proj1, Proj2>
  set_intersection_result<I1, I2, O>
    set_intersection(Ep&& exec,
                     I1 first1,
                     S1 last1,
                     I2 first2,
                     S2 last2,
                     O result,
                     OutS result_last,
                     Comp comp = {},
                     Proj1 proj1 = {},
                     Proj2 proj2 = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R1,
            sized-random-access-range R2,
            sized-random-access-range OutR,
            class Comp = ranges::less,
            class Proj1 = identity,
            class Proj2 = identity>
    requires mergeable<iterator_t<R1>, iterator_t<R2>, iterator_t<OutR>, Comp, Proj1, Proj2>
  set_intersection_result<
              borrowed_iterator_t<R1>,
              borrowed_iterator_t<R2>,
              borrowed_iterator_t<OutR>
            >
    set_intersection(Ep&& exec,
                     R1&& r1,
                     R2&& r2,
                     OutR&& result_r,
                     Comp comp = {},
                     Proj1 proj1 = {},
                     Proj2 proj2 = {}); // (4) C++26
}
```
* set_intersection_result[link ranges_in_in_out_result.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* ranges::less[link /reference/functional/ranges_less.md]
* mergeable[link /reference/iterator/mergeable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
2つのソート済み範囲の積集合を得る

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 事前条件
結果の範囲は両方の入力の範囲と重なっていてはならない。


## 効果
２つの範囲からソート済みの intersection を構築する。つまり、両方の範囲のみにある要素の集合を構築する。


## 戻り値
次のメンバをもつtuple-likeオブジェクト。

```cpp
set_intersection_result {
  .in1 = last1,
  .in2 = last2,
  .out = result_last,
}
```
* set_intersection_result[link ranges_in_in_out_result.md]

ただし、`result_last` は構築された範囲の終端。 

## 計算量
最大で `2 * ((last1 - first1) + (last2 - first2)) - 1` 回の比較を行う


## 備考
`[first1,last1)` が `m` 個、`[first2,last2)` が `n` 個の等価な要素を含んでいる場合、`[first1,last1)` から最初の [`min`](min.md)`(m, n)` 要素が出力の範囲へ順番にコピーされる。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <set>
#include <algorithm>

int main()
{
  std::multiset<int> a = {1, 2, 3, 4};
  std::multiset<int> b = {4, 5, 6, 2};
  std::multiset<int> result;

  // aとbの積集合を作る
  std::ranges::set_intersection(a, b, std::inserter(result, result.end()));

  for (int x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::ranges::set_intersection[color ff0000]
* std::multiset[link /reference/set/multiset.md]
* end()[link /reference/set/set/end.md]
* std::inserter[link /reference/iterator/inserter.md]

### 出力
```
2
4
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main()
{
  std::vector<int> a = {1, 2, 3, 4};
  std::vector<int> b = {2, 4, 5, 6};
  std::vector<int> result(std::min(a.size(), b.size()));

  // 並列にaとbの積集合を作る
  auto ret = std::ranges::set_intersection(
    std::execution::par,
    a,
    b,
    result
  );

  for (auto it = result.begin(); it != ret.out; ++it) {
    std::cout << *it << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::set_intersection[color ff0000]

#### 出力
```
2 4
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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
