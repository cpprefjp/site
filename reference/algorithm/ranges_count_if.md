# count_if
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
  constexpr iter_difference_t<I>
    count_if(I first, S last, Pred pred, Proj proj = {}); // (1) C++20

  template <input_range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  constexpr range_difference_t<R>
    count_if(R&& r, Pred pred, Proj proj = {});           // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
  iter_difference_t<I>
    count_if(Ep&& exec,
             I first,
             S last,
             Pred pred,
             Proj proj = {});                             // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  range_difference_t<R>
    count_if(Ep&& exec,
             R&& r,
             Pred pred,
             Proj proj = {});                             // (4) C++26
}
```
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]


## 概要
条件を満たしている要素の数を数える。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

## テンプレートパラメータ制約
- (1):
    - `I`が[`input_iterator`](/reference/iterator/input_iterator.md)である
    - `S`が[`I`に対する番兵](/reference/iterator/sentinel_for.md)である
    - `Pred`は`I`を`Proj`で射影した値を受け取る[単項述語](/reference/iterator/indirect_unary_predicate.md)である
- (2):
    - `R`が[`input_range`](/reference/ranges/input_range.md)である
    - `Pred`は`R`のイテレータを`Proj`で射影した値を受け取る[単項述語](/reference/iterator/indirect_unary_predicate.md)である


## 戻り値
`[first,last)` 内のイテレータ `i` について、[`invoke`](/reference/functional/invoke.md)`(pred,` [`invoke`](/reference/functional/invoke.md)`(proj, *i)) != false` であるイテレータの数を返す


## 計算量
正確に `last - first` 回の述語の適用を行う


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <array>

int main() {
  constexpr std::array v = { 1,4,3,3,1,2,2,1 };

  // 値が 1 または 3 の要素がいくつあるかを数える
  auto count = std::ranges::count_if(v, [](int x) { return x == 1 || x == 3; });
  std::cout << "count of 1 or 3: " << count << std::endl;
}
```
* std::ranges::count_if[color ff0000]

#### 出力
```cpp
count of 1 or 3: 5
```


### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {1, 4, 3, 3, 1, 2, 2, 1};

  // 並列に値が偶数の要素がいくつあるかを数える
  auto n = std::ranges::count_if(std::execution::par, v,
                                 [](int x) { return x % 2 == 0; });
  std::cout << "count of even: " << n << std::endl;
}
```
* std::ranges::count_if[color ff0000]

#### 出力
```
count of even: 3
```

## 実装例
```cpp
struct count_if_impl {
  template<input_iterator I, sentinel_for<I> S, class Proj = identity, indirect_unary_predicate<projected<I, Proj>> Pred>
  constexpr iter_difference_t<I> operator()(I first, S last, Pred pred, Proj proj = {}) const {
    iter_difference_t<I> count = 0;
    for ( ; first != last; ++first)
      if (invoke(pred, invoke(proj, *first))) count++;
    return count;
  }

  template<input_range R, class Proj = identity, indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  constexpr range_difference_t<R> operator()(R&& r, Pred pred, Proj proj = {}) const {
    return (*this)(begin(r), end(r), ref(pred), ref(proj));
  }
};

inline constexpr count_if_impl count_if;
```
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
