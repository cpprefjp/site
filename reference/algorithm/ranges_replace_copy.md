# replace_copy
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
            output_iterator<const T2&> O,
            class Proj = identity>
    requires indirectly_copyable<I, O> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<I, Proj>,
               const T1*
             >
  constexpr replace_copy_result<I, O>
    replace_copy(I first,
                 S last,
                 O result,
                 const T1& old_value,
                 const T2& new_value,
                 Proj proj = {}); // (1) C++20

  template <input_range R,
            class T1,
            class T2,
            output_iterator<const T2&> O,
            class Proj = identity>
    requires indirectly_copyable<iterator_t<R>, O> &&
             indirect_binary_predicate<
               ranges::equal_to,
               projected<iterator_t<R>, Proj>,
               const T1*
             >
  constexpr replace_copy_result<borrowed_iterator_t<R>, O>
    replace_copy(R&& r,
                 O result,
                 const T1& old_value,
                 const T2& new_value,
                 Proj proj = {}); // (2) C++20
}
```
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* output_iterator[link /reference/iterator/output_iterator.md]
* identity[link /reference/functional/identity.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* indirect_binary_predicate[link /reference/iterator/indirect_binary_predicate.md]
* ranges::equal_to[link /reference/functional/ranges_equal_to.md]
* projected[link /reference/iterator/projected.md]
* replace_copy_result[link ranges_in_out_result.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
指定された値を一致する要素を指定された値に置き換え、その結果を出力の範囲へコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する

## 事前条件
- `[first,last)` と `[result,result + (last - first))` の範囲が重なっていてはならない。


## 効果
`[result,result + (last - first))` 内のイテレータ `i` について、`*(first + (i - result)) == old_value` である場合は `new_value` が代入され、そうでない場合は `*(first + (i - result))` が 代入される。


## 戻り値
`{ .in = last, .out = result + (last - first)`


## 計算量
正確に `last - first` 回の比較を行う


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

int main() {
  std::vector<int> v = { 3,1,2,1,2 };

  // 1 の要素を全部 10 に置き換えたものを出力する
  std::ranges::replace_copy(v, std::ostream_iterator<int>(std::cout, ","), 1, 10);
}
```
* std::ranges::replace_copy[color ff0000]

### 出力
```
3,10,2,10,2,
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
