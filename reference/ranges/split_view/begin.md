# begin
* ranges[meta header]
* std::ranges[meta namespace]
* split_view[meta class]
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
- (1), (2) : `split_view`の先頭を指すイテレータを返す。このイテレータは部分Rangeを指し、外側のRangeが空でない場合、最初の部分Rangeを指す。外側のRangeが空の場合、[`end()`](end.md)と等価なイテレータを返す。

## 例

```cpp example
#include <ranges>
#include <string_view>
#include <iostream>

int main() {
  using namespace std::literals;
  
  std::string_view text = "hello,world,split";
  std::string_view delimiter = ",";

  std::ranges::split_view r{text, delimiter};

  auto it = r.begin();

  // 最初の部分Rangeを取得
  auto first_subrange = *it;
  std::string_view sv{first_subrange.begin(), first_subrange.end()};
  std::cout << sv << '\n';
}
```
* begin[color ff0000]

### 出力

```
hello
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
