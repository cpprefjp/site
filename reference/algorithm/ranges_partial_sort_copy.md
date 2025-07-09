# partial_sort_copy
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I1,
            sentinel_for<I1> S1,
            random_access_iterator I2, sentinel_for<I2> S2,
            class Comp = ranges::less,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_copyable<I1, I2> &&
             sortable<I2, Comp, Proj2> &&
             indirect_strict_weak_order<Comp, projected<I1, Proj1>, projected<I2, Proj2>>
  constexpr partial_sort_copy_result<I1, I2>
    partial_sort_copy(I1 first,
                      S1 last,
                      I2 result_first,
                      S2 result_last,
                      Comp comp = {},
                      Proj1 proj1 = {},
                      Proj2 proj2 = {}); // (1) C++20

  template <input_range R1,
            random_access_range R2,
            class Comp = ranges::less,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_copyable<iterator_t<R1>, iterator_t<R2>> &&
             sortable<iterator_t<R2>, Comp, Proj2> &&
             indirect_strict_weak_order<
               Comp,
               projected<iterator_t<R1>, Proj1>,
               projected<iterator_t<R2>, Proj2>
             >
  constexpr partial_sort_copy_result<borrowed_iterator_t<R1>, borrowed_iterator_t<R2>>
    partial_sort_copy(R1&& r,
                      R2&& result_r,
                      Comp comp = {},
                      Proj1 proj1 = {},
                      Proj2 proj2 = {}); // (2) C++20
}
```
* partial_sort_copy_result[link ranges_in_out_result.md]
* ranges::less[link /reference/functional/ranges_less.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* indirect_strict_weak_order[link /reference/iterator/indirect_strict_weak_order.md]
* sortable[link /reference/iterator/sortable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
範囲を部分的にソートした結果を他の範囲にコピーする

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 効果
`N = `[`min`](/reference/algorithm/min.md)`(last - first, result_last - result_first)` とする。

`[first,last)` にある要素の中から、`N` 個の要素をソート済みの状態で `[result_first,result_first + N)` に配置する。


## 戻り値
```cpp
partial_sort_copy_result {
  .in = last,
  .out = result_first + N
}
```
* partial_sort_copy_result[link ranges_in_out_result.md]


## 計算量
ほぼ `(last - first) * log(N)` 回の比較を行う


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> v = {3, 1, 4, 2, 5};

  // vから小さい順に2要素取り出す
  std::vector<int> result(2);
  std::ranges::partial_sort_copy(v, result);

  for (int i : result) {
    std::cout << i;
  }
  std::cout << std::endl;
}
```
* std::ranges::partial_sort_copy[color ff0000]

### 出力
```
12
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
