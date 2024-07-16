# search
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I1,
            sentinel_for<I1> S1,
            forward_iterator I2,
            sentinel_for<I2> S2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr subrange<I1>
    search(I1 first1,
           S1 last1,
           I2 first2,
           S2 last2,
           Pred pred = {},
           Proj1 proj1 = {},
           Proj2 proj2 = {}); // (1) C++20

  template <forward_range R1,
            forward_range R2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr borrowed_subrange_t<R1>
    search(R1&& r1,
           R2&& r2,
           Pred pred = {},
           Proj1 proj1 = {},
           Proj2 proj2 = {}); // (2) C++20
}
```
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* identity[link /reference/functional/identity.md]
* indirectly_comparable[link /reference/iterator/indirectly_comparable.md]
* subrange[link /reference/ranges/subrange.md]
* forward_range[link /reference/ranges/forward_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_subrange_t[link /reference/ranges/borrowed_subrange_t.md]

## 概要
あるシーケンスの中から、特定のサブシーケンスを探す

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 戻り値
- (1) :
    - `[first1,last1 - (last2 - first2))` 内のイテレータ `i` があるとき、0 以上 `last2 - first2` 未満の整数 `n` について、それぞれ [`invoke`](/reference/functional/invoke.md)`(pred, `[`invoke`](/reference/functional/invoke.md)`(proj1, *(i + n)), `[`invoke`](/reference/functional/invoke.md)`(proj2, *(first2 + n)))` であるようなサブシーケンスを探し、見つかった最初のサブシーケンスを返す。
    - そのようなイテレータが見つからない場合は `{last1, last1}` を返し、`[first2,last2)` が空である場合には `{first1, first1}` を返す。
- (2): `first1 = begin(r1)`, `last1 = end(r1)`, `first2 = begin(r2)`, `last2 = end(r2)`の下で(1)と等しい。

## 計算量
最大で `(last1 - first1) * (last2 - first2)` 回の、対応する比較もしくは述語が適用される

## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>
#include <ranges>

int main() {
  std::vector<int> v = { 1,2,1,2,3 };
  std::list<int> ls = { 1,2 };

  // 1,2 と連続している最初のシーケンスを探す
  std::ranges::subrange sr = std::ranges::search(v, ls);
  // v[0] の位置を指すイテレータが見つかる。
  if (sr.empty()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), sr.begin()) << std::endl;
  }
}
```
* std::ranges::search[color ff0000]

#### 出力
```
found: index==0
```


## 実装例
```cpp
struct search_impl {
  template<forward_iterator I1, sentinel_for<I1> S1, forward_iterator I2,
  sentinel_for<I2> S2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr subrange<I1> operator()(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    for ( ; first1 != last1; ++first1) {
      I1 p1 = first1;
      I2 p2 = first2;
      while (true) {
        if (p2 == last2) return {first1, p1};
        if (p1 == last1) return {last1, last1};
        if (!invoke(pred, invoke(proj1, *p1), invoke(proj2, *p2))) break;
        ++p1, ++p2;
      }
    }
  }

  template<forward_range R1, forward_range R2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr borrowed_subrange_t<R1> operator()(R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    return (*this)(begin(r1), end(r1), begin(r2), end(r2), ref(pred), ref(proj1), ref(proj2));
  }
};

inline constexpr search_impl search;
```
* forward_iterator[link /reference/iterator/forward_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* identity[link /reference/functional/identity.md]
* indirectly_comparable[link /reference/iterator/indirectly_comparable.md]
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
