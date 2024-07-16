# find_last_if_not
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
  constexpr ranges::subrange<I>
    find_last_if_not(I first,
                     S last,
                     Pred pred,
                     Proj proj = {}); // (1) C++23

  template <forward_range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  constexpr ranges::borrowed_subrange_t<R>
    find_last_if_not(R&& r,
                     Pred pred,
                     Proj proj = {}); // (2) C++23
}
```
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* identity[link /reference/functional/identity.md]
* indirect_unary_predicate[link /reference/iterator/indirect_unary_predicate.md]
* forward_range[link /reference/ranges/forward_range.md]
* projected[link /reference/iterator/projected.md]

## 概要
範囲の中から、指定された条件を満たさない最後の要素を検索する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 戻り値
`[first,last)` あるいは `r` 内のイテレータ `i` について、[`invoke`](/reference/functional/invoke.md)`(pred, `[`invoke`](/reference/functional/invoke.md)`(proj, *i)) == false` である最後のイテレータ `i` を `ranges::subrange<I>{i, last}` として返す。そのようなイテレータが見つからなかった場合は `ranges::subrange<I>{last, last}` を返す。


## 計算量
最大で `last - first` 回述語による比較を行う


## 例
```cpp example
#include <algorithm>
#include <array>
#include <iostream>

int main() {
  constexpr std::array v = { 3, 1, 4, 1, 5 };
  const auto result = std::ranges::find_last_if_not(v, [](int x) { return x != 1; });
  if (result.begin() == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << *result.begin() << std::endl;
    std::cout << "  pos: " << std::distance(v.begin(), result.begin()) << std::endl;
  }
}
```
* std::ranges::find_last_if_not[color ff0000]

### 出力
```
found: 1
  pos: 3
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P1223R5 find_last](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1223r5.pdf)
