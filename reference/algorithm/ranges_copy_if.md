# copy_if
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
            indirect_unary_predicate<projected<I, Proj>> Pred>
    requires indirectly_copyable<I, O>
  constexpr copy_if_result<I, O>
    copy_if(I first, S last, O result, Pred pred, Proj proj = {}); // (1) C++20

  template <input_range R,
            weakly_incrementable O,
            class Proj = identity,
            indirect_unary_predicate<projected<iterator_t<R>, Proj>> Pred>
    requires indirectly_copyable<iterator_t<R>, O>
  constexpr copy_if_result<borrowed_iterator_t<R>, O>
    copy_if(R&& r, O result, Pred pred, Proj proj = {});           // (2) C++20
}
```
* copy_if_result[link ranges_in_out_result.md]
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirect_unary_predicate[link /reference/iterator/indirect_unary_predicate.md]
* projected[link /reference/iterator/projected.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
条件を満たす要素のみをコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
`[first,last)` の範囲と、`[result,result + (last - first))` の範囲は重なっていてはならない。

## 効果
`[first,last)` 内のイテレータ `i` について `pred(*i)` が `true` である要素を `result` へ順番にコピーする。

## 戻り値
```cpp
copy_if_result {
  .in  = last,
  .out = result + (last - first),
}
```
* copy_if_result[link ranges_in_out_result.md]

## 計算量
正確に `last - first` 回述語を適用する。


## 備考
このコピーは安定なコピーである。つまり、コピーによって要素の前後が入れ替わることは無い。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <iterator>

bool isOdd(int x) { return x % 2 != 0; }

int main() {
  std::vector<int> v1 = { 3, 1, 4 };
  std::vector<int> v2 = { 1, 5, 9 };
  std::vector<int> v3 = { 2, 6, 5 };
  std::vector<int> result(v1.size() + v2.size() + v3.size());

  // copy_if の戻り値を使って、複数のコンテナにある奇数を全て繋げる
  auto out = result.begin();
  out = std::ranges::copy_if(v1, out, isOdd).out;
  out = std::ranges::copy_if(v2, out, isOdd).out;
  out = std::ranges::copy_if(v3, out, isOdd).out;

  std::ranges::copy(result.begin(), out, std::ostream_iterator<int>(std::cout, ","));
}
```
* std::ranges::copy_if[color ff0000]
* result.begin()[link /reference/vector/vector/begin.md]

### 出力
```
3,1,1,5,9,5,
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
