# binary_search
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I,
            sentinel_for<I> S,
            class T,
            class Proj = identity,
            indirect_strict_weak_order<
              const T*,
              projected<I, Proj>
            > Comp = ranges::less>
  constexpr bool
    binary_search(I first,
                  S last,
                  const T& value,
                  Comp comp = {},
                  Proj proj = {}); // (1) C++20
  template <forward_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            class T = projected_value_t<I, Proj>,
            indirect_strict_weak_order<
              const T*,
              projected<I, Proj>
            > Comp = ranges::less>
  constexpr bool
    binary_search(I first,
                  S last,
                  const T& value,
                  Comp comp = {},
                  Proj proj = {}); // (1) C++26

  template <forward_range R,
            class T,
            class Proj = identity,
            indirect_strict_weak_order<
              const T*,
              projected<iterator_t<R>, Proj>
            > Comp = ranges::less>
  constexpr bool
    binary_search(R&& r,
                  const T& value,
                  Comp comp = {},
                  Proj proj = {}); // (2) C++20
  template <forward_range R,
            class Proj = identity,
            class T = projected_value_t<iterator_t<R>, Proj>,
            indirect_strict_weak_order<
              const T*,
              projected<iterator_t<R>, Proj>
            > Comp = ranges::less>
  constexpr bool
    binary_search(R&& r,
                  const T& value,
                  Comp comp = {},
                  Proj proj = {}); // (2) C++26
}
```
* ranges::less[link /reference/functional/ranges_less.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]


## 概要
二分探索法による検索を行う。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
`[first,last)` の要素 `e` は `e < value` および `!(value < e)`、または `comp(e, value)` および `!comp(value, e)` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていなければならない。

また、`[first, last)` の全ての要素 `e` は、`e < value` であれば `!(value < e)` である、または `comp(e, value)` であれば `!comp(value, e)` である必要がある。


## 戻り値
`[first,last)` 内のイテレータ `i` について、`!(*i < value) && !(value < *i)` または `comp(*i, value) == false && comp(value, *i) == false` であるようなイテレータが見つかった場合は `true` を返す。


## 計算量
最大で log2(`last - first`) + O(1) 回の比較を行う


## 備考
- `comp` は 2 引数の関数オブジェクトで、1 番目の引数が 2 番目の引数「より小さい」場合に `true` を、そうでない場合に `false` を返すものとして扱われる。
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        bool found = std::ranges::binary_search(v, {a, b});
        ```

## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  // binary_search で 4 を検索する場合、
  // 4 より小さい物、4 と等しい物、4 より大きい物がその順に並んでいれば、
  // 必ずしもソートされている必要はない。
  std::vector<int> v = {3, 1, 4, 6, 5};

  if (std::ranges::binary_search(v, 4)) {
    std::cout << "found" << std::endl;
  }
  else {
    std::cout << "not found" << std::endl;
  }
}
```
* std::ranges::binary_search[color ff0000]

#### 出力
```
found
```

### 波カッコ初期化を入力として使用する (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

struct Point {
  int x;
  int y;

  bool operator==(const Point& other) const = default;
  auto operator<=>(const Point& other) const = default;
};

int main() {
  std::vector<Point> v = {
    {1, 2},
    {3, 4},
    {5, 6},
  };

  // 値{3, 4}を二分検索
  bool found = std::ranges::binary_search(v, {3, 4});
  if (found) {
    std::cout << "found" << std::endl;
  }
  else {
    std::cout << "not found" << std::endl;
  }
}
```
* std::ranges::binary_search[color ff0000]

### 出力
```
found
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
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
