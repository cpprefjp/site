# rotate_copy
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <forward_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O>
    requires indirectly_copyable<I, O>
  constexpr rotate_copy_result<I, O>
    rotate_copy(I first,
                I middle,
                S last,
                O result); // (1) C++20

  template <forward_range R,
            weakly_incrementable O>
    requires indirectly_copyable<iterator_t<R>, O>
  constexpr rotate_copy_result<borrowed_iterator_t<R>, O>
    rotate_copy(R&& r,
                iterator_t<R> middle,
                O result); // (2) C++20
}
```
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* rotate_copy_result[link ranges_in_out_result.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
`middle`の要素が先頭、`middle-1`の要素が末尾となるように、`[first,last)`の要素の並びを回転させ、その結果を出力の範囲へコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
`[first,last)` と `[result,result + (last - first))` の範囲は重なっていてはならない。


## 効果
0 以上 `last - first` 未満の整数 `i` について、`*(result + i) = *(first + (i + (middle - first)) % (last - first))` という操作によって `[first,last)` の範囲を `[result,result + (last - first))` の範囲へコピーする


## 戻り値
回転前の先頭の要素を指すイテレータ`result + (last - first)`


## 計算量
正確に `last - first` 回代入する。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <string>
#include <iterator>

int main() {
  std::string str = "rotate";
  std::string result;

  std::ranges::rotate_copy(str, str.begin() + 2, std::back_inserter(result));

  std::cout << result << std::endl;
}
```
* std::ranges::rotate_copy[color ff0000]
* str.begin()[link /reference/string/basic_string/begin.md]

### 出力
```
tatero
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
