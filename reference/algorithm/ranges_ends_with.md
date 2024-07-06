# ends_with
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I1,
            sentinel_for<I1> S1,
            input_iterator I2,
            sentinel_for<I2> S2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires (forward_iterator<I1> || sized_sentinel_for<S1, I1>) &&
             (forward_iterator<I2> || sized_sentinel_for<S2, I2>) &&
             indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr bool
    ends_with(I1 first1,
              S1 last1,
              I2 first2,
              S2 last2,
              Pred pred = {},
              Proj1 proj1 = {},
              Proj2 proj2 = {}); // (1) C++23

  template <input_range R1,
            input_range R2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires (forward_range<R1> || sized_range<R1>) &&
             (forward_range<R2> || sized_range<R2>) &&
             indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr bool
    ends_with(R1&& r1,
              R2&& r2,
              Pred pred = {},
              Proj1 proj1 = {},
              Proj2 proj2 = {}); // (2) C++23
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* identity[link /reference/functional/identity.md]
* indirectly_comparable[link /reference/iterator/indirectly_comparable.md]
* forward_range[link /reference/ranges/forward_range.md]
* sized_range[link /reference/ranges/sized_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]


## 概要
シーケンスの末尾が指定されたシーケンスと一致するかを調べる

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 戻り値

* (1): 
    * `N1 = last1 - first1`, `N2 = last2 - first2` とする。
    * `N1 < N2` のとき、`false`
    * それ以外のとき、[`ranges::equal`](ranges_equal.md)`(`[`std::move`](/reference/utility/move.md)`(first1) + (N1 - N2), last1, `[`std::move`](/reference/utility/move.md)`(first2), last2, pred, proj1, proj2)`
* (2): 
    * `N1 = `[`ranges::distance`](/reference/iterator/ranges_distance.md)`(r1)`, `N2 = `[`ranges::distance`](/reference/iterator/ranges_distance.md)`(r2)` とする。
    * `N1 < N2` のとき、`false`
    * それ以外のとき、[`ranges::equal`](ranges_equal.md)`(`[`ranges::drop_view`](/reference/ranges/drop_view.md)`(`[`ranges::ref_view`](/reference/ranges/ref_view.md)`(r1), N1 - N2), r2, pred, proj1, proj2)`


## 計算量
最大で `N2` 回の対応する述語が適用される。

## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  const std::vector v  = { 1,2,3,4,5,6 };
  const std::vector v1 = { 1,2,3 };
  const std::vector v2 = { 4,5,6 };

  std::cout << std::ranges::ends_with(v1, v) << std::endl;
  std::cout << std::ranges::ends_with(v, v1) << std::endl;
  std::cout << std::ranges::ends_with(v, v2) << std::endl;
}
```
* std::ranges::ends_with[color ff0000]

### 出力
```
0
0
1
```


## 実装例
```cpp
struct ends_with_impl {
  template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2, sentinel_for<I2> S2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires (forward_iterator<I1> || sized_sentinel_for<S1, I1>) &&
             (forward_iterator<I2> || sized_sentinel_for<S2, I2>) &&
             indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr bool operator()(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    const auto N1 = distance(first1, last1);
    const auto N2 = distance(first2, last2);
    return N1 < N2 ? false :
      equal(move(first1) + (N1 - N2), last1, move(first2), last2, pred, proj1, proj2);
  }

  template<input_range R1, input_range R2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires (forward_range<R1> || sized_range<R1>) &&
             (forward_range<R2> || sized_range<R2>) &&
             indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr bool operator()(R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    const auto N1 = distance(r1);
    const auto N2 = distance(r2);
    return N1 < N2 ? false :
      equal(drop_view(ref_view(r1), N1 - N2), r2, pred, proj1, proj2);
  }
};

inline constexpr ends_with_impl ends_with;
```
* input_iterator[link /reference/iterator/input_iterator.md]
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* identity[link /reference/functional/identity.md]
* indirectly_comparable[link /reference/iterator/indirectly_comparable.md]
* forward_range[link /reference/ranges/forward_range.md]
* sized_range[link /reference/ranges/sized_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* move[link /reference/utility/move.md]
* distance[link /reference/iterator/ranges_distance.md]
* equal[link ranges_equal.md]
* drop_view[link /reference/ranges/drop_view.md]
* ref_view[link /reference/ranges/ref_view.md]

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N4950 27 Algorithms library](https://timsong-cpp.github.io/cppwp/n4950/algorithms)
