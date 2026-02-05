# minmax
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <class T,
            class Proj = identity,
            indirect_strict_weak_order<projected<const T*, Proj>> Comp = ranges::less>
  constexpr minmax_result<const T&>
    minmax(const T& a,
           const T& b,
           Comp comp = {},
           Proj proj = {}); // (1) C++20

  template <copyable T,
            class Proj = identity,
            indirect_strict_weak_order<projected<const T*, Proj>> Comp = ranges::less>
  constexpr minmax_result<T>
    minmax(initializer_list<T> r,
           Comp comp = {},
           Proj proj = {}); // (2) C++20

  template <input_range R,
            class Proj = identity,
            indirect_strict_weak_order<projected<iterator_t<R>, Proj>> Comp = ranges::less>
    requires indirectly_copyable_storable<iterator_t<R>, range_value_t<R>*>
  constexpr minmax_result<range_value_t<R>>
    minmax(R&& r,
           Comp comp = {},
           Proj proj = {}); // (3) C++20

  template <execution-policy Ep,
            sized-random-access-range R,
            class Proj = identity,
            indirect_strict_weak_order<projected<iterator_t<R>, Proj>> Comp = ranges::less>
    requires indirectly_copyable_storable<iterator_t<R>, range_value_t<R>*>
  minmax_result<range_value_t<R>>
    minmax(Ep&& exec,
           R&& r,
           Comp comp = {},
           Proj proj = {}); // (4) C++26
}
```
* minmax_result[link ranges_min_max_result.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* ranges::less[link /reference/functional/ranges_less.md]
* initializer_list[link /reference/initializer_list/initializer_list.md]
* indirectly_copyable_storable[link /reference/iterator/indirectly_copyable_storable.md]
* execution-policy[link /reference/execution/execution-policy.md]
* sized-random-access-range[link /reference/ranges/sized-random-access-range.md]

## 概要
同じ型の2つの値、もしくは範囲によるN個の値のうち、最小値と最大値の組を取得する。

- (1): 2つの値を指定する
- (2): 初期化子リストを指定する
- (3): Rangeを指定する
- (4): (3)の並列アルゴリズム版。実行ポリシーを指定する


## 戻り値
```cpp
minmax_result {
  .min = 最小値,
  .max = 最大値,
}
```
* minmax_result[link ranges_min_max_result.md]

それぞれ、比較 [`invoke`](/reference/functional/invoke.md)`(comp,` [`invoke`](/reference/functional/invoke.md)`(proj, *i),` [`invoke`](/reference/functional/invoke.md)`(proj, *j))` によって判断された最初の値となる。

## 計算量
- 2値比較バージョンは1操作。
- 範囲バージョンは高々`(3/2) * t.size()`回の述語適用。

## 例
### 基本的な使い方
```cpp example
#include <array>
#include <cassert>
#include <algorithm>
#include <functional>

int main()
{
  const auto result1 = std::ranges::minmax(2, 3);
  assert(result1.min == 2 && result1.max == 3);

  const auto result2 = std::ranges::minmax(2, 3, std::ranges::greater());
  assert(result2.min == 3 && result2.max == 2);

  constexpr auto result3 = std::ranges::minmax({1, 2, 3});
  static_assert(result3.min == 1 && result3.max == 3);

  constexpr std::array<int, 3> a = {1, 2, 3};

  constexpr auto result4 = std::ranges::minmax(a, std::ranges::greater());
  static_assert(result4.min == 3 && result4.max == 1);
}
```
* std::ranges::minmax[color ff0000]
* std::ranges::greater[link /reference/functional/ranges_greater.md]

### 出力
```
```

### 並列アルゴリズムの例 (C++26)
```cpp example
#include <algorithm>
#include <execution>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> v = {3, 1, 4, 1, 5, 9, 2, 6};

  // 並列に最小値と最大値を取得
  auto [min_val, max_val] = std::ranges::minmax(std::execution::par, v);
  std::cout << min_val << ", " << max_val << std::endl;
}
```
* std::ranges::minmax[color ff0000]

#### 出力
```
1, 9
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
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
