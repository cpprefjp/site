# starts_with
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
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr bool
    starts_with(I1 first1,
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
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr bool
    starts_with(R1&& r1,
                R2&& r2,
                Pred pred = {},
                Proj1 proj1 = {},
                Proj2 proj2 = {}); // (2) C++23
}
```


## 概要
シーケンスの先頭が指定されたシーケンスと一致するかを調べる

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 戻り値

[`ranges::mismatch`](ranges_mismatch.md)`(`[`std::move`](/reference/utility/move.md)`(first1), last1, `[`std::move`](/reference/utility/move.md)`(first2), last2, pred, proj1, proj2).in2 == last2`

## 計算量
最大で `min(last1 - first1, last2 - first2)` 回の対応する述語が適用される。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  const std::vector v  = { 1,2,3,4,5,6 };
  const std::vector v1 = { 1,2,3 };
  const std::vector v2 = { 2,3,4 };

  std::cout << std::ranges::starts_with(v, v1) << std::endl;
  std::cout << std::ranges::starts_with(v, v2) << std::endl;
}
```
* std::ranges::starts_with[color ff0000]

### 出力
```
1
0
```


## 実装例
```cpp
struct starts_with_impl {
  template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2, sentinel_for<I2> S2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr bool operator()(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    return mismatch(move(first1), last1, move(first2), last2, pred, proj1, proj2).in2 == last2;
  }

  template<input_range R1, input_range R2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr bool operator()(R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    return (*this)(begin(r1), end(r1), begin(r2), end(r2), ref(pred), ref(proj1), ref(proj2));
  }
};

inline constexpr starts_with_impl starts_with;
```
* move[link /reference/utility/move.md]
* mismatch[link ranges_mismatch.md]
* begin[link /reference/ranges/begin.md]
* end[link /reference/ranges/end.md]
* ref[link /reference/functional/ref.md]

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
