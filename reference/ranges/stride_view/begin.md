# begin
* ranges[meta header]
* std::ranges[meta namespace]
* stride_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto begin()
  requires (!simple-view<V>); // (1) C++23

constexpr auto begin() const
  requires range<const V>; // (2) C++23
```

## 概要

先頭要素を指すイテレータを取得する。

## 効果

- (1) : `return iterator<false>(this, ranges::begin(base_));`
- (2) : `return iterator<true>(this, ranges::begin(base_));`

ここで、`iterator`は説明専用のイテレータクラスである。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {0, 1, 2, 3, 4, 5, 6, 7, 8};
  
  std::ranges::stride_view sv{v, 3};
  
  auto it = sv.begin();
  
  // 最初の要素を出力
  std::println("first element: {}", *it);
}
```
* begin[color ff0000]

### 出力
```
first element: 0
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 4 [mark verified]

## 参照
- [N4950 26.7.32 Stride view](https://timsong-cpp.github.io/cppwp/n4950/range.stride)
