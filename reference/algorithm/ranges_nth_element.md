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
基準となる要素よりも小さい要素が前に来るよう並べ替える。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

この関数は範囲 `[first,last)` の並び替えを行うが、基準位置 `nth` のみが正しい要素、つまり仮に範囲 `[first,last)` 全体を並び替えた際に`nth`に位置すべき要素となる。前半の範囲 `[first,nth)` は関数呼び出し後の位置 `nth` にある要素よりも小さいことは保証されるが、その範囲 `[first,nth)` 内での要素並び順はなんら保証されない。

ある範囲に対して部分的な並び替えを行う場合、[`partial_sort()`](partial_sort.md)を使用する。また範囲全体に対して並び替えを行う場合、[`sort()`](sort.md)を使用する。

## 効果
`nth_element()` を呼び出した後、`nth` が指している位置の要素は、全ての範囲がソートされた場合の位置にある要素になる。そして、`[first,nth)` にあるイテレータ `i` と、`[nth,last)` にあるイテレータ `j` について、`!(*j < *i)` または `comp(*j, *i) == false` になる。


## 戻り値
`last`


## 計算量
平均で線形時間

## 例
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
