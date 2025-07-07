# transform
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O,
            copy_constructible F,
            class Proj = identity>
    requires indirectly_writable<
               O,
               indirect_result_t<F&, projected<I, Proj>>
             >
  constexpr unary_transform_result<I, O>
    transform(I first1,
              S last1,
              O result,
              F op,
              Proj proj = {}); // (1) C++20

  template <input_range R,
            weakly_incrementable O,
            copy_constructible F,
            class Proj = identity>
    requires indirectly_writable<
               O,
               indirect_result_t<F&, projected<iterator_t<R>, Proj>>
             >
  constexpr unary_transform_result<borrowed_iterator_t<R>, O>
    transform(R&& r,
              O result,
              F op,
              Proj proj = {}); // (2) C++20

  template <input_iterator I1,
            sentinel_for<I1> S1,
            input_iterator I2,
            sentinel_for<I2> S2,
            weakly_incrementable O,
            copy_constructible F,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_writable<
               O,
               indirect_result_t<F&, projected<I1, Proj1>, projected<I2, Proj2>>
             >
  constexpr binary_transform_result<I1, I2, O>
    transform(I1 first1,
              S1 last1,
              I2 first2,
              S2 last2,
              O result,
              F binary_op,
              Proj1 proj1 = {},
              Proj2 proj2 = {}); // (3) C++20

  template <input_range R1,
            input_range R2,
            weakly_incrementable O,
            copy_constructible F,
            class Proj1 = identity,
            class Proj2 = identity>
    requires indirectly_writable<
               O,
               indirect_result_t<F&, projected<iterator_t<R1>, Proj1>,
               projected<iterator_t<R2>, Proj2>>
             >
  constexpr binary_transform_result<
              borrowed_iterator_t<R1>,
              borrowed_iterator_t<R2>,
              O
            >
    transform(R1&& r1,
              R2&& r2,
              O result,
              F binary_op,
              Proj1 proj1 = {},
              Proj2 proj2 = {}); // (4) C++20
}
```
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_writable[link /reference/iterator/indirectly_writable.md]
* indirect_result_t[link /reference/iterator/indirect_result_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]
* unary_transform_result[link ranges_in_out_result.md]
* binary_transform_result[link ranges_in_in_out_result.md]


## 概要
全ての要素に関数を適用する。

- (1), (2): 1つの範囲の要素に関数を適用し、結果を出力イテレータに出力する
- (3), (4): 2つの範囲の要素を1つずつ取り出して関数を適用し、結果を出力イテレータに出力する

- (1), (3): イテレータ範囲を指定する
- (2), (4): Rangeを直接指定する


## 事前条件
- (1), (2) : `op` は、`[first,last]`, `[result,result + (last - first)]` 内のイテレータや subrange を無効にしたり、要素を書き換えてはならない。
- (3), (4) : `binary_op` は、`[first1,last1]`, `[first2,first2 + (last1 - first1)]`, `[result,result + (last1 - first1)]` 内のイテレータや subrange を無効にしたり、要素を書き換えてはならない。

※ 閉区間で表しているのは意図的なもの


## 効果
- (1), (2) : `[result,result + (last - first))` 内のイテレータ `i` の要素に、それぞれ `op(*(first + (i - result)))` を代入する
- (3), (4) : `[result,result + (last1 - first1))` 内のイテレータ `i` の要素に、それぞれ `binary_op(*(first1 + (i - result)), *(first2 + (i - result)))` を代入する。


## 戻り値
- (1), (2) : `{ .in = last, .out = result + (last - first) }`
- (3), (4) : `{ .in1 = last1, .in2 = last2, .out = result + (last1 - first1) }`


## 計算量
- (1), (2) : 正確に `last - first` 回の `op` の適用が行われる。
- (3), (4) : 正確に `last1 - first1` 回の `binary_op` の適用が行われる。


## 備考
- (1), (2) : `result` は `first` と同じであっても構わない。
- (3), (4) : `result` は `first1` や `first2` と同じであっても構わない。


## (1)の例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <string>
#include <iterator>

int main() {
  std::vector<int> v = { 3,1,4 };
  std::vector<std::string> result;

  // 2倍してから文字列に変換する
  std::ranges::transform(v, std::back_inserter(result), [](int x) { return std::to_string(x * 2); });

  for (const std::string& s : result) {
    std::cout << s << std::endl;
  }
}
```
* std::ranges::transform[color ff0000]
* std::to_string[link /reference/string/to_string.md]

### 出力
```
6
2
8
```


## (2)の例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <string>
#include <iterator>

int main() {
  std::vector<char> v1 = { 'a','b','c' };
  std::vector<int> v2 = { 3,1,4 };
  std::vector<std::string> result;

  // v1[n] の文字を v2[n] 回繰り返した文字列を返す
  std::ranges::transform(v1, v2, std::back_inserter(result), [](char a, int b) { return std::to_string(b, a); });

  for (const std::string& s : result) {
    std::cout << s << std::endl;
  }
}
```
* std::ranges::transform[color ff0000]
* std::to_string[link /reference/string/to_string.md]

### 出力
```
aaa
b
cccc
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

## 関連項目

- [`transform_view`](/reference/ranges/transform_view.md) : 要素に関数を適用した結果をビューとして提供する
- [`zip_transform_view`](/reference/ranges/zip_transform_view.md) : 複数の範囲から要素を取り出し、関数を適用した結果をビューとして提供する
