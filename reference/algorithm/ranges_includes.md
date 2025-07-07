# includes
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I1,
            sentinel_for<I1> S1,
            input_iterator I2,
            sentinel_for<I2> S2,
            class Proj1 = identity,
            class Proj2 = identity,
            indirect_strict_weak_order<
              projected<I1, Proj1>,
              projected<I2, Proj2>
            > Comp = ranges::less>
  constexpr bool
    includes(I1 first1,
             S1 last1,
             I2 first2,
             S2 last2,
             Comp comp = {},
             Proj1 proj1 = {},
             Proj2 proj2 = {}); // (1) C++20

  template <input_range R1,
            input_range R2,
            class Proj1 = identity,
            class Proj2 = identity,
            indirect_strict_weak_order<
              projected<iterator_t<R1>, Proj1>,
              projected<iterator_t<R2>, Proj2>
            > Comp = ranges::less>
  constexpr bool
    includes(R1&& r1,
             R2&& r2,
             Comp comp = {},
             Proj1 proj1 = {},
             Proj2 proj2 = {}); // (2) C++20
}
```
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* ranges::less[link /reference/functional/ranges_less.md]

## 概要
2つのソート済み範囲において、一方の範囲の要素がもう一方の範囲に全て含まれているかを判定する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 戻り値
`[first2,last2)` が `empty` であるか、`[first2,last2)` の全ての要素が `[first1,last1)` に含まれている場合は `true`、そうでない場合は `false` を返す。


## 計算量
最大で `2 * ((last1 - first1) + (last2 - first2)) - 1` 回比較する


## 例
```cpp example
#include <iostream>
#include <set>
#include <algorithm>

int main()
{
  std::set<int> a = {1, 2, 3, 4, 5, 6};
  std::set<int> b = {2, 4, 6};
  std::set<int> c = {2, 4, 7};

  std::cout << std::boolalpha;

  std::cout << std::ranges::includes(a, b) << std::endl;
  std::cout << std::ranges::includes(a, c) << std::endl;
}
```
* std::ranges::includes[color ff0000]

### 出力
```
true
false
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
