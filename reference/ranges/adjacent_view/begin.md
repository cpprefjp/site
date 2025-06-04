# begin
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr auto begin()
  requires (!simple-view<V>);      // (1) C++23

constexpr auto begin() const
  requires range<const V>;         // (2) C++23
```

## 概要

先頭を指すイテレータを取得する。

## 効果

- (1) : `return iterator<false>(ranges::begin(base_), ranges::end(base_));`
- (2) : `return iterator<true>(ranges::begin(base_), ranges::end(base_));`

ここで、`iterator`は`adjacent_view`の内部で定義される説明専用のイテレータクラスである。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  
  std::ranges::adjacent_view<std::views::all_t<std::vector<int>&>, 3> av(v);
  
  auto it = av.begin();
  
  // 最初の要素（隣接する3要素のタプル）
  auto [a, b, c] = *it;
  std::cout << a << ", " << b << ", " << c << std::endl;
  
  // 次の要素へ
  ++it;
  auto [a2, b2, c2] = *it;
  std::cout << a2 << ", " << b2 << ", " << c2 << std::endl;
}
```
* begin[color ff0000]

### 出力
```
1, 2, 3
2, 3, 4
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]

## 参照
- [N4950 26.7.27 Adjacent view](https://timsong-cpp.github.io/cppwp/n4950/range.adjacent)