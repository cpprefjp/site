# prev_permutation
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
  constexpr prev_permutation_result<I>
    next_permutation(I first,
                     S last,
                     Comp comp = {},
                     Proj proj = {}); // (1) C++20

  template <bidirectional_range R,
            class Comp = ranges::less,
            class Proj = identity>
    requires sortable<iterator_t<R>, Comp, Proj>
  constexpr prev_permutation_result<borrowed_iterator_t<R>>
    next_permutation(R&& r,
                     Comp comp = {},
                     Proj proj = {}); // (2) C++20
}
```
* prev_permutation_result[link ranges_in_found_result.md]
* bidirectional_iterator[link /reference/iterator/bidirectional_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::less[link /reference/functional/ranges_less.md]
* identity[link /reference/functional/identity.md]
* sortable[link /reference/iterator/sortable.md]
* bidirectional_range[link /reference/ranges/bidirectional_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
与えられた時点の`[first, last)`の範囲を起点の順列として、辞書順によるその前の順列を生成する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 効果
`[first, last)`の範囲を前の順列に変換する。

比較 [`invoke`](/reference/functional/invoke.md)`(comp, `[`invoke`](/reference/functional/invoke.md)`(proj, *i), `[`invoke`](/reference/functional/invoke.md)`(proj, *j))` によって辞書順に並んでいる全ての順列の集合があると仮定すると、前の順列が発見される。

## 戻り値
```cpp
prev_permutation_result {
  .in = last,
  .found = 前の順列が存在する場合は true、そうでなければ false,
}
```
* prev_permutation_result[link ranges_in_found_result.md]


## 計算量
高々`(last - first)/2`回の要素の交換


## 備考
全ての順列を取得したい場合は、この関数に最初に与える範囲が、降順にソート済みになっていること。


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
  // 降順にソート済みの入力
  std::vector<int> v = {3, 2, 1};

  do {
    print(v);
  } while (std::ranges::prev_permutation(v).found);
}
```
* std::ranges::prev_permutation[color ff0000]

### 出力
```
3 2 1 
3 1 2 
2 3 1 
2 1 3 
1 3 2 
1 2 3 
```

## 関連項目
- [`std::ranges::next_permutation()`](ranges_next_permutation.md)

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
