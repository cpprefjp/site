# search_n
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {]
  template <forward_iterator I,
            sentinel_for<I> S,
            class T,
            class Pred = ranges::equal_to,
            class Proj = identity>
    requires indirectly_comparable<I, const T*, Pred, Proj>
  constexpr subrange<I>
    search_n(I first,
             S last,
             iter_difference_t<I> count,
             const T& value,
             Pred pred = {},
             Proj proj = {}); // (1) C++20

  template <forward_range R,
            class T,
            class Pred = ranges::equal_to,
            class Proj = identity>
    requires indirectly_comparable<iterator_t<R>, const T*, Pred, Proj>
  constexpr borrowed_subrange_t<R>
    search_n(R&& r,
             range_difference_t<R> count,
             const T& value,
             Pred pred = {},
             Proj proj = {}); // (2) C++20
}
```
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* identity[link /reference/functional/identity.md]
* indirectly_comparable[link /reference/iterator/indirectly_comparable.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* subrange[link /reference/ranges/subrange.md]
* forward_range[link /reference/ranges/forward_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_subrange_t[link /reference/ranges/borrowed_subrange_t.md]


## 概要
あるシーケンスの中から、指定の要素が連続するサブシーケンスを探す。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 戻り値
`[first,last-count)` 内のイテレータ `i` があるとき、0 以上 `count` 未満の整数 `n` について、それぞれ [`invoke`](/reference/functional/invoke.md)`(pred, `[`invoke`](/reference/functional/invoke.md)`(proj, *(i + n)), value)` であるようなサブシーケンスを探し、見つかった最初のサブシーケンスを返す。

そのようなイテレータが見つからない場合は `{last, last}` を返す。


## 計算量
最大で `last - first` 回の対応する比較もしくは述語が適用される。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 1,2,3,2,1,3,3,2,3,3,1 };

  // 3 が 2 つ連続している最初のシーケンスを探す
  std::ranges::subrange sr1 = std::ranges::search_n(v, 2, 3);
  // v[5] の位置を指すイテレータが見つかる。
  if (sr1.empty()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), sr1.begin()) << std::endl;
  }

  // 3 未満が 2 つ連続している最初のシーケンスを探す
  auto sr2 = std::ranges::search_n(v, 2, 3, [](int x, int y) { return x < y; });
  // v[0] の位置を指すイテレータが見つかる。
  if (sr2.empty()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), sr2.begin()) << std::endl;
  }
}
```
* std::ranges::search_n[color ff0000]
* v.begin()[link /reference/vector/vector/begin.md]

### 出力
```
found: index==5
found: index==0
```


## 実装例
```cpp
struct search_n_impl {
  template<forward_iterator I, sentinel_for<I> S, class T, class Pred = ranges::equal_to, class Proj = identity>
    requires indirectly_comparable<I, const T*, Pred, Proj>
  constexpr subrange<I> operator()(I first, S last, iter_difference_t<I> count, const T& value, Pred pred = {}, Proj proj = {}) const {
    if (first == last || count <= 0)
      return first;

    while (first != last) {
      if (*first == value) {
        I it = first;
        ++it;
        iter_difference_t<I> i = 1;
        for (; i < count && it != last && invoke(pred, invoke(proj, *it), value); ++i, ++it)
          ;
        if (i == count)
          return {first, i};
        else if (it == last)
          return {last, last};
        else
          first = it;
      }
      ++first;
    }
  }

  template<forward_range R, class T, class Pred = ranges::equal_to, class Proj = identity>
    requires indirectly_comparable<iterator_t<R>, const T*, Pred, Proj>
  constexpr borrowed_subrange_t<R> operator()(R&& r, range_difference_t<R> count, const T& value, Pred pred = {}, Proj proj = {}) const {
    return (*this)(begin(r1), end(r1), count, value, ref(pred), ref(proj));
  }
};

inline constexpr search_n_impl search_n;
```
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* identity[link /reference/functional/identity.md]
* indirectly_comparable[link /reference/iterator/indirectly_comparable.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* subrange[link /reference/ranges/subrange.md]
* forward_range[link /reference/ranges/forward_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_subrange_t[link /reference/ranges/borrowed_subrange_t.md]
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
