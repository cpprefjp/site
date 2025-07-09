# base
* ranges[meta header]
* std::ranges[meta namespace]
* as_const_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr V base() const & requires copy_constructible<V>;  // (1)
constexpr V base() &&;                                      // (2)
```

## 概要

メンバ変数として保持している、元の`view`を取得する。

## 戻り値

入力`view`（`V`）のオブジェクトを`base_`というメンバに保持するとして

- (1) : `return base_;`
- (2) : `return std::move(base_);`

## 例

```cpp example
#include <iterator>
#include <vector>
#include <iostream>

int main() {
  using std::ranges::view;

  std::vector<int> vec = {1, 2, 3, 4, 5};

  std::ranges::as_const_view acv{vec};

  // (1) コピーして取得
  view auto b1 = acv.base();

  // (2) ムーブして取得
  view auto b2 = std::move(acv).base();

  // 得られるのは元のRangeではなく、あくまでview
  static_assert(not std::same_as<decltype(b1), std::vector<int>>);
  static_assert(    std::same_as<decltype(b1), std::ranges::ref_view<std::vector<int>>>);
  static_assert(    std::same_as<decltype(b2), std::ranges::ref_view<std::vector<int>>>);
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
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照

- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
