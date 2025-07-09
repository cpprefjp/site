# lower_bound
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
    lower_bound(I first,
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
    lower_bound(I first,
                S last,
                const T& value,
                Comp comp = {},
                Proj proj = {}); // (1) C++26

  template <forward_range R,
            class T,
            class Proj = identity,
            indirect_strict_weak_order<
              const T*,
              projected<iterator_t<R>,
              Proj>
            > Comp = ranges::less>
  constexpr borrowed_iterator_t<R>
    lower_bound(R&& r,
                const T& value,
                Comp comp = {},
                Proj proj = {}); // (2) C++20
  template <forward_range R,
            class Proj = identity,
            class T = projected_value_t<iterator_t<R>, Proj>,
            indirect_strict_weak_order<
              const T*,
              projected<iterator_t<R>,
              Proj>
            > Comp = ranges::less>
  constexpr borrowed_iterator_t<R>
    lower_bound(R&& r,
                const T& value,
                Comp comp = {},
                Proj proj = {}); // (2) C++26
}
```
* ranges::less[link /reference/functional/ranges_less.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
指定された要素以上の値が現れる最初の位置のイテレータを取得する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

この関数の用途としては、ソート済み範囲に対して、任意の値を二分探索で見つけるために使用できる。[`std::multiset`](/reference/set/multiset.md)のように同じキーを持つ要素が複数あり、その全てを列挙したい場合にはこの関数の代わりに[`std::ranges::equal_range()`](ranges_equal_range.md)関数を使用できる。


## 事前条件
- `[first,last)` の要素 `e` は `e < value` または `comp(e, value)` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていること。
  つまり、`e < value` または `comp(e, value)` が `true` となる全ての要素 `e` は、`false` となる全ての要素よりも左側（`first` に近い方）になければならない。


## 戻り値
`[first, last]` 内のイテレータ `i` のうち、以下の条件を満たす、最も右側（`first` から遠い方）のもの

- `[first, i)` 内の全てのイテレータ `j` が `*j < value` または `comp(*j, value) != false` である

（つまり、`value` 以上の要素のうち最初のものを指すイテレータ。`value` 以上の要素が無ければ `last`）


## 計算量
最大で log2(`last - first`) + O(1) 回の比較を行う


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        auto it = std::ranges::lower_bound(v, {a, b});
        ```

## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <algorithm>
#include <vector>
#include <string>

struct X {
  int id;
  std::string name;
};

int main()
{
  // この関数単体としての使い方
  {
    // lower_bound で 4 以上の要素の位置を検索する場合、
    // 4 より小さい物と 4 以上の物がその順に並んでいれば、
    // 必ずしもソートされている必要はない。
    std::vector<int> v = {3, 1, 4, 6, 5};

    // 4以上の要素を二分探索で検索
    auto it = std::ranges::lower_bound(v, 4);
    if (it != v.end()) {
      std::size_t pos = std::ranges::distance(v.begin(), it);
      std::cout << *it << " pos=" << pos << std::endl;
    }
  }

  // 基本的な用途
  // ソート済み範囲から、特定の値を二分探索で見つける
  {
    std::vector<int> v = {3, 1, 4, 6, 5};
    std::ranges::sort(v);

    // 二分探索で値4を検索
    auto it = std::ranges::lower_bound(v, 4);
    if (it != v.end() && *it == 4) { // lower_boundでは4"以上"の値が見つかるので、
                                     // 値4を見つけたいなら検索結果の値を比較する必要がある
      std::size_t pos = std::ranges::distance(v.begin(), it);
      std::cout << *it << " pos=" << pos << std::endl;
    }
  }

  // 要素の一部の値を比較して見つける
  {
    // 要素は複数のメンバ変数をもつ
    std::vector<X> v = {
      {1, "Carol"},
      {3, "Alice"},
      {4, "Bob"},
      {5, "Eve"},
      {6, "Dave"}
    };

    const std::string key = "Bob";

    // X::nameメンバ変数をキーにして、
    // X::name == "Bob"となる要素を二分探索で見つける
    auto it = std::ranges::lower_bound(v, key, {}, &X::name);

    if (it != v.end() && it->name == key) {
      std::size_t pos = std::ranges::distance(v.begin(), it);
      std::cout << "id=" << it->id
                << " name=" << it->name
                << " pos=" << pos
                << std::endl;
    }
  }
}
```
* std::ranges::sort[link ranges_sort.md]
* std::ranges::distance[link /reference/iterator/ranges_distance.md]
* std::ranges::lower_bound[color ff0000]

#### 出力
```
4 pos=2
4 pos=2
id=4 name=Bob pos=2
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
    {1, 2},
    {3, 4},
    {5, 6},
  };

  auto it = std::ranges::lower_bound(v, {3, 4});

  // lower_boundでは指定した値"以上"の値が見つかるので、
  // 指定した値を見つけたいなら検索結果の値を比較する必要がある
  if (it != v.end() && *it == Point{3, 4}) {
    std::size_t pos = std::distance(v.begin(), it);
    std::cout << "pos=" << pos << std::endl;
  }
}
```
* std::ranges::lower_bound[color ff0000]

#### 出力
```
pos=2
```

### 射影変換を使用した例
```cpp example
#include <iostream>
#include <algorithm>
#include <vector>
#include <string>

struct X {
  int id;
  std::string name;
};

int main() {
  std::vector<X> v = {
    {1, "Carol"},
    {3, "Alice"},
    {4, "Bob"},
    {5, "Eve"},
    {6, "Dave"}
  };
  const std::string key = "Bob";

  // nameメンバ変数をキーとして検索
  // 1. メンバ変数ポインタを使う方法
  auto it1 = std::ranges::lower_bound(v, key, {}, &X::name);
  if (it1 != v.end() && it1->name == key) {
    std::size_t pos = std::ranges::distance(v.begin(), it1);
    std::cout << "id=" << it1->id
              << " name=" << it1->name
              << " pos=" << pos << std::endl;
  }

  // 2. ラムダ式を使う方法
  auto it2 = std::ranges::lower_bound(
    v,
    key,
    {},
    // コピーされないよう戻り値型を明示的に指定
    [](const X& x) -> const std::string& { return x.name; }
  );
  if (it2 != v.end() && it2->name == key) {
    std::size_t pos = std::ranges::distance(v.begin(), it2);
    std::cout << "id=" << it2->id
              << " name=" << it2->name
              << " pos=" << pos << std::endl;
  }
}
```
* std::ranges::lower_bound[color ff0000]
* std::ranges::distance[link /reference/iterator/ranges_distance.md]

#### 出力
```
id=4 name=Bob pos=2
id=4 name=Bob pos=2
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
