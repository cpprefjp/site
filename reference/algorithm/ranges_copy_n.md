# copy_n
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]


```cpp
namespace std::ranges {
  template <input_iterator I,
            weakly_incrementable O>
    requires indirectly_copyable<I, O>
  constexpr copy_n_result<I, O>
    copy_n(I first,
           iter_difference_t<I> n,
           O result); // (1) C++20
}
```
* copy_n_result[link ranges_in_out_result.md]
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]

## 概要
指定された数の要素をコピーする。

- (1): イテレータ範囲を指定する


## 効果
0 以上 `n` 未満であるそれぞれの `i` について、`*(result + i) = *(first + i)` を行う。


## 戻り値
```cpp
copy_n_result {
  .in  = first + n,
  .out = result + n,
}
```
* copy_n_result[link ranges_in_out_result.md]


## 計算量
正確に `n` 回代入が行われる。


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <iterator>
#include <vector>

int main() {
  std::vector<int> v = { 3, 1, 5, 2, 4 };
  std::ranges::copy_n(v.begin(), 5, std::ostream_iterator<int>(std::cout, "\n"));
}
```
* std::ranges::copy_n[color ff0000]

### 出力
```
3
1
5
2
4
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
