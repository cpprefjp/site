# base
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr const iterator_t<V> base() const & noexcept;  // (1)
constexpr iterator_t<V> base() &&;                      // (2)
```

## 概要

元の`view`のイテレータを取得する。

## 効果

入力`view`（`V`）のイテレータを`current_`というメンバに保持するとして

- (1) : `return current_;` と等しい
- (2) : `return std::move(current_);` と等しい

## 例

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  using std::ranges::view;

  std::vector<int> vec = {1, 2, 3, 4, 5};

  std::ranges::filter_view fv{vec, [](int i) { return i % 2 == 0; }};
  auto itr = fv.begin();

  // (1) コピーして取得
  auto b1 = itr.base();

  // (2) ムーブして取得
  auto b2 = std::move(itr).base();

  static_assert(std::same_as<decltype(b1), std::vector<int>::iterator>);
  static_assert(std::same_as<decltype(b2), std::vector<int>::iterator>);
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
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24.7.4 Filter view](https://timsong-cpp.github.io/cppwp/n4861/range.filter)
- [N4950 26.7.8 Filter view](https://timsong-cpp.github.io/cppwp/n4950/range.filter)
