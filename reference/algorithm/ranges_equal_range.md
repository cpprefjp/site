# equal_range
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
  constexpr subrange<I>
    equal_range(I first,
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
  constexpr subrange<I>
    equal_range(I first,
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
  constexpr borrowed_subrange_t<R>
    equal_range(R&& r,
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
  constexpr borrowed_subrange_t<R>
    equal_range(R&& r,
                const T& value,
                Comp comp = {},
                Proj proj = {}); // (2) C++26
}
```
* ranges::less[link /reference/functional/ranges_less.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]


## 概要
指定した値と等しい範囲を取得する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
`[first,last)` の要素 `e` は `e < value` および `!(value < e)` 、あるいは `comp(e, value)` および `!comp(value, e)` によって[区分化](/reference/algorithm.md#sequence-is-partitioned)されていなければならない。

また、`[first, last)` の要素 `e` は全て暗黙に、`e < value` が `!(value < e)` または `comp(e, value)` が `!comp(value, e)` を意味している必要がある。


## 戻り値
`{`[`ranges::lower_bound`](ranges_lower_bound.md)`(first, last, value, comp, proj),` [`ranges::upper_bound`](ranges_upper_bound.md)`(first, last, value, comp, proj)}`


## 計算量
最大で 2 * log2(`last - first`) + O(1) 回の比較を行う


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        auto result = std::ranges::equal_range(v, {a, b});
        ```

## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v   = {3, 1, 4, 2, 5, 3};
  std::vector<int> v2  = {1, 4, 2, 5};

  std::ranges::sort(v);
  std::ranges::sort(v2);

  auto result  = std::ranges::equal_range(v, 3);
  auto result2 = std::ranges::equal_range(v2, 3);

  std::cout << "size: " << result.size() << std::endl;
  for (int i : result) {
    std::cout << i << std::endl;
  }
  std::cout << std::endl;

  std::cout << "size: " << result2.size() << std::endl;
  for (int i : result2) {
    std::cout << i << std::endl;
  }
}
```
* std::ranges::sort[link ranges_sort.md]
* std::ranges::equal_range[color ff0000]

#### 出力
```
size: 2
3
3

size: 0
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
    {3, 4},
    {5, 6},
  };

  // 値{3, 4}が見つかる範囲を取得
  auto result = std::ranges::equal_range(v, {3, 4});

  for (const Point& p : result) {
    std::cout << p.x << "," << p.y << std::endl;
  }
}
```
* std::ranges::equal_range[color ff0000]

#### 出力
```
3,4
3,4
```

### 射影変換を使用した例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>
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
    {4, "Bob"},
    {5, "Eve"},
    {6, "Dave"}
  };
  const std::string key = "Bob";

  // メンバ変数nameをキーとして検索
  // 1. メンバ変数ポインタを使う方法
  auto result1 = std::ranges::equal_range(v, key, {}, &X::name);
  std::cout << "[メンバ変数ポインタ]" << std::endl;
  for (const X& x : result1) {
    std::cout << "id=" << x.id << " name=" << x.name << std::endl;
  }

  // 2. ラムダ式を使う方法
  auto result2 = std::ranges::equal_range(
    v,
    key,
    {},
    // x.nameがコピーされないよう戻り値型を明示的に指定
    [](const X& x) -> const std::string& { return x.name; }
);
  std::cout << "[ラムダ式]" << std::endl;
  for (const X& x : result2) {
    std::cout << "id=" << x.id << " name=" << x.name << std::endl;
  }
}
```
* std::ranges::equal_range[color ff0000]

#### 出力
```
[メンバ変数ポインタ]
id=4 name=Bob
id=4 name=Bob
[ラムダ式]
id=4 name=Bob
id=4 name=Bob
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
