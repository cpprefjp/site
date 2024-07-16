# fill_n
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class T, output_iterator<const T&> O>
  constexpr O
    fill_n(O first, iter_difference_t<O> n, const T& value); // (1) C++20
}
```
* output_iterator[link /reference/iterator/output_iterator.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]

## 概要
指定された値で出力の範囲に `n` 個を書き込む。


## 効果
`n` が 1 以上の場合は `[first,first + n)` 内の全ての要素に `value` を代入し、そうでない場合は何もしない。


## 戻り値
`n` が 1 以上の場合は `first + n`、そうでない場合は `first` を返す。


## 計算量
`n` が 1 以上の場合は `n` 回、そうでない場合は 0 回の代入を行う。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <iterator>

int main() {
  // 3 を10回出力する
  std::ranges::fill_n(std::ostream_iterator<int>(std::cout, ","), 10, 3);
}
```
* std::ranges::fill_n[color ff0000]

### 出力
```
3,3,3,3,3,3,3,3,3,3,
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
