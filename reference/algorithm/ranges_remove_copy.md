# remove_copy
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O,
            class T,
            class Proj = identity>
    requires indirectly_copyable<I, O> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<I, Proj>,
               const T*
             >
  constexpr remove_copy_result<I, O>
    remove_copy(I first,
                S last,
                O result,
                const T& value,
                Proj proj = {}); // (1) C++20
  template <input_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O,
            class Proj = identity,
            class T = projected_value_t<I, Proj>>
    requires indirectly_copyable<I, O> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<I, Proj>,
               const T*
             >
  constexpr remove_copy_result<I, O>
    remove_copy(I first,
                S last,
                O result,
                const T& value,
                Proj proj = {}); // (1) C++26

  template <input_range R,
            weakly_incrementable O,
            class T,
            class Proj = identity>
    requires indirectly_copyable<iterator_t<R>, O> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T*
             >
  constexpr remove_copy_result<borrowed_iterator_t<R>, O>
    remove_copy(R&& r,
                O result,
                const T& value,
                Proj proj = {}); // (2) C++20
  template <input_range R,
            weakly_incrementable O,
            class Proj = identity,
            class T = projected_value_t<iterator_t<R>, Proj>>
    requires indirectly_copyable<iterator_t<R>, O> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T*
             >
  constexpr remove_copy_result<borrowed_iterator_t<R>, O>
    remove_copy(R&& r,
                O result,
                const T& value,
                Proj proj = {}); // (2) C++26
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* identity[link /reference/functional/identity.md]
* projected[link /reference/iterator/projected.md]
* indirect_binary_predicate[link /reference/iterator/indirect_binary_predicate.md]
* remove_copy_result[link ranges_in_out_result.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
指定された要素を除け、その結果を出力の範囲へコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 事前条件
- `[first,last)` と `[result,result + (last - first)` は重なってはならない。

## 効果
`[first,last)` 内にあるイテレータ `i` について、[`invoke`](/reference/functional/invoke.md)`(proj, *i) == value` でない要素を `result` へコピーする


## 戻り値
`{ .in = last, .out = result + (last - first) }`


## 計算量
正確に `last - first` 回の比較を行う


## 備考
- 安定。
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        std::ranges::remove_copy(v, result, {a, b});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v = { 2,3,1,2,1 };

  // 1 を除去した結果を出力する
  std::ranges::remove_copy(v, std::ostream_iterator<int>(std::cout, ","), 1);
}
```
* std::ranges::remove_copy[color ff0000]

#### 出力
```
2,3,2,
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
};

std::ostream& operator<<(std::ostream& os, const Point& p) {
  return os << p.x << "," << p.y;
}

int main() {
  std::vector<Point> v = {
    {1, 2},
    {3, 4},
    {5, 6},
    {1, 2},
  };

  // 値{1, 2}を除去した結果を出力する
  std::ranges::remove_copy(
    v,
    std::ostream_iterator<Point>(std::cout, "\n"),
    {1, 2}
  );
}
```
* std::ranges::remove_copy[color ff0000]

#### 出力
```
3,4
5,6
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
