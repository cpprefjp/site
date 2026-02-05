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

  template <execution-policy Ep,
            random_access_iterator I1,
            sized_sentinel_for<I1> S1,
            random_access_iterator I2,
            sized_sentinel_for<I2> S2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  I1
    find_first_of(Ep&& exec,
                  I1 first1,
                  S1 last1,
                  I2 first2,
                  S2 last2,
                  Pred pred = {},
                  Proj1 proj1 = {},
                  Proj2 proj2 = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R1,
            sized-random-access-range R2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  borrowed_iterator_t<R1>
    find_first_of(Ep&& exec,
                  R1&& r1,
                  R2&& r2,
                  Pred pred = {},
                  Proj1 proj1 = {},
                  Proj2 proj2 = {}); // (4) C++26
}
```
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
ある集合の1つとマッチする最初の要素を検索する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 戻り値
`[first1,last1 - (last2 - first2))` 内のイテレータ `i` があるとき、`[first2,last2)` 内のイテレータ `j` について、どれかが [`invoke`](/reference/functional/invoke.md)`(pred,` [`invoke`](/reference/functional/invoke.md)`(proj1, *i),` [`invoke`](/reference/functional/invoke.md)`(proj2, *j)) == true` であるような最初のイテレータを返す。

そのようなイテレータが見つからない、もしくは `[first2,last2)` が空である場合は `last1` を返す。


## 計算量
最大で `(last1 - first1) * (last2 - first2)` 回の、対応する比較もしくは述語が適用される。


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>

int main() {
  std::vector v = { 1,3,7,4,2 };
  std::list ls = { 2,4,6,8 };

  // 2,4,6,8 のどれかと一致する最初の要素を返す
  auto it = std::ranges::find_first_of(v, ls);
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), it) << ", value==" << *it << std::endl;
  }
}
```
* std::ranges::find_first_of[color ff0000]

#### 出力
```
found: index==3, value==4
```


### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {1, 3, 7, 4, 2};
  std::vector<int> targets = {2, 4, 6, 8};

  // 並列に targets のいずれかと一致する最初の要素を検索する
  auto it = std::ranges::find_first_of(std::execution::par, v, targets);
  if (it == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: index==" << std::distance(v.begin(), it)
              << ", value==" << *it << std::endl;
  }
}
```
* std::ranges::find_first_of[color ff0000]

#### 出力
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
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
