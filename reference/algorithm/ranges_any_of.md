# any_of
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
  constexpr bool
    any_of(I first, S last, Pred pred, Proj proj = {}); // (1) C++20

  template <input_range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  constexpr bool
    any_of(R&& r, Pred pred, Proj proj = {});           // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
  bool any_of(Ep&& exec,
              I first,
              S last,
              Pred pred,
              Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  bool any_of(Ep&& exec,
              R&& r,
              Pred pred,
              Proj proj = {}); // (4) C++26
}
```
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
範囲のいずれかの要素が条件を満たすかを判定する。

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
`[first,last)` あるいは `r` 内のイテレータ `i` について [`invoke`](/reference/functional/invoke.md)`(pred,` [`invoke`](/reference/functional/invoke.md)`(proj, *i))` が `true` になるような要素があれば`true`を返し、そうでなければ`false`を返す。
`[first,last)` あるいは `r` の範囲が空の場合は`false`を返す。

## 計算量
最大で `last - first` 回 `pred` を実行する。

## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <array>

int main() {
  constexpr std::array v = { 3, 1, 4 };

  std::cout << std::boolalpha;

  // 5 以上の要素が存在するかどうか
  constexpr bool result1 = std::ranges::any_of(v, [](int x) { return x >= 5; });
  std::cout << result1 << std::endl;

  // 1 の要素が存在するかどうか
  constexpr bool result2 = std::ranges::any_of(v, [](int x) { return x == 1; });
  std::cout << result2 << std::endl;
}
```
* std::ranges::any_of[color ff0000]

#### 出力
```
false
true
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {1, 3, 5, 7, 8};

  std::cout << std::boolalpha;

  // 並列にいずれかの要素が偶数であるかを判定
  bool result = std::ranges::any_of(std::execution::par, v,
                                    [](int x) { return x % 2 == 0; });
  std::cout << result << std::endl;
}
```
* std::ranges::any_of[color ff0000]

#### 出力
```
true
```

## 実装例
```cpp
struct any_of_impl {
  template<input_iterator I, sentinel_for<I> S, class Proj = identity, indirect_unary_predicate<projected<I, Proj>> Pred>
  constexpr bool operator()(I first, S last, Pred pred, Proj proj = {}) const {
    for ( ; first != last; ++first)
      if (invoke(pred, invoke(proj, *first))) return true;
    return false;
  }

  template<input_range R, class Proj = identity, indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  constexpr bool operator()(R&& r, Pred pred, Proj proj = {}) const {
    return (*this)(begin(r), end(r), ref(pred), ref(proj));
  }
};

inline constexpr any_of_impl any_of;
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


## 関連項目
- [`any_of`](/reference/algorithm/any_of.md)
- [`ranges::all_of`](/reference/algorithm/ranges_all_of.md)
- [`ranges::none_of`](/reference/algorithm/ranges_none_of.md)


## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
