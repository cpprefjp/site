# replace
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            class T1,
            class T2,
            class Proj = identity>
    requires indirectly_writable<I, const T2&> &&
             indirect_binary_predicate<
               ranges::equal_to
               projected<I, Proj>,
               const T1*
             >
  constexpr I
    replace(I first,
            S last,
            const T1& old_value,
            const T2& new_value,
            Proj proj = {}); // (1) C++20
  template <input_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            class T1 = projected_value_t<I, Proj>,
            class T2 = T1>
    requires indirectly_writable<I, const T2&> &&
             indirect_binary_predicate<
               ranges::equal_to
               projected<I, Proj>,
               const T1*
             >
  constexpr I
    replace(I first,
            S last,
            const T1& old_value,
            const T2& new_value,
            Proj proj = {}); // (1) C++26

  template <input_range R,
            class T1,
            class T2,
            class Proj = identity>
    requires indirectly_writable<iterator_t<R>, const T2&> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T1*
             >
  constexpr borrowed_iterator_t<R>
    replace(R&& r,
            const T1& old_value,
            const T2& new_value,
            Proj proj = {}); // (2) C++20
  template <input_range R,
            class Proj = identity,
            class T1 = projected_value_t<iterator_t<R>, Proj>,
            class T2 = T1>
    requires indirectly_writable<iterator_t<R>, const T2&> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T1*
             >
  constexpr borrowed_iterator_t<R>
    replace(R&& r,
            const T1& old_value,
            const T2& new_value,
            Proj proj = {}); // (2) C++26
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* identity[link /reference/functional/identity.md]
* indirectly_writable[link /reference/iterator/indirectly_writable.md]
* indirect_binary_predicate[link /reference/iterator/indirect_binary_predicate.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* projected[link /reference/iterator/projected.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
指定された値と一致する要素を指定された値に置き換える。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 効果
`[first,last)` 内のイテレータ `i` について、`*i == old_value` であるものは `*i = new_value` という式によって置き換えられる。


## 戻り値
`last`


## 計算量
正確に `last - first` 回の比較を行う


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        std::ranges::replace(v, {a, b}, {c, d});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = { 3,1,2,1,2 };

  // 1 の要素を全部 10 に置き換える
  std::ranges::replace(v, 1, 10);

  for (int x : v) {
    std::cout << x << ",";
  }
}
```
* std::ranges::replace[color ff0000]

#### 出力
```
3,10,2,10,2,
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

  // 値が{1, 2}の要素をすべて{9, 9}に置き換える
  std::ranges::replace(v, {1, 2}, {9, 9});

  for (const Point& p : v) {
    std::cout << p.x << ',' << p.y << std::endl;
  }
}
```
* std::ranges::replace[color ff0000]

#### 出力
```
9,9
3,4
5,6
9,9
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
