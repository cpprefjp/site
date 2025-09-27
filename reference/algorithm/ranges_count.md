# count
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            class T,
            class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  constexpr iter_difference_t<I>
    count(I first,
          S last,
          const T& value,
          Proj proj = {}); // (1) C++20
  template <input_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            class T = projected_value_t<I, Proj>>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  constexpr iter_difference_t<I>
    count(I first,
          S last,
          const T& value,
          Proj proj = {}); // (1) C++26

  template <input_range R,
            class T,
            class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<iterator_t<R>, Proj>, const T*>
  constexpr range_difference_t<R>
    count(R&& r,
          const T& value,
          Proj proj = {}); // (2) C++20
  template <input_range R,
            class Proj = identity,
            class T = projected_value_t<iterator_t<R>, Proj>>
    requires indirect_binary_predicate<ranges::equal_to, projected<iterator_t<R>, Proj>, const T*>
  constexpr range_difference_t<R>
    count(R&& r,
          const T& value,
          Proj proj = {}); // (2) C++26
}
```

## 概要
指定された値と等値な要素の数を数える。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## テンプレートパラメータ制約
- (1):
    - `I`が[`input_iterator`](/reference/iterator/input_iterator.md)である
    - `S`が[`I`に対する番兵](/reference/iterator/sentinel_for.md)である
    - `I`を`Proj`で射影した値と指定された値が[`equal_to`](/reference/functional/equal_to.md)によって等値比較できる
- (2):
    - `R`が[`input_range`](/reference/ranges/input_range.md)である
    - `Pred`は`R`のイテレータを`Proj`で射影した値が[`equal_to`](/reference/functional/equal_to.md)によって等値比較できる

## 戻り値
`[first,last)` 内のイテレータ `i` について、[`invoke`](/reference/functional/invoke.md)`(proj, *i) == value` であるイテレータの数を返す

## 計算量
正確に `last - first` 回の比較を行う


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        int n = std::ranges::count(v, {a, b});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <array>

int main() {
  constexpr std::array v = { 1,4,3,3,1,2,2,1 };

  // 値が 1 の要素がいくつあるかを数える
  int n = std::ranges::count(v, 1);
  std::cout << "count of 1: " << n << std::endl;
}
```
* std::ranges::count[color ff0000]

#### 出力
```
count of 1: 3
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
};

int main() {
  std::vector<Point> v = {
	{1, 2},
	{3, 4},
	{5, 6},
    {1, 2},
  };

  // 値が {1, 2} の要素がいくつあるかを数える
  int n = std::ranges::count(v, {1, 2});
  std::cout << "count of {1,2}: " << n << std::endl;
}
```
* std::ranges::count[color ff0000]

#### 出力
```
count of {1,2}: 2
```

### 射影変換を使用した例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <string>

struct Item {
  int id;
  std::string label;
};

int main() {
  std::vector<Item> v = {
    {1, "foo"},
    {3, "bar"},
    {5, "foo"},
    {2, "baz"},
  };

  // メンバ変数ポインタを使って label=="foo" の要素数を数える
  int n1 = std::ranges::count(v, std::string("foo"), &Item::label);
  std::cout << "count of label==\"foo\": " << n1 << std::endl;

  // ラムダ式を使って id==1 の要素数を数える
  int n2 = std::ranges::count(v, 1, [](const Item& p) { return p.id; });
  std::cout << "count of id==1: " << n2 << std::endl;
}
```
* std::ranges::count[color ff0000]

#### 出力
```
count of label=="foo": 2
count of id==1: 2
```


## 実装例
```cpp
struct count_impl {
  template<input_iterator I, sentinel_for<I> S, class T, class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  constexpr iter_difference_t<I> operator()(I first, S last, const T& value, Proj proj = {}) const {
    iter_difference_t<I> count = 0;
    for ( ; first != last; ++first)
      if (value == invoke(proj, *first)) count++;
    return count;
  }

  template<input_range R, class T, class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<iterator_t<R>, Proj>, const T*>
  constexpr range_difference_t<R> operator()(R&& r, const T& value, Proj proj = {}) const {
    return (*this)(begin(r), end(r), value, ref(proj));
  }
};

inline constexpr count_impl count;
```
* invoke[link /reference/functional/invoke.md]
* begin[link /reference/ranges/begin.md]
* end[link /reference/ranges/end.md]
* ref[link /reference/functional/ref.md]

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
