# equal
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
  constexpr bool
    equal(I1 first1,
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
  constexpr bool
    equal(R1&& r1,
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
  bool equal(Ep&& exec,
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
  bool equal(Ep&& exec,
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
2つの範囲を等値比較する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

2つの範囲の要素数および各要素が等値であった場合、`true`を返す。

## 戻り値
2つの範囲の長さを定数時間で求められ、もし `last1 - first1 != last2 - first2` であれば、`false` を返す。

そうでない場合、`[first1,last1)` 内のイテレータ `i` について、[`invoke`](/reference/functional/invoke.md)`(pred,` [`invoke`](/reference/functional/invoke.md)`(proj1, *i),` [`invoke`](/reference/functional/invoke.md)`(proj2, *(first2 + (i - first1)))) != false` が全てのイテレータ `i` について満たされているのであれば `true` を返す。  
そうでない場合は `false` を返す。

## 計算量

最大で `min(last1 - first1, last2 - first2)` 回の述語が適用される。ただし、2つの範囲の長さを定数時間で求められ、かつ、長さが異なる場合、1 度も述語は適用されない。

## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <array>
#include <iterator>

int main() {
  std::vector<int>   v  = { 1,2,3,4,3,2 };
  std::array<int, 6> v2 = { 1,2,3,4,2,1 };

  // コンテナの中身が同じかどうか調べる
  bool result = std::ranges::equal(v, v2);
  std::cout << std::boolalpha << result << std::endl;

  // x±1 の誤差を許すようにする
  bool result2 = std::ranges::equal(v, v2, [](int x, int y) { return x - 1 <= y && y <= x + 1; });
  std::cout << std::boolalpha << result2 << std::endl;
}
```
* std::ranges::equal[color ff0000]

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
  std::vector<int> v1 = {1, 2, 3, 4, 5};
  std::vector<int> v2 = {1, 2, 3, 4, 5};

  std::cout << std::boolalpha;

  // 並列に2つの範囲が等しいかを判定
  bool result = std::ranges::equal(std::execution::par, v1, v2);
  std::cout << result << std::endl;
}
```
* std::ranges::equal[color ff0000]

#### 出力
```
true
```

## 実装例

```cpp
struct equal_impl {
  template<input_iterator I1, sentinel_for<I1> S1, input_iterator I2, sentinel_for<I2> S2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr bool operator()(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    if constexpr (sized_sentinel_for<S1, I1> && sized_sentinel_for<S2, I2>)
      if (distance(first1, last1) != distance(first2, last2))
        return false;
    for ( ; first1 != last1 && first2 != last2; ++first1, ++first2)
      if (!bool(invoke(pred, invoke(proj1, *first1), invoke(proj2, *first2))))
        return false;
    return true;
  }

  template<input_range R1, input_range R2, class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
    requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr bool operator()(R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    return (*this)(begin(r1), end(r1), begin(r2), end(r2), ref(pred), ref(proj1), ref(proj2));
  }
};

inline constexpr equal_impl equal;
```
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* distance[link /reference/iterator/ranges_distance.md]
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
