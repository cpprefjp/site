# find_last_if_not
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
  constexpr ranges::subrange<I>
    find_last_if_not(I first,
                     S last,
                     Pred pred,
                     Proj proj = {}); // (1) C++23

  template <forward_range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  constexpr ranges::borrowed_subrange_t<R>
    find_last_if_not(R&& r,
                     Pred pred,
                     Proj proj = {}); // (2) C++23

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
  ranges::subrange<I>
    find_last_if_not(Ep&& exec,
                     I first,
                     S last,
                     Pred pred,
                     Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  ranges::borrowed_subrange_t<R>
    find_last_if_not(Ep&& exec,
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
範囲の中から、指定された条件を満たさない最後の要素を検索する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 戻り値
`[first,last)` あるいは `r` 内のイテレータ `i` について、[`invoke`](/reference/functional/invoke.md)`(pred,` [`invoke`](/reference/functional/invoke.md)`(proj, *i)) == false` である最後のイテレータ `i` を `ranges::subrange<I>{i, last}` として返す。そのようなイテレータが見つからなかった場合は `ranges::subrange<I>{last, last}` を返す。


## 計算量
最大で `last - first` 回述語による比較を行う


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <array>
#include <iostream>

int main() {
  constexpr std::array v = { 3, 1, 4, 1, 5 };
  const auto result = std::ranges::find_last_if_not(v, [](int x) { return x != 1; });
  if (result.begin() == v.end()) {
    std::cout << "not found" << std::endl;
  } else {
    std::cout << "found: " << *result.begin() << std::endl;
    std::cout << "  pos: " << std::distance(v.begin(), result.begin()) << std::endl;
  }
}
```
* std::ranges::find_last_if_not[color ff0000]

#### 出力
```
found: 1
  pos: 3
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {2, 4, 3, 6, 8};

  // 並列に最後の偶数でない要素を検索
  auto result = std::ranges::find_last_if_not(std::execution::par, v,
                                              [](int x) { return x % 2 == 0; });

  if (!result.empty()) {
    std::cout << "found: " << *result.begin() << std::endl;
    std::cout << "position: " << (result.begin() - v.begin()) << std::endl;
  }
}
```
* std::ranges::find_last_if_not[color ff0000]

#### 出力
```
found: 3
position: 2
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P1223R5 find_last](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1223r5.pdf)
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
