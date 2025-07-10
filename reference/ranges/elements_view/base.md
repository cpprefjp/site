# base
* ranges[meta header]
* std::ranges[meta namespace]
* elements_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr V base() const &
  requires copy_constructible<V>;  // (1) C++20

constexpr V base() &&;             // (2) C++20
```

## 概要

メンバ変数として保持している、元のviewを取得する。

## 効果

- (1) : `return base_;`
- (2) : `return std::move(base_);`

## 例
```cpp example
#include <ranges>
#include <map>
#include <string>
#include <concepts>
#include <iostream>

int main() {
  std::map<int, std::string> m = {{1, "one"}, {2, "two"}, {3, "three"}};
  
  std::ranges::keys_view kv(m);
  
  // (1) コピーして取得
  auto base1 = kv.base();
  static_assert(std::same_as<decltype(base1), std::ranges::ref_view<std::map<int, std::string>>>);
  
  // (2) ムーブして取得
  auto base2 = std::move(kv).base();
  static_assert(std::same_as<decltype(base2), std::ranges::ref_view<std::map<int, std::string>>>);
  
  // 取得したviewを使用（元のmap要素を表示）
  for (const auto& [key, value] : base1) {
    std::cout << key << ": " << value << std::endl;
  }
}
```
* base[color ff0000]

### 出力
```
1: one
2: two
3: three
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
- [N4861 24.7.21.1 Overview](https://timsong-cpp.github.io/cppwp/n4861/range.elements.view)
