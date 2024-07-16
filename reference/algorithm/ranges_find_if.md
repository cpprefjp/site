# find_if
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
  constexpr I
    find_if(I first,
            S last,
            Pred pred,
            Proj proj = {}); // (1) C++20

  template <input_range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  constexpr borrowed_iterator_t<R>
    find_if(R&& r,
            Pred pred,
            Proj proj = {}); // (2) C++20
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* identity[link /reference/functional/identity.md]
* indirect_unary_predicate[link /reference/iterator/indirect_unary_predicate.md]
* input_range[link /reference/ranges/input_range.md]
* projected[link /reference/iterator/projected.md]

## 概要
範囲の中から、指定された条件を満たす最初の要素を検索する。

* (1): イテレータ範囲を指定する
* (2): Rangeを直接指定する


## 戻り値
`[first,last)` あるいは `r` 内のイテレータ `i` について、[`invoke`](/reference/functional/invoke.md)`(pred, `[`invoke`](/reference/functional/invoke.md)`(proj, *i)) != false` である最初のイテレータを返す。そのようなイテレータが見つからなかった場合は `last` を返す。


## 計算量
最大で `last - first` 回述語による比較を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 3, 1, 4 };
  // 3ではない最初の要素を検索する
  auto result = std::ranges::find_if(v, [](int x) { return x != 3; });
  if (result == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << *result << std::endl;
  }
}
```
* std::ranges::find_if[color ff0000]

### 出力
```
found: 1
```


## 実装例
```cpp
struct find_if_impl {
  template<input_iterator I, sentinel_for<I> S, class Proj = identity, indirect_unary_predicate<projected<I, Proj>> Pred>
  constexpr I operator()(I first, S last, Pred pred, Proj proj = {}) const {
    for ( ; first != last; ++first)
      if (invoke(pred, invoke(proj, *first)))
        return first;
  }

  template<input_range R, class Proj = identity, indirect_unary_predicate <projected<iterator_t<R>, Proj>> Pred>
  constexpr borrowed_iterator_t<R> operator()(R&& r, Pred pred, Proj proj = {}) const {
    return (*this)(begin(r), end(r), ref(pred), ref(proj));
  }
};

inline constexpr find_if_impl find_if;
```
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* identity[link /reference/functional/identity.md]
* indirect_unary_predicate[link /reference/iterator/indirect_unary_predicate.md]
* input_range[link /reference/ranges/input_range.md]
* projected[link /reference/iterator/projected.md]
* invoke[link /reference/functional/invoke.md]
* begin[link /reference/ranges/begin.md]
* end[link /reference/ranges/end.md]
* ref[link /reference/functional/ref.md]

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
