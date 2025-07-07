# reverse_copy
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <bidirectional_iterator I,
            sentinel_for<I> S,
            weakly_incrementable O>
    requires indirectly_copyable<I, O>
  constexpr reverse_copy_result<I, O>
    reverse_copy(I first,
                 S last,
                 O result); // (1) C++20

  template <bidirectional_range R,
            weakly_incrementable O>
    requires indirectly_copyable<iterator_t<R>, O>
  constexpr reverse_copy_result<borrowed_iterator_t<R>, O>
    reverse_copy(R&& r,
                 O result); // (2) C++20
}
```
* weakly_incrementable[link /reference/iterator/weakly_incrementable.md]
* indirectly_copyable[link /reference/iterator/indirectly_copyable.md]
* reverse_copy_result[link ranges_in_out_result.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
要素の並びを逆にし、その結果を出力の範囲へコピーする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 事前条件
`[first,last)` と `[result,result+(last-first))` は領域が重なっていてはならない。


## 効果
0 以上 `last - first` 未満の整数 `i` について、`*(result + (last - first) -1 - i) = *(first + i)` を行うことで、`[first,last)` の範囲を `[result,result+(last-first))` へコピーする。


## 戻り値
`{ .in = last, .out = result + (last - first) }`


## 計算量
正確に `last - first` 回代入する


## 使用例
```cpp example
#include <algorithm>
#include <iostream>
#include <string>
#include <iterator>

int main() {
  std::string str = "reverse";

  std::ranges::reverse_copy(str, std::ostream_iterator<char>(std::cout, ""));
}
```
* std::ranges::reverse_copy[color ff0000]

### 出力
```
esrever
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
