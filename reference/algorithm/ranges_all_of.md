# all_of
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
    all_of(I first, S last, Pred pred, Proj proj = {}); // (1) C++20

  template <input_range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  constexpr bool
    all_of(R&& r, Pred pred, Proj proj = {});           // (2) C++20
}
```

## 概要
範囲の全ての要素が条件を満たすかを判定する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## テンプレートパラメータ制約
- (1):
    - `I`が[`input_iterator`](/reference/iterator/input_iterator.md)である
    - `S`が[`I`に対する番兵](/reference/iterator/sentinel_for.md)である
    - `Pred`は`I`を`Proj`で射影した値を受け取る[単項述語](/reference/iterator/indirect_unary_predicate.md)である
- (2):
    - `R`が[`input_range`](/reference/ranges/input_range.md)である
    - `Pred`は`R`のイテレータを`Proj`で射影した値を受け取る[単項述語](/reference/iterator/indirect_unary_predicate.md)である

## 戻り値
`[first,last)` あるいは `r` が空であったり、その範囲内の全てのイテレータ `i` について [`invoke`](/reference/functional/invoke.md)`(pred, `[`invoke`](/reference/functional/invoke.md)`(proj, *i))` が `true` である場合は `true` を返し、そうでない場合は `false` を返す。

## 計算量
最大で `last - first` 回 `proj` と `pred` を実行する。

## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <array>

int main() {
  constexpr std::array v = { 3, 1, 4 };

  std::cout << std::boolalpha;

  // 全ての要素が 5 より小さいか
  constexpr bool result1 = std::ranges::all_of(v, [](int x) { return x < 5; });
  std::cout << result1 << std::endl;

  // 全ての要素が 1 であるか
  constexpr bool result2 = std::ranges::all_of(v, [](int x) { return x == 1; });
  std::cout << result2 << std::endl;
}
```
* std::ranges::all_of[color ff0000]

### 出力
```
true
false
```

## 実装例
```cpp
struct all_of_impl {
  template<input_iterator I, sentinel_for<I> S, class Proj = identity, indirect_unary_predicate<projected<I, Proj>> Pred>
  constexpr bool operator()(I first, S last, Pred pred, Proj proj = {}) const {
    for (; first != last; ++first)
      if (!invoke(pred, invoke(proj, *first))) return false;
    return true;
  }

  template<input_range R, class Proj = identity, indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  constexpr bool operator()(R&& r, Pred pred, Proj proj = {}) const {
    return (*this)(begin(r), end(r), ref(pred), ref(proj));
  }
};

inline constexpr all_of_impl all_of;
```
* invoke[link /reference/functional/invoke.md]
* begin[link /reference/ranges/begin.md]
* end[link /reference/ranges/end.md]
* ref[link /reference/functional/ref.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 16.0.6 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]


## 関連項目
- [`all_of`](/reference/algorithm/all_of.md)
- [`ranges::any_of`](/reference/algorithm/ranges_any_of.md)
- [`ranges::none_of`](/reference/algorithm/ranges_none_of.md)

## 参照
- [N4861 25 Algorithms library](https://timsong-cpp.github.io/cppwp/n4861/algorithms)
