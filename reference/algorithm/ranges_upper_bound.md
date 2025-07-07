# upper_bound
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
  constexpr I
    upper_bound(I first,
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
  constexpr I
    upper_bound(I first,
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
  constexpr borrowed_iterator_t<R>
    upper_bound(R&& r,
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
  constexpr borrowed_iterator_t<R>
    upper_bound(R&& r,
                const T& value,
                Comp comp = {},
                Proj proj = {}); // (2) C++26
}
```
* ranges::less[link /reference/functional/ranges_less.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
指定された要素より大きい値が現れる最初の位置のイテレータを取得する

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
- `[first,last)` の要素 `e` は `!(value < e)` または `!comp(value, e)` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていること。  
  つまり、`!(value < e)` または `!comp(value, e)` が `true` となる全ての要素 `e` は、`false` となる全ての要素よりも左側（`first` に近い方）になければならない。


## 戻り値
`[first, last]` 内のイテレータ `i` のうち、以下の条件を満たす、最も右側（`first` から遠い方）のもの。

- `[first, i)` 内の全てのイテレータ `j` が `!(value < *j)` または `comp(value, *j) == false` である。

（つまり、`value` より大きい要素のうち最初のものを指すイテレータ。`value` より大きい要素が無ければ `last`）


## 計算量
最大で log2(`last - first`) + O(1) 回の比較を行う


## 備考
- 本関数は、本質的に [`partition_point`](ranges_partition_point.md) と等価である。  
	具体的には、[`partition_point`](ranges_partition_point.md)`(first, last, [value](const T& e) { return !bool(value < e); })`、あるいは、[`partition_point`](ranges_partition_point.md)`(first, last, [value, comp](const T& e) { return !bool(comp(value, e)); })` とすることで等価の結果が得られる。
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        auto it = std::ranges::upper_bound(v, {a, b});
        ```

## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

struct X {
  int key;    // プライマリキー
  int value;  // 補助的な値
};

void push_stable(std::vector<X>& queue, X elem)
{
  // 挿入対象の値 elem よりも大きい要素の位置、すなわち
  // elem と同値な要素グループの次の位置を検索する。
  auto it = std::ranges::upper_bound(queue, elem.key, {}, &X::key);
  queue.insert(it, elem);
}


int main()
{
  // この関数単体としての使い方
  {
    // upper_bound で 3 より大きい要素の位置を検索する場合、
    // 3 以下の物と 3 より大きい物がその順に並んでいれば、
    // 必ずしもソートされている必要はない。
    std::vector<int> v = {3, 1, 4, 6, 5};

    // 3より大きい要素を二分探索で検索
    auto it = std::ranges::upper_bound(v, 3);
    std::cout << *it << std::endl;
  }

  // 応用例：安定順序・優先順位付きキューの実装
  {
    std::vector<X> queue;
    push_stable(queue, {100, 1});
    push_stable(queue, {200, 1});
    push_stable(queue, {300, 1});
    push_stable(queue, {300, 2});
    push_stable(queue, {200, 2});
    push_stable(queue, {100, 2});

    // プライマリキー key は同値だが異なる値 value を持つ要素間では
    // キュー queue への要素挿入順序が維持されている。
    // （std::priority_queue クラスでは挿入順序は保持されない。）
    for (const auto& e: queue) {
      std::cout << e.key << ':' << e.value << ' ';
    }
    std::cout << std::endl;
  }
}
```
* std::ranges::upper_bound[color ff0000]


#### 出力
```
4
100:1 100:2 200:1 200:2 300:1 300:2
```

### 波カッコ初期化を入力として使用する (C++26)
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

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
    {3, 4},
    {5, 6},
  };

  // 値{3, 4}が見つかる範囲を取得
  auto first = std::ranges::lower_bound(v, {3, 4});
  auto last = std::ranges::upper_bound(v, {3, 4});

  if (first != v.end() && last != v.end()) {
    while (first != last) {
      std::cout << first->x << "," << first->y << std::endl;
      ++first;
    }
  }
}
```
* std::ranges::upper_bound[color ff0000]
* std::ranges::lower_bound[link /reference/algorithm/lower_bound.md]

#### 出力
```
3,4
3,4
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
