# contains
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            class T,
            class Proj = identity>
    requires indirect_binary_predicate<
               ranges::equal_to,
               projected<I, Proj>,
               const T*
             >
  constexpr bool
    contains(I first,
             S last,
             const T& value,
             Proj proj = {}); // (1) C++23
  template <input_iterator I,
            sentinel_for<I> S,
            class Proj = identity,
            class T = projected_value_t<I, Proj>>
    requires indirect_binary_predicate<
               ranges::equal_to,
               projected<I, Proj>,
               const T*
             >
  constexpr bool
    contains(I first,
             S last,
             const T& value,
             Proj proj = {}); // (1) C++26

  template <input_range R,
            class T,
            class Proj = identity>
    requires indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T*
             >
  constexpr bool
    contains(R&& r,
             const T& value,
             Proj proj = {}); // (2) C++23
  template <input_range R,
            class Proj = identity,
            class T = projected_value_t<iterator_t<R>, Proj>>
    requires indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T*
             >
  constexpr bool
    contains(R&& r,
             const T& value,
             Proj proj = {}); // (2) C++26
}
```

## 概要
指定された値が含まれるか調べる。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 戻り値
```cpp
ranges::find(std::move(first), last, value, proj) != last
```


## 計算量
最大で `last - first` 回比較を行う


## 備考
- (1), (2) :
    - C++26 : 引数として波カッコ初期化`{}`を受け付ける
        ```cpp
        std::vector<T> v;
        bool found = std::ranges::contains(r, {a, b});
        ```


## 例
### 基本的な使い方
```cpp example
#include <algorithm>
#include <print>
#include <array>

int main() {
  constexpr std::array ar = { 3, 1, 4 };
  if (std::ranges::contains(ar, 1)) {
    std::println("found");
  } else {
    std::println("not found");
  }
}
```
* std::ranges::contains[color ff0000]

#### 出力
```
found
```

### 波カッコ初期化を入力として使用する (C++26)
```cpp example
#include <algorithm>
#include <print>
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
	{5, 6}
  };

  bool found = std::ranges::contains(v, {3, 4});
  if (found) {
    std::println("found");
  } else {
    std::println("not found");
  }
}
```
* std::ranges::contains[color ff0000]

#### 出力
```
found
```


## 実装例
```cpp
struct contains_impl {
  template<input_iterator I, sentinel_for<I> S, class T, class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
  constexpr bool operator()(I first, S last, const T& value, Proj proj = {}) const {
    return ranges::find(std::move(first), last, value, proj) != last;
  }

  template<input_range R, class T, class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<iterator_t<R>, Proj>, const T*>
  constexpr bool operator()(R&& r, const T& value, Proj proj = {}) const {
    return (*this)(begin(r), end(r), value, ref(proj));
  }
};

inline constexpr contains_impl contains;
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [N4950 27 Algorithms library](https://timsong-cpp.github.io/cppwp/n4950/algorithms)
- [P2248R8 Enabling list-initialization for algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2248r8.html)
    - C++26で波カッコ初期化 (リスト初期化) に対応した
