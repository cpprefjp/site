# next_permutation
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]


```cpp
namespace std::ranges {
  template <bidirectional_iterator I,
            sentinel_for<I> S,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<I, Comp, Proj>
  constexpr next_permutation_result<I>
    next_permutation(I first,
                     S last,
                     Comp comp = {},
                     Proj proj = {}); // (1) C++20

  template <bidirectional_range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  constexpr next_permutation_result<borrowed_iterator_t<R>>
    next_permutation(R&& r,
                     Comp comp = {},
                     Proj proj = {}); // (2) C++20
}
```
* next_permutation_result[link ranges_in_found_result.md]
* ranges::less[link /reference/functional/ranges_less.md]
* sortable[link /reference/iterator/sortable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
与えられた時点の`[first, last)`の範囲を起点の順列として、辞書順によるその次の順列を生成する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 効果
`[first, last)`の範囲を次の順列に変換する。
比較 [`invoke`](/reference/functional/invoke.md)`(comp,` [`invoke`](/reference/functional/invoke.md)`(proj, *i),` [`invoke`](/reference/functional/invoke.md)`(proj, *j))` によって辞書順に並んでいる全ての順列の集合があると仮定すると、次の順列が発見される。

順列の辞書順とは、同じ長さ`N`の順列`a, b`があった時、その最上位の項から見た時に`ai != bi`となる最初の`i`番目の項について、`ai < bi`（もしくは`comp(ai, bi) == true`）となる時に`a < b`とするように定めた順序のことである。例えばこれは、各項（`ai, bi`）が`0 ~ 9`の数であるとすれば、それらをそのまま並べて構成した数の通常の大小関係に等しい。

辞書順による次の順列とは、現在の順列（`[first, last)`）よりも（上記の意味の順序で）大きい順列のうち取り得る最小のもののことである。

## 戻り値

```cpp
next_permutation_result {
  .in = last,
  .found = 次の順列が存在する場合は true、そうでなければ false,
}
```
* next_permutation_result[link ranges_in_found_result.md]

## 計算量
高々`(last - first)/2`回の要素の交換


## 備考
全ての順列を取得したい場合は、この関数に最初に与える範囲が、昇順にソート済みになっていること。  
順列の長さを`N`（`N = last - first`）とすれば、そのような順列は`N!`個存在する。

## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

void print(const std::vector<int>& v)
{
  for (int x : v) {
    std::cout << x << " ";
  }
  std::cout << std::endl;
}

int main ()
{
  // 昇順にソート済みの入力
  std::vector<int> v = {1, 2, 3};

  do {
    print(v);
  } while (std::ranges::next_permutation(v).found);
}
```
* std::ranges::next_permutation[color ff0000]

### 出力
```
1 2 3 
1 3 2 
2 1 3 
2 3 1 
3 1 2 
3 2 1 
```

## 関連項目
- [`std::ranges::prev_permutation()`](ranges_prev_permutation.md)

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
