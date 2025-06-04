# base
* ranges[meta header]
* std::ranges[meta namespace]
* adjacent_transform_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr V base() const &
  requires copy_constructible<V>;  // (1) C++23

constexpr V base() &&;             // (2) C++23
```

## 概要

メンバ変数として保持している、元のviewを取得する。

## 効果

- (1) : `return inner_.base();`
- (2) : `return std::move(inner_).base();`

ここで、`inner_`は`adjacent_view<V, N>`型のメンバ変数。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <concepts>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  
  auto diff = [](int x, int y) { return y - x; };
  std::ranges::adjacent_transform_view<std::views::all_t<std::vector<int>&>, decltype(diff), 2> atv(v, diff);
  
  // (1) コピーして取得
  auto base1 = atv.base();
  static_assert(std::same_as<decltype(base1), std::ranges::ref_view<std::vector<int>>>);
  
  // (2) ムーブして取得
  auto base2 = std::move(atv).base();
  static_assert(std::same_as<decltype(base2), std::ranges::ref_view<std::vector<int>>>);
  
  // 取得したviewを使用（元の要素を表示）
  for (int n : base1) {
    std::cout << n << " ";
  }
  std::cout << std::endl;
}
```
* base[color ff0000]

### 出力
```
1 2 3 4 5 
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 20 [mark noimpl]
- [GCC](/implementation.md#gcc): 15 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]

## 参照
- [N4950 26.7.28 Adjacent transform view](https://timsong-cpp.github.io/cppwp/n4950/range.adjacent.transform)