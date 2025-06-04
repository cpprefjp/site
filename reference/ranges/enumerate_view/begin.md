# begin
* ranges[meta header]
* std::ranges[meta namespace]
* enumerate_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto begin()
  requires (!simple-view<V>);      // (1) C++23

constexpr auto begin() const
  requires range-with-movable-references<const V>; // (2) C++23
```

## 概要

先頭を指すイテレータを取得する。

## 効果

- (1) : `return iterator<false>(ranges::begin(base_), 0);`
- (2) : `return iterator<true>(ranges::begin(base_), 0);`

ここで、`iterator`は`enumerate_view`の内部で定義される説明専用のイテレータクラスである。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<char> v = {'a', 'b', 'c'};
  
  std::ranges::enumerate_view ev(v);
  
  auto it = ev.begin();
  
  // 最初の要素（インデックスと値のタプル）
  auto [index, value] = *it;
  std::cout << index << ": " << value << std::endl;
  
  // 次の要素へ
  ++it;
  auto [index2, value2] = *it;
  std::cout << index2 << ": " << value2 << std::endl;
}
```
* begin[color ff0000]

### 出力
```
0: a
1: b
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]

## 参照
- [N4950 26.7.23 Enumerate view](https://timsong-cpp.github.io/cppwp/n4950/range.enumerate)