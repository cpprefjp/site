# base
* ranges[meta header]
* std::ranges[meta namespace]
* enumerate_view[meta class]
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

- (1) : `return base_;`
- (2) : `return std::move(base_);`

## 例
```cpp example
#include <ranges>
#include <vector>
#include <concepts>
#include <iostream>

int main() {
  std::vector<char> v = {'a', 'b', 'c'};
  
  std::ranges::enumerate_view ev(v);
  
  // (1) コピーして取得
  auto base1 = ev.base();
  static_assert(std::same_as<decltype(base1), std::ranges::ref_view<std::vector<char>>>);
  
  // (2) ムーブして取得
  auto base2 = std::move(ev).base();
  static_assert(std::same_as<decltype(base2), std::ranges::ref_view<std::vector<char>>>);
  
  // 取得したviewを使用（元の要素のみ）
  for (char c : base1) {
    std::cout << c << " ";
  }
  std::cout << std::endl;
}
```
* base[color ff0000]

### 出力
```
a b c 
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照
- [N4950 26.7.23 Enumerate view](https://timsong-cpp.github.io/cppwp/n4950/range.enumerate)
