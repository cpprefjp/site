# search
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  // (1)
  template<forward_iterator I1, sentinel_for<I1> S1,
           forward_iterator I2, sentinel_for<I2> S2,
           class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
  requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr bool ranges::contains_subrange(I1 first1, S1 last1, I2 first2, S2 last2,
                                           Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {});

  // (2)
  template<forward_range R1, forward_range R2,
           class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
  requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr bool ranges::contains_subrange(R1&& r1, R2&& r2, Pred pred = {},
                                           Proj1 proj1 = {}, Proj2 proj2 = {});
}
```

## 概要
あるシーケンスの中に、特定のサブシーケンスが含まれるか調べる。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

サブシーケンスが空の場合は、常に`true`を返す。

## 戻り値
```cpp
first2 == last2 || !ranges​::​search(first1, last1, first2, last2, pred, proj1, proj2).empty()
```

## 計算量
最大で `(last1 - first1) * (last2 - first2)` 回の、対応する比較もしくは述語が適用される

## 例
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


## 実装例
```cpp
struct contains_subrange_impl {
  template<forward_iterator I1, sentinel_for<I1> S1,
           forward_iterator I2, sentinel_for<I2> S2,
           class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
  requires indirectly_comparable<I1, I2, Pred, Proj1, Proj2>
  constexpr bool operator()(I1 first1, S1 last1, I2 first2, S2 last2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    return first2 == last2 || !ranges​::​search(first1, last1, first2, last2, pred, proj1, proj2).empty();
  }

  template<forward_range R1, forward_range R2,
           class Pred = ranges::equal_to, class Proj1 = identity, class Proj2 = identity>
  requires indirectly_comparable<iterator_t<R1>, iterator_t<R2>, Pred, Proj1, Proj2>
  constexpr bool operator()(R1&& r1, R2&& r2, Pred pred = {}, Proj1 proj1 = {}, Proj2 proj2 = {}) const {
    return ranges::empty(r2) || !ranges​::​search(std::forward(r1), std::forward(r2), pred, proj1, proj2).empty();
  }
};

inline constexpr contains_subrange_impl contains_subrange;
```
* ranges​::​search[link ranges_​search.md]
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
