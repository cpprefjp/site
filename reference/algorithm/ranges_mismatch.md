# mismatch
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I1,
            sentinel_for<I1> S1,
            input_iterator I2,
            sentinel_for<I2> S2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr mismatch_result<I1, I2>
    mismatch(I1 first1,
             S1 last1,
             I2 first2,
             S2 last2,
             Pred pred = {},
             Proj1 proj1 = {},
             Proj2 proj2 = {}); // (1) C++20

  template <input_range R1,
            input_range R2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr mismatch_result<
    borrowed_iterator_t<R1>,
    borrowed_iterator_t<R2>
  >
    mismatch(R1&& r1,
             R2&& r2,
             Pred pred = {},
             Proj1 proj1 = {},
             Proj2 proj2 = {}); // (2) C++20
}
```
* mismatch_result[link ranges_in_in_result.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]


## 概要
2つのシーケンスが一致していない場所を検索する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 戻り値

`[first1,last1)` 内にあるイテレータ `i` と、`j == first2 + (i - first1)` であるイテレータ `j` について、

- `j`が範囲`[first2, last2)`に含まれており、
- `!(*i == *j)` もしくは
- [`invoke`](/reference/functional/invoke.md)`(pred,` [`invoke`](/reference/functional/invoke.md)`(proj1, *i),` [`invoke`](/reference/functional/invoke.md)`(proj2, *j)) == false` であるような、最初のイテレータのペア [`mismatch_result`](ranges_in_in_result.md)`{ .in1 = i, .in2 = j }` を返す。

そのようなイテレータが見つからなかった場合は [`mismatch_result`](ranges_in_in_result.md)`{ .in1 = last1, .in2 = first2 + (last1 - first1)}` を返す。

## 計算量
最大で `last1 - first1` 回の対応する述語が適用される。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <array>
#include <list>
#include <iterator> // for begin, end
#include <string>   // for to_string

// mismatch の結果で得られた pair に対する情報を出力する
template <class Range1, class Range2, class I1, class I2>
void print_mismatch_value(const Range1& r1, const Range2& r2, const I1& i1, const I2& i2) {
  std::cout << "mismatch index: " << std::ranges::distance(std::begin(r1), i1) << std::endl;
  std::cout << "mismatch value: (" << (std::ranges::end(r1) == i1 ? "end" : std::to_string(*i1)) << ","
                                   << (std::ranges::end(r2) == i2 ? "end" : std::to_string(*i2)) << ")"
            << std::endl;
}

int main() {
  const std::vector<int>   v  = { 1,2,3,4,3,2 };
  const std::array<int, 6> v2 = { 1,2,4,3,2,1 };
  const std::list<int>     v3 = { 1,2,3,4,3, };

  // v と v2 で異なる場所を探す
  {
    auto [i1, i2] = std::ranges::mismatch(v, v2);
    print_mismatch_value(v, v2, i1, i2);
  }

  std::cout << std::endl;

  // v と v3 で異なる場所を探す。
  {
    auto [i1, i2] = std::ranges::mismatch(v3, v);
    print_mismatch_value(v3, v, i1, i2);
  }
}
```
* std::ranges::mismatch[color ff0000]
* std::to_string[link /reference/string/to_string.md]

### 出力
```
mismatch index: 2
mismatch value: (3,4)

mismatch index: 5
mismatch value: (end,2)
```


## 実装例
```cpp
struct mismatch_impl {
  template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2, sentinel_for<I2> S2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr mismatch_result<I1, I2> operator()(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    for ( ; first1 != last1 && first != last2; ++first1, ++first2)
      if (!bool(invoke(pred, invoke(proj1, *first1), invoke(proj2, *first2))))
        return {first1, first2};
    return {first1, first2};
  }

  template<input_range R1, input_range R2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr mismatch_result<borrowed_iterator_t<R1>, borrowed_iterator_t<R2>> operator()(R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    return (*this)(begin(r1), end(r1), begin(r2), end(r2), ref(pred), ref(proj1), ref(proj2));
  }
};

inline constexpr mismatch_impl mismatch;
```
* mismatch_result[link ranges_in_in_result.md]
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
