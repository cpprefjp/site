# copy
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <input_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O>
    requires indirectly_copyable<I, O>
  constexpr copy_result<I, O>
    copy(I first, S last, O result); // (1) C++20

  template <input_range R,
            weakly_incrementable O>
    requires indirectly_copyable<iterator_t<R>, O>
  constexpr copy_result<borrowed_iterator_t<R>, O>
    copy(R&& r, O result);           // (2) C++20
}
```
* copy_result[link ranges_in_out_result.md]
* input_iterator[link /reference/iterator/input_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* input_range[link /reference/ranges/input_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
指定された範囲の要素をコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
`result` は `[first,last)` の範囲に含まれてはならない。


## 効果
`[first,last)` 内の要素を、それぞれ `[result,result + (last - first))` へコピーする。

コピーは `first` から順番に行い、0 以上 `last - first` 未満であるそれぞれの `n` について、`*(result + n) = *(first + n)` を行う。


## 戻り値
```cpp
copy_result {
  .in  = last,
  .out = result + (last - first),
}
```
* copy_result[link ranges_in_out_result.md]


## 計算量
正確に `last - first` 回代入が行われる。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <vector>
#include <list>
#include <iterator>

int main() {
  std::vector<int> v = { 3,1,2 };

  // v から v2 へ普通にコピーする
  std::vector<int> v2(v.size()); // ちゃんと確保しておくこと
  std::ranges::copy(v, v2.begin());

  // back_inserter を使って ls3 へ設定。
  // back_inserter は要素をコピーするときに ls3.push_back() するイテレータを作る関数。
  std::list<int> ls3;
  std::ranges::copy(v2, std::back_inserter(ls3));

  // ostream_iterator を使って出力。
  // ostream_iterator<int>(cout, ",") は要素をコピーするときに cout << x << "," としてくれるイテレータ。
  std::ranges::copy(ls3, std::ostream_iterator<int>(std::cout, ","));
}
```
* std::ranges::copy[color ff0000]

### 出力
```
3,1,2,
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
