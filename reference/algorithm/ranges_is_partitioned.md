# is_partitioned
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
    is_partitioned(I first,
                   S last,
                   Pred pred,
                   Proj proj = {}); // (1) C++20

  template <input_range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  constexpr bool
    is_partitioned(R&& r,
                   Pred pred,
                   Proj proj = {}); // (2) C++20

  template <execution-policy Ep,
            random_access_iterator I,
            sized_sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
  bool is_partitioned(Ep&& exec,
                      I first,
                      S last,
                      Pred pred,
                      Proj proj = {}); // (3) C++26

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  bool is_partitioned(Ep&& exec,
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
与えられた範囲が条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されているか判定する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する
- (3): (1)の並列アルゴリズム版。実行ポリシーを指定する
- (4): (2)の並列アルゴリズム版。実行ポリシーを指定する


## 戻り値
`[first,last)` が空、 または `[first,last)` が `pred` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されているなら `true` 、そうでなければ `false` を返す。

つまり、`pred` を満たす全ての要素が、`pred` を満たさない全ての要素より前に出現するなら `true` を返す。


## 計算量
線形時間。最大で `last - first` 回 `pred` が適用される。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  auto pred = [](int x) { return x % 2 == 0; };

  // 偶数グループと奇数グループに分ける
  std::ranges::partition(v, pred);

  for (int x : v) {
   std::cout << x << std::endl;
  }

  // 偶数グループと奇数グループに分かれているか
  if (std::ranges::is_partitioned(v, pred)) {
    std::cout << "partitioned" << std::endl;
  }
  else {
    std::cout << "not partitioned" << std::endl;
  }
}
```
* std::ranges::is_partitioned[color ff0000]
* std::ranges::partition[link ranges_partition.md]

### 出力
```
4
2
3
1
5
partitioned
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
#include <execution>

int main()
{
  std::vector<int> v = {2, 4, 6, 1, 3, 5};

  auto pred = [](int x) { return x % 2 == 0; };

  // 並列に偶数グループと奇数グループに分かれているか判定する
  std::cout << std::boolalpha;
  std::cout << "is partitioned? "
            << std::ranges::is_partitioned(std::execution::par, v, pred)
            << std::endl;
}
```
* std::ranges::is_partitioned[color ff0000]

#### 出力
```
is partitioned? true
```

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
