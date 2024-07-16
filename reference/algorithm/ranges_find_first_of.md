# find_first_of
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I1,
            sentinel_for<I1> S1,
            forward_iterator I2,
            sentinel_for<I2> S2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr I1
    find_first_of(I1 first1,
                  S1 last1,
                  I2 first2,
                  S2 last2,
                  Pred pred = {},
                  Proj1 proj1 = {},
                  Proj2 proj2 = {}); // (1) C++20

  template <input_range R1,
            forward_range R2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr borrowed_iterator_t<R1>
    find_first_of(R1&& r1,
                  R2&& r2,
                  Pred pred = {},
                  Proj1 proj1 = {},
                  Proj2 proj2 = {}); // (2) C++20
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* identity[link /reference/functional/identity.md]
* indirectly_comparable[link /reference/iterator/indirectly_comparable.md]
* input_range[link /reference/ranges/input_range.md]
* forward_range[link /reference/ranges/forward_range.md]

## 概要
ある集合の1つとマッチする最初の要素を検索する。

* (1): イテレータ範囲を指定する
* (2): Rangeを直接指定する


## 戻り値
`[first1,last1 - (last2 - first2))` 内のイテレータ `i` があるとき、`[first2,last2)` 内のイテレータ `j` について、どれかが [`invoke`](/reference/functional/invoke.md)`(pred, `[`invoke`](/reference/functional/invoke.md)`(proj1, *i), `[`invoke`](/reference/functional/invoke.md)`(proj2, *j)) == true` であるような最初のイテレータを返す。

そのようなイテレータが見つからない、もしくは `[first2,last2)` が空である場合は `last1` を返す。


## 計算量
最大で `(last1 - first1) * (last2 - first2)` 回の、対応する比較もしくは述語が適用される。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>

int main() {
  std::vector v = { 1,3,7,4,2 };
  std::list ls = { 2,4,6,8 };

  // 2,4,6,8 のどれかと一致する最初の要素を返す
  auto it = std::ranges::find_first_of(v, ls.begin(), ls.end());
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), it) << ", value==" << *it << std::endl;
  }
}
```
* std::ranges::find_first_of[color ff0000]
* ls.begin()[link /reference/list/list/begin.md]
* ls.end()[link /reference/list/list/end.md]

### 出力
```
found: index==3, value==4
```


## 実装例
```cpp
struct find_first_of_impl {
  template<input_iterator I1, sentinel_for<I1> S1, forward_iterator I2, sentinel_for<I2> S2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr I1 operator()(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    for ( ; first1 != last1; ++first1)
      for (I2 it = first2; it != last2; ++it)
        if (invoke(pred, invoke(proj1, *first1), invoke(proj2, *it))) return first1;
    return last1;
  }

  template<input_range R1, forward_range R2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr borrowed_iterator_t<R1> operator()(R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    return (*this)(begin(r1), end(r1), begin(r2), end(r2), ref(pred), ref(proj1), ref(proj2));
  }
};

inline constexpr find_first_of_impl find_first_of;
```
* input_iterator[link /reference/iterator/input_iterator.md]
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* identity[link /reference/functional/identity.md]
* indirectly_comparable[link /reference/iterator/indirectly_comparable.md]
* input_range[link /reference/ranges/input_range.md]
* forward_range[link /reference/ranges/forward_range.md]
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
