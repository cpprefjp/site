# begin
* ranges[meta header]
* std::ranges[meta namespace]
* lazy_split_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto begin()
  requires (!simple-view<V>);       // (1) C++20

constexpr auto begin() const
  requires range<const V> &&
           forward_range<const Pattern>;  // (2) C++20
```

## 概要

`view`の先頭要素を指すイテレータを取得する。

## 戻り値
- (1), (2) : `lazy_split_view`の先頭を指すイテレータを返す。このイテレータは部分Rangeを指し、外側のRangeが空でない場合、最初の部分Rangeを指す。外側のRangeが空の場合、[`end()`](end.md)と等価なイテレータを返す。

## 例

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9};
  std::vector<int> pattern = {4, 5};

  std::ranges::lazy_split_view r{v, pattern};

  auto it = r.begin();

  // 最初の部分Rangeを取得
  auto first_subrange = *it;
  for (int n : first_subrange) {
    std::cout << n;
  }
  std::cout << '\n';
}
```
* begin[color ff0000]

### 出力

```
123
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]