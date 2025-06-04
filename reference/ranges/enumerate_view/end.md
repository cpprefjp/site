# end
* ranges[meta header]
* std::ranges[meta namespace]
* enumerate_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view<V>);                              // (1) C++23

constexpr auto end() const
  requires range-with-movable-references<const V>;         // (2) C++23
```

## 概要

番兵を取得する。

## 効果

`common_range<V> && sized_range<V>`が`true`の場合：

- (1) : `return iterator<false>(ranges::end(base_), ranges::distance(base_));`
- (2) : `return iterator<true>(ranges::end(base_), ranges::distance(base_));`

それ以外の場合：

- (1) : `return sentinel<false>(ranges::end(base_));`
- (2) : `return sentinel<true>(ranges::end(base_));`

ここで、`iterator`と`sentinel`は`enumerate_view`の内部で定義される説明専用のクラスである。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<char> v = {'a', 'b', 'c'};
  
  std::ranges::enumerate_view ev(v);
  
  auto begin = ev.begin();
  auto end = ev.end();
  
  // 全要素を出力
  for (auto it = begin; it != end; ++it) {
    auto [index, value] = *it;
    std::cout << index << ": " << value << std::endl;
  }
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力
```
0: a
1: b
2: c
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