# partition_point
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            indirect_unary_predicate<projected<I, Proj>> Pred>
  constexpr I
    partition_point(I first,
                    S last,
                    Pred pred,
                    Proj proj = {}); // (1) C++20

  template <forward_range R,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
  constexpr borrowed_iterator_t<R>
    partition_point(R&& r,
                    Pred pred,
                    Proj proj = {}); // (2) C++20
}
```
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]


## 概要
与えられた範囲から条件によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されている位置を得る。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 事前条件
- `[first,last)` は `pred` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていなければならない。つまり、`pred` を満たす全ての要素が、`pred` を満たさない全ての要素より前に出現してなければならない。


## 戻り値
[`all_of`](ranges_all_of.md)`(first, mid, pred)` と [`none_of`](ranges_none_of.md)`(mid, last, pred)` が `true` であるようなイテレータ `mid` を返す。


## 計算量
`pred` が O(log(`last - first`)) 回適用される。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

void print(const char* name, const std::vector<int>& v)
{
  std::cout << name << " : ";
  std::for_each(v.begin(), v.end(), [](int x) {
    std::cout << x << ",";
  });
  std::cout << std::endl;
}

bool is_even(int x) { return x % 2 == 0; }

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::ranges::partition(v, is_even);

  // 偶数グループと奇数グループに分かれた位置を得る
  auto it = std::ranges::partition_point(v, is_even);

  print("v", v);
  std::cout << *it << std::endl;
}
```
* std::ranges::partition_point[color ff0000]
* std::ranges::partition[link ranges_partition.md]

### 出力
```
v : 4,2,3,1,5,
3
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
