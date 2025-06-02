# base
* ranges[meta header]
* std::ranges[meta namespace]
* join_with_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr V base() const &
  requires copy_constructible<V>;  // (1) C++23

constexpr V base() &&;             // (2) C++23
```

## 概要

メンバ変数として保持している、元の`view`を取得する。

## 効果

入力`view`（`V`）のオブジェクトを`base_`というメンバに保持するとして

- (1) : `return base_;` と等価
- (2) : `return std::move(base_);` と等価

## 例

```cpp example
#include <ranges>
#include <vector>
#include <string>
#include <iostream>

int main() {
  using std::ranges::view;

  std::vector<std::string> words = {"hello", "world", "join"};
  std::string delimiter = "-";

  std::ranges::join_with_view r{words, delimiter};

  // (1) コピーして取得
  view auto b1 = r.base();

  // (2) ムーブして取得
  view auto b2 = std::move(r).base();

  // 得られるのは元のRangeではなく、あくまでview
  static_assert(not std::same_as<decltype(b1), std::vector<std::string>>);
  static_assert(    std::same_as<decltype(b1), std::ranges::ref_view<std::vector<std::string>>>);
  static_assert(    std::same_as<decltype(b2), std::ranges::ref_view<std::vector<std::string>>>);
}
```
* base[color ff0000]

### 出力

```
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??