# unique_copy
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O,
            class Proj = identity,
            indirect_equivalence_relation<projected<I, Proj>> C = ranges::equal_to>
    requires indirectly_copyable<I, O> &&
             (forward_iterator<I> ||
               (input_iterator<O> && same_as<iter_value_t<I>, iter_value_t<O>>) ||
               indirectly_copyable_storable<I, O>
             )
  constexpr unique_copy_result<I, O>
    unique_copy(I first,
                S last,
                O result,
                C comp = {},
                Proj proj = {}); // (1) C++20

  template <input_range R,
            weakly_incrementable O,
            class Proj = identity,
            indirect_equivalence_relation<projected<iterator_t<R>, Proj>> C = ranges::equal_to>
    requires indirectly_copyable<iterator_t<R>, O> &&
             (forward_iterator<iterator_t<R>> ||
               (input_iterator<O> && same_as<range_value_t<R>, iter_value_t<O>>) ||
               indirectly_copyable_storable<iterator_t<R>, O>
             )
  constexpr unique_copy_result<borrowed_iterator_t<R>, O>
    unique_copy(R&& r,
                O result,
                C comp = {},
                Proj proj = {}); // (2) C++20
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* identity[link /reference/functional/identity.md]
* indirect_equivalence_relation[link /reference/iterator/indirect_equivalence_relation.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* forward_iterator[link /reference/iterator/forward_iterator.md]
* iter_value_t[link /reference/iterator/iter_value_t.md]
* indirectly_copyable_storable[link /reference/iterator/indirectly_copyable_storable.md]
* projected[link /reference/iterator/projected.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* unique_copy_result[link ranges_in_out_result.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
隣り合った重複要素を取り除き、その結果を出力の範囲へコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 事前条件
- `[first,last)` と `[result,result + (last - first))` は重なっていてはならない


## 効果
`[first,last)` 内のイテレータ `i` について、

- (1) では `*(i - 1) == *i`
- (2) では `pred(*(i - 1), *i) != false`

による等値の比較によって連続したグループに分け、それぞれのグループの先頭を `result` へコピーする。


## 戻り値
`{ .in = last, .out = result + (last - first) }`

## 計算量
`[first,last)` が空の範囲でない場合、正確に `last - first - 1` 回の比較または述語の適用を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

void print(const char* tag, const std::vector<int>& v) {
  std::cout << tag << " : ";
  bool first = true;
  for (int x : v) {
    if (first) {
      first = false;
    }
    else {
      std::cout << ',';
    }
    std::cout << x;
  }
  std::cout << std::endl;
}

int main() {
  // 入力の配列がソート済みではない場合、
  // 隣り合った重複要素が取り除かれる
  {
    std::vector<int> v = { 2,5,3,3,1,2,4,2,1,1,4,4,3,3,3 };
    std::vector<int> uniqued;

    // 重複を除いた要素がuniquedに追加されていく
    std::ranges::unique_copy(v, std::back_inserter(uniqued));

    print("unsorted unique", uniqued);
  }

  // 入力の配列がソート済みである場合、
  // 重複している全ての要素が取り除かれて一意になる
  {
    std::vector<int> v = { 2,5,3,3,1,2,4,2,1,1,4,4,3,3,3 };
    std::vector<int> uniqued;

    std::ranges::sort(v);
    std::ranges::unique_copy(v, std::back_inserter(uniqued));

    print("sorted unique", uniqued);
  }
}
```
* std::ranges::unique_copy[color ff0000]
* std::ranges::sort[link ranges_sort.md]

### 出力
```
unsorted unique : 2,5,3,1,2,4,2,1,4,3
sorted unique : 1,2,3,4,5
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
