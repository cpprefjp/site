# reverse
* algorithm[meta header]
* std::ranges[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template <bidirectional_iterator I,
            sentinel_for<I> S>
    requires permutable<I>
  constexpr I
    reverse(I first,
            S last); // (1) C++20

  template <bidirectional_range R>
    requires permutable<iterator_t<R>>
  constexpr borrowed_iterator_t<R>
    reverse(R&& r);  // (2) C++20
}
```
* permutable[link /reference/iterator/permutable.md]
* borrowed_iterator_t[link /reference/ranges/borrowed_iterator_t.md]

## 概要
要素の並びを逆にする。

- (1): イテレータ範囲を指定する
- (2): Rangeを直接指定する


## 効果
0 以上 `(last - first) / 2` 未満の整数 `i` について、[`iter_swap`](iter_swap.md)`(first + i, (last - i) - 1)` を行う


## 戻り値
`last`


## 計算量
正確に `(last - first) / 2` 回 swap する


## 例
```cpp example
#include <algorithm>
#include <iostream>
#include <string>

int main() {
  std::string str = "reverse";

  std::ranges::reverse(str);
  std::cout << str << std::endl;
}
```
* std::ranges::reverse[color ff0000]

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
