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

  template <execution-policy Ep,
            random_access_iterator I1,
            sized_sentinel_for<I1> S1,
            random_access_iterator I2,
            sized_sentinel_for<I2> S2,
            class Pred = ranges::equal_to,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  bool
    starts_with(Ep&& exec,
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
  bool
    starts_with(Ep&& exec,
                R1&& r1,
                R2&& r2,
                Pred pred = {},
                Proj1 proj1 = {},
                Proj2 proj2 = {}); // (4) C++26
}
```
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]


## 概要
シーケンスの先頭が指定されたシーケンスと一致するかを調べる

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

## 戻り値

[`ranges::mismatch`](ranges_mismatch.md)`(`[`std::move`](/reference/utility/move.md)`(first1), last1,` [`std::move`](/reference/utility/move.md)`(first2), last2, pred, proj1, proj2).in2 == last2`

## 計算量
最大で `min(last1 - first1, last2 - first2)` 回の対応する述語が適用される。


## 例
### 基本的な使い方
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

#### 出力
```
1
0
```


### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6};
  std::vector<int> prefix = {1, 2, 3};

  std::cout << std::boolalpha;

  // 並列に先頭が一致するかを判定
  bool result = std::ranges::starts_with(std::execution::par, v, prefix);
  std::cout << result << std::endl;
}
```
* std::ranges::starts_with[color ff0000]

#### 出力
```
true
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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
