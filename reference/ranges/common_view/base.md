# base
* ranges[meta header]
* std::ranges[meta namespace]
* common_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr V base() const &
  requires copy_constructible<V>;  // (1) C++20

constexpr V base() &&;             // (2) C++20
```
* copy_constructible[link /reference/concepts/copy_constructible.md]

## 概要

メンバ変数として保持している、元のviewを取得する。

## 効果

- (1) : `return base_;`
- (2) : `return std::move(base_);`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <concepts>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5};
  
  auto taken = vec | std::views::take(3);
  std::ranges::common_view cv(taken);
  
  // (1) コピーして取得
  auto base1 = cv.base();
  static_assert(std::same_as<decltype(base1), std::ranges::take_view<std::ranges::ref_view<std::vector<int>>>>);
  
  // (2) ムーブして取得
  auto base2 = std::move(cv).base();
  static_assert(std::same_as<decltype(base2), std::ranges::take_view<std::ranges::ref_view<std::vector<int>>>>);
  
  // 取得したviewを使用
  for (int n : base1) {
    std::cout << n << " ";
  }
  std::cout << std::endl;
}
```
* base[color ff0000]
* std::ranges::common_view[link ../common_view.md]
* std::views::take[link ../take_view.md]
* std::ranges::take_view[link ../take_view.md]
* std::ranges::ref_view[link ../ref_view.md]

### 出力
```
1 2 3 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24.7.5.1 Overview](https://timsong-cpp.github.io/cppwp/n4861/range.common.view)