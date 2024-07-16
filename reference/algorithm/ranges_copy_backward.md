# copy_backward
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <bidirectional_iterator I1,
            sentinel_for<I1> S1,
            bidirectional_iterator I2>
    requires indirectly_copyable<I1, I2>
  constexpr copy_backward_result<I1, I2>
    copy_backward(I1 first, S1 last, I2 result); // (1) C++20

  template <bidirectional_range R,
            bidirectional_iterator I>
    requires indirectly_copyable<iterator_t<R>, I>
  constexpr copy_backward_result<borrowed_iterator_t<R>, I>
    copy_backward(R&& r, I result);              // (2) C++20
}
```
* copy_backward_result[link ranges_in_out_result.md]
* bidirectional_iterator[link /reference/iterator/bidirectional_iterator.md]
* sentinel_for[link /reference/iterator/sentinel_for.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* bidirectional_range[link /reference/ranges/bidirectional_range.md]
* iterator_t[link /reference/ranges/iterator_t.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
指定された範囲の要素を後ろからコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
`result` は `(first,last]` の範囲に含まれてはならない。


## 効果
`[first,last)` 内にある要素を、それぞれ `[result - (last-first),result)` へコピーする。

コピーは `last - 1` から順番に行い、1 以上 `last - first` 以下であるそれぞれの `n` について、`*(result - n) = *(last - n)` を行う。


## 戻り値
```cpp
copy_backward_result {
  .in  = last,
  .out = result - (last - first),
}
```
* copy_backward_result[link ranges_in_out_result.md]

## 計算量
正確に `last - first` 回代入が行われる。


## 備考
`last` が `[result - (last-first), result)` の範囲内にあるときには、`copy()` の代わりに `copy_backward()` を使うべきである。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <list>

int main() {
  std::list<int> ls = { 1,2,3,4,5 };
  // 1,2,3 の範囲を、3,4,5 の値のある範囲へコピーする
  std::ranges::copy_backward(ls.begin(), std::next(ls.begin(), 3), ls.end());

  // 以下のコードだと期待した結果にならないことを確認しよう
  // std::ranges::copy(ls.begin(), std::next(ls.begin(), 3), std::next(ls.begin(), 2));

  std::ranges::copy(ls.begin(), ls.end(), std::ostream_iterator<int>(std::cout, ","));
}
```
* std::ranges::copy_backward[color ff0000]
* ls.begin()[link /reference/list/list/begin.md]
* std::next[link /reference/iterator/next.md]
* ls.end()[link /reference/list/list/end.md]

### 出力
```
1,2,1,2,3,
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
