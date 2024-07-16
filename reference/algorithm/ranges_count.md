# count
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            class T,
            class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  constexpr iter_difference_t<I>
    count(I first, S last, const T& value, Proj proj = {}); // (1) C++20

  template <input_range R,
            class T,
            class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<iterator_t<R>, Proj>, const T*>
  constexpr range_difference_t<R>
    count(R&& r, const T& value, Proj proj = {});           // (2) C++20
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* input_range[link /reference/ranges/input_range.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* identity[link /reference/functional/identity.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* indirect_binary_predicate[link /reference/iterator/indirect_binary_predicate.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* projected[link /reference/iterator/projected.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* range_difference_t[link /reference/ranges/range_difference_t.md]

## 概要
指定された値と等値な要素の数を数える。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## テンプレートパラメータ制約
- (1):
    - `I`が[`input_iterator`](/reference/iterator/input_iterator.md)である
    - `S`が[`I`に対する番兵](/reference/iterator/sentinel_for.md)である
    - `I`を`Proj`で射影した値と指定された値が[`equal_to`](/reference/functional/equal_to.md)によって等値比較できる
- (2):
    - `R`が[`input_range`](/reference/ranges/input_range.md)である
    - `Pred`は`R`のイテレータを`Proj`で射影した値が[`equal_to`](/reference/functional/equal_to.md)によって等値比較できる

## 戻り値
`[first,last)` 内のイテレータ `i` について、[`invoke`](/reference/functional/invoke.md)`(proj, *i) == value` であるイテレータの数を返す

## 計算量
正確に `last - first` 回の比較を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <array>

int main() {
  constexpr std::array v = { 1,4,3,3,1,2,2,1 };

  // 値が 1 の要素がいくつあるかを数える
  std::cout << "count of 1: " << std::ranges::count(v, 1) << std::endl;
}
```
* std::ranges::count[color ff0000]

### 出力
```
count of 1: 3
```


## 実装例
```cpp
struct count_impl {
  template<input_iterator I, sentinel_for<I> S, class T, class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  constexpr iter_difference_t<I> operator()(I first, S last, const T& value, Proj proj = {}) const {
    iter_difference_t<I> count = 0;
    for ( ; first != last; ++first)
      if (value == invoke(proj, *first)) count++;
    return count;
  }

  template<input_range R, class T, class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<iterator_t<R>, Proj>, const T*>
  constexpr range_difference_t<R> operator()(R&& r, const T& value, Proj proj = {}) const {
    return (*this)(begin(r), end(r), value, ref(proj));
  }
};

inline constexpr count_impl count;
```
* input_iterator[link /reference/iterator/input_iterator.md]
* input_range[link /reference/ranges/input_range.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* identity[link /reference/functional/identity.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* indirect_binary_predicate[link /reference/iterator/indirect_binary_predicate.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* projected[link /reference/iterator/projected.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* range_difference_t[link /reference/ranges/range_difference_t.md]
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
