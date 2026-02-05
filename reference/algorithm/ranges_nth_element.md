# nth_element
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
    nth_element(I first,
                I nth,
                S last,
                Comp comp = {},
                Proj proj = {}); // (1) C++20

  template <random_access_range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  constexpr borrowed_iterator_t<R>
    nth_element(R&& r,
                iterator_t<R> nth,
                Comp comp = {},
                Proj proj = {}); // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<I, Comp, Proj>
  I nth_element(Ep&& exec,
                I first,
                I nth,
                S last,
                Comp comp = {},
                Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  borrowed_iterator_t<R>
    nth_element(Ep&& exec,
                R&& r,
                iterator_t<R> nth,
                Comp comp = {},
                Proj proj = {}); // (4) C++26
}
```
* ranges::less[link /reference/functional/ranges_less.md]
* sortable[link /reference/iterator/sortable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]


## 概要
基準となる要素よりも小さい要素が前に来るよう並べ替える。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

この関数は範囲 `[first,last)` の並び替えを行うが、基準位置 `nth` のみが正しい要素、つまり仮に範囲 `[first,last)` 全体を並び替えた際に`nth`に位置すべき要素となる。前半の範囲 `[first,nth)` は関数呼び出し後の位置 `nth` にある要素よりも小さいことは保証されるが、その範囲 `[first,nth)` 内での要素並び順はなんら保証されない。

ある範囲に対して部分的な並び替えを行う場合、[`partial_sort()`](partial_sort.md)を使用する。また範囲全体に対して並び替えを行う場合、[`sort()`](sort.md)を使用する。

## 効果
`nth_element()` を呼び出した後、`nth` が指している位置の要素は、全ての範囲がソートされた場合の位置にある要素になる。そして、`[first,nth)` にあるイテレータ `i` と、`[nth,last)` にあるイテレータ `j` について、`!(*j < *i)` または `comp(*j, *i) == false` になる。


## 戻り値
`last`


## 計算量
平均で線形時間

## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {5, 10, 4, 7, 1, 9, 8, 6, 2};

  // 4番目に小さい値より小さい値を前に集める
  std::ranges::nth_element(v, v.begin() + 3);

  for (int i : v) {
    std::cout << i << std::endl;
  }
}
```
* std::ranges::nth_element[color ff0000]

### 出力例
```
2
1
4
5
7
6
8
9
10
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main()
{
  std::vector<int> v = {5, 10, 4, 7, 1, 9, 8, 6, 2};

  // 並列に4番目に小さい値より小さい値を前に集める
  std::ranges::nth_element(std::execution::par, v, v.begin() + 3);

  std::cout << "4th element: " << v[3] << std::endl;

  for (int i : v) {
    std::cout << i << ' ';
  }
  std::cout << std::endl;
}
```
* std::ranges::nth_element[color ff0000]
* v.begin()[link /reference/vector/vector/begin.md]

#### 出力例
```
4th element: 5
2 1 4 5 7 6 8 9 10
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
