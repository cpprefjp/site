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
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* identity[link /reference/functional/identity.md]
* indirect_unary_predicate[link /reference/iterator/indirect_unary_predicate.md]
* projected[link /reference/iterator/projected.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]

## 概要
与えられた範囲が条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されているか判定する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 戻り値
`[first,last)` が空、 または `[first,last)` が `pred` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されているなら `true` 、そうでなければ `false` を返す。

つまり、`pred` を満たす全ての要素が、`pred` を満たさない全ての要素より前に出現するなら `true` を返す。


## 計算量
線形時間。最大で `last - first` 回 `pred` が適用される。


## 例
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
