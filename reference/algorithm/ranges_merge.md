# merge
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
            weakly_incrementable O,
            class Comp = ranges::less,
            class Proj1 = identity,
            class Proj2 = identity>
    requires mergeable<I1, I2, O, Comp, Proj1, Proj2>
  constexpr merge_result<I1, I2, O>
    merge(I1 first1,
          S1 last1,
          I2 first2,
          S2 last2,
          O result,
          Comp comp = {},
          Proj1 proj1 = {},
          Proj2 proj2 = {}); // (1) C++20

  template <input_range R1,
            input_range R2,
            weakly_incrementable O,
            class Comp = ranges::less,
            class Proj1 = identity,
            class Proj2 = identity>
    requires mergeable<iterator_t<R1>, iterator_t<R2>, O, Comp, Proj1, Proj2>
  constexpr merge_result<
    borrowed_iterator_t<R1>,
    borrowed_iterator_t<R2>,
    O
  >
    merge(R1&& r1,
          R2&& r2,
          O result,
          Comp comp = {},
          Proj1 proj1 = {},
          Proj2 proj2 = {});  // (2) C++20
}
```
* merge_result[link ranges_in_in_out_result.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* ranges::less[link /reference/functional/ranges_less.md]
* mergeable[link /reference/iterator/mergeable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
2つのソート済み範囲をマージして、出力イテレータへ出力する。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
- `[first1,last1)` と `[first2,last2)` はソートされていること。
- 結果の範囲と入力の範囲は重なっていてはならない。


## 効果
`[first1,last1)` と `[first2,last2)` の２つの要素を全て `[result,result_last)` へコピーする。その際に、[`is_sorted`](ranges_is_sorted.md)`(result, result_last, comp)` を満たすようにコピーする（`result_last` は `result + (last1 - first1) + (last2 - first2)` とする）。


## 戻り値
```cpp
merge_result {
  .in1 = last1,
  .in2 = last2,
  .out = result + (last1 - first1) + (last2 - first2),
}
```
* merge_result[link ranges_in_in_out_result.md]

## 計算量
`N = (last1 - first1) + (last2 - first2)`であるとして最大で、N - 1回比較する

## 備考
この操作は安定である。つまり、各入力範囲内の要素の前後関係は保たれ、また、1 番目の範囲と 2 番目に等値の要素があった場合には、1 番目の範囲の要素の方が先に来る。


## 例
```cpp example
#include <iostream>
#include <vector>
#include <algorithm>

int main()
{
  std::vector<int> a = {3, 1, 4, 2};
  std::vector<int> b = {2, 5, 6, 4};
  std::vector<int> result;

  std::ranges::sort(a);
  std::ranges::sort(b);

  // aとbをマージ
  std::ranges::merge(a, b, std::back_inserter(result));

  for (int x : result) {
    std::cout << x << std::endl;
  }
}
```
* std::ranges::sort[link ranges_sort.md]
* std::ranges::merge[color ff0000]

### 出力
```
1
2
2
3
4
4
5
6
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
