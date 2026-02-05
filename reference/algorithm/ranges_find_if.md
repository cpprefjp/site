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

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
  I find_if(Ep&& exec,
            I first,
            S last,
            Pred pred,
            Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  borrowed_iterator_t<R>
    find_if(Ep&& exec,
            R&& r,
            Pred pred,
            Proj proj = {}); // (4) C++26
}
```
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
範囲の中から、指定された条件を満たす最初の要素を検索する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 戻り値
`[first,last)` あるいは `r` 内のイテレータ `i` について、[`invoke`](/reference/functional/invoke.md)`(pred,` [`invoke`](/reference/functional/invoke.md)`(proj, *i)) != false` である最初のイテレータを返す。そのようなイテレータが見つからなかった場合は `last` を返す。


## 計算量
最大で `last - first` 回述語による比較を行う


## 例
### 基本的な使い方
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

#### 出力
```
found: 1
```


### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {3, 1, 4, 1, 5, 9};

  // 並列に5以上の最初の要素を検索する
  auto result = std::ranges::find_if(std::execution::par, v,
                                     [](int x) { return x >= 5; });
  if (result == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << *result << std::endl;
  }
}
```
* std::ranges::find_if[color ff0000]

#### 出力
```
found: 5
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
