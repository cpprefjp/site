# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* lazy_split_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
lazy_split_view()
  requires default_initializable<V> && default_initializable<Pattern> = default; // (1) C++20

constexpr explicit lazy_split_view(V base, Pattern pattern);                      // (2) C++20

template<input_range R>
  requires constructible_from<V, views::all_t<R>> && constructible_from<Pattern, single_view<range_value_t<R>>>
constexpr explicit lazy_split_view(R&& r, range_value_t<R> e);                   // (3) C++20
```

## 概要

[`lazy_split_view`](../lazy_split_view.md)オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : 元となるviewとパターンを指定して構築
- (3) : 元となるRangeと区切り要素を指定して構築

## 効果

- (1) : `base_`と`pattern_`をデフォルト構築する
- (2) : `base_`を`std::move(base)`で、`pattern_`を`std::move(pattern)`で初期化する
- (3) : `base_`を`views::all(std::forward<R>(r))`で、`pattern_`を`views::single(std::move(e))`で初期化する

## 例
```cpp example
#include <iostream>
#include <ranges>
#include <vector>
#include <string>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9};
  std::vector<int> pattern = {4, 5};

  // (2) パターンを指定して構築
  std::ranges::lazy_split_view view1{v, pattern};
  
  // (3) 区切り要素を指定して構築
  std::ranges::lazy_split_view view2{v, 5};

  for (auto inner_range : view1) {
    for (int n : inner_range) {
      std::cout << n;
    }
    std::cout << '\n';
  }
}
```
* lazy_split_view[color ff0000]

### 出力
```
123
6789
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]