# begin
* ranges[meta header]
* std::ranges[meta namespace]
* concat_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto begin()
  requires (!simple-view<Views> || ...);       // (1) C++26

constexpr auto begin() const
  requires (range<const Views> && ...);        // (2) C++26
```

## 概要

`view`の先頭要素を指すイテレータを取得する。

## 戻り値
- (1), (2) : `concat_view`の先頭を指すイテレータを返す。連結されたRangeが空でない場合、最初の非空Rangeの先頭要素を指す。すべてのRangeが空の場合、[`end()`](end.md)と等価なイテレータを返す。

## 例

```cpp example
#include <print>
#include <ranges>
#include <array>
#include <vector>

int main() {
  std::vector<int> v1{1, 2, 3};
  std::vector<int> v2{4, 5};
  std::array<int, 3> a{6, 7, 8};

  std::ranges::concat_view r{v1, v2, a};

  auto it = r.begin();
  
  int x = *it;
  std::println("{}", x);
}
```
* begin[color ff0000]

### 出力

```
1
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 20 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]
