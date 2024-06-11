# swap_ranges
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I1,
            sentinel_for<I1> S1,
            input_iterator I2,
            sentinel_for<I2> S2>
    requires indirectly_swappable<I1, I2>
  constexpr swap_ranges_result<I1, I2>
    swap_ranges(I1 first1,
                S1 last1,
                I2 first2,
                S2 last2); // (1) C++20

  template <input_range R1,
            input_range R2>
    requires indirectly_swappable<iterator_t<R1>, iterator_t<R2>>
  constexpr swap_ranges_result<
              borrowed_iterator_t<R1>,
              borrowed_iterator_t<R2>>
    swap_ranges(R1&& r1,
                R2&& r2); // (2) C++20
}
```
* swap_ranges_result[link ranges_in_in_result.md]
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* indirectly_swappable[link /reference/iterator/indirectly_swappable.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
指定された2つの範囲同士を swap する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 効果
0 以上 [`min`](ranges_min.md)`(last1 - first1, last2 - first2)` 未満のそれぞれの `n` について [`swap`](/reference/utility/swap.md)`(*(first1 + n), *(first2 + n))` を行う


## 事前条件
`[first1,last1)` と `[first2,last2)` の範囲が重なってはならない。
0 以上 [`min`](ranges_min.md)`(last1 - first1, last2 - first2)` 未満のそれぞれの `n` について、`*(first1 + n) と *(first2 + n)` は `Swappable` でなければならない。


## 戻り値
```cpp
swap_ranges_result {
  .in1 = first1 + M,
  .in2 = first2 + M,
}
```
* swap_ranges_result[link ranges_in_in_result.md]

ただし、`M = `[`min`](ranges_min.md)`(last1 - first1, last2 - first2)` とする。


## 計算量
正確に [`min`](ranges_min.md)`(last1 - first1, last2 - first2)` 回のスワップが行われる


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v1 = { 3,1,2 };
  std::vector<int> v2 = { 5,2,4,1,3 };

  std::ranges::swap_ranges(v1, v2);

  std::cout << "v1: ";
  std::ranges::copy(v1, std::ostream_iterator<int>(std::cout, ","));
  std::cout << std::endl;

  std::cout << "v2: ";
  std::ranges::copy(v2, std::ostream_iterator<int>(std::cout, ","));
  std::cout << std::endl;
}
```
* std::ranges::swap_ranges[color ff0000]
* std::ranges::copy[link ranges_copy.md]

### 出力
```
v1: 5,2,4,
v2: 3,1,2,1,3,
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
