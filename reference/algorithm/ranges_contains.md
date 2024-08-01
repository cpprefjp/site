# contains
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace ranges {
  // (1)
  template<input_iterator I, sentinel_for<I> S, class T, class Proj = identity>
    requires indirect_binary_predicate<ranges::equal_to, projected<I, Proj>, const T*>
    constexpr bool contains(I first, S last, const T& value, Proj proj = {});

  // (2)
  template<input_range R, class T, class Proj = identity>
    requires
      indirect_binary_predicate<ranges::equal_to, projected<iterator_t<R>, Proj>, const T*>
    constexpr bool contains(R&& r, const T& value, Proj proj = {});
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
* ranges::find[link ranges_find.md]

## 計算量
最大で `last - first` 回比較を行う


## 例
```cpp example
#include <algorithm>
#include <print>
#include <array>

int main() {
  constexpr std::array v = { 3, 1, 4 };
  if (std::ranges::contains(v, 1)) {
    std::println("found");
  } else {
    std::println("not found");
  }
}
```
* std::ranges::contains[color ff0000]

### 出力
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
* ranges::find[link ranges_find.md]

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
