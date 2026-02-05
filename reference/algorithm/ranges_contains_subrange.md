# contains_subrange
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  // (1) C++23
  template<forward_iterator I1, sentinel_for<I1> S1,
           forward_iterator I2, sentinel_for<I2> S2,
           class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
  requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr bool ranges::contains_subrange(I1 first1, S1 last1, I2 first2, S2 last2,
                                           Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {});

  // (2) C++23
  template<forward_range R1, forward_range R2,
           class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
  requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr bool ranges::contains_subrange(R1&& r1, R2&& r2, Pred pred = {},
                                           Proj1 proj1 = {}, Proj2 proj2 = {});

  // (3) C++26
  template<execution-policy Ep,
           random_access_iterator I1, sized_sentinel_for<I1> S1,
           random_access_iterator I2, sized_sentinel_for<I2> S2,
           class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
  requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  bool ranges::contains_subrange(Ep&& exec, I1 first1, S1 last1, I2 first2, S2 last2,
                                 Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {});

  // (4) C++26
  template<execution-policy Ep,
           sized-random-access-range R1, sized-random-access-range R2,
           class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
  requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  bool ranges::contains_subrange(Ep&& exec, R1&& r1, R2&& r2, Pred pred = {},
                                 Proj1 proj1 = {}, Proj2 proj2 = {});
}
```
* execution-policy[link /reference/execution/execution-policy.md]
* random_access_iterator[link /reference/iterator/random_access_iterator.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
あるシーケンスの中に、特定のサブシーケンスが含まれるか調べる。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する

サブシーケンスが空の場合は、常に`true`を返す。

## 戻り値
```cpp
first2 == last2 || !ranges::search(first1, last1, first2, last2, pred, proj1, proj2).empty()
```

## 計算量
最大で `(last1 - first1) * (last2 - first2)` 回の、対応する比較もしくは述語が適用される

## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <print>
#include <vector>
#include <list>

int main() {
  std::vector<int> v = { 1,2,1,2,3 };
  std::list<int> ls = { 1,2 };

  if (std::ranges::contains_subrange(v, ls)) {
    std::println("found");
  } else {
    std::println("not found");
  }
}
```
* std::ranges::contains_subrange[color ff0000]

#### 出力
```
found
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  std::vector<int> sub = {2, 3, 4};

  std::cout << std::boolalpha;

  // 並列にサブ範囲が含まれるかを判定
  bool result = std::ranges::contains_subrange(
    std::execution::par, v, sub);
  std::cout << result << std::endl;
}
```
* std::ranges::contains_subrange[color ff0000]

#### 出力
```
true
```


## 実装例
```cpp
struct contains_subrange_impl {
  template<forward_iterator I1, sentinel_for<I1> S1,
           forward_iterator I2, sentinel_for<I2> S2,
           class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
  requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr bool operator()(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    return first2 == last2 || !ranges::search(first1, last1, first2, last2, pred, proj1, proj2).empty();
  }

  template<forward_range R1, forward_range R2,
           class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
  requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr bool operator()(R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    return ranges::empty(r2) || !ranges::search(std::forward(r1), std::forward(r2), pred, proj1, proj2).empty();
  }
};

inline constexpr contains_subrange_impl contains_subrange;
```
* ranges::search[link ranges_search.md]
* ranges::empty[link /reference/ranges/empty.md]

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
