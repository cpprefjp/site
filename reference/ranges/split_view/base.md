# base
* ranges[meta header]
* std::ranges[meta namespace]
* split_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr V base() const &
  requires copy_constructible<V>;  // (1) C++20

constexpr V base() &&;             // (2) C++20
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
#include <string>
#include <iostream>

int main() {
  using std::ranges::view;
  using namespace std::literals;

  std::string text = "hello,world,split";
  std::string delimiter = ",";

  std::ranges::split_view r{text, delimiter};

  // (1) コピーして取得
  view auto b1 = r.base();

  // (2) ムーブして取得
  view auto b2 = std::move(r).base();

  // 得られるのは元のRangeではなく、あくまでview
  static_assert(not std::same_as<decltype(b1), std::string>);
  static_assert(    std::same_as<decltype(b1), std::ranges::ref_view<std::string>>);
  static_assert(    std::same_as<decltype(b2), std::ranges::ref_view<std::string>>);
}
```
* base[color ff0000]

### 出力

```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
